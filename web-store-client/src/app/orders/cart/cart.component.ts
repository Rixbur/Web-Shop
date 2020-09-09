import { Subscription } from 'rxjs';
import { Order } from '../order.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ExportableProduct } from '../../product/model/exportable.product.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { nameValidator } from './name-validator';
import { ConnectionService } from '../../services/connection.service';
import { ProductService } from '../../services/product.service';
import { FilterService } from '../../services/filter.service';
import { SumPipe } from '../../product/sum.pipe';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  public items: ExportableProduct[];
  public checkoutForm: FormGroup;
  private activeSubscriptions: Subscription[];

  constructor(
    private cartService: CartService,
    public http: ConnectionService,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private filterServise: FilterService,
  ) {
    this.activeSubscriptions = [];
    this.items = this.cartService.getItems();
    this.checkoutForm = this.formBuilder.group({
      name: ['', [Validators.required, nameValidator]],
      address: [
        '',
        [Validators.required, Validators.pattern('[0-9]+ [ a-zA-Z0-9]+')],
      ],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.activeSubscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  public submitForm(data): void {
    if (!this.checkoutForm.valid) {
      window.alert('Not valid!');
      return;
    }
    let allItemsList = [];
    let suma:number = 0;
    this.items.forEach( (item) => {
          
      const str = [];
      str.push('Product: ');
      str.push(item['name']);
      str.push(', size: ');
      str.push(item['selectedSize']);
      str.push(', price: ');
      str.push(item['price']);
      str.push(`.  <br/> `);
      
      suma += item['price'];
      allItemsList.push(str.join(""));

      const patchProductSingleSub = this.productService
      .patchProduct(item._id,item['selectedSize'])
      .subscribe((response)=>{
        window.alert('Poslato');
      });
      this.activeSubscriptions.push(patchProductSingleSub);

    });

    allItemsList.push(' In total: ');
    allItemsList.push(suma);
    let allItems = allItemsList.join("");
    
    const body = { data: data, products: allItems };
    this.register(body);
  
    const createSub = this.cartService
      .createAnOrder(data)
      .subscribe((order: Order) => {
        window.alert(
          `Your order (number: ${order._id}) is successfully created!`
        );
        this.items = this.cartService.clearCart();
        this.checkoutForm.reset();
      });
    this.activeSubscriptions.push(createSub);
  }

  register(data) {
    const connSub =  this.http.sendEmail("http://localhost:3000/sendmail", data)
      .subscribe(
        data => {
          let res:any = data;
          console.log("Mail has been sent.");
          },
        err => {
          console.log(err);
        },() => {
          console.log("Here");
        }
      );
      this.activeSubscriptions.push(connSub);
  }

  public get name() {
    return this.checkoutForm.get('name');
  }
  public get address() {
    return this.checkoutForm.get('address');
  }
  public get email() {
    return this.checkoutForm.get('email');
  }

  customOptions: OwlOptions = {
    margin: 10,
    stagePadding:20, //da li da se vide susedi
    loop: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }
}
