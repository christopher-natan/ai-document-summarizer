import fs from 'fs';
import {Configs} from "../configs.js";

export class ApiController {
    file = '';
    constructor() {}

    /**
     * Read data from the saved extracted information
     * and return API json data
     * @param req
     * @param res
     * @param next
     */
    index = (req, res, next) => {
        const fileName = Configs.apiPath + req.query.id + '.pdf.json';
        const fileData = fs.readFileSync(fileName, "utf8");
        res.json(JSON.parse(fileData));
    }
}
