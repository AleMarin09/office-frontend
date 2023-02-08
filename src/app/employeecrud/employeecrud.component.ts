import { HttpClient } from '@angular/common/http';
import { Component,Input,OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from './employee.interface';
import { EmployeeService } from './employee.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-employeecrud',
  templateUrl: './employeecrud.component.html',
  styleUrls: ['./employeecrud.component.css']
})
export class EmployeecrudComponent implements OnInit {

  EmployeeArray:any[]=[];
  isResulLoaded = false;
  isUpdateFormActive =false;
  @Input()status:boolean=true;

  loading:boolean=false;

  employee:Employee[]=[];
  saveSubs!:Subscription;
  formEmployee: FormGroup = this.fb.group({
    name: [''],
    address:[''],
    mobile:[0]
  })

  currentEmployeeID="";

  constructor(private http: HttpClient ,
     private fb: FormBuilder,
     public employeService: EmployeeService
     ){
    this.getAllEmployee();
    
  }

  ngOnInit(): void{
    this.getAllEmployee();
    console.log(this.employee)
    this.saveSubs=this.employeService.save.subscribe(saving=>{
      this.getAllEmployee();
    })

  }

  getAllEmployee(){
    this.loading=true
    this.employeService.getEmployee()
    
    .subscribe({
      next:(res)=>{ //paginacion en el next
        
        this.employee=res.data;
        console.log(res)
    

      },
      complete:()=>{
        this.loading=false;
      }
    })
  }

  
  setUpdate(data:Employee){
   this.employeService.isEdit=true;
   this.employeService.edit.emit(data);
   this.employeService.isCreate=true;
  }

  
}
