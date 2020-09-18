import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { Subscribable, Subscription } from 'rxjs';
import { Route } from '@angular/compiler/src/core';
// import { nameValidator } from './name-validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit,OnDestroy {
  email: string = '';
  password: string = '';
  loginSub: Subscription = null;
  activeSubscriptions: Subscription[] = [];
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  ngOnDestroy(){
    this.activeSubscriptions.forEach(sub=>sub.unsubscribe);
  }

  public submitForm(): void {
    this.loginSub = this.userService.login({
      email: this.email,
      password: this.password,
    }).subscribe(
    data => {
      if(data.status==201){
          this.userService.setUserEmail(this.email);
          window.alert("Succesfully logged in!");
      }
      else{
        window.alert("Couldn't log in, check username and password");
      }
      
    },
    err => {
      console.log(err);
    },
    () => {
      this.router.navigate(['/']);
    });
    this.activeSubscriptions.push(this.loginSub);
  }
}
