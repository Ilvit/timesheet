import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppUser, Employee, Holiday, TimesheetDTO,  } from '../models/timesheet.model';

@Injectable({
  providedIn: 'root'
})
export class FtimesheetService {

 // host="https://timesheetf.onrender.com/";
  host="http://localhost:8081/";

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
  public getHolidays(){
    return this.http.get<Holiday[]>(this.host+`timesheet/holidays`);
  }
  public getHoliday(id:number){
    return this.http.get<Holiday>(this.host+`timesheet/holidays/${id}`);
  }
  public getNewHoliday(){
    return this.http.get<Holiday>(this.host+`timesheet/holidays/new`);
  }
  public saveHoliday(holiday:Holiday){
    return this.http.post<Holiday[]>(this.host+`timesheet/holidays/save`, holiday);
  }
  public deleteHoliday(hd:Holiday){
    return this.http.post<Holiday[]>(this.host+`timesheet/holidays/delete`, hd);
  }
  public updateHoliday(holiday:Holiday){
    return this.http.put<Holiday[]>(this.host+`timesheet/holidays/update`, holiday);
  }
  public getAllEmployees(){
    return this.http.get<Employee[]>(this.host+`timesheet/employees`);
  }
  public getEmployee(employeeID:string){
    return this.http.get<Employee>(this.host+`timesheet/employees/employee?eid=${employeeID}`);
  }
  public getNewEmployee(){
    return this.http.get<Employee>(this.host+`timesheet/employees/new`);
  }
  public saveEmployee(employee:Employee){
    return this.http.post<Employee[]>(this.host+`timesheet/employees/save`, employee);
  }
  public deleteEmployee(employeeID:string){
    return this.http.delete<Employee[]>(this.host+`timesheet/employees/delete?eid=${employeeID}`);
  }
  public updateEmployee(employee:Employee){
    return this.http.put<Employee[]>(this.host+`timesheet/employees/update`, employee);
  }
  
  public getAllUsers(){
    return this.http.get<AppUser[]>(this.host+`timesheet/users`);
  }
  public getUser(username:string){
    return this.http.get<AppUser>(this.host+`timesheet/users/user?un=${username}`);
  }
  public getNewUser(){
    return this.http.get<AppUser>(this.host+`timesheet/users/new`);
  }
  public saveUser(user:AppUser){
    return this.http.post<AppUser[]>(this.host+`timesheet/users/save`, user);
  }
  public deleteUser(username:string){
    return this.http.delete<AppUser[]>(this.host+`timesheet/users/delete?un=${username}`);
  }
  public updateUser(user:AppUser){
    return this.http.put<AppUser[]>(this.host+`timesheet/users/update`, user);
  }
}
 