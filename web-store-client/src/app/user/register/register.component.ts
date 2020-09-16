import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { nameValidator } from '../../orders/cart/name-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit,OnDestroy {
  // email: string = '';
  // password: string = '';
  private activeSubscriptions: Subscription[] = []
  public registerForm: FormGroup;

  constructor(private userService: UserService,
    private formBuilder: FormBuilder,
) {
  this.registerForm = this.formBuilder.group({
    name: ['', [Validators.required, nameValidator]],
    address: [
      '',
      [Validators.required, Validators.pattern('[0-9]+ [ a-zA-Z0-9]+')],
    ],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
  }

  ngOnInit(): void {}
  ngOnDestroy(){
    this.activeSubscriptions.forEach(sub=>sub.unsubscribe);
  }
  public get name() {
    return this.registerForm.get('name').value;
  }
  public get address() {
    return this.registerForm.get('address').value;
  }
  public get email() {
    return this.registerForm.get('email').value;
  }
  public get password() {
    return this.registerForm.get('password').value;
  }

  public submitForm(data): void {
    if (!this.registerForm.valid) {
      window.alert('Not valid!');
      return;
    }

    const subscription = this.userService.register({
      email: this.email,
      password: this.password,
      name: this.name,
      address: this.address
    });
    this.activeSubscriptions.push(subscription);
  }
}
