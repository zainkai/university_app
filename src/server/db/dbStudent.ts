import * as mysql from 'mysql';
import * as dbm from '../models/dbModel';
import * as APIModel from '../models/APIModel';

export class dbStudent {
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

    getStudent(id:number){
        const funcQuery = `
        SELECT *,
            (SELECT COUNT(id) FROM uni_class_enrollment WHERE studentid=s.id) AS classCount
        FROM uni_student
        WHERE id=${this.cleanInput(id)}
        `;

        return new Promise<APIModel.IStudentView>((resolve,reject) => {
            this.pool.query(funcQuery, (err,result,fields) => {
                err ? reject(err) : resolve(result);
            });
        });
    }

    getStudents(){
        const funcQuery = `
        SELECT *,
            (SELECT COUNT(id) FROM uni_class_enrollment WHERE studentid=s.id) AS classCount
        FROM uni_student s
        `;

        return new Promise<APIModel.IStudentView[]>((resolve,reject) => {
            this.pool.query(funcQuery, (err,result,fields) => {
                err ? reject(err) : resolve(result);
            });
        });
    }

    addStudent(data:dbm.IStudent){
        const funcQuery = `
        INSERT INTO uni_student (firstname,lastname)
            values(
                ${this.cleanInput(data.firstname)}
                ${this.cleanInput(data.lastname)}
            );`;

        return new Promise<number>((resolve,reject)=>{
            this.pool.query(funcQuery,(err,result,fields)=> {
                err ? reject(err) : resolve(result.insertId);
            });
        });
    }

    updateStudent(target: dbm.IStudent){
        const funcQuery = `
        UPDATE uni_student
            SET firstname=${this.cleanInput(target.firstname)},
                lastname=${this.cleanInput(target.lastname)}
        WHERE id=${this.cleanInput(target.id)}`;

        return new Promise<number>((resolve,reject)=>{
            this.pool.query(funcQuery,(err,result,fields)=> {
                err ? reject(err) : resolve(result.changedRows);
            });
        });
    }

    deleteStudent(target: dbm.IStudent){
        const funcQuery =`DELETE FROM uni_student WHERE id=${this.cleanInput(target.id)}`;

        return new Promise<number>((resolve,reject)=>{
            this.pool.query(funcQuery,(err,result,fields)=> {
                err ? reject(err) : resolve(result.affectedRows);
            });
        });
    }
}