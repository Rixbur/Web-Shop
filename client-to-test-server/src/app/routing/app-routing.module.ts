import { ErrorPageComponent } from './error-page/error-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from '../product/product-list/product-list.component';
import { ProductInfoComponent } from '../product/product-info/product-info.component';
import { CartComponent } from '../orders/cart/cart.component';
import { AddAProductComponent } from '../product/add-a-product/add-a-product.component';
import { OrderListComponent } from '../orders/order-list/order-list.component';
import { OrderInfoComponent } from '../orders/order-info/order-info.component';


const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'checkout', component: CartComponent },
  { path: 'products/:productId', component: ProductInfoComponent },
  { path: 'add-a-product', component: AddAProductComponent },
  { path: 'view-orders', component: OrderListComponent },
  { path: 'view-orders/:orderId', component: OrderInfoComponent },
  { path: 'error', component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
