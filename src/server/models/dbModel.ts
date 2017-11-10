export interface IDepartment {
    id?: number,
    name: string, //not null & unique
    description?: string
};

export interface IBuilding {
    id?: number,
    departmentid:number,//not null
    name:string,//not null & unique
    description?:string,
};

export interface IClass {
    id?:number,
    name:string,
    starttime:string,
    endtime:string,
    buildingid:number,
    departmentid:number
}