import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product.model';
import { CartService } from '../cart.service';

type ShoppingCartItem = {product: Product, amount: number};


@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {

  get items() {
    return this.m_cartService.getProducts();
  }

  constructor(public m_cartService: CartService) {

  }

  ngOnInit(): void {
  }

  onMinus(item: ShoppingCartItem){
    if(item.amount>0){
      item.amount=item.amount-1;
    }
    else{
      
    }
  }
  onPlus(item: ShoppingCartItem){
    item.amount=item.amount+1;

  }
}
