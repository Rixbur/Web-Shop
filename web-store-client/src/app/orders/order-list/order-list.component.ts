import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { Order } from '../order.model';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent implements OnInit {
  orders: Observable<Order[]>;

  hasUser(){return this.userService.hasUser();}
  userEmail(){return this.userService.getUserEmail();}
  isAdmin(){ return this.userService.isAdmin();}

  constructor(private cartService: CartService,
              private userService: UserService) {

    if(this.isAdmin()){
      this.orders = this.cartService.getOrders();
    }
    else if(this.hasUser() && !this.isAdmin()){
      const email=this.userEmail();
      this.orders = this.cartService.getOrdersByEmail(email);
    }    
    else{

    }
  }

  removeOrder(id: string) {
    this.orders = this.cartService.removeOrderById(id);
  }

  ngOnInit() {}
}
