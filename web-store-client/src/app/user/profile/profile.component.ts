import { Component, OnInit, OnDestroy } from '@angular/core';

import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { nameValidator } from '../../orders/cart/name-validator';
import { WishlistService } from 'src/app/services/wishlist.service';
import { ExportableProduct } from 'src/app/product/model/exportable.product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
 
export class ProfileComponent implements OnInit, OnDestroy {
  public showName: string='';
  public showEmail: string='';
  public showAddress: string='';
  public showEdit: boolean=false;
  private profileSub: Subscription=null;
  private activeSubscriptions: Subscription[] = [];
  public profileForm: FormGroup;
  public wishlistProducts: ExportableProduct[] = [];
  private user: {name: string, email: string, address: string};

  constructor(private userService: UserService,
    private formBuilder: FormBuilder,
    private wishlistService: WishlistService,
    private productService: ProductService
) {
  this.profileForm = this.formBuilder.group({
    name: ['', [Validators.required, nameValidator]],
    address: ['', [Validators.required, Validators.pattern('[0-9]+ [ a-zA-Z0-9]+')],],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    newPassword: ['', ]
  });
  }

  ngOnInit(): void {
    console.log("popunjavamo!");
    this.getUserInfo();   
    
    if(this.userService.hasUser()){
      const sub = this.wishlistService.getWishlist(this.userService.getUserEmail())
        .subscribe(data => {  

          const element = data[0];
          const listOfIds =element.products;

          //Getting products from ids
          listOfIds.forEach( id => {
            //only if they still exist in database
            this.productService.getProducts().subscribe(products => {
              for (const product of products) {
                if(product._id == id) {
                  const userSub = this.productService.getProductById(id).subscribe(product => {
                    this.wishlistProducts.push(product);
                  });
                  this.activeSubscriptions.push(userSub);
                  break;
                }
              }
            });
          });
        });
        this.activeSubscriptions.push(sub);
    }
 }

  ngOnDestroy(){
    this.activeSubscriptions.forEach(sub=>sub.unsubscribe);
  }

  public get name() {
    return this.profileForm.get('name');
  }
  public get address() {
    return this.profileForm.get('address');
  }
  public get email() {
    return this.profileForm.get('email');
  }
  public get password() {
    return this.profileForm.get('password');
  }
  public get newPassword() {
    return this.profileForm.get('newPassword');
  }
  getUserInfo(){
    if(this.userService.hasUser()){
     const userSub = this.userService.userInfo(this.userService.getUserEmail()).subscribe(
     data => {
       if(data!=null){
          this.user={email: data.email, name: data.name, address: data.address};
          console.log(this.user);
          this.profileForm.setValue({
           name: this.user.name, 
           address: this.user.address, 
           email: this.user.email,
           password: '',
           newPassword: ''
         });
         this.showName=data.name;
         this.showAddress=data.address;
         this.showEmail=data.email;
         return this.user;
       }
       else{
         return null;
       }
       
     },
     err => {
       console.log(err);
     },
     () => {
       // this.getRouter.navigate(['/']);
     });
   }
  }
  public submitForm(data): void {
    if (!this.profileForm.valid) {
      window.alert('Not valid!');
      return;
    }
    this.profileSub = this.userService.update({
      email: this.email.value,
      password: this.password.value,
      name: this.name.value,
      address: this.address.value,
      newPassword: this.newPassword.value==''? this.password.value:this.newPassword.value
    }).subscribe(
      data => {
        if(data.status==201){
          window.alert("Succesfully updated!");
          this.showEdit=false;
        }      
        else{
          window.alert("Couldn't update, please try again later");
        }
      },
      err => {
        console.log(err);
      },
      () => {
        // this.getRouter.navigate(['/']);
      });
    this.activeSubscriptions.push(this.profileSub);

  }
  

}
