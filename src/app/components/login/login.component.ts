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
  myData?:Observable<LoginDataState<any>>|null;
  readonly DataStateEnum=DataStateEnum;

  constructor(private fb:FormBuilder, private authService:AuthenticationService, private router:Router){}

  ngOnInit(): void {
    this.loginFormGroup=this.fb.group({
      username:this.fb.control(""),
      password:this.fb.control("")
    })
  }
  login(){
    let username=this.loginFormGroup.value.username;
    let password=this.loginFormGroup.value.password;
    this.authService.login(username,password).subscribe({
      next:data=>{
        this.authService.loadProfile(data);
        this.router.navigateByUrl("/user/home");
      },error:err=>{
        console.log(err);
      }
    })
  }
  newLogin(){
    let username=this.loginFormGroup.value.username;
    let password=this.loginFormGroup.value.password;
    this.myData=this.authService.login(username,password).pipe(
      map(data=>({dataState:DataStateEnum.LOADED,data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
    this.myData.subscribe({
      next:data=>{
        this.authService.loadProfile(data.data);
        this.router.navigateByUrl("/user/home")
      }
    })
  }
}
