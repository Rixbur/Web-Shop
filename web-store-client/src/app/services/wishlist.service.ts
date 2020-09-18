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
  private readonly wishlistUrl = 'http://localhost:3000/wishlist/';

  constructor(
    private http: HttpClient,
    router: Router
  ) {
    super(router);
   }

   getWishlist(user: string): Observable<Wishlist> {
    this.wishlist =  this.http
      .post<Wishlist>(this.wishlistUrl, {user})
      .pipe(catchError(super.handleError()));
    return this.wishlist;
  }

  createWishlist(user: string): Observable<Wishlist> {
    console.log(user);
    this.wishlist = this.http
      .post<Wishlist>(this.wishlistUrl + 'new', {user})
      .pipe(catchError(super.handleError()));

    return this.wishlist;
  }

  addProductToWishlist(user: string, productId:string) {
    let body = {userId: user, 
                productId: productId
    };
    const sub = this.http
    .post<Wishlist>(this.wishlistUrl + 'add', body)
    .subscribe(data =>{
      console.log("The product is added to the wishlist.");  
    });
    
  return this.wishlist;
  }

  removeProductFromWislist (user: string, productId:string){
    this.http
      .post<Wishlist>(this.wishlistUrl + "remove", {userId: user, productId: productId })
      .subscribe(data =>{
        console.log("The product is removed from the wishlist.");  
      });

  }
}
