import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isAuthenticated:boolean=false;
  roles:any; 
  username!:string;
  employeeID!:string;
  accessToken:any;
  
 // host="https://timesheetf.onrender.com/";
  host="http://localhost:8081/";

  constructor(private http:HttpClient, private router:Router) { }

  public login(username:string, password:string){
    let options={
      headers: new HttpHeaders().set("Content-Type","application/x-www-form-urlencoded")
    }    
    let params=new HttpParams().set("username",username).set("password",password);
    return this.http.post(this.host+`authentication/login`,params,options)
  }

  loadProfile(data:any){
    this.isAuthenticated=true;
    this.accessToken=data['access-token'];
    let decodedJwt:any=jwtDecode(this.accessToken);
    this.username=decodedJwt.sub;
    this.roles=decodedJwt.scope;
    this.employeeID=decodedJwt.eid;
    window.localStorage.setItem("jwt-token",this.accessToken);
  } 
  loadJwtTokenFromLocalStorage(){
    let token=window.localStorage.getItem("jwt-token");
    if(token){
      this.loadProfile({"access-token":token});
      this.router.navigateByUrl("/user/cars");
    }
  }
  logout() {
    this.isAuthenticated=false;
    this.accessToken=undefined;
    this.username="";
    this.roles=[];
    window.localStorage.removeItem("access-token");
  }
  getUser(username:string){
    return this.http.get<string>(this.host+`user/${username}`);
  }

}
