import * as mysql from 'mysql';
import * as dbm from './dbModels';

//generic DB controller
export class dbController {
    pool:mysql.Pool;
    constructor(dbPool:mysql.Pool){
        this.pool = dbPool;
        this.dbConnect();
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
            token = token.replace(/ /g,"_");
        }
        return mysql.escape(token);
    } 
}