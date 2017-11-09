export interface IDepartment {
    id?: number,
    name: string, //not null & unique
    description?: string
};

export interface IBuilding {
    id?: number,
    departmentId:number,//not null
    name:string,//not null & unique
    description?:string,
};