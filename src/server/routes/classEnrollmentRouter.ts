import * as express from 'express';
import { dbClassEnrollment } from '../db/dbClassEnrollment'; 
import { pool } from '../db/protected/dbcon-dev';
import * as dbm from '../models/dbModel';
import * as APIModel from '../models/APIModel';

export const classEnrollmentRouter = express();
const dbControl = new dbClassEnrollment(pool);//exclusive to departments router

classEnrollmentRouter.get('/', (req, res, next) => {
    res.render('enrollments.html');
});

classEnrollmentRouter.post('/',(req,res,next)=> {
    dbControl.getClassEnrollments().then(data => res.json(data));
});

classEnrollmentRouter.post('/get',(req,res,next)=> {
    const incData:APIModel.IdRequest = {...req.body};
    dbControl.getClassEnrollment(incData.id).then(data => res.json(data));
});

classEnrollmentRouter.post('/add',(req,res,next)=> {
    const incData:dbm.IClassEnrollment = {...req.body};
    incData.classid = Number(incData.classid);
    incData.studentid = Number(incData.studentid);

    //error checking
    if(typeof(incData.classid) !== 'number' ||
       typeof(incData.studentid) !== 'number'){
        return res.status(400).json({'error':'invalid data recieved'});
    }

    dbControl.addClassEnrollment(incData)
    .then( id =>
    dbControl.getClassEnrollment(id)
    .then(data => res.json(data)));
});

classEnrollmentRouter.post('/delete',(req,res,next) => {
    const incData:dbm.IClassEnrollment = {...req.body};
    
    //error checking
    if(typeof(incData.classid) !== 'number' ||
        typeof(incData.studentid) !== 'number'){
        return res.status(400).json({'error':'invalid data recieved'});
    }

    dbControl.deleteClassEnrollment(incData)
    .then( data => res.json({"affectedRows":data}));
});

//if deleting a student use this first
classEnrollmentRouter.post('/deleteenrollment',(req,res,next)=> {
    const incData:dbm.IStudent = {...req.body};
    incData.id = Number(incData.id);

    if (typeof(incData.id) !== 'number'){
        return res.status(400).json({'error':'invalid data recieved'});
    }

    dbControl.deleteEnrollmentStudent(incData)
    .then( data => res.json({"affectedRows":data}));
});


