import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product.model';
import { CartService } from '../cart.service';
import {ConnectionService} from '../services/connection.service';
type ShoppingCartItem = {product: Product, amount: number};

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  buttonText = "Submit";
  loading = false;

  get items() {
    return this.m_cartService.getProducts();
  }

  constructor(
    public m_cartService: CartService,
    public http: ConnectionService
  ) { }

  ngOnInit(): void {
  }
  calculateEntireAmount(): number {
    let entireAmount=0;
    for (let item of this.items) {
      entireAmount+=item.amount*item.product.m_price;
    }      
    return entireAmount; 

  }


  register() {
    this.loading = true;
    this.buttonText = "Submitting..";
    let user = {
      name: 'Korisnik',
      email: 'korisnik.tester2@gmail.com',
      cart: ''
    }
    this.http.sendEmail("http://localhost:3000/sendmail", user).subscribe(
      data => {
        let res:any = data; 
        console.log("${user.name}, mail has been sent. Id:  ${res.messageId}");
      },
      err => {
        console.log(err);
        this.loading = false;
        this.buttonText = "Submit";
      },() => {
        this.loading = false;
        this.buttonText = "Submit";
      }
    );
  }

}
