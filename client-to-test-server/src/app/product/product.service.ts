import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { Product } from './product.model';
import { HttpErrorHandler } from '../utils/http-error-handler.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends HttpErrorHandler {
  private products: Observable<Product[]>;
  private readonly productsUrl = 'http://localhost:3000/products/';

  constructor(private http: HttpClient, router: Router) {
    super(router);
    this.refreshProducts();
  }

  private refreshProducts(): Observable<Product[]> {
    this.products = this.http
      .get<Product[]>(this.productsUrl)
      .pipe(catchError(super.handleError()));
    return this.products;
  }

  public getProducts(): Observable<Product[]> {
    return this.products;
  }

  public getProductById(id: string): Observable<Product> {
    return this.http
      .get<Product>(this.productsUrl + id)
      .pipe(catchError(super.handleError()));
  }

  public addAProduct(data) {
    const uploadData = new FormData();
    for (const key in data) {
      if (key == 'productImage') {

        uploadData.append('productImage', data[key], data[key].name);
      }
      else {
        uploadData.append(key, data[key]);
      }
    }
    return this.http
      .post<Product>(this.productsUrl, uploadData)
      .pipe(catchError(super.handleError()));
  }

  public removeProductById(id: string): Observable<Product[]> {
    return this.http.delete(this.productsUrl + id).pipe(
      catchError(super.handleError()),
      switchMap(() => this.refreshProducts())
    );
  }
}
