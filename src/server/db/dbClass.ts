import * as mysql from 'mysql';
import * as dbm from '../models/dbModel';

export class dbClass {
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
}