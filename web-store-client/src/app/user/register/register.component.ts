import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit,OnDestroy {
  email: string = '';
  password: string = '';
  private activeSubscriptions: Subscription[] = []
  constructor(private userService: UserService) {}

  ngOnInit(): void {}
  ngOnDestroy(){
    this.activeSubscriptions.forEach(sub=>sub.unsubscribe);
  }
  public submitForm(): void {
    const subscription = this.userService.register({
      email: this.email,
      password: this.password,
    });
    this.activeSubscriptions.push(subscription);
  }
}
