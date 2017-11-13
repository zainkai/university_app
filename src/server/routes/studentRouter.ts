import * as express from 'express';
import { dbStudent } from '../db/dbStudent';
import { pool } from '../db/protected/dbcon-dev';
import * as dbm from '../models/dbModel';
import * as APIModel from '../models/APIModel';
import { json } from 'express';

export const studentRouter = express();
const dbControl = new dbStudent(pool);

studentRouter.post('/',(req,res,next) => {
    dbControl.getStudents().then(data => res.json(data));
});

studentRouter.post('/get',(req,res,next) => {
    const incData:APIModel.IdRequest = {...req.body};
    
    //note: promise.all doesnt work well with funcs that can possibly fail
    dbControl.getStudent(incData.id).then(data =>
        res.json(data)
    );
});

studentRouter.post('/add',(req,res,next) => {
    const incData:dbm.IStudent = {...req.body};

    if (typeof(incData.firstname) !== 'string' ||
        typeof(incData.lastname) !== 'string' ){
        return res.status(400).json({'error':'invalid data recieved'});
    }

    dbControl.addStudent(incData)
    .then(id => 
    dbControl.getStudent(id))
    .then(data => res.json(data));

});

studentRouter.post('/update',(req,res,next) => {
    const incData:dbm.IStudent = {...req.body};

    if (typeof(incData.firstname) !== 'string' ||
        typeof(incData.lastname) !== 'string' ){
        return res.status(400).json({'error':'invalid data recieved'});
    }

    dbControl.updateStudent(incData).then( data => res.json({"changedRows":data}));
});


//use delete all students class enrollment before this function.
studentRouter.post('/delete',(req,res,next)=> {
    const incData:dbm.IStudent = {...req.body};
    
    if (typeof(incData.firstname) !== 'string' ||
        typeof(incData.lastname) !== 'string' ){
        return res.status(400).json({'error':'invalid data recieved'});
    }

    dbControl.deleteStudent(incData).then( data => res.json({"affectedRows":data}));
});