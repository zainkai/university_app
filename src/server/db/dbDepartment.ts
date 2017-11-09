import * as mysql from 'mysql';
import * as dbm from './dbModels';

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

    cleanInput(token:string) {
        token = token.replace(/ /g,"_");
        return mysql.escape(token);
    }

    getDepartments(){
        return new Promise<dbm.IDepartment[]>((resolve,reject) => {
            const funcQuery = `SELECT * FROM uni_department`;
            this.pool.query(funcQuery, (err,result,fields) => {
                err ? reject(err) : resolve(result);
            });
        });
    }

    addDepartment(data:dbm.IDepartment) {
        return new Promise<void>((resolve,reject) => {
            const funcQuery = `
            INSERT INTO uni_department (name,description) 
                values (${this.cleanInput(data.name)},
                        ${this.cleanInput(data.description || "")}
                );
            `;

            this.pool.query(funcQuery, (err,result,fields) => {
                err ? reject(err) : resolve(result);
            });
        });
    }

}