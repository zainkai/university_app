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

export interface IStudent {
    id?:number,
    firstname:string,
    lastname:string,
    fullname?:string
}

export interface IClassEnrollment {
    id?:number,
    studentid:number,
    classid:number
}