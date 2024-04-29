export interface TimesheetDTO{
    employee:Employee
    timesheet:Timesheet;
    timesheetsPeriods:Array<string>;
    timesheetPeriod:string;
    periodDates:Array<Date>;
    periodStates:PeriodState[];
    regularDaysPresent:boolean;
    vacationDaysPresent:boolean;
    holidaysPresent:boolean;    
    rdProjects:Array<string>;
    hdProjects:Array<string>;
    vdProjects:Array<string>;
    allProjects:Array<string>;
    notificationRequest:NotificationRequest;

}
export interface Timesheet{
    employeeID: string;
    period:string;
    signed:boolean;
    signable:boolean;
    approved:boolean;
    approvedByDAF:boolean;
    approvable:boolean;
    ok:boolean;
    rejected:boolean;
    hasNewCreated:boolean;
    totalHours:number;
    holidaysTotalHours:number;
    regularTotalHours:number;
    vacationTotalHours:number;
    verticalTotalHoursList:DayHours[];
    regularDaysLine:Array<Sheetday>;
    holidaysLine:Array<Sheetday>;
    vacationDaysLine:Array<Sheetday>;
    rdTotalHoursByLine:Map<string,number>;
    hdTotalHoursByLine:Map<string,number>;
    vdTotalHoursByLine:Map<string,number>;
}
export interface TimesheetSaver{

}
export interface TimesheetState{
    periodStates:PeriodState[];
    employee:Employee;
    supervisor:Employee;
    currentPeriod:string;
    canAddNewTimesheet:boolean;
    timesheetExists:boolean;
    timesheetPeriodExists:boolean;
    usersPeriods:string[];
    vacationReport:VacationReport;
}
export interface VacationReport{
    totalHours:number
    vacationHours:number
    vacationDays:number
    daysTaken:number
    daysRemaining:number
}
export interface Project{
    id:number;
    name:string;
    description:string
}
export interface VacationDTO{
    employee:Employee
    vacations:Vacation[]
    vacationReport:VacationReport
}
export interface Vacation{
    id:number
    employeeID:string
    daysTaken:number
    startDate:Date    
}
export interface PeriodState{
    period:string;
    finished:boolean;
    approved:boolean;
    timesheetOk:boolean;
}

export interface TimesheetPeriods{
    year:number;
    periods:Array<string>;
    currentPeriod:string
}
export interface Notification{
    id:number;
    sender:Employee;
    msgTo:string;
    msgObject:string;
    msgBody:string;
    instant:Date;
    period:string;
    read:boolean;
    idTobeTransferred:string;
}
export interface NotificationRequest{
    msgObject:string;
    msgBody:string;
}
export interface NotificationResponseDTO{
    receiver:Employee;
    notifications:Notification[];
    pageSize:number;
    totalPages:number;
    currentPage:number;
    totalNotifOnPage:number;
    pagesArray:number[]
}
export interface Sheetday{
    id:number;
    employeeID:string;
    date:Date;
    hours:number;
    signed:boolean;
    approuved:boolean;
    holiday:boolean;
    rejected:boolean;
    weekend:boolean;
    projectName:string;
    dayType:string
}
export interface Employee{
    id:string;
    name:string;
    postName:string;
    nickName:string;
    mail:string;
    phoneNumber:string;
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
    COP, DCOP, DRIVER, KPTA, DAF, CLEANER_KOLWEZI, SIM, IT,
	SSI, LOG_SUPPLY_CHAIN, RECEPTIONIST, FINANCE_ASSOCIATE, FINANCE_OFFICER,
	CLEANER_KASAJI, HR, KAPANGA_SITE_SUPERVISOR, KASAJI_SITE_SUPERVISOR
}
export enum DataStateEnum{
    LOADING, LOADED, ERROR, NONE, ADDNEW, READ, EDITING
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
export interface ConnectedUser{
    id:number
    username:string
    jwtToken:string
    online:boolean
}

