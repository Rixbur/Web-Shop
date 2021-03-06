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
import { RecommendedService } from 'src/app/services/recommended.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css'],
})
export class ProductInfoComponent implements OnDestroy {
  public product: ExportableProduct;
  public similarProducts: ExportableProduct[] = [];
  private activeSubscriptions: Subscription[];
  public addToCartForm: FormGroup;

  private readonly DISPLAYED_SIMILARS: number = 2;
  private similarsCount: number = 0;
  public prodIsUpdated: boolean = false;
  public isInWishlist: boolean = false;
  public imageObject: Array<object>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    public filterService: FilterService,
    private formBuilder: FormBuilder,
    public userService: UserService,
    private recommendedService: RecommendedService,
    private wishlistService: WishlistService
  ) {
    this.prodIsUpdated = false;
    this.activeSubscriptions = [];
    this.findProductById2();
    if(this.hasUser()){
      this.findInWishlist();
    }
    this.addToCartForm = this.formBuilder.group({
      selectedSize:['']
    });


  }
  hasUser(){return this.userService.hasUser();}
  userEmail(){return this.userService.getUserEmail();}
  isAdmin(){ return this.userService.isAdmin();}

  findInWishlist(){ 
    const sub = this.wishlistService.getWishlist(this.userService.getUserEmail())
        .subscribe(r => {
          const data = r[0];
          if(data != null && data.products.indexOf(this.product._id) != -1){
            this.isInWishlist = true;
          }
        });
        this.activeSubscriptions.push(sub);
}

removeFromWishlist(){
  this.isInWishlist = false;
  this.wishlistService.removeProductFromWislist(this.userService.getUserEmail(), this.product._id);

}

addToWishlist(){
  this.isInWishlist = true;
  this.wishlistService.addProductToWishlist(this.userService.getUserEmail(), this.product._id);

}

  private findProductById2() {
    const getProductSub = this.route.paramMap
      .pipe(
        map((params) => params.get('productId')),
        switchMap((productIdParam) =>
          this.productService.getProductById(productIdParam)
        ),
        map(_prod => this.mapParsing(_prod))
      ).subscribe((product) => {
          this.product = product;
          this.addToRecommended({p_id:product['_id']});
          this.createSimilarProducts(product);
      });
    this.activeSubscriptions.push(getProductSub);
  }
  addToRecommended(data){
    if(this.userService.hasUser()){
      const newSub = this.recommendedService
        .patchProduct(this.userService.getUserEmail(),data)
        .subscribe();
      this.activeSubscriptions.push(newSub);
    }
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

  createSimilarProducts(product){

    //console.log(product);

    //TODO Refactor this function
    const typeSub = this.productService.getProductsByArticleType(product.articleType)
      .subscribe(pByType => {
        if(pByType.length > 1){
          for (const p of pByType) {
            const alreadyInList = this.similarProducts.map(p => p._id)
                    .some(id => id == p._id);

            if((product._id != p._id) && !!alreadyInList && (this.similarsCount < this.DISPLAYED_SIMILARS)) {
              this.similarProducts.push(p);
              this.similarsCount += 1;
            } else if(this.similarsCount >= this.DISPLAYED_SIMILARS) {
              break;
            }
          }
        }
      });

    if(this.similarsCount < this.DISPLAYED_SIMILARS){
      this.productService.getProductsBySeason(product.season)
      .subscribe(pByType => {
        if(pByType.length > 1){
          for (const p of pByType) {
            const alreadyInList = this.similarProducts.map(p => p._id)
                    .some(id => id == p._id);

            if((product._id != p._id) && !alreadyInList && (this.similarsCount < this.DISPLAYED_SIMILARS)) {
              this.similarProducts.push(p);
              this.similarsCount += 1;
            } else if(this.similarsCount >= this.DISPLAYED_SIMILARS) {
              break;
            }
          }
        }
      });
    }

    if(this.similarsCount < this.DISPLAYED_SIMILARS){
      this.productService.getProductsByCategory(product.category)
      .subscribe(pByType => {
        if(pByType.length > 1){
          for (const p of pByType) {
            const alreadyInList = this.similarProducts.map(p => p._id)
                    .some(id => id == product._id);

            if((product._id != p._id) && !alreadyInList && (this.similarsCount < this.DISPLAYED_SIMILARS)) {
              this.similarsCount += 1;
            } else if(this.similarsCount >= this.DISPLAYED_SIMILARS) {
              break;
            }
          }
        }
      });
    }

    //Any product goes to similar ones if the current array does not have enough elements
    if(this.similarsCount < this.DISPLAYED_SIMILARS) {
      this.productService.getProducts().subscribe(products => {
        let j = 0;
        for(let i = this.similarsCount ; i < this.DISPLAYED_SIMILARS && i< products.length; i++){
          const alreadyInList = this.similarProducts.map(p => p._id)
                  .some(id => id == product._id);
          if(!alreadyInList){
            this.similarProducts.push(products[j]);
          }
        }
      });
    }


  }
}
