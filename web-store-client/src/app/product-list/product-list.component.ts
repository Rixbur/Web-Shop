import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../model/product.model';
import { ProductService } from '../services/product.service'
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @Input('filterObject') public filterObject;
  public m_productList: Product[] = []; 
  public m_products: Product[] = []; 

  constructor(public m_productService: ProductService) {
    this.m_productList = m_productService.getProducts();
   }

  ngOnInit(): void {
    
  }

}
