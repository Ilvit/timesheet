import { Component, OnInit } from '@angular/core';
import { DataStateEnum, TimesheetState } from 'src/app/models/timesheet.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FtimesheetService } from 'src/app/services/ftimesheet.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  timesheetState!:TimesheetState;
  tsDataState!:DataStateEnum
  readonly DataStateEnum=DataStateEnum

  constructor(private timesheetService:FtimesheetService, public authService:AuthenticationService){}

  ngOnInit(): void {
    this.getTimesheetState();
  }
  getTimesheetState(){
    this.tsDataState=DataStateEnum.LOADING
    this.timesheetService.getTimesheetState(this.authService.employeeID).subscribe({
      next:data=>{   
        this.tsDataState=DataStateEnum.LOADED
        this.timesheetState=data;   
      }, error:err=>console.log(err)
    })
  }

}
