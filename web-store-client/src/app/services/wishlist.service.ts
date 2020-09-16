import { Injectable } from '@angular/core';
import { HttpErrorHandler } from '../utils/http-error-handler.model';
import { Wishlist } from './wishlist.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class WishlistService extends HttpErrorHandler {
  private wishlist : Observable<Wishlist>;
  private readonly aboutUrl = 'http://localhost:3000/wishlist/';

  constructor(
    private http: HttpClient,
    router: Router
  ) {
    super(router);
   }

   getWishlist(userId: string): Observable<Wishlist> {
    this.wishlist =  this.http
      .get<Wishlist>(this.aboutUrl + userId)
      .pipe(catchError(super.handleError()));
    return this.wishlist;
  }

  createWishlist(user: string): Observable<Wishlist> {
    this.wishlist = this.http
      .post<Wishlist>(this.aboutUrl, user)
      .pipe(catchError(super.handleError()));

    return this.wishlist;
  }

  addProductToWishlist(userId: string, porductId:string) {
    this.wishlist = this.http
    .post<Wishlist>(this.aboutUrl + "add", {userId: userId, porductId: porductId });
    .pipe(catchError(super.handleError()));

  return this.wishlist;
  }

  removeProductFromWislist (userId: string, porductId:string){
    this.wishlist = this.http
      .post<Wishlist>(this.aboutUrl + "remove", {userId: userId, porductId: porductId })
      .pipe(catchError(super.handleError()));

    return this.wishlist;
  }
}
