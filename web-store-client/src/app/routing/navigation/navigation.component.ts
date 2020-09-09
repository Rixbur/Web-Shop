import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  // hasUser=this.userService.hasUser();
  // userEmail=this.userService.getUserEmail();
  // isAdmin= this.userService.isAdmin();

  hasUser(){return this.userService.hasUser();}
  userEmail(){return this.userService.getUserEmail();}
  isAdmin(){ return this.userService.isAdmin();}

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

}
