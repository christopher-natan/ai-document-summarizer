import {ApiController} from "./controllers/api_controller.js";
import {HomeController} from "./controllers/home_controller.js";
import {AnalyzeController} from "./controllers/analyze_controller.js";

const api = new ApiController();
const home = new HomeController();
const analyze = new AnalyzeController();

/**
 * Routes only
 */
export class Routes {
   constructor(app) {
       app.get('/', home.index);
       app.post('/analyze', analyze.index);
       app.get('/api/getAnalyzation', api.index);
   }
}
