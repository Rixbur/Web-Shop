import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {}
  public submitForm(): void {
    this.userService.register({
      email: this.email,
      password: this.password,
    });
  }
}
