import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Observable } from 'rxjs';
import { Order } from '../order.model';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent implements OnInit {
  orders: Observable<Order[]>;

  constructor(private cartService: CartService) {
    this.orders = this.cartService.getOrders();
  }

  removeOrder(id: string) {
    this.orders = this.cartService.removeOrderById(id);
  }

  ngOnInit() {}
}
