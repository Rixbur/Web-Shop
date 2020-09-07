import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { Order } from '../orders/order.model';
import { ExportableProduct } from '../product/model/exportable.product.model';
import { HttpErrorHandler } from '../utils/http-error-handler.model';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class CartService extends HttpErrorHandler {
  private items: ExportableProduct[] = [];
  private readonly ordersUrl = 'http://localhost:3000/orders/';

  constructor(private http: HttpClient, router: Router, private productService:ProductService) {
    super(router);
  }

  public addToCart(product: ExportableProduct): boolean {

    for (const cartProduct of this.getItems()) {
      if(cartProduct['_id'] == product['_id'] ){  
        console.log(cartProduct);
        console.log(product);
        return false;
      }
    }
    console.log(product);
    this.items.push(product);
    return true;
  }

  public getItems(): ExportableProduct[] {
    return this.items;
  }

  public clearCart(): ExportableProduct[] {
    this.items = [];
    return this.items;
  }

  public removeProductFromCartById(id: string): ExportableProduct[] {
    this.items = this.items.filter((p: ExportableProduct) => p._id === id);
    return this.items;
  }

  public createAnOrder(formData): Observable<Order> {
    const body = { ...formData, products: this.items };
    return this.http
      .post<Order>(this.ordersUrl, body)
      .pipe(catchError(super.handleError()));
    }

  getOrders(): Observable<Order[]> {
    return this.http
      .get<Order[]>(this.ordersUrl)
      .pipe(catchError(super.handleError()));
  }

  getOrderById(id: string): Observable<Order> {
    return this.http
      .get<Order>(this.ordersUrl + id)
      .pipe(catchError(super.handleError()));
  }

  removeOrderById(id: string): Observable<Order[]> {
    return this.http.delete(this.ordersUrl + id).pipe(
      catchError(super.handleError()),
      switchMap(() => this.getOrders())
    );
  }
}
