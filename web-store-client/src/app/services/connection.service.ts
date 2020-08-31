import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor(private http: HttpClient) { }

  httpPost(url, {}) {
    return this.http.post(url, { name: "User" });
  }

  sendEmail(url, data) {
    return this.http.post(url, data);
  }
}
