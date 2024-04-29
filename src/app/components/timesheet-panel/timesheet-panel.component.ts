import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataStateEnum, Notification, NotificationRequest, TimesheetDTO } from 'src/app/models/timesheet.model';
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
  stopeditTimesheet:boolean=true;
  tsdtoDataState!:DataStateEnum
  readonly DataStateEnum=DataStateEnum;

  constructor(public timesheetService:FtimesheetService, private fb:FormBuilder, private activatedRoute:ActivatedRoute,
          public authService:AuthenticationService){}

  ngOnInit(): void {
   this.getTimesheet();
   this.getSupervisorNotifications(this.timesheetService.uPer, this.authService.employeeID, this.timesheetService.sEid);
  }

  getTimesheet(){
    this.tsdtoDataState=DataStateEnum.LOADING
    this.timesheetService.getTimesheet(this.timesheetService.uPer, this.timesheetService.uEid).subscribe({
    next:data=>{
      this.tsdtoDataState=DataStateEnum.LOADED
      this.tsDTO=data;      
      this.tsFormGroup=this.fb.group({
        msgObject:this.fb.control(""),
        msgBody:this.fb.control("")
      });      
    },error:err=>console.log(err)
   })
  }
  approveTimesheet(){
    this.timesheetService.approveTimesheet(this.timesheetService.uPer, this.timesheetService.uEid, this.authService.employeeID, this.tsFormGroup.value).subscribe({
      next:data=>{
        this.tsDTO.timesheet.approved=data;
        if(this.authService.roles.includes('DAF'))this.tsDTO.timesheet.approvedByDAF=data;
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
  getSupervisorNotifications(period:string, receiverID:string, senderID:string){
    this.timesheetService.getSupervisorNotifications(period, receiverID, senderID).subscribe({
      next:data=>{
        this.notifications=data;
      },error:err=>alert("Can not get data")
    })
  }
  editTimesheet(){
    if(confirm("Are you sure you want modify the timesheet?")){
      this.stopeditTimesheet=false;
    }    
  }
  stopEditTimesheet(){
    this.stopeditTimesheet=true;
    this.getTimesheet();
  }
  saveTimesheet(){
    this.tsdtoDataState=DataStateEnum.LOADING;
    this.stopeditTimesheet=true;
    this.timesheetService.saveTimesheet(this.tsDTO.timesheetPeriod, this.tsDTO).subscribe({
      next:data=>{
        this.tsdtoDataState=DataStateEnum.LOADED
        this.tsDTO=data;
      }
    })
  }
}
