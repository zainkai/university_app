import * as express from 'express';
import { dbClass } from '../db/dbClass';
import { pool } from '../db/protected/dbcon-dev';
import * as dbm from '../models/dbModel';
import * as APIModel from '../models/APIModel';

export const classRouter = express();
const dbControl = new dbClass(pool);//exclusive to departments router


classRouter.get('/', (req, res, next) => {
    res.render('classes.html');
});

classRouter.post('/' ,(req,res,next) => {
    dbControl.getClasses().then(data => res.json(data));
});

classRouter.post('/get',(req,res,next) => {
    const incData:APIModel.IdRequest = {...req.body};
    dbControl.getClass(incData.id).then(data => res.json(data));
});

classRouter.post('/add',(req,res,next) => {
    const incData:dbm.IClass = {...req.body};
    incData.departmentid = Number(incData.departmentid);
    incData.buildingid = Number(incData.buildingid);

    //error checking
    if (typeof(incData.name) !== 'string' ||
        typeof(incData.departmentid) !== 'number' ||
        typeof(incData.buildingid) !== 'number'){
        return res.status(400).json({'error':'invalid data recieved'});
    }

    //do insert
    dbControl.addClass(incData)
    .then( id => 
    dbControl.getClass(id))
    .then(data => res.json(data));
});

classRouter.post('/options',(req,res,next) => {
    dbControl.listClassOptions().then(data => res.json(data));
});