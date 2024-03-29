import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { FaradjaTimesheetComponent } from './components/faradja-timesheet/faradja-timesheet.component';
import { TsUserComponent } from './components/ts-user/ts-user.component';
import { AuthenticationGuard } from './guards/authentication.guard';

const routes: Routes = [
  {path:"", redirectTo:"/login", pathMatch:'full'},
  {path:"login", component:LoginComponent},  
  {path:"user", component:TsUserComponent, canActivate:[AuthenticationGuard], children:[
    {path:"ftimesheet", component:FaradjaTimesheetComponent},
    {path:"home", component:HomeComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
