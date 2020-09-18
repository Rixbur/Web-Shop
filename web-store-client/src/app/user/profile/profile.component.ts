import { Component, OnInit, OnDestroy } from '@angular/core';

import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { nameValidator } from '../../orders/cart/name-validator';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
 
export class ProfileComponent implements OnInit, OnDestroy {
  public showName: string='';
  public showEmail: string='';
  public showAddress: string='';
  public showEdit: boolean=false;
  private profileSub: Subscription=null;
  private activeSubscriptions: Subscription[] = []
  public profileForm: FormGroup;
  private user: {name: string, email: string, address: string};

  constructor(private userService: UserService,
    private formBuilder: FormBuilder,
) {
  this.profileForm = this.formBuilder.group({
    name: ['', [Validators.required, nameValidator]],
    address: ['', [Validators.required, Validators.pattern('[0-9]+ [ a-zA-Z0-9]+')],],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    newPassword: ['', ]
  });
  }

  ngOnInit(): void {
    console.log("popunjavamo!");
    this.getUserInfo();    

 }

  ngOnDestroy(){
    this.activeSubscriptions.forEach(sub=>sub.unsubscribe);
  }

  public get name() {
    return this.profileForm.get('name');
  }
  public get address() {
    return this.profileForm.get('address');
  }
  public get email() {
    return this.profileForm.get('email');
  }
  public get password() {
    return this.profileForm.get('password');
  }
  public get newPassword() {
    return this.profileForm.get('newPassword');
  }
  getUserInfo(){
    if(this.userService.hasUser()){
     const userSub = this.userService.userInfo(this.userService.getUserEmail()).subscribe(
     data => {
       if(data!=null){
          this.user={email: data.email, name: data.name, address: data.address};
          console.log(this.user);
          this.profileForm.setValue({
           name: this.user.name, 
           address: this.user.address, 
           email: this.user.email,
           password: '',
           newPassword: ''
         });
         this.showName=data.name;
         this.showAddress=data.address;
         this.showEmail=data.email;
         return this.user;
       }
       else{
         return null;
       }
       
     },
     err => {
       console.log(err);
     },
     () => {
       // this.getRouter.navigate(['/']);
     });
   }
  }
  public submitForm(data): void {
    if (!this.profileForm.valid) {
      window.alert('Not valid!');
      return;
    }
    this.profileSub = this.userService.update({
      email: this.email.value,
      password: this.password.value,
      name: this.name.value,
      address: this.address.value,
      newPassword: this.newPassword.value==''? this.password.value:this.newPassword.value
    }).subscribe(
      data => {
        if(data.status==201){
          window.alert("Succesfully updated!");
          this.showEdit=false;
        }      
        else{
          window.alert("Couldn't update, please try again later");
        }
      },
      err => {
        console.log(err);
      },
      () => {
        // this.getRouter.navigate(['/']);
      });
    this.activeSubscriptions.push(this.profileSub);

  }
  

}
