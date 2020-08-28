import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../model/product.model';
import { FilterService } from '../filter.service'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  public m_products: Observable<Product[]>;

  constructor(private m_filterService: FilterService) {
    this.m_products = m_filterService.filteredProducts();
  }

  ngOnInit() {
  }

}
