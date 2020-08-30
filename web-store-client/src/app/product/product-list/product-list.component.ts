import { Component, OnInit, Input } from '@angular/core';
import { FilterService } from '../filter.service';
import { Observable } from 'rxjs';
import { ExportableProduct } from '../model/exportable.product.model'
import { OwlOptions } from 'ngx-owl-carousel-o';
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
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items:1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }

}
