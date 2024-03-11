import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, catchError, map, of, startWith } from 'rxjs';
import { AppDataState, DataStateEnum, TimesheetDTO } from 'src/app/models/timesheet.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FtimesheetService } from 'src/app/services/ftimesheet.service';

@Component({
  selector: 'app-faradja-timesheet',
  templateUrl: './faradja-timesheet.component.html',
  styleUrls: ['./faradja-timesheet.component.css']
})
export class FaradjaTimesheetComponent implements OnInit{

  timesheetDTO?:Observable<AppDataState<TimesheetDTO>>|null;
  readonly DataStateEnum=DataStateEnum;
  tsDTO?:TimesheetDTO;
  period!:string;

  constructor(private timesheetService:FtimesheetService, private fb:FormBuilder, public authService:AuthenticationService){}

  ngOnInit(): void {    
    this.getTimesheet();

  }
  getTimesheet(){
    this.timesheetDTO=this.timesheetService.getTimesheet("",this.authService.employeeID).pipe(
      map(data=>({dataState:DataStateEnum.LOADED,timesheetDto:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
    this.timesheetDTO.subscribe({
      next:data=>{
        this.tsDTO=data.timesheetDto;
      }
    })
  }
  getNewHolidaysLine(){    
    this.timesheetDTO=this.timesheetService.getNewTimesheetLine("",this.authService.employeeID,"PUBHDCH-24").pipe(
      map(data=>({dataState:DataStateEnum.LOADED,timesheetDto:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
    this.timesheetDTO.subscribe({
      next:data=>{
        this.tsDTO=data.timesheetDto;
      }
    })
  }
  getNewWeekendDaysLine(){
    this.timesheetDTO=this.timesheetService.getNewTimesheetLine("",this.authService.employeeID,"WEEDCH-24").pipe(
      map(data=>({dataState:DataStateEnum.LOADED,timesheetDto:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
    this.timesheetDTO.subscribe({
      next:data=>{
        this.tsDTO=data.timesheetDto;
      }
    })
  }
  getNewBusinessDaysLine(){
    this.timesheetDTO=this.timesheetService.getNewTimesheetLine("",this.authService.employeeID,"BUSDCH-24").pipe(
      map(data=>({dataState:DataStateEnum.LOADED,timesheetDto:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
    this.timesheetDTO.subscribe({
      next:data=>{
        this.tsDTO=data.timesheetDto;
      }
    })
  }
  
  deletePublicHolidayLine(){
    if(confirm("DO YOU WANT TO DELETE THIS TIMESHEET LINE ?")){
      this.timesheetService.deleteTimesheetLine(this.period, this.authService.employeeID,"PUBHDCH-24").subscribe({
        next:data=>{          
          this.getTimesheet();
        }
      })
    }    
  }
  deleteBusinessDayLine(){
    if(confirm("DO YOU WANT TO DELETE THIS TIMESHEET LINE ?")){
      this.timesheetService.deleteTimesheetLine(this.period, this.authService.employeeID,"BUSDCH-24").subscribe({
        next:data=>{
          this.getTimesheet();
        }
      })
    }    
  }

  deleteWeekendDayLine(){
    if(confirm("DO YOU WANT TO DELETE THIS TIMESHEET LINE ?")){
      this.timesheetService.deleteTimesheetLine(this.period, this.authService.employeeID,"WEEDCH-24").subscribe({
        next:data=>{
          this.getTimesheet();
        }
      })
    }    
  }
  saveTimesheet() {
     this.timesheetService.saveTimesheet(this.period, this.tsDTO!).subscribe({
      next:data=>{
        this.tsDTO=data;
      }
    })    
  }
      

  deleteTimesheet(){
    
  }

  
  
  
}
