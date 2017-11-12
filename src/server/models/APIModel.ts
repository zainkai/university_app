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

export interface GenericOptions {
    id: number;
    name: string;
}

export interface DepartmentOptions extends GenericOptions {}

export interface BuildingOptions extends GenericOptions {}

export interface ClassOptions extends GenericOptions {}