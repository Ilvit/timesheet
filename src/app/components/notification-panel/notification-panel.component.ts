import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, catchError, map, of, startWith } from 'rxjs';
import { DataStateEnum, Employee, Notification, NotificationResponseDTO, TimesheetDTO } from 'src/app/models/timesheet.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FtimesheetService } from 'src/app/services/ftimesheet.service';

@Component({
  selector: 'app-notification-panel',
  templateUrl: './notification-panel.component.html',
  styleUrls: ['./notification-panel.component.css']
})
export class NotificationPanelComponent implements OnInit {

  notificationResponseDTO!:NotificationResponseDTO;
  notifDTO!:Notification;
  myParams!:string[]

  constructor(private timesheetService:FtimesheetService, public authService:AuthenticationService, private router:Router){}

  ngOnInit(): void {    
    this.getNotifications(this.authService.employeeID, 0);
  }
  
  getNotification(notifID:number){
    this.timesheetService.getNotification(notifID).subscribe({
      next:data=>{
        this.notifDTO=data;
      },error:err=>console.log("Can no get the notification")
    })
  } 
  getNotifications(receiverID:string, page:number){
    this.timesheetService.getNotifications(receiverID,page).subscribe({
      next:data=>{
        this.notificationResponseDTO=data;
      },error:err=>console.log("Can no get the notification")
    })
  } 
  seeTimesheet(period:string, sender:Employee, idTobeTransferred:string){
    this.timesheetService.uPer=period;
    this.timesheetService.sEid=sender.employeeID;
    
    if(sender.employeeID==this.notificationResponseDTO.receiver.supervisorID){
      this.timesheetService.uEid=this.notificationResponseDTO.receiver.employeeID;
      this.timesheetService.supervised=true;      
    }else {
      this.timesheetService.uEid=sender.employeeID;
      this.timesheetService.supervised=false;
    }
    if(idTobeTransferred)this.timesheetService.uEid=idTobeTransferred;
    
    this.timesheetService.notifFrom=sender;
    this.router.navigateByUrl("/user/tspanel");
  }
}
