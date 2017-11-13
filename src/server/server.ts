import * as express from 'express';
import * as http from 'http';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import { dbController } from './db/dbController';
import { pool } from './db/protected/dbcon-dev';
import { departmentRouter } from './routes/departmentRouter';
import { buildingRouter } from './routes/buildingRouter';
import { classRouter } from './routes/classRouter';
import { studentRouter } from './routes/studentRouter';

const app = express();
const server = (http as any).Server(app);
const dbControl = new dbController(pool);//creates db connection

//generic usings
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', express.static('./public'));
app.engine('html', require('ejs').renderFile);

//use routes
app.use('/department',departmentRouter);
app.use('/building',buildingRouter);
app.use('/class',classRouter);
app.use('/student',studentRouter);


app.get('/', (req, res, next) => {
    res.render('index.html');
});

app.get('*', (req, res) => {
    res.render('404page.html');
});



const port = process.env.PORT || 3000;
server.listen(port);
console.log("server running at http://localhost:" + port);
console.log("  Press CTRL-C to stop\n");