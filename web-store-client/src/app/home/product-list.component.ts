import { Component, OnInit, Input } from '@angular/core';
import { FilterService } from '../product/filter.service';
import { Observable } from 'rxjs';
import { ExportableProduct } from '../product/model/exportable.product.model'
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @Input('filterObject') public filterObject;
  public m_productList: Observable<ExportableProduct[]>;

  constructor(public m_productService: FilterService) {
    this.m_productList = m_productService.filteredProducts();
   }

  ngOnInit(): void {

  }

}
