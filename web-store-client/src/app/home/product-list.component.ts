import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product/model/product.model';
import { FilterService } from '../product/filter.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @Input('filterObject') public filterObject;
  public m_productList: Observable<Product[]>;
  public m_products: Product[] = [];

  constructor(public m_productService: FilterService) {
    this.m_productList = m_productService.filteredProducts();
   }

  ngOnInit(): void {

  }

}
