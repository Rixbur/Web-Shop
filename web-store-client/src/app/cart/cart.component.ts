import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product.model';
import { CartService } from '../cart.service';
type ShoppingCartItem = {product: Product, amount: number};

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  get items() {
    return this.m_cartService.getProducts();
  }

  constructor(public m_cartService: CartService) {

  }

  ngOnInit(): void {
  }
  calculateEntireAmount(): number {
    let entireAmount=0;
    for (let item of this.items) {
      entireAmount+=item.amount*item.product.m_price;
    }      
    return entireAmount; 

  }


}
