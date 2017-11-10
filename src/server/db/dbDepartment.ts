import * as mysql from 'mysql';
import * as dbm from '../models/dbModel';

export class dbDepartment {
    pool:mysql.Pool;
    constructor(dbPool:mysql.Pool){
        this.pool = dbPool;
        //this.dbConnect();
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

    getDepartment(id:number){
        const funcQuery = `
        SELECT * FROM uni_department
        WHERE id=${this.cleanInput(id)}
        `;

        return new Promise<dbm.IDepartment>((resolve,reject) => {
            this.pool.query(funcQuery,(err,result,fields) =>{
                err ? reject(err) : resolve(result);
            });
        });
    }

    getDepartments(){
        const funcQuery = `SELECT * FROM uni_department`;

        return new Promise<dbm.IDepartment[]>((resolve,reject) => {
            this.pool.query(funcQuery, (err,result,fields) => {
                err ? reject(err) : resolve(result);
            });
        });
    }

    addDepartment(data:dbm.IDepartment) {
        const funcQuery = `
        INSERT INTO uni_department (name,description) 
            values (${this.cleanInput(data.name)},
                    ${this.cleanInput(data.description || "")}
            );
        `;

        return new Promise<number>((resolve,reject) => {
            this.pool.query(funcQuery, (err,result,fields) => {
                err ? reject(err) : resolve(result.insertId);
            });
        });
    }

}