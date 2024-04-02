import { KeyValuePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, catchError, map, max, of, startWith } from 'rxjs';
import { AppDataState, DataStateEnum, PeriodState, TimesheetDTO, TimesheetState } from 'src/app/models/timesheet.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FtimesheetService } from 'src/app/services/ftimesheet.service';

@Component({
  selector: 'app-faradja-timesheet',
  templateUrl: './faradja-timesheet.component.html',
  styleUrls: ['./faradja-timesheet.component.css']
})
export class FaradjaTimesheetComponent implements OnInit{

  readonly DataStateEnum=DataStateEnum;
  tsDTO!:TimesheetDTO;
  period!:string;
  timesheetState!:TimesheetState
  periodStates!:PeriodState[];
  activeTimesheetState:boolean=false;
  
  constructor(private timesheetService:FtimesheetService, private fb:FormBuilder, public authService:AuthenticationService){}

  ngOnInit(): void {        
    this.getTimesheetState();    
  }
  getTimesheetState(){
    this.timesheetService.getTimesheetState(this.authService.employeeID).subscribe({
      next:data=>{
        this.activeTimesheetState=true;    
        this.timesheetState=data;     
        this.periodStates=data.periodStates;      
      }, error:err=>alert(err)
    })
  }
  getTimesheet(){
    this.timesheetService.getTimesheet(this.period,this.authService.employeeID).subscribe({
      next:data=>{
        this.tsDTO=data;
        this.activeTimesheetState=false;
        this.period=data.timesheetPeriod;       
        
      }, error:err=>alert(err)
    })
  }
  getTimesheetByPeriod(per:string){
    this.timesheetService.getTimesheet(per, this.authService.employeeID).subscribe({
      next:data=>{
        this.activeTimesheetState=false; 
        this.tsDTO=data;
        this.period=data.timesheetPeriod;      
       
      }, error:err=>alert(err)
    })
  }
  getNewHolidaysLine(){    
    let selPro=(document.getElementById("selpro2") as HTMLSelectElement).value;
    if(this.tsDTO?.hdProjects.includes(selPro)){
      alert("A holiday timesheetline exists for "+selPro+" project");
    }else {
      this.timesheetService.getNewTimesheetLine(this.period,selPro, this.authService.employeeID,"PUBHDCH-24").subscribe({
        next:data=>{
          this.tsDTO=data;
        }
      })
    }    
  }  
  getNewRegularDaysLine(){
    let selPro=(document.getElementById("selpro") as HTMLSelectElement).value;
    if(this.tsDTO?.rdProjects.includes(selPro)){
      alert("A regular day timesheetline exists for "+selPro+" project");
    }else{      
      this.timesheetService.getNewTimesheetLine(this.period, selPro ,this.authService.employeeID,"BUSDCH-24").subscribe({
        next:data=>{
          this.tsDTO=data;          
        },error:err=>alert("there is an error")
      })
    }   
  }
  getNewVacationDaysLine(){
    let selPro=(document.getElementById("selpro3") as HTMLSelectElement).value;
    if(this.tsDTO.vdProjects.includes(selPro)){
      alert("vacation-days timesheetline exists for "+selPro+" project");
    }else{
      this.timesheetService.getNewTimesheetLine(this.period, selPro ,this.authService.employeeID,"VACDCH-24").subscribe({
        next:data=>{
          this.tsDTO=data;
        },error:err=>alert("there is an error")
      })
    }   
  }
  
  deleteHolidaysLine(){
    if(confirm("Do you want to delete Holidays of all the projects ?")){
      this.timesheetService.deleteTimesheetLine(this.period, this.authService.employeeID,"PUBHDCH-24").subscribe({
        next:data=>{          
          this.tsDTO=data;
        }
      })
    }    
  }
  deleteRegularDaysLine(){
    if(confirm("Do you want to delete Regular-days of all the projects ?")){
      this.timesheetService.deleteTimesheetLine(this.period, this.authService.employeeID,"BUSDCH-24").subscribe({
        next:data=>{          
          this.tsDTO=data;
        }
      })
    }    
  }
  deleteVacationDaysLine(){
    if(confirm("Do you want to delete Vacation-days of all the projects ?")){
      this.timesheetService.deleteTimesheetLine(this.period, this.authService.employeeID,"VACDCH-24").subscribe({
        next:data=>{          
          this.tsDTO=data;
        }
      })
    }    
  }
  deleteProjectRegularDaysLine(projectName:string){
    if(confirm("DO you want to delete the "+projectName+" PROJECT Regular timesheet-line ?")){
      this.timesheetService.deleteProjectTimesheetLine(this.period, projectName, this.authService.employeeID,"BUSDCH-24").subscribe({
        next:data=>{
          this.tsDTO=data;
        }
      })
    }    
  }
  deleteProjectVacationDaysLine(projectName:string){
    if(confirm("DO you want to delete the "+projectName+" PROJECT Vacation timesheet-line ?")){
      this.timesheetService.deleteProjectTimesheetLine(this.period, projectName, this.authService.employeeID,"VACDCH-24").subscribe({
        next:data=>{
          this.tsDTO=data;
        }
      })
    }    
  }
  deleteProjectHolidaysLine(projectName:string){
    if(confirm("Do you want to delete the "+projectName+" PROJECT Holiday timesheet-line ?")){
      this.timesheetService.deleteProjectTimesheetLine(this.period, projectName, this.authService.employeeID,"PUBHDCH-24").subscribe({
        next:data=>{
          this.tsDTO=data;
        }
      })
    }    
  }
  getNewTimesheet(){
    this.timesheetState.canAddNewTimesheet=false;
    this.timesheetService.getNewTimesheet(this.authService.employeeID).subscribe({
      next:data=>{
        this.activeTimesheetState=false;        
        this.tsDTO=data;
        this.period=data.timesheetPeriod;
        this.periodStates=data.periodStates;
      }, error:err=>{
        alert("Can not load timesheet");
      }
    })
  } 

  saveTimesheet() {
    this.timesheetService.saveTimesheet(this.period, this.tsDTO!).subscribe({
      next:data=>{ 
        this.tsDTO=data;
        this.period=data.timesheetPeriod;
      },error:err=>alert(err)
    }) 
  }      

  deleteTimesheet(){
    
  }
  signTimesheet(){
    this.timesheetService.signTimesheet(this.authService.employeeID,this.period).subscribe({
      next:data=>{
        this.tsDTO.timesheet.signed=data;
      },error:err=>alert("Not signed")
    })
  }   

}