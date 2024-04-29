import {S3Service} from "../services/s3_service.js";
import {TextractService} from "../services/textract_service.js";
import {AiService} from "../services/ai_service.js";
import {DocumentService} from "../services/document_service.js";
import {QueryModel} from "../models/query_model.js";
import {HostService} from "../services/host_service.js";
import {ApiService} from "../services/api_service.js";
import {AppUtil} from "../utils/app_util.js";

export class AnalyzeController {
    documentService = new DocumentService();
    textractService = new TextractService();
    s3Service = new S3Service();
    aiService = new AiService();
    hostService = new HostService();
    apiService = new ApiService();
    queryModel = new QueryModel();

    constructor() {
    }

    /**
     * The entry point for the AI Document Summarizer app which calls
     * the HostService and display the user interface.
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    index = async (req, res, next) => {
        const parentCallback = async (params) => {
            res.render('analyze', {...params, ...{endpoint: this.apiService.getEndpoint(req, this.hostService.getId())}})
        }
        await this.uploadDocumentToHostServer(req, res, next).then(async (uploadedFile) => {
            await this.extractDocumentFromHostServer(res, parentCallback);
        });
    }

    /**
     * Upload the document to AmazonS3, currently we support this,
     * by default it uploads to the host server
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    uploadDocumentToS3 = async (req, res, next) => {
        await this.s3Service.upload(req, res, next).then(async (result) => {
            await this.textractService.analyzeExtract(result).then(() => {
                res.render('analyze', {result: ''})
            });
        });
    }

    /**
     * Upload the document to the host server using Host Service
     * @param req
     * @param res
     * @param next
     * @returns {Promise<unknown>}
     */
    uploadDocumentToHostServer = async (req, res, next) => {
        return await this.hostService.upload(req, res, next);
    }

    /**
     * Reads document from the host and start to extract information
     * from the document
     * @param res
     * @param parentCallback
     * @returns {Promise<void>}
     */
    extractDocumentFromHostServer = async (res, parentCallback) => {
        const callback = async (response) => {
            response = JSON.parse(response);
            await this.extractInformation(res, response, parentCallback)
        }

        await this.documentService.setDocument(this.hostService.getDocumentFile());
        await this.documentService.analyzeExtract(async (content) => {
            await this.aiService.setContent(content).then(async (_) => {
                await this.determineDocumentType(res, callback);
            })
        });
    }

    /**
     * Determine the document type and set the document type of the Query Model
     * @param res
     * @param callback
     * @returns {Promise<void>}
     */
    determineDocumentType = async (res, callback) => {
        await this.queryModel.determine().then(async (query) => {
            return await this.aiService.ask(query).then((response) => {
                callback(response);
            });
        });
    }

    /**
     * Extract the document to get the information needed
     * @param res
     * @param response
     * @param parentCallback
     * @returns {Promise<void>}
     */
    extractInformation = async (res, response, parentCallback) => {
        const documentType = AppUtil.getObjectFirstValue(response);
        console.log('--------------------------***-------------------')
        console.log(documentType);
        console.log('--------------------------***-------------------')
        await this.queryModel.extract(documentType).then(async (query) => {
            if(query === undefined) return res.render('error', {result: ''});

            return await this.aiService.ask(query).then((response) => {
                response = JSON.parse(response);
                console.log(response);
                const keys = Object.keys(response);
                this.apiService.setData(this.hostService.getDocumentFile(), {...{documentType: documentType}, ...response});
                parentCallback({keys: keys, response: response, documentType: documentType});
            });
        });
    }
}
