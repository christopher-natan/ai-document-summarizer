import fs from "fs";
import {Configs} from "../configs.js";

/**
 * Api Service
 */
export class ApiService {
    setData = async (file, content) => {
        try {
            await fs.writeFileSync(Configs.apiPath + file + '.json', JSON.stringify(content));
        } catch (err) {
            console.log(err);
        }
    }

    getEndpoint = (req, id) => {
        const host = 'http://' + req.headers.host + '/';
        return `${host}api/getAnalyzation?id=${id}`;
    }
}
