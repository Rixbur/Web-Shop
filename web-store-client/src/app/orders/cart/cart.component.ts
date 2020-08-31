import { Subscription } from 'rxjs';
import { Order } from '../order.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../cart.service';
import { ExportableProduct } from '../../product/model/exportable.product.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { nameValidator } from './name-validator';
import { ConnectionService } from '../../services/connection.service';
import { ProductService } from '../../product/product.service';
import { FilterService } from 'src/app/product/filter.service';
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
    private filterServise: FilterService
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
    this.items.forEach( (item) => {
        let exist = false;
        let quantityOfSelected = 0;
        const mapLen = item['mapa'].size;

        for (const element of item['mapa']) {
          //selectedSize exists in sizes
          if(element[0].toString() == item['selectedSize']){
            if(element[1] > 0){
              exist = true;
              quantityOfSelected = element[1];
            }
            break;
          }
          
        }
        if(!exist){
          window.alert('Product ${item.nekoIme} size ${item.selectedSize} is no longer available. Try some other size please.');
        } else {

          const patchProductSingleSub = this.productService
          .patchProduct(item._id,item['selectedSize'])
          .subscribe((response)=>{
            window.alert('Poslato');
          });
          this.activeSubscriptions.push(patchProductSingleSub);
          
          //If this was the last pair of shoes, after ordering it, product should be deleted
          if(mapLen == 1 && quantityOfSelected == 1){

            const deleteSub = this.productService
              .removeProductById(item._id)
              .subscribe(() => {
                this.cartService.removeProductFromCartById(item._id);
              });
            this.activeSubscriptions.push(deleteSub);
          }
        }

      });
    
    this.register(data);
  
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
          console.log("${data.name}, mail has been sent. Id:  ${res.messageId}");
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
}
