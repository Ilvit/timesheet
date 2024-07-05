import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataStateEnum, Employee, EmployeesDTO, Vacation, VacationDTO } from 'src/app/models/timesheet.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FtimesheetService } from 'src/app/services/ftimesheet.service';

@Component({
  selector: 'app-vacations',
  templateUrl: './vacations.component.html',
  styleUrls: ['./vacations.component.css']
})
export class VacationsComponent implements OnInit {

  vacationFormGroup!:FormGroup;
  employeesDTO!:EmployeesDTO;
  vacation!:Vacation;
  vacationDTO!:VacationDTO;
  vacationDataState!:DataStateEnum;
  employeesDataState!:DataStateEnum;
  employeeID!:string;
  readonly DataStateEnum=DataStateEnum;

  constructor(private timesheetService: FtimesheetService, private fb:FormBuilder){}

  ngOnInit(): void {
    this.getAllEmployees();
  }
  getAllVacations(employeeID:string){
    this.vacationDataState=DataStateEnum.LOADING;
    this.timesheetService.getAllVacations(employeeID).subscribe({
      next:data=>{
        this.vacationDataState=DataStateEnum.LOADED;
        this.vacationDTO=data;        
      }, error:err=>alert("Can not get vacations")
    })
  }
  getAllEmployees(){
    this.employeesDataState=DataStateEnum.LOADING;
    this.timesheetService.getAllEmployees().subscribe({
      next:data=>{
        this.employeesDataState=DataStateEnum.LOADED;
        this.employeesDTO=data;
      },error:err=>alert("can not get employees")
    })
  }
  getNewVacation(employee:Employee){
    this.timesheetService.getNewVacation().subscribe({
      next:data=>{
        this.vacationDataState=DataStateEnum.ADDNEW;
        this.employeeID=employee.employeeID;
        this.vacation=data;
        this.vacationFormGroup=this.fb.group({
          startDate:this.fb.control(this.vacation.startDate),
          daysTaken:this.fb.control(""),
          employeeID:this.fb.control(employee.employeeID)
        })
      },error:err=>alert(err)
    })
  }
  saveVacation(){
    if(this.vacationFormGroup.value['daysTaken']>0){
      if(confirm('Are you sure to save ?')){
        this.vacationDataState=DataStateEnum.LOADING;
        this.timesheetService.saveVacation(this.vacationFormGroup.value).subscribe({
        next:data=>{
          this.vacationDataState=DataStateEnum.LOADED;
          this.vacationDTO=data;
        },error:err=>console.log("Can not save")
      })
      }
    }    
  }
  deleteVacations(){
    
  }
}
