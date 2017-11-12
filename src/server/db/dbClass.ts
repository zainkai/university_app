import * as mysql from 'mysql';
import * as dbm from '../models/dbModel';
import * as APIModel from '../models/APIModel';

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

    getClass(id:number) {
        const funcQuery = `
        SELECT c.id, c.name, 
            c.starttime, c.endtime,
            c.buildingid, c.departmentid,
            d.name AS departmentName, b.name AS buildingName

            FROM uni_class c
            INNER JOIN uni_department d ON c.departmentid=d.id
            INNER JOIN uni_building b ON c.buildingid=b.id
        WHERE c.id=${this.cleanInput(id)}
        `;

        return new Promise<APIModel.IClassView>((resolve,reject) => {
            this.pool.query(funcQuery, (err,result,fields) => {
                err ? reject(err) : resolve(result);
            });
        });
    }

    // TODO: links for date formatting issue
    //https://www.npmjs.com/package/dateformat
    //https://www.npmjs.com/package/@types/dateformat
    getClasses() {
        const funcQuery = `
        SELECT c.id, c.name, 
            c.starttime, c.endtime,
            c.buildingid, c.departmentid,
            d.name AS departmentName, b.name AS buildingName

            FROM uni_class c
            INNER JOIN uni_department d ON c.departmentid=d.id
            INNER JOIN uni_building b ON c.buildingid=b.id
        `;

        return new Promise<APIModel.IClassView[]>((resolve,reject) => {
            this.pool.query(funcQuery, (err,result,fields) => {
                err ? reject(err) : resolve(result);
            });
        });
    }

    addClass(data:dbm.IClass) {
        const funcQuery =`
        INSERT INTO uni_class (name,starttime,endtime,buildingid,departmentid)
            values (${this.cleanInput(data.name)},
                    ${this.cleanInput(data.starttime)},
                    ${this.cleanInput(data.endtime)},
                    ${this.cleanInput(data.buildingid)},
                    ${this.cleanInput(data.departmentid)}
            );
        `;

        return new Promise<number>((resolve,reject)=>{
            this.pool.query(funcQuery,(err,result,fields)=> {
                err ? reject(err) : resolve(result.insertId);
            });
        });
    }
}