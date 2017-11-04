import * as express from 'express';
import * as http from 'http';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import { dbController } from './db/dbController';
import { pool } from './db/protected/dbcon-dev';
import * as dbm from './db/dbModels';

const app = express();
const server = (http as any).Server(app);

const dbControl = new dbController(pool);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', express.static('./public'));
app.engine('html', require('ejs').renderFile);


app.get('/', (req, res, next) => {
    res.render('index.html');
});

app.post('/department/insert', (req, res, next) => {
    const incData:dbm.IDepartments = {...req.body};

    //error checking
    if (typeof(incData.name) === 'undefined'){
        return res.status(400).json({'error':'invalid data recieved'});
    }
    incData.name = incData.name.replace(/ /g,"_");//important regex

    //do insert

    // return results
    dbControl.getDepartments().then( data => {
        res.json(data);
    });
});

app.post('/department', (req, res, next) => {
    dbControl.getDepartments().then( data => {
        res.json(data);
    });
});

app.get('*', (req, res) => {
    res.render('404page.html');
});



const port = process.env.PORT || 3000;
server.listen(port);
console.log("server running at http://localhost:" + port);
console.log("  Press CTRL-C to stop\n");