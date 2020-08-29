import { Injectable } from '@angular/core';
import { Product } from './product/model/product.model';

type ShoppingCartItem = {product: Product, amount: number};

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private m_items: ShoppingCartItem[] = [];

  constructor() {
    // this.m_items.push({product: new Product('1',"Timberland verdana","Crvene cipele","prolece",15,true,"cokule", 39), amount:1});
    // this.m_items.push({product: new Product('2', "Nike ignis","Plave patike","leto",30,true,"patike",41), amount:2});
    // this.m_items.push({product: new Product('3', "H&M splash","Zute cizme","jesen",10,false,"cizme",22), amount:3});
  }

  getProducts(): ShoppingCartItem[]{
    return this.m_items;
  }

  addProductToCart(prod: Product) {
    this.m_items.push({product: prod, amount: 1});
  }

  removeItemFromCart(item: ShoppingCartItem){

    const index = this.m_items.indexOf(item, 0);
    if (index > -1) {
       this.m_items.splice(index, 1);
      }
    }ls


  calculateEntireAmount(): number {
    let entireAmount=0;
    for (let item of this.m_items) {
      entireAmount+=item.amount*item.product.m_price;
    }
    return entireAmount;

  }
}
