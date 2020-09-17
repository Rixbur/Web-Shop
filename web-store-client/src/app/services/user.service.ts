import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorHandler } from '../utils/http-error-handler.model';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

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
  constructor(private http: HttpClient, router: Router) {
    super(router);
  }
  
  private userEmail: string ="";
   
  public setUserEmail(v : string) {
    console.log(v);
    this.userEmail = v;
  }
  

  public userInfo(email: string): Observable<User> {
    return this.http
      .get<User>(usersUrl + '/info/' + email)
      .pipe(catchError(super.handleError()));
  }

  public login(loginInfo: LoginInfo) {
    return this.http
      .post<User>(usersUrl + '/login', loginInfo, {observe: "response"})
      .pipe(catchError(super.handleError()));
  }
  public register(user: User) {
    return this.http
      .post<User>(usersUrl + '/register', user, {observe: "response"})
      .pipe(catchError(super.handleError()));
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
