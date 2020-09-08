import { Injectable } from '@angular/core';
import { About } from './about.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler } from '../utils/http-error-handler.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AboutService extends HttpErrorHandler {
  private item : Observable<About>;
  private readonly aboutUrl = 'http://localhost:3000/about';

  constructor(
    private http: HttpClient,
    router: Router
  ) {
    super(router);
   }
  
  getAboutInfo(): Observable<About> {
    this.item =  this.http
      .get<About>(this.aboutUrl)
      .pipe(catchError(super.handleError()));
    return this.item;
  }


}
