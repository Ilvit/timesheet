import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FtimesheetService } from 'src/app/services/ftimesheet.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public timesheetService: FtimesheetService, public authService:AuthenticationService, private router:Router){}

  ngOnInit(): void {
    
  }
  logout(){
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }
  gotoNotifications(){
    this.router.navigateByUrl("/user/notifications")
  }
}
