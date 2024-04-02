import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FaradjaTimesheetComponent } from './components/faradja-timesheet/faradja-timesheet.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TsUserComponent } from './components/ts-user/ts-user.component';
import { AppHttpInterceptor } from './interceptors/app-http.interceptor';
import { UsersComponent } from './components/users/users.component';
import { HolidaysComponent } from './components/holidays/holidays.component';
import { AdminsComponent } from './components/admins/admins.component';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatBadgeModule} from "@angular/material/badge";
import { NotificationPanelComponent } from './components/notification-panel/notification-panel.component';
import { ControlPanelComponent } from './components/control-panel/control-panel.component';
import { TimesheetPanelComponent } from './components/timesheet-panel/timesheet-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    FaradjaTimesheetComponent,
    NavbarComponent,
    TsUserComponent,
    UsersComponent,
    HolidaysComponent,
    AdminsComponent,
    AccessDeniedComponent,
    EmployeesComponent,
    NotificationPanelComponent,
    ControlPanelComponent,
    TimesheetPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule, 
    HttpClientModule, 
    BrowserAnimationsModule,
    MatBadgeModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi:true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
