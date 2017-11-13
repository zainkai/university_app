import * as express from 'express';
import { dbClassEnrollment } from '../db/dbClassEnrollment'; 
import { dbStudent } from '../db/dbStudent';
import { pool } from '../db/protected/dbcon-dev';
import * as dbm from '../models/dbModel';
import * as APIModel from '../models/APIModel';
import { json } from 'express';

export const studentRouter = express();
const dbControl = new dbStudent(pool);
const dbControlCE = new dbClassEnrollment(pool);

studentRouter.post('/',(req,res,next) => {
    dbControl.getStudents().then(data => res.json(data));
});

studentRouter.post('/get',(req,res,next) => {
    let studentData:APIModel.IStudentView;
    const incData:APIModel.IdRequest = {...req.body};
    
    const p1 = dbControl.getStudent(incData.id);
    const p2 = dbControlCE.getClassEnrollment(incData.id);

    Promise.all([p1,p2]).then(data => {
        studentData = data[0];
        studentData.classes = data[1];
        console.log(studentData);
        res.json(studentData);
    });
});