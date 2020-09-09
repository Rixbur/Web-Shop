import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { FilterService } from '../../services/filter.service';
import { Observable } from 'rxjs';
import { ExportableProduct } from '../model/exportable.product.model'
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, DoCheck{

  @Input('filterObject') public filterObject;
  public m_productList: ExportableProduct[];

  constructor(public m_productService: FilterService) {
    this.m_productList = this.m_productService.m_filterProducts;
  }

  ngOnInit(): void {

  }
  ngDoCheck(): void{
    this.m_productList = this.m_productService.m_filterProducts;
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
        items:2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

}
