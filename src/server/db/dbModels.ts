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

export interface IdRequest{
    id:number
}