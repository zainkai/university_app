import * as express from 'express';
import * as http from 'http';
import * as path from 'path';
import * as bodyParser from 'body-parser';

const app = express();
const server = (http as any).Server(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', express.static('./public'));
app.engine('html', require('ejs').renderFile);


app.get('/', (req, res, next) => {
    res.render('index.html');
});

app.get('*', (req, res) => {
    res.render('404page.html');
});



const port = process.env.PORT || 3000;
server.listen(port);
console.log("server running at http://localhost:" + port);