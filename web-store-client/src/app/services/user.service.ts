import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorHandler } from '../utils/http-error-handler.model';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

type User = {
  email: string;
  password: string;
  address: string;
  name: string;
};
type LoginInfo = {
  email: string;
  password: string;
};
const usersUrl = 'http://localhost:3000/users';

@Injectable({
  providedIn: 'root',
})
export class UserService extends HttpErrorHandler{
  constructor(private http: HttpClient,router: Router) {
    super(router);
  }
  
  private userEmail: string ="";
  

  login(loginInfo: LoginInfo) {
    console.log('Sending request');
    return this.http
      .post(`${usersUrl}/login`, loginInfo, {observe: "response"})
      .subscribe(e => {
        if(e.status==201){
            this.userEmail=loginInfo.email;
            window.alert("Succesfully logged in!");
        }
        else{
          window.alert("Couldn't log in, check username and password");
        }
      
      },
      undefined,
      ()=>{this.getRouter.navigate(['/']);
    });
  }

  register(user: User) {
    console.log('Sending register request');
    return this.http
      .post(`${usersUrl}/register`, user, {observe: "response"})
      .subscribe(e => {
        if(e.status===201){
            this.userEmail=user.email;
            
            window.alert("Already registered");
            
        }
        else if(e.status===202){
          window.alert("Successfully registered");

        }
        else{
          window.alert("Couldn't register, please try again");
        }
      
      },
      undefined,
      ()=>{this.getRouter.navigate(['/login']);
    });
  }

  getUserEmail(){
    return this.userEmail;
  }

  hasUser(){
    return this.userEmail!="";
  }
  isAdmin(){
    return this.userEmail==="admin@admin";
  }

  logout(){
    this.userEmail="";
    window.alert("Successfully logged out!");

  }
}
