import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, catchError, map, of, startWith } from 'rxjs';
import { DataStateEnum, Employee, EmployeeDataState, EmployeeStateEnum, Gender, Position } from 'src/app/models/timesheet.model';
import { FtimesheetService } from 'src/app/services/ftimesheet.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  title:string="All the employees";
  employees?:Observable<EmployeeDataState<Employee[]>>|null;
  employeeTo!:Employee;
  employeeFormGroup!:FormGroup;
  readonly DataStateEnum=DataStateEnum;
  readonly EmployeeStateEnum=EmployeeStateEnum;
  employeeStateEnum!:EmployeeStateEnum;
  genders=Object.values(Gender).filter(v=>isNaN(Number(v)));
  positions=Object.values(Position).filter(v=>isNaN(Number(v)));

  constructor(public timesheetService:FtimesheetService, private fb:FormBuilder){}

  ngOnInit(): void {
    this.getAllEmployees();
  }
  getAllEmployees(){
    this.employeeStateEnum=EmployeeStateEnum.NONE;
    this.employees=this.timesheetService.getAllEmployees().pipe(
      map(data=>({dataState:DataStateEnum.LOADED,employs:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }
  describe(employee: Employee) {
    this.timesheetService.getEmployee(employee.id).subscribe({
      next:employeeto=>{
        this.employeeStateEnum=EmployeeStateEnum.READ;
        this.employeeTo=employeeto;
      },error:err=>alert("Can not describe the employee")
    })
    
  }
  getNewEmployee(){    
    this.timesheetService.getNewEmployee().subscribe({
      next:newemployee=>{
        this.employeeStateEnum=EmployeeStateEnum.ADDNEW;
        this.employeeTo=newemployee;
        this.employeeFormGroup=this.fb.group({
          id:this.fb.control(""),
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
    this.employeeStateEnum=EmployeeStateEnum.NONE;
    this.employees=this.timesheetService.saveEmployee(this.employeeFormGroup.value).pipe(
      map(data=>({dataState:DataStateEnum.LOADED,employs:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }
  editEmployee(employee:Employee){    
    this.timesheetService.getEmployee(employee.id).subscribe({
      next:employeeto=>{
        this.employeeStateEnum=EmployeeStateEnum.EDIT;
        this.employeeTo=employeeto;
        this.employeeFormGroup=this.fb.group({
          id:this.fb.control(employeeto.id),
          name:this.fb.control(employeeto.name),
          postName:this.fb.control(employeeto.postName),
          nickName:this.fb.control(employeeto.nickName),
          mail:this.fb.control(employeeto.mail),
          phoneNumber:this.fb.control(employeeto.phoneNumber),
          supervisorID:this.fb.control(employeeto.supervisorID),
          gender:this.fb.control(employeeto.gender),
          position:this.fb.control(employeeto.position)
        })
      }, error:err=>alert("Can not be done !")
    })
  }
  deleteEmployee(employee:Employee){
    if(confirm("Do you want to delete the employee "+employee.name+' '+employee.postName+' '+employee.nickName+'?')){
      this.employeeStateEnum=EmployeeStateEnum.NONE;
      this.employees=this.timesheetService.deleteEmployee(employee.id).pipe(
        map(data=>({dataState:DataStateEnum.LOADED,employs:data})),
        startWith({dataState:DataStateEnum.LOADING}),
        catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
      );
    }
  }
  updateEmployee(){
    this.employeeStateEnum=EmployeeStateEnum.NONE;
    this.employees=this.timesheetService.updateEmployee(this.employeeFormGroup.value).pipe(
      map(data=>({dataState:DataStateEnum.LOADED,employs:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }
    
}
