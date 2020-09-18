import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
 
  hasUser(){return this.userService.hasUser();}
  userEmail(){return this.userService.getUserEmail();}
  isAdmin(){ return this.userService.isAdmin();}

  constructor(private userService: UserService, public router: Router) {}

  ngOnInit(): void {
  }
  logout(){
        this.userService.logout();
        this.router.navigate(['/']);
  }
}
