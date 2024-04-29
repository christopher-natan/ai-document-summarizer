import express from 'express';
import {Routes} from "./routes.js";

const app = express();
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 8081) : 8000;
const routes = new Routes(app);

app.set('view engine', 'pug')
app.listen(port, () => console.log('Api listening on port ' + port));

