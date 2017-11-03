import * as express from 'express';
import * as http from 'http';
import * as path from 'path';
import * as bodyParser from 'body-parser';

const app = express();
const server = (http as any).Server(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));