export interface Employee{
    id?:number;
    name?:string;
    address:string;
    mobile:number;
}
export interface GetEmployeePagination{
    data:Employee[];
}