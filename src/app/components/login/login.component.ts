import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, catchError, map, of, startWith } from 'rxjs';
import { DataStateEnum, LoginDataState } from 'src/app/models/timesheet.model';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginFormGroup!:FormGroup;
  loginDataState!:DataStateEnum
  readonly DataStateEnum=DataStateEnum;

  constructor(private fb:FormBuilder, private authService:AuthenticationService, private router:Router){}

  ngOnInit(): void {
    this.loginFormGroup=this.fb.group({
      username:this.fb.control(""),
      password:this.fb.control("")
    })
  }
  login(){
    if(this.authService.accessToken)this.authService.logout();
    this.loginDataState=DataStateEnum.LOADING
    let username=this.loginFormGroup.value.username;
    let password=this.loginFormGroup.value.password;
    this.authService.login(username,password).subscribe({
      next:data=>{
        this.loginDataState=DataStateEnum.LOADED
        this.authService.loadProfile(data);
        this.router.navigateByUrl("/user/home");
      },error:err=>{
        this.loginDataState=DataStateEnum.ERROR
        console.log(err);        
      }
    })    
  }
  
}
