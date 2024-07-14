import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, catchError, map, of, startWith } from 'rxjs';
import { DataStateEnum, Employee, EmployeesDTO, Gender } from 'src/app/models/timesheet.model';
import { FtimesheetService } from 'src/app/services/ftimesheet.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  title:string="All the employees";
  employeesDTO!:EmployeesDTO;
  employeeTo!:Employee;
  employeeFormGroup!:FormGroup;
  readonly DataStateEnum=DataStateEnum;
  employeesDataState!:DataStateEnum;
  employeeToDataState:DataStateEnum=DataStateEnum.NONE
  genders=Object.values(Gender).filter(v=>isNaN(Number(v)));
  constructor(public timesheetService:FtimesheetService, private fb:FormBuilder){}

  ngOnInit(): void {
    this.getAllEmployees();
  }
  getAllEmployees(){
    this.employeesDataState=DataStateEnum.LOADING;
    this.timesheetService.getAllEmployees().subscribe({
      next:data=>{
        this.employeesDataState=DataStateEnum.LOADED;
        this.employeesDTO=data;
      }
    })
  }
  describe(employee: Employee) {
    this.employeeToDataState=DataStateEnum.LOADING;
    this.timesheetService.getEmployee(employee.employeeID).subscribe({
      next:data=>{
        this.employeeToDataState=DataStateEnum.LOADED
        this.employeeTo=data;
      },error:err=>{
        console.log(err)
      }
    })
    
  }
  getNewEmployee(){    
    this.timesheetService.getNewEmployee().subscribe({
      next:newemployee=>{
        this.employeeToDataState=DataStateEnum.ADDNEW;
        this.employeeTo=newemployee;
        this.employeeFormGroup=this.fb.group({
          employeeID:this.fb.control(""),
          name:this.fb.control(""),
          postName:this.fb.control(""),
          nickName:this.fb.control(""),
          mail:this.fb.control(""),
          phoneNumber:this.fb.control(""),
          supervisorID:this.fb.control(""),
          gender:this.fb.control(""),
          position:this.fb.control("")
        })
      },error:err=>alert("Can not get a new user")
    })
  }
  saveEmployee(){
    this.employeeToDataState=DataStateEnum.NONE;
    this.employeesDataState=DataStateEnum.LOADING
    this.timesheetService.saveEmployee(this.employeeFormGroup.value).subscribe({
      next:data=>{
        this.employeesDataState=DataStateEnum.LOADED
        this.employeesDTO=data
      }
    })
  }
  editEmployee(employee:Employee){    
    this.timesheetService.getEmployee(employee.employeeID).subscribe({
      next:employeeto=>{
        this.employeeToDataState=DataStateEnum.EDITING;
        this.employeeTo=employeeto;
        this.employeeFormGroup=this.fb.group({
          id:this.fb.control(employeeto.id),
          employeeID:this.fb.control(employeeto.employeeID),
          name:this.fb.control(employeeto.name),
          postName:this.fb.control(employeeto.postName),
          nickName:this.fb.control(employeeto.nickName),
          mail:this.fb.control(employeeto.mail),
          phoneNumber:this.fb.control(employeeto.phoneNumber),
          supervisorID:this.fb.control(employeeto.supervisorID),
          gender:this.fb.control(employeeto.gender),
          position:this.fb.control(employeeto.position),
          otherWorkedHours:this.fb.control(employeeto.otherWorkedHours)
        })
      }, error:err=>console.log("Can not be done !")
    })
  }
  deleteEmployee(employee:Employee){
    if(confirm("Do you want to delete the employee "+employee.name+' '+employee.postName+' '+employee.nickName+'?')){
      this.employeeToDataState=DataStateEnum.NONE;
      this.employeesDataState=DataStateEnum.LOADING
      this.timesheetService.deleteEmployee(employee.employeeID).subscribe({
        next:data=>{
          this.employeesDataState=DataStateEnum.LOADED
          this.employeesDTO=data;
        }
      })
    }
  }
  updateEmployee(){
    this.employeeToDataState=DataStateEnum.NONE;
    this.timesheetService.updateEmployee(this.employeeFormGroup.value).subscribe({
      next:data=>{
        this.employeesDataState=DataStateEnum.LOADED
        this.employeesDTO=data;
      }
    })
  }
    
}
