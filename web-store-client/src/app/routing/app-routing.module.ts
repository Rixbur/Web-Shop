import { ErrorPageComponent } from './error-page/error-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from '../product/product-list/product-list.component';
import { ProductInfoComponent } from '../product/product-info/product-info.component';
import { CartComponent } from '../orders/cart/cart.component';
import { AddAProductComponent } from '../product/add-a-product/add-a-product.component';
import { OrderListComponent } from '../orders/order-list/order-list.component';
import { OrderInfoComponent } from '../orders/order-info/order-info.component';
import { LoginComponent } from '../user/login/login.component';
import { RegisterComponent } from '../user/register/register.component';
import { HomeComponent } from '../home/home.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'checkout', component: CartComponent },
  { path: 'products/:productId', component: ProductInfoComponent },
  { path: 'add-a-product', component: AddAProductComponent },
  { path: 'view-orders', component: OrderListComponent },
  { path: 'view-orders/:orderId', component: OrderInfoComponent },
  { path: 'error', component: ErrorPageComponent },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
