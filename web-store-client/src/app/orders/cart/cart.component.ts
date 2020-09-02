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
    let allItemsList = [];
    let suma:number = 0;
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
          this.cartService.removeProductFromCartById(item['_id']);
          window.alert('Product ${item.nekoIme} size ${item.selectedSize} is no longer available. Try ordering some other size please.');
        } else {
          
          const str = [];
          str.push('Product: ');
          str.push(item['name']);
          str.push(', size: ');
          str.push(item['selectedSize']);
          str.push(', price: ');
          str.push(item['price']);
          str.push(`.   `);
          
          suma += item['price'];
          allItemsList.push(str);

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
    //umesto ovoga pravi string
    //const body = { data: data, products: this.items };
    allItemsList.push(' In total: ');
    allItemsList.push(suma);
    let allItems = allItemsList.join("");
    console.log('........................');
    console.log(allItems);
    
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
