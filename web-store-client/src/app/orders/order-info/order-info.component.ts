import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order } from '../order.model';
import { CartService } from '../cart.service';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.css'],
})
export class OrderInfoComponent implements OnInit, OnDestroy {
  order: Order;
  activeSubscriptions: Subscription[];

  constructor(private route: ActivatedRoute, private cartService: CartService) {
    this.activeSubscriptions = [];
    const getSub = this.route.paramMap
      .pipe(
        map((paramMap) => paramMap.get('orderId')),
        switchMap((orderId) => this.cartService.getOrderById(orderId))
      )
      .subscribe((order) => {
        this.order = order;
      });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.activeSubscriptions.forEach(sub => sub.unsubscribe());
  }
}
