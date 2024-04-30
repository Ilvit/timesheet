import { Component, OnInit } from '@angular/core';
import { ConnectedUser, DataStateEnum } from 'src/app/models/timesheet.model';
import { FtimesheetService } from 'src/app/services/ftimesheet.service';

@Component({
  selector: 'app-connected-users',
  templateUrl: './connected-users.component.html',
  styleUrls: ['./connected-users.component.css']
})
export class ConnectedUsersComponent implements OnInit{

  connectedUsers!:ConnectedUser[]
  cuserDataState!:DataStateEnum
  readonly DataStateEnum=DataStateEnum;

  constructor(private timesheetService:FtimesheetService){}

  ngOnInit(): void {
    this.getAllConnectedUsers();
  }
  getAllConnectedUsers(){
    this.cuserDataState=DataStateEnum.LOADING;
    this.timesheetService.getAllConnectedUsers().subscribe({
      next:data=>{
        this.cuserDataState=DataStateEnum.LOADED
        this.connectedUsers=data;
      }
    })
  }
  disconnectUser(accessToken:string){
    this.cuserDataState=DataStateEnum.LOADING;
    this.timesheetService.disconnectUser(accessToken).subscribe({
      next:data=>{
        this.cuserDataState=DataStateEnum.LOADED;
        this.connectedUsers=data;
      }
    })
  }
  removeDisconnectedUsers(){
    this.cuserDataState=DataStateEnum.LOADING;
    this.timesheetService.removeDisconnectedUsers().subscribe({
      next:data=>{
        this.cuserDataState=DataStateEnum.LOADED;
        this.connectedUsers=data;
      }
    })
  }
}
