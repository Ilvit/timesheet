import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TimesheetDTO } from 'src/app/models/timesheet.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FtimesheetService } from 'src/app/services/ftimesheet.service';

@Component({
  selector: 'app-faradja-timesheet',
  templateUrl: './faradja-timesheet.component.html',
  styleUrls: ['./faradja-timesheet.component.css']
})
export class FaradjaTimesheetComponent implements OnInit{

  timesheetDTOFormGroup!:FormGroup;
  timesheetDTO!:TimesheetDTO;
  period!:string;

  constructor(private timesheetService:FtimesheetService, private fb:FormBuilder, public authService:AuthenticationService){}

  ngOnInit(): void {    
    this.getTimesheet();
    this.timesheetDTOFormGroup=this.fb.group({
      businessDaysLine:this.fb.array(this.timesheetDTO.timesheet.businessDaysLine),
      weekendDaysLine:this.fb.array(this.timesheetDTO.timesheet.weekendDaysLine),
      holidaysLine:this.fb.array(this.timesheetDTO.timesheet.holidaysLine)
    }) 
  }
  getTimesheet(){
    this.timesheetService.getTimesheet("",this.authService.employeeID).subscribe({
      next: data=>{
        this.timesheetDTO=data;
        this.period=this.timesheetDTO.timesheetPeriod;
      }, error:err=>{
        console.log(err);
      }
    })
  }
  getNewHolidaysLine(){    
    this.timesheetService.getNewTimesheetLine(this.authService.employeeID, this.authService.employeeID,"PUBHDCH-24").subscribe({
      next:data=>{
        this.timesheetDTO=data;
      },error:err=>{
        console.log(err);
      }
    })
  }
  getNewWeekendDaysLine(){
    this.timesheetService.getNewTimesheetLine(this.timesheetDTO.timesheetPeriod,this.authService.employeeID,"WEEDCH-24").subscribe({
      next:data=>{
        this.timesheetDTO=data;
      },error:err=>{
        console.log(err);
      }
    })
  }
  getNewBusinessDaysLine(){
    this.timesheetService.getNewTimesheetLine(this.timesheetDTO.timesheetPeriod,this.authService.employeeID,"BUSDCH-24").subscribe({
      next:data=>{
        this.timesheetDTO=data;
      },error:err=>{
        console.log(err);
      }
    })
  }
  saveTimesheet(){
    this.timesheetService.saveTimesheet(this.period, this.timesheetDTO).subscribe({
      next:data=>{
        this.getTimesheet();
      }, error:err=>{
        console.log(err);
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

  deleteTimesheet(){
    
  }

  
  
  
}
