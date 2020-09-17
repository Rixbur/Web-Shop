import { FormsModule } from '@angular/forms'
import { HomeComponent } from './home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSliderModule } from '@m0t0r/ngx-slider';
import { AgmCoreModule } from '@agm/core';


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
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { LogoutComponent } from './user/logout/logout.component';
import { AboutComponent } from './about/about.component';
import { RecommendedComponent } from './recommended/recommended.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductListComponent,
    CartComponent,
    NavigationComponent,
    ProductInfoComponent,
    AddAProductComponent,
    ErrorPageComponent,
    OrderListComponent,
    OrderInfoComponent,
    OrderByPipe,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    AboutComponent,
    SumPipe,
    RecommendedComponent


  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    CarouselModule,
    BrowserAnimationsModule,
    NgxSliderModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD7l8kq8ay6ZkD9qYKIWA1G2-jIQnskT1o'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
