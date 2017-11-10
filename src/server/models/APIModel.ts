import * as dbm from './dbModel';

export interface IBuildingsView extends dbm.IBuilding {
    departmentName:string;
};

export interface IdRequest{
    id:number
}

export interface IClassView extends dbm.IClass {
    departmentName:string;
    buildingName:string;
}