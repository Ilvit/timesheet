import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, catchError, map, of, startWith } from 'rxjs';
import { AppUser, AppUserStateEnum, DataStateEnum, UserDataState } from 'src/app/models/timesheet.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FtimesheetService } from 'src/app/services/ftimesheet.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  title:string="All the users";
  users?:Observable<UserDataState<AppUser[]>>|null;
  userTo!:AppUser;
  userFormGroup!:FormGroup;
  readonly DataStateEnum=DataStateEnum;
  readonly AppUserStateEnum=AppUserStateEnum;
  appUserStateEnum!:AppUserStateEnum;

  constructor(public timesheetService:FtimesheetService, private fb:FormBuilder){}

  ngOnInit(): void {
    this.getAllUsers();
  }
  getAllUsers(){
    this.appUserStateEnum=AppUserStateEnum.NONE;
    this.users=this.timesheetService.getAllUsers().pipe(
      map(data=>({dataState:DataStateEnum.LOADED,appUsers:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }
  describe(user: AppUser) {
    this.timesheetService.getUser(user.username).subscribe({
      next:userto=>{
        this.appUserStateEnum=AppUserStateEnum.READ;
        this.userTo=userto;
      }, error:err=>alert("Can not read the user")
    })
    
  }
  getNewUser(){    
    this.timesheetService.getNewUser().subscribe({
      next:newuser=>{
        this.appUserStateEnum=AppUserStateEnum.ADDNEW;
        this.userTo=newuser;
        this.userFormGroup=this.fb.group({
          username:this.fb.control(""),
          password:this.fb.control(""),
          mail:this.fb.control(""),
          employeeID:this.fb.control("")
        })
      },error:err=>alert("Can not get a new user")
    })
  }
  saveUser(){
    this.appUserStateEnum=AppUserStateEnum.NONE;
    this.users=this.timesheetService.saveUser(this.userFormGroup.value).pipe(
      map(data=>({dataState:DataStateEnum.LOADED,appUsers:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }
  editUser(user:AppUser){    
    this.timesheetService.getUser(user.username).subscribe({
      next:userto=>{
        this.appUserStateEnum=AppUserStateEnum.EDIT;
        this.userTo=userto;
        this.userFormGroup=this.fb.group({
          username:this.fb.control(userto.username),
          password:this.fb.control(""),
          mail:this.fb.control(userto.mail),
          employeeID:this.fb.control(userto.employeeID),
          userRoles:this.fb.array(userto.userRoles)
        })
      }, error:err=>alert("Can not be done !")
    })
  }
  deleteUser(user:AppUser){
    this.users=this.timesheetService.deleteUser(user.username).pipe(
      map(data=>({dataState:DataStateEnum.LOADED,appUsers:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }
  updateUser(){
    this.users=this.timesheetService.updateUser(this.userFormGroup.value).pipe(
      map(data=>({dataState:DataStateEnum.LOADED,appUsers:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }
    
}
