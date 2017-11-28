import * as express from 'express';
import { dbDepartment } from '../db/dbDepartment';
import { dbBuilding} from '../db/dbBuilding';
import { pool } from '../db/protected/dbcon-dev';
import * as dbm from '../models/dbModel';
import * as APIModel from '../models/APIModel';

export const buildingRouter = express();
const dbControl = new dbBuilding(pool);//exclusive to departments router

buildingRouter.get('/',(req,res,next) => {
    res.render('buildings.html');
});

buildingRouter.post('/', (req, res, next) => {
    dbControl.getBuildings().then( data => res.json(data));
});

buildingRouter.post('/get', (req, res, next) => {
    const incData:APIModel.IdRequest = {...req.body};
    dbControl.getBuilding(incData.id).then( data => res.json(data));
});

buildingRouter.post('/add', (req, res, next) => {
    const incData:dbm.IBuilding = {...req.body};
    incData.departmentid = Number(incData.departmentid);

    console.log(incData);

    //error checking
    if (typeof(incData.name) !== 'string' ||
        typeof(incData.departmentid) !== 'number'){
        return res.status(400).json({'error':'invalid data recieved'});
    }

    //do insert
    dbControl.addBuilding(incData)
    .then( (id) =>
    dbControl.getBuilding(id)
    .then( data => res.json(data)));
});

buildingRouter.post('/options',(req,res,next) =>{
    dbControl.listBuildingOptions().then(data => res.json(data));
});