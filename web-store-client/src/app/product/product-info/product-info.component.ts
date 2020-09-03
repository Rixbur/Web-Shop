import { map, switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductService } from '../product.service';
import { ExportableProduct } from '../model/exportable.product.model';
import { CartService } from '../../orders/cart.service';
import { FilterService } from '../filter.service';
import { FormGroup, FormBuilder } from '@angular/forms';

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
    private formBuilder: FormBuilder
  ) {
    this.prodIsUpdated = false;
    this.activeSubscriptions = [];
    this.findProductById2();
    this.addToCartForm = this.formBuilder.group({
      selectedSize:['']
    });
    

  }

  //   private findProductById() {
  //     this.route.paramMap.subscribe((params) => {
  //       const pId = params.get('productId');
  //       const getProductSub = this.productService
  //         .getProductById(pId)
  //         .subscribe((product) => (this.product = product));
  //       this.activeSubscriptions.push(getProductSub);
  //     });
  //   }

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

      // this.product['selectedSize']=(<HTMLOptionElement>_event.target).value;
  }

  public addToCart(selectedSize: HTMLOptionElement) {
    this.product['selectedSize'] = selectedSize.value;
    const rez = this.cartService.addToCart(this.product);
    if(!rez){
      window.alert("You have already added this product to cart.");
    } else {
      window.alert('Your product has been added to the cart!');
    }
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

  customOptions: OwlOptions = {
    margin: 10,
    stagePadding:20, //da li da se vide susedi
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
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

  public getMap(_product: ExportableProduct){
    
    for(const key in _product){
      if(key=='mapQuantOfSizes'){
        _product['mapa'] = new Map(JSON.parse(_product[key]));
      }
    }

    return _product['mapa'];
    

  }
  mapParsing(_prod:ExportableProduct){
    for(const key in _prod){
      if(key=='mapQuantOfSizes'){
        _prod.mapa = new Map(JSON.parse(_prod[key]));
      }
    }
    this.prodIsUpdated=true;
    //console.log(_prod.mapa);
    return _prod;
}
}
