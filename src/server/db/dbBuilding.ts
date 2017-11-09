import * as mysql from 'mysql';
import * as dbm from './dbModels';

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

    cleanInput(token:string) {
        token = token.replace(/ /g,"_");
        return mysql.escape(token);
    }

    getBuildings(){
        return new Promise<IBuildingsView[]>((resolve,reject) => {
            const funcQuery = `
            SELECT b.id, b.departmentid, b.name, b.description, d.name AS departmentName
                FROM uni_building b
                INNER JOIN uni_department d ON b.departmentid=d.id    
            `;
            this.pool.query(funcQuery, (err,result,fields) => {
                err ? reject(err) : resolve(result);
            });
        });
    }

    addBuilding(data:dbm.IBuilding){
        return new Promise<void>((resolve,reject) => {
            const funcQuery = `
            INSERT INTO uni_building (name,description,departmentid) 
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