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
    holiday:boolean;
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
    gender:Gender;
    position:Position;
    supervisorID:string
}
export interface DayHours{
    title:string;
    totalHours:number
}
export interface Holiday{
    id:number;
    date:Date;
    description:string;
}
export interface AppUser{
    username:string;
    mail:string;
    employeeID:string;
    roles:Role[];
    userRoles:UserRoles[]
}
export interface Role{
    id:number;
    name:string
}
export interface UserRoles{
    roleName:string;
    hasRole:boolean;
}
export enum Gender{
    MALE, FEMALE, OTHER
}
export enum Position{
    COP, DCOP, DRIVER, KPTA, DATA, SITE_SUPERVISOR, DAF, CLEANER, IT
}
export enum DataStateEnum{
    LOADING, LOADED, ERROR
}
export enum HolidayStateEnum{
    ADDNEW, EDIT, READ, NONE
}
export enum AppUserStateEnum{
    ADDNEW, EDIT, READ, NONE
}
export enum EmployeeStateEnum{
    ADDNEW, EDIT, READ, NONE
}
export interface AppDataState<T>{
    dataState?:DataStateEnum;
    timesheetDto?:TimesheetDTO;
    errorMessage?:string;
}
export interface HolidayDataState<T>{
    dataState?:DataStateEnum;
    hdays?:Holiday[];
    errorMessage?:string;
}
export interface UserDataState<T>{
    dataState?:DataStateEnum;
    appUsers?:AppUser[];
    errorMessage?:string;
}
export interface EmployeeDataState<T>{
    dataState?:DataStateEnum;
    employs?:Employee[];
    errorMessage?:string;
}
export interface LoginDataState<T>{
    dataState?:DataStateEnum;
    data?:any;
    errorMessage?:string;
}
