import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { Subscribable, Subscription } from 'rxjs';
// import { nameValidator } from './name-validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit,OnDestroy {
  email: string = '';
  password: string = '';
  activeSubscriptions: Subscription[] = []
  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  ngOnDestroy(){
    this.activeSubscriptions.forEach(sub=>sub.unsubscribe);
  }

  public submitForm(): void {
    const subscribe = this.userService.login({
      email: this.email,
      password: this.password,
    });
    this.activeSubscriptions.push(subscribe);
  }
}
