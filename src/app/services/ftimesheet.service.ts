import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TimesheetDTO } from '../models/timesheet.model';

@Injectable({
  providedIn: 'root'
})
export class FtimesheetService {

  host="https://ftimesheet.onrender.com/";

  constructor(private http:HttpClient) { }

  public getTimesheet(period:string, employeeID:string){
    return this.http.get<TimesheetDTO>(this.host+`timesheet?period=${period}&eid=${employeeID}`);
  }
 
  public getNewTimesheetLine(period:string, employeeID:string, daysCode:string){
    return this.http.get<TimesheetDTO>(this.host+`timesheet/newline?per=${period}&eid=${employeeID}&dc=${daysCode}`);
  }
  public saveTimesheet(period:string, timesheetDTO:TimesheetDTO){
    return this.http.post<TimesheetDTO>(this.host+`timesheet/save?per=${period}`, timesheetDTO);
  }
  public deleteTimesheet(period:string, employeeID:string){
    return this.http.delete<boolean>(this.host+`timesheet/deleteline?per=${period}&eid=${employeeID}`);
  }
  public deleteTimesheetLine(period:string, employeeID:string, daysCode:string){
    return this.http.delete<boolean>(this.host+`timesheet/deleteline?per=${period}&eid=${employeeID}&dc=${daysCode}`);
  }
}
 