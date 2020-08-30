import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { ExportableProduct } from './model/exportable.product.model';
import { HttpErrorHandler } from '../utils/http-error-handler.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends HttpErrorHandler {
  private products: Observable<ExportableProduct[]>;
  private readonly productsUrl = 'http://localhost:3000/products/';

  constructor(private http: HttpClient, router: Router) {
    super(router);
    this.refreshProducts();
  }

  private refreshProducts(): Observable<ExportableProduct[]> {
    this.products = this.http
      .get<ExportableProduct[]>(this.productsUrl)
      .pipe(catchError(super.handleError()));
    return this.products;
  }
  // public volimte(_prods:ExportableProduct[]){
  //   for(const _prod of _prods){
  //     for(const key in _prod){
  //       if(key=='mapQuantOfSizes'){
  //         _prod.mapa = new Map(JSON.parse(_prod[key]));
  //       }
  //     }
  //   }
  // }
  public getProducts(): Observable<ExportableProduct[]> {
    return this.products;
  }

  public getProductById(id: string): Observable<ExportableProduct> {
    return this.http
      .get<ExportableProduct>(this.productsUrl + id)
      .pipe(catchError(super.handleError()));
  }

  public addAProduct(data) {
    const uploadData = this.makeFormData(data);
    return this.http
      .post<ExportableProduct>(this.productsUrl, uploadData)
      .pipe(catchError(super.handleError()));
  }
  public patchProduct(id: string,data):Observable<ExportableProduct>{
    
    return this.http
      .patch<any>(this.productsUrl + id,{'size':data})
      .pipe(catchError(super.handleError()));
  }

  public removeProductById(id: string): Observable<ExportableProduct[]> {
    return this.http.delete(this.productsUrl + id).pipe(
      catchError(super.handleError()),
      switchMap(() => this.refreshProducts())
    );
  }

  public makeFormData(data):FormData{
    const uploadData = new FormData();
    for (const key in data) {
      if (key == 'productImage') {
        for(let image of data[key]){
          uploadData.append('productImage', image, image.name);
        }
      }
      if(key == 'mapQuantOfSizes'){
        const mapa = JSON.stringify(Array.from(data[key].entries()));
        uploadData.append(key,mapa);
      }
      else {
        uploadData.append(key, data[key]);
      }
    }
    console.log(uploadData);
    return uploadData;
  }
}
