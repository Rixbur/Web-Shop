import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  public products: Observable<Product[]>;

  constructor(private productService: ProductService) {
    this.products = this.productService.getProducts();
  }

  ngOnInit() {
  }

}
