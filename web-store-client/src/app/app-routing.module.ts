import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { ProductInfoComponent } from './product/product-info/product-info.component';
import { ErrorPageComponent } from './routing/error-page/error-page.component';

import { AddAProductComponent } from './product/add-a-product/add-a-product.component';
import { OrderListComponent } from './orders/order-list/order-list.component';
import { OrderInfoComponent } from './orders/order-info/order-info.component';

const routes: Routes = [
  {path : '', component : HomeComponent},
  {path : 'cart', component : CartComponent},
  {path : 'products/:id', component : ProductInfoComponent},
  { path: 'add-a-product', component: AddAProductComponent },
  { path: 'view-orders', component: OrderListComponent },
  { path: 'view-orders/:orderId', component: OrderInfoComponent },
  { path: 'error', component: ErrorPageComponent },
  { path: 'checkout', component: CartComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }





