import * as mysql from 'mysql';
import * as dbm from '../models/dbModels';

interface IBuildingsView extends dbm.IBuilding {
    departmentName:string;
};

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

    cleanInput(token:any) {
        if(typeof(token) === 'string'){
            token = token.toLocaleLowerCase();
            token = token.replace(/ /g,"_");
        }
        return mysql.escape(token);
    }

    getBuilding(id:number){
        const funcQuery = `
        SELECT b.id, b.departmentid, b.name, b.description, d.name AS departmentName
            FROM uni_building b
            INNER JOIN uni_department d ON b.departmentid=d.id    
        WHERE b.id=${this.cleanInput(id)}
        `;

        return new Promise<IBuildingsView[]>((resolve,reject) => {
            this.pool.query(funcQuery, (err,result,fields) => {
                err ? reject(err) : resolve(result);
            });
        });
    }

    getBuildings(){
        const funcQuery = `
        SELECT b.id, b.departmentid, b.name, b.description, d.name AS departmentName
            FROM uni_building b
            INNER JOIN uni_department d ON b.departmentid=d.id    
        `;

        return new Promise<IBuildingsView[]>((resolve,reject) => {
            this.pool.query(funcQuery, (err,result,fields) => {
                err ? reject(err) : resolve(result);
            });
        });
    }

    addBuilding(data:dbm.IBuilding){
        const funcQuery = `
        INSERT INTO uni_building (name,description,departmentid) 
            values (${this.cleanInput(data.name)},
                    ${this.cleanInput(data.description || "")},
                    ${this.cleanInput(data.departmentid)}
            );
        `;

        return new Promise<number>((resolve,reject) => {
            this.pool.query(funcQuery, (err,result,fields) => {
                err ? reject(err) : resolve(result.insertId);
            });
        });
    }

}