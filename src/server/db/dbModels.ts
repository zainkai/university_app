export interface IDepartments {
    id?: number,
    name: string, //not null & unique
    description?: string
};

export interface IBuildings {
    id: number,
    departmentId:number,//not null
    name:string,//not null & unique
    description?:string,
};