import { PdfReader } from "pdfreader";
import { Configs } from "../configs.js";
import fs from "fs";

/**
 * Document Service
 */
export class DocumentService {
    document = ''

    setDocument = async (document) => {
       this.document = document;
    }
    analyzeExtract = async (callback) => {
        let content = '';
        new PdfReader().parseFileItems(Configs.documentsPath + this.document, (err, item)  => {
            if (err) console.error("error:", err);
            else if (!item) {
                callback(content);
            }
            else if (item.text) {
                content = content + item.text + ' ';
                this.setContent(content);
            }
        });
    }
    setContent = async (content) => {
        try {
            await fs.appendFileSync(Configs.contentPath + this.document + '.txt', content);
        } catch (err) {
            console.log(err);
        }
    }
}
