import { map, switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductService } from '../../services/product.service';
import { ExportableProduct } from '../model/exportable.product.model';
import { CartService } from '../../services/cart.service';
import { FilterService } from '../../services/filter.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css'],
})
export class ProductInfoComponent implements OnDestroy {
  public product: ExportableProduct;
  private activeSubscriptions: Subscription[];
  public addToCartForm: FormGroup;

  public prodIsUpdated: boolean = false;
  public imageObject: Array<object>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    public filterService: FilterService,
    private formBuilder: FormBuilder,
    public userService: UserService
  ) {
    this.prodIsUpdated = false;
    this.activeSubscriptions = [];
    this.findProductById2();
    this.addToCartForm = this.formBuilder.group({
      selectedSize:['']
    });


  }
  hasUser(){return this.userService.hasUser();}
  userEmail(){return this.userService.getUserEmail();}
  isAdmin(){ return this.userService.isAdmin();}

  private findProductById2() {
    const getProductSub = this.route.paramMap
      .pipe(
        map((params) => params.get('productId')),
        switchMap((productIdParam) =>
          this.productService.getProductById(productIdParam)
        ),
        map(_prod => this.mapParsing(_prod))
      )
      .subscribe((product) => {this.product = product});
    this.activeSubscriptions.push(getProductSub);
  }

  ngOnDestroy() {
    this.activeSubscriptions.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }

  public onChangeSize(){

  }

  public addToCart(selectedSize: HTMLOptionElement) {
    this.product['selectedSize'] = selectedSize.value;
    const rez = this.cartService.addToCart(this.product);
    if(!rez){
      window.alert("You have already added this product to cart.");
    } else {
      window.alert('Your product has been added to the cart!');
    }
    // window.location.href='http://localhost:4200/';
  }

  public removeFromStore() {
    const deleteSub = this.productService
      .removeProductById(this.product._id)
      .subscribe(() => {
        this.cartService.removeProductFromCartById(this.product._id);
        this.router.navigate(['/']);
      });
    this.activeSubscriptions.push(deleteSub);
  }

  public getMap(_product: ExportableProduct){

    for(const key in _product){
      if(key=='mapSizeQuantities'){
        _product['map'] = new Map(JSON.parse(_product[key]));
      }
    }

    return _product['map'];


  }
  mapParsing(_prod:ExportableProduct){
    for(const key in _prod){
      if(key=='mapSizeQuantities'){
        _prod.map = new Map(JSON.parse(_prod[key]));
      }
    }
    this.prodIsUpdated=true;
    //console.log(_prod.map);
    return _prod;
  }
  customOptions: OwlOptions = {
    margin: 10,
    stagePadding:20, //da li da se vide susedi
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
}
