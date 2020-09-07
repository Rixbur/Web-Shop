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

  login(user: User) {
    console.log('Sending request');
    return this.http
      .post(`${usersUrl}/login`, user)
      .subscribe(e => console.log(e));
  }

  register(user: User) {
    console.log('Sending register request');
    return this.http
      .post(`${usersUrl}/register`, user)
      .subscribe(e => console.log(e));
  }
}
