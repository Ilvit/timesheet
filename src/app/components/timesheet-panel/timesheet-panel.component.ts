import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Notification, NotificationRequest, TimesheetDTO } from 'src/app/models/timesheet.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FtimesheetService } from 'src/app/services/ftimesheet.service';

@Component({
  selector: 'app-timesheet-panel',
  templateUrl: './timesheet-panel.component.html',
  styleUrls: ['./timesheet-panel.component.css']
})
export class TimesheetPanelComponent implements OnInit {
  tsFormGroup!:FormGroup;
  tsDTO!:TimesheetDTO;
  employeeID!:string;
  notifications!:Notification[]

  constructor(public timesheetService:FtimesheetService, private fb:FormBuilder, private activatedRoute:ActivatedRoute,
          public authService:AuthenticationService){}

  ngOnInit(): void {
   this.timesheetService.getTimesheet(this.timesheetService.uPer, this.timesheetService.uEid).subscribe({
    next:data=>{
      this.tsDTO=data;      
      this.tsFormGroup=this.fb.group({
        msgObject:this.fb.control(""),
        msgBody:this.fb.control("")
      });      
    },error:err=>console.log(err)
   })
   this.getSupervisorNotifications(this.timesheetService.uPer, this.authService.employeeID, this.timesheetService.sEid);
  }
  approveTimesheet(){
    this.timesheetService.approveTimesheet(this.timesheetService.uPer, this.timesheetService.uEid, this.authService.employeeID, this.tsFormGroup.value).subscribe({
      next:data=>{
        this.tsDTO.timesheet.approved=data;
      }, error:err=>alert(err)
    })
  }
  rejectTimesheet(){
    this.timesheetService.rejectTimesheet(this.timesheetService.uPer, this.timesheetService.uEid, this.authService.employeeID, this.tsFormGroup.value).subscribe({
      next:data=>{
        this.tsDTO.timesheet.rejected=data;
      }, error:err=>alert(err)
    })
  }
  rejectApprovedTimesheet(){
    if(confirm("Are you sure to reject the approved timesheet ?")){
        this.timesheetService.rejectTimesheet(this.timesheetService.uPer, this.timesheetService.uEid, this.authService.employeeID, this.tsFormGroup.value).subscribe({
          next:data=>{
            this.tsDTO.timesheet.rejected=data;
          }, error:err=>alert(err)
        })
    }
  }
  copApproveTimesheet(){
    if(confirm("You want to approve this timesheet. Are you sure ?")){
        this.timesheetService.copApproveTimesheet(this.timesheetService.uPer, this.timesheetService.uEid, this.tsFormGroup.value).subscribe({
          next:data=>{
            this.tsDTO.timesheet.rejected=data;
          }, error:err=>alert(err)
        })
    }
  }
  getSupervisorNotifications(period:string, receiverID:string, senderID:string){
    this.timesheetService.getSupervisorNotifications(period, receiverID, senderID).subscribe({
      next:data=>{
        this.notifications=data;
      },error:err=>alert("Can not get data")
    })
  }
}
