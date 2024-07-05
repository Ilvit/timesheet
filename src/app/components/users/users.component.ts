import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, catchError, map, of, startWith } from 'rxjs';
import { AppUser, DataStateEnum, UsersDTO} from 'src/app/models/timesheet.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FtimesheetService } from 'src/app/services/ftimesheet.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  title:string="All the users";
  usersDTO!:UsersDTO
  userTo!:AppUser;
  userFormGroup!:FormGroup;
  readonly DataStateEnum=DataStateEnum;
  usersStateEnum!:DataStateEnum;
  appUserStateEnum!:DataStateEnum;

  constructor(public timesheetService:FtimesheetService, private fb:FormBuilder){}

  ngOnInit(): void {
    this.getAllUsers();
  }
  getAllUsers(){
    this.appUserStateEnum=DataStateEnum.NONE;
    this.usersStateEnum=DataStateEnum.LOADING
    this.timesheetService.getAllUsers().subscribe({
      next:data=>{
        this.usersStateEnum=DataStateEnum.LOADED
        this.usersDTO=data        
      },error:err=>console.log(err)
    })
  }
  describe(user: AppUser) {
    this.appUserStateEnum=DataStateEnum.LOADING
    this.timesheetService.getUser(user.username).subscribe({
      next:userto=>{
        this.appUserStateEnum=DataStateEnum.READ
        this.userTo=userto;
      }, error:err=>console.log(err)
    })
    
  }
  getNewUser(){    
    this.appUserStateEnum=DataStateEnum.ADDNEW
    this.timesheetService.getNewUser().subscribe({
      next:newuser=>{
        this.userTo=newuser;
        this.userFormGroup=this.fb.group({
          username:this.fb.control(""),
          password:this.fb.control(""),
          mail:this.fb.control(""),
          employeeID:this.fb.control("")
        })
      },error:err=>console.log(err)
    })
  }
  saveUser(){
    this.usersStateEnum=DataStateEnum.LOADING
    this.timesheetService.saveUser(this.userFormGroup.value).subscribe({
      next:data=>{
        this.appUserStateEnum=DataStateEnum.NONE
        this.usersStateEnum=DataStateEnum.LOADED
        this.usersDTO=data;
      },error:err=>{
        this.usersStateEnum=DataStateEnum.ERROR
        console.log(err)
      }
    })
  }
  editUser(user:AppUser){   
    this.appUserStateEnum=DataStateEnum.EDITING
    this.timesheetService.getUser(user.username).subscribe({
      next:userto=>{
        this.userTo=userto;
        this.userFormGroup=this.fb.group({
          username:this.fb.control(userto.username),
          password:this.fb.control(""),
          mail:this.fb.control(userto.mail),
          employeeID:this.fb.control(userto.employeeID),
          userRoles:this.fb.array(userto.userRoles)
        })
      }, error:err=>console.log(err)
    })
  }
  deleteUser(user:AppUser){
    this.usersStateEnum=DataStateEnum.LOADING
    this.timesheetService.deleteUser(user.username).subscribe({
      next:data=>{
        this.usersStateEnum=DataStateEnum.LOADED
        this.usersDTO=data
      }, error:err=>{
        this.usersStateEnum=DataStateEnum.ERROR
        console.log(err)
      }
    })
  }
  updateUser(){
    this.usersStateEnum=DataStateEnum.LOADING
    this.timesheetService.updateUser(this.userFormGroup.value).subscribe({
      next:data=>{
        this.appUserStateEnum=DataStateEnum.NONE
        this.usersStateEnum=DataStateEnum.LOADED
        this.usersDTO=data
      },error:err=>{
        this.usersStateEnum=DataStateEnum.ERROR
        console.log(err)
      }
    })
  }
    
}
