import * as express from 'express';
import { dbDepartment } from '../db/dbDepartment'; 
import { pool } from '../db/protected/dbcon-dev';
import * as dbm from '../db/dbModels';

export const departmentRouter = express();
const dbControl = new dbDepartment(pool);//exclusive to departments router

departmentRouter.post('/', (req, res, next) => {
    dbControl.getDepartments().then( data => res.json(data));
});

departmentRouter.post('/add', (req, res, next) => {
    const incData:dbm.IDepartment = {...req.body};

    //error checking
    if (typeof(incData.name) !== 'string'){
        return res.status(400).json({'error':'invalid data recieved'});
    }

    //do insert
    dbControl.addDepartment(incData)
    .then( () =>
    dbControl.getDepartments()
    .then( data => res.json(data)));
});