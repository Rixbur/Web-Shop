import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import {Recommended} from '../recommended/recommendedModel';
import { HttpErrorHandler } from '../utils/http-error-handler.model';
@Injectable({
  providedIn: 'root'
})
export class RecommendedService extends HttpErrorHandler {
  private recommended: Observable<Recommended[]>;
  private readonly recommendedUrl = 'http://localhost:3000/recommended/';
  constructor(private http:HttpClient, router: Router) { 
    super(router);
    this.refreshRecommended();
  }

  private refreshRecommended():Observable<Recommended[]>{
    this.recommended = this.http
      .get<Recommended[]>(this.recommendedUrl)
      .pipe(catchError(super.handleError()));
    return this.recommended;
  }

  public getRecommended():Observable<Recommended[]>{
    return this.recommended;
  }
  public getRecommendedByEmail(email: string): Observable<Recommended> {
    return this.http
      .get<Recommended>(this.recommendedUrl + email)
      .pipe(catchError(super.handleError()));
  }

  public patchProduct(email: string,p_id:string):Observable<Recommended>{

    return this.http
      .patch<any>(this.recommendedUrl + email,p_id)
      .pipe(catchError(super.handleError()));
  }
}
