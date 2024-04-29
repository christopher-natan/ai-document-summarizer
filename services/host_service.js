import formidable, {errors as formidableErrors} from "formidable";
import fs from "fs";
import {AppUtil} from "../utils/app_util.js";
import {Configs} from "../configs.js";

/**
 * Host Service
 */
export class HostService {
    documentFile = '';
    id = '';

    upload = async (req, res, next) => {
        const form = formidable({});
        try {
            return await form.parse(req).then(async (files) => await this.toHost(files[1]));
        } catch (err) {
            if (err.code === formidableErrors.maxFieldsExceeded) {
            }
            res.writeHead(err.httpCode || 400, {'Content-Type': 'text/plain'});
            res.end(String(err));
        }
    }

    getDocumentFile = () => {
        return this.documentFile;
    }

    getId = () => {
        return this.id;
    }

    toHost = async (file) => {
        const uploader = file.file_upload[0];
        return new Promise(resolve => {
            const oldFile = uploader.filepath;
            const ext = AppUtil.getFileExtension(uploader.originalFilename);
            const file = uploader.newFilename + '.' + ext;
            const newFile = Configs.documentsPath + file;
            this.documentFile = file;
            this.id = uploader.newFilename;

            fs.rename(oldFile, newFile, function (err) {
                if (err) {
                    resolve(err)
                } else {
                    resolve(file)
                }
            });
        })
    }
}
