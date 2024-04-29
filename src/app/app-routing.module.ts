import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { FaradjaTimesheetComponent } from './components/faradja-timesheet/faradja-timesheet.component';
import { TsUserComponent } from './components/ts-user/ts-user.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { AdminsComponent } from './components/admins/admins.component';
import { UsersComponent } from './components/users/users.component';
import { HolidaysComponent } from './components/holidays/holidays.component';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { AuthorizationGuard } from './guards/authorization.guard';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { EmployeesComponent } from './components/employees/employees.component';
import { NotificationPanelComponent } from './components/notification-panel/notification-panel.component';
import { TimesheetPanelComponent } from './components/timesheet-panel/timesheet-panel.component';
import { VacationsComponent } from './components/vacations/vacations.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ConnectedUsersComponent } from './components/connected-users/connected-users.component';

const routes: Routes = [
  {path:"", redirectTo:"/login", pathMatch:'full'},
  {path:"login", component:LoginComponent},  
  {path:"user", component:TsUserComponent, canActivate:[AuthenticationGuard], children:[
    {path:"ftimesheet", component:FaradjaTimesheetComponent},
    {path:"notifications", component:NotificationPanelComponent},    
    {path:"home", component:HomeComponent},
    {path:"tspanel", component:TimesheetPanelComponent},
    {path:"accessDenied", component:AccessDeniedComponent}
  ]},
  {path:"admins", component:AdminsComponent, canActivate:[AuthorizationGuard], children:[
    {path:"users", component:UsersComponent, canActivate:[AdminAuthGuard]},
    {path:"employees", component:EmployeesComponent, canActivate:[AdminAuthGuard]},
    {path:"vacations", component:VacationsComponent},
    {path:"holidays", component:HolidaysComponent},
    {path:"projects", component:ProjectsComponent},
    {path:"connectedusers", component:ConnectedUsersComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
