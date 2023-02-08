import { enviroment } from "src/environments/enviroment";
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee, GetEmployeePagination } from "./employee.interface";
import { flatMap, Observable } from "rxjs";

const baseUrl = enviroment.baseUrl;
@Injectable({
    providedIn:'root'

})
export class EmployeeService  {
    public save:EventEmitter<boolean>=new EventEmitter<boolean>();
    public edit:EventEmitter<Employee>=new EventEmitter<Employee>();
    _employeeUpdate: boolean = false;
    _emploeyeeCreated: boolean=false;
    constructor(
        private http: HttpClient
    ){}
    set isEdit(isEdit: boolean){
        this._employeeUpdate=isEdit;
    }
    set isCreate(isCreate: boolean){
        this._emploeyeeCreated=isCreate;
    }
    getEmployee():Observable<GetEmployeePagination>{
        const url=`${baseUrl}/employees`;
        return this.http.get<GetEmployeePagination>(url);
    }
    saveEmployee(employee:Employee ){
        const url=`${baseUrl}/save`;
        return this.http.post(url,employee);
    }
    updateEmployee(employee:Employee, idEmployee:number){
        const url=`${baseUrl}/update/${idEmployee}`;
        return this.http.put(url,employee)
    }

}