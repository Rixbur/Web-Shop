import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { NavigationComponent } from './routing/navigation/navigation.component';
import { ProductInfoComponent } from './product/product-info/product-info.component';
import { CartComponent } from './orders/cart/cart.component';
import { SumPipe } from './product/sum.pipe';
import { AddAProductComponent } from './product/add-a-product/add-a-product.component';
import { ErrorPageComponent } from './routing/error-page/error-page.component';
import { OrderListComponent } from './orders/order-list/order-list.component';
import { OrderInfoComponent } from './orders/order-info/order-info.component';
import { OrderByPipe } from './product/order-by.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    NavigationComponent,
    ProductInfoComponent,
    CartComponent,
    SumPipe,
    AddAProductComponent,
    ErrorPageComponent,
    OrderListComponent,
    OrderInfoComponent,
    OrderByPipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
