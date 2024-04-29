import dotenv from 'dotenv';
import TextBuddy from "textbuddy";
import {jsonrepair} from 'jsonrepair'
const {config} = dotenv.config();

/**
 * Ai Service
 */
export class AiService {
    textBuddy = new TextBuddy('');
    content = '';
    setContent = async (content) => {
        this.textBuddy = new TextBuddy(content);
        this.textBuddy.setOpenAiApiKey(process.env.OPENAI_KEY,)
        this.content = content;
    }
    getContent = () => this.content;
    ask = async (query) => {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await this.textBuddy.aiAnswerQuestion(query)
                result = result.replaceAll("`", "").replaceAll("json", "");
                result = jsonrepair(result);
                console.log('--------------------------**result**-------------------')
                console.log(result)
                console.log('--------------------------**result**-------------------')
                return resolve(result);
            } catch (error) {
                reject(error)
            }
        });
    }
}
