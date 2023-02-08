import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Employee } from '../employee.interface';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-modalemployee',
  templateUrl: './modalemployee.component.html',
  styleUrls: ['./modalemployee.component.css']
})
export class ModalemployeeComponent implements OnInit, OnDestroy {
  public editUse!:Subscription
  loading:boolean=false;
  formEmployee: FormGroup = this.fb.group({
    id:[''],
    name: [''],
    address:[''],
    mobile:[0]
  })
  constructor(
    private fb: FormBuilder,
    public employeService: EmployeeService
    ){

   
 }
 ngOnInit(): void {
   this.editUse=this.employeService.edit
   .subscribe((res:Employee)=>{
    this.formEmployee.reset({
      id:res.id,
      name:res.name,
      address:res.address,
      mobile:res.mobile
    })
   })
 }
 ngOnDestroy(): void {
   this.editUse.unsubscribe();
 }
 register(){
  
  this.formEmployee.markAllAsTouched();
  if(this.formEmployee.invalid){
    return;
  }
  this.loading=true;
  let dataEmployee:Employee={
    name:this.formEmployee.get('name')?.value,
    address:this.formEmployee.get('address')?.value,
    mobile:this.formEmployee.get('mobile')?.value,
  }
  this.employeService.saveEmployee(dataEmployee).subscribe({
    next:(res)=>{
      this.loading=false;
      this.resetEmployee();
    },
    complete:()=>{
      this.employeService.save.emit(true);
      Swal.fire({
        title:'Register Usefull',
        text:'User Created Successfully',
        icon:'success'
      })
      console.log('user created')


    },
    error:(e)=>{
      this.resetEmployee();
      Swal.fire({
        title:'Error',
        text:'User cant register',
        icon:'error'
      })
    }
  })
  
}

 update(){
  this.formEmployee.markAllAsTouched();
  if(this.formEmployee.invalid){
    return;
  }
  this.loading=true;
  let dataEmployee:Employee={
    name:this.formEmployee.get('name')?.value,
    address:this.formEmployee.get('address')?.value,
    mobile:this.formEmployee.get('mobile')?.value,
  }
  this.employeService.updateEmployee(dataEmployee,this.formEmployee.get('id')?.value).subscribe({
    next:(res)=>{
      this.loading=false;
      this.resetEmployee();
    },
    complete:()=>{
      this.employeService.save.emit(true);
      Swal.fire({
        title:'Register Usefull',
        text:'User Updated Successfully',
        icon:'success'
      })
      console.log('user created')


    },
    error:(e)=>{
      this.resetEmployee();
      Swal.fire({
        title:'Error',
        text:'User cant update',
        icon:'error'
      })
    }
  })
}

resetEmployee(){
  this.formEmployee.reset({
    name:'',
    address:'',
    mobile:0
  })
}
}
