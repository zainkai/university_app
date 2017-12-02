import * as mysql from 'mysql';
import * as dbm from '../models/dbModel';
import * as APIModel from '../models/APIModel';

export class dbClassEnrollment {
    pool:mysql.Pool;
    constructor(dbPool:mysql.Pool){
        this.pool = dbPool;
    }

    dbConnect(){
        this.pool.getConnection((err) => {
            if (err){
                throw err;
            } else {
                console.log("connected to db");
            }
        });
    }

    dbDisconnect(){
        this.pool.end((err) => {
            if (err){
                throw err;
            } else {
                console.log("disconnected from db");
            }
        });
    }

    cleanInput(token:any) {
        if(typeof(token) === 'string'){
            token = token.toLocaleLowerCase();
            token = token.replace(/ /g,"_");
        }
        return mysql.escape(token);
    }

    getClassEnrollment(studentid:number){
        const funcQuery = `
        SELECT ce.studentid AS studentid, ce.classid AS classid,
            s.firstname AS studentFirstName, s.lastname AS studentLastName,
            c.name AS className,ce.id AS id
        FROM uni_class_enrollment ce
            INNER JOIN uni_class c ON ce.classid=c.id
            INNER JOIN uni_student s ON ce.studentid=s.id
        WHERE s.id=${this.cleanInput(studentid)}
        `;

        return new Promise<APIModel.IClassEnrollmentView[]>((resolve,reject) => {
            this.pool.query(funcQuery, (err,result,fields) => {
                err ? reject(err) : resolve(result);
            });
        });
    }

    getClassEnrollments(){
        const funcQuery = `
        SELECT ce.studentid AS studentid, ce.classid AS classid,
            s.firstname AS studentFirstName, s.lastname AS studentLastName,
            c.name AS className,ce.id AS id
        FROM uni_class_enrollment ce
            INNER JOIN uni_class c ON ce.classid=c.id
            INNER JOIN uni_student s ON ce.studentid=s.id
        `;

        return new Promise<APIModel.IClassEnrollmentView[]>((resolve,reject) => {
            this.pool.query(funcQuery, (err,result,fields) => {
                err ? reject(err) : resolve(result);
            });
        });
    }

    addClassEnrollment(data:dbm.IClassEnrollment){
        const funcQuery = `
        INSERT INTO uni_class_enrollment (studentid,classid)
            values(
                ${this.cleanInput(data.studentid)},
                ${this.cleanInput(data.classid)}
            );`;

        return new Promise<number>((resolve,reject)=>{
            this.pool.query(funcQuery,(err,result,fields)=> {
                err ? reject(err) : resolve(result.insertId);
            });
        });
    }

    deleteClassEnrollment(target: dbm.IClassEnrollment){
        const funcQuery = `DELETE FROM uni_class_enrollment WHERE id=${this.cleanInput(target.id)}`;

        return new Promise<number>((resolve,reject)=>{
            this.pool.query(funcQuery,(err,result,fields)=> {
                err ? reject(err) : resolve(result.affectedRows);
            });
        });
    }

    deleteEnrollmentStudent(target: dbm.IStudent){
        const funcQuery = `
            DELETE FROM uni_class_enrollment 
            WHERE studentid=${this.cleanInput(target.id)}`;
        
        return new Promise<number>((resolve,reject)=>{
            this.pool.query(funcQuery,(err,result,fields)=> {
                err ? reject(err) : resolve(result.affectedRows);
            });
        });
    }

}