import aws from 'aws-sdk';
import formidable, {errors as formidableErrors} from 'formidable';
import fs from 'fs';
import dotenv from 'dotenv';
const {config} = dotenv.config();

/**
 * S3 Service, AI Document Summarizer supports
 * uploading of document using  Amazon S3 service
 */
export class S3Service {
    upload = async (req, res, next) => {
        const form = formidable({});
        let fields;
        let files;
        try {
            return await form.parse(req).then(async (files) => await this.toS3(files[1]));
        } catch (err) {
            if (err.code === formidableErrors.maxFieldsExceeded) {
            }
            console.error(err);
            res.writeHead(err.httpCode || 400, {'Content-Type': 'text/plain'});
            res.end(String(err));
        }
    }

    toS3 = async (file) => {
        const uploader = file.file_upload[0];
        const content = fs.readFileSync(uploader.filepath);
        const params = {
            Bucket: process.env.AWS_BUCKET,
            Key: `${Date.now().toString()}-${uploader.newFilename}.pdf`,
            Body: content,
            ContentType: uploader.mimetype,
            ACL: 'public-read'
        }
        const amazonS3 = new aws.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_KEY
        })
        return new Promise(resolve => {
            amazonS3.upload(params, (err, data) => {
                if (err) {
                    resolve(err)
                } else {
                    resolve(data)
                }
            })
        })
    }

}
