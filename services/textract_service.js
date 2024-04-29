import aws from 'aws-sdk';
import dotenv  from 'dotenv';
const {config} = dotenv.config();

/**
 * Textract Service, AI Document Summarizer supports
 * using the nice pdf analyzer of Amazon Textract Service
 */
export class TextractService {
    analyzeExtract = async (s3) => {
        return new Promise(async resolve => {
            const textract = new aws.Textract({
                region: process.env.AWS_REGION,
                endpoint: `https://textract.${process.env.AWS_REGION}.amazonaws.com/`,
                accessKeyId: process.env.AWS_ACCESS_KEY,
                secretAccessKey: process.env.AWS_SECRET_KEY
            });
            const params = {
                Document: {
                    S3Object: {
                        Bucket: process.env.AWS_BUCKET,
                        Name: s3.key
                    }
                },
                FeatureTypes: ['TABLES', 'FORMS', 'SIGNATURES']
            };

            await textract.analyzeDocument(params, async (err, data) => {
                if (err) {
                    console.log(err);
                    return resolve(err);
                } else {
                    await this.setContent(data);
                    resolve(data)
                }
            })
        })
    }
    setContent = async (dataBuffer) => {
        console.log(dataBuffer)
    }
}
