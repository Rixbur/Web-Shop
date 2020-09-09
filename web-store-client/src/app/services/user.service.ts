import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

type User = {
  email: string;
  password: string;
};

const usersUrl = 'http://localhost:3000/users';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  
  private userEmail: string ="";
  //private admin: boolean=false;

  login(user: User) {
    console.log('Sending request');
    return this.http
      .post(`${usersUrl}/login`, user, {observe: "response"})
      .subscribe(e => {
        if(e.status===200){
            this.userEmail=user.email;
            window.alert("Succesfully logged in!");
            // if(user.email==="admin@admin"){
            //   this.admin=true;
            // }
        }
        else{
          window.alert("Couldn't log in, check username and password");
        }
      
      });
  }

  register(user: User) {
    console.log('Sending register request');
    return this.http
      .post(`${usersUrl}/register`, user, {observe: "response"})
      .subscribe(e => {
        if(e.status===201){
            this.userEmail=user.email;
            console.log("Already registered");
            // if(user.email==="admin@admin"){
            //   this.admin=true;
            // }
        }
        else if(e.status===202){
          window.alert("Successfully registered");

        }
        else{
          window.alert("Couldn't register, please try again");
        }
      
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
