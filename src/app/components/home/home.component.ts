import { Component, OnInit } from '@angular/core';
import { TimesheetState } from 'src/app/models/timesheet.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FtimesheetService } from 'src/app/services/ftimesheet.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  timesheetState!:TimesheetState;
  
  constructor(private timesheetService:FtimesheetService, public authService:AuthenticationService){}

  ngOnInit(): void {
    this.getTimesheetState();
  }
  getTimesheetState(){
    this.timesheetService.getTimesheetState(this.authService.employeeID).subscribe({
      next:data=>{   
        this.timesheetState=data;   
      }, error:err=>alert(err)
    })
  }

}
