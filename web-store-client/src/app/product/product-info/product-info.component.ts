import { map, switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductService } from '../product.service';
import { ExportableProduct } from '../model/exportable.product.model';
import { CartService } from '../../orders/cart.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css'],
})
export class ProductInfoComponent implements OnDestroy {
  public product: ExportableProduct;
  private activeSubscriptions: Subscription[];

  public imageObject: Array<object>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) {
    this.activeSubscriptions = [];
    this.findProductById2();

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
        )
      )
      .subscribe((product) => (this.product = product));
    this.activeSubscriptions.push(getProductSub);
  }

  ngOnDestroy() {
    this.activeSubscriptions.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }

  public addToCart() {
    this.cartService.addToCart(this.product);
    window.alert('Your product has been added to the cart!');
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
}
