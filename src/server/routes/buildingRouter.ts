import * as express from 'express';
import { dbDepartment } from '../db/dbDepartment';
import { dbBuilding} from '../db/dbBuilding';
import { pool } from '../db/protected/dbcon-dev';
import * as dbm from '../db/dbModels';

export const buildingRouter = express();
const dbControl = new dbBuilding(pool);//exclusive to departments router

buildingRouter.post('/', (req, res, next) => {
    dbControl.getBuildings().then( data => res.json(data));
});

buildingRouter.post('/add', (req, res, next) => {
    const incData:dbm.IBuilding = {...req.body};

    //error checking
    if (typeof(incData.name) !== 'string' ||
        typeof(incData.departmentid) !== 'number'){
        return res.status(400).json({'error':'invalid data recieved'});
    }

    //do insert
    dbControl.addBuilding(incData)
    .then( () =>
    dbControl.getBuildings()
    .then( data => res.json(data)));
});