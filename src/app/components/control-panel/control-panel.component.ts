import { Component, OnInit } from '@angular/core';
import { Observable, catchError, map, of, startWith } from 'rxjs';
import { DataStateEnum } from 'src/app/models/timesheet.model';
import { FtimesheetService } from 'src/app/services/ftimesheet.service';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit {
  title:string="Control Panel";
  
  readonly DataStateEnum=DataStateEnum;
  employeeID!:string;

  constructor(private timesheetService:FtimesheetService){}

  ngOnInit(): void {
    this.getAllNotifications("");
  }
  getAllNotifications(employeeID:string){
    
  }
}
