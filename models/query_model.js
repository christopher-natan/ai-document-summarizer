import fs from 'fs';
import {Configs} from "../configs.js";
import {AppUtil} from "../utils/app_util.js";

export class QueryModel {

    /**
     * Reads json data from queries/determine.json, usually get the list of rules and use that to determine
     * the document type based on the content of the document
     * @returns {Promise<unknown>}
     */
    determine = async () => {
        return new Promise((resolve, reject) => {
            fs.readFile(Configs.queriesPath + 'determine.json', 'utf8', async (err, resBuffer) => {
                try {
                    const response = JSON.parse(resBuffer);
                    let prompt = response.prompt;
                    const documentType = response.documentType.join(', ');
                    prompt = prompt.replace('{DOCUMENT_TYPE}', documentType);
                    resolve(prompt);
                } catch (err) {
                    reject(err)
                }
            });
        });
    }

    /**
     * Reads the json file based on document type, fetch list of rules and use that to extract
     * the information needed
     * @param documentType
     * @returns {Promise<unknown>}
     */
    extract = async (documentType) => {
        return new Promise((resolve, reject) => {
            fs.readFile(Configs.dataPath + AppUtil.toKey(documentType) + '.json', 'utf8', async (err, resBuffer) => {
                if(resBuffer === undefined) return resolve(undefined);
                try {
                    const response = JSON.parse(resBuffer);
                    let prompt = response.prompt;
                    const information = response.information.join(', ');
                    prompt = prompt.replace('{INFORMATION}', information);
                    resolve(prompt);
                } catch (err) {
                    reject(err)
                }
            });
        });
    }
}
