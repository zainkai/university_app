import * as mysql from 'mysql';
import * as dbm from './dbModels';

export class dbBuilding{
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

    cleanInput(token:string) {
        return mysql.escape(token);
    }

    getBuildings(){
        return new Promise<dbm.IBuildings[]>((resolve,reject) => {
            const funcQuery = "SELECT * FROM uni_building";
            this.pool.query(funcQuery, (err,result,fields) => {
                err ? reject(err) : resolve(result);
            });
        });
    }

}