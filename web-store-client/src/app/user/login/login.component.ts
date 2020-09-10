import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
// import { nameValidator } from './name-validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {}
  public submitForm(): void {
    const subscribe = this.userService.login({
      email: this.email,
      password: this.password,
    });
  }
}
