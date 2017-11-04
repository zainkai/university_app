import * as mysql from 'mysql';
import * as dbm from './dbModels';

export class dbController {
    pool:mysql.Pool;
    constructor(dbPool:mysql.Pool){
        this.pool= dbPool;
    }
    cleanInput(token:string) {
        return mysql.escape(token);
    }

    getDepartments() {
        let data:dbm.IDepartments[] = [];
        this.pool.query("SELECT * FROM uni_department", (err,result,fields) => {
            data = JSON.parse(result);
        });

        return data;
    }

    getBuildings() {
        let data:dbm.IDepartments[] = [];
        this.pool.query("SELECT * FROM uni_building", (err,result,fields) => {
            data = JSON.parse(result);
        });

        return data;
    }    

}