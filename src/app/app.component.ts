import { Component } from '@angular/core';
import { EmployeeService } from './employeecrud/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  status:boolean=true;
  title = 'office-frontend';
  constructor(public employeeService: EmployeeService ){
     
  }
  showModalOpen(){
    this.employeeService.isEdit=false;
    this.employeeService.isCreate=true;
  }
}
