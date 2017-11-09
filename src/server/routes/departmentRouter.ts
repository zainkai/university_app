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
    const incData:dbm.IDepartments = {...req.body};

    //error checking
    if (typeof(incData.name) === 'undefined'){
        return res.status(400).json({'error':'invalid data recieved'});
    }
    incData.name = incData.name.replace(/ /g,"_");//important regex

    //do insert

    // return results
    dbControl.getDepartments().then( data => res.json(data));
});