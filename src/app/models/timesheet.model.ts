export interface TimesheetDTO{
    employee:Employee
    timesheet:Timesheet;
    timesheetsPeriods:Array<string>;
    timesheetPeriod:string;
    businessDaysPresent:boolean;
    holidaysPresent:boolean;
    weekendDaysPresent:boolean;
    loaded:boolean
}
export interface Timesheet{
    employeeID: string;
    period:string;
    signed:boolean;
    approved:boolean;
    newTimesheet:boolean;
    totalHours:number;
    weekendTotalHours:number;
    holidaysTotalHours:number;
    businessTotalHours:number;
    verticalTotalHours:DayHours[];
    businessDaysLine:Sheetday[];
    holidaysLine:Sheetday[];
    weekendDaysLine:Sheetday[]
}
export interface TimesheetPeriods{
    year:number;
    periods:Array<string>;
    currentPeriod:string
}
export interface Sheetday{
    id:number;
    employeeID:string;
    date:Date;
    hours:number;
    signed:boolean;
    approuved:boolean;
    weekend:boolean;
    dayType:string
}
export interface Employee{
    id:string;
    name:string;
    postName:string;
    nickName:string;
    mail:string;
    phoneNumber:string
}
export interface DayHours{
    title:string;
    totalHours:number
}
export interface AppUser{
    username:string;
    mail:string;
    employeeID:string;
    roles:string[];
}
export enum DataStateEnum{
    LOADING, LOADED, ERROR
}
export interface AppDataState<T>{
    dataState?:DataStateEnum;
    timesheetDto?:TimesheetDTO;
    errorMessage?:string;
}
export interface LoginDataState<T>{
    dataState?:DataStateEnum;
    data?:any;
    errorMessage?:string;
}
