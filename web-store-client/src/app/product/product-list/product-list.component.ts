import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { FilterService } from '../../services/filter.service';
import { Observable } from 'rxjs';
import { ExportableProduct } from '../model/exportable.product.model'
import { OwlOptions } from 'ngx-owl-carousel-o';
import { RecommendedService } from 'src/app/services/recommended.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, DoCheck{

  @Input('filterObject') public filterObject;
  public m_productList: ExportableProduct[];

  constructor(public m_productService: FilterService,
              public recommendedService: RecommendedService,
              private userService: UserService,
              ) {
    this.m_productList = this.m_productService.m_filterProducts;
  }

  ngOnInit(): void {

  }
  ngDoCheck(): void{
    this.m_productList = this.m_productService.m_filterProducts;
  }
  addToRecommended(p_id:string){
    if(this.userService.hasUser()){
      this.recommendedService
        .patchProduct(this.userService.getUserEmail(),p_id)
        ;
    }
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
