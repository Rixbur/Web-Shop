import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ExportableProduct } from '../product/model/exportable.product.model';
import { FilterService } from '../services/filter.service';
import { ProductService } from '../services/product.service';
import { RecommendedService} from '../services/recommended.service';
import { UserService } from '../services/user.service';
import { Recommended } from './recommendedModel';
@Component({
  selector: 'app-recommended',
  templateUrl: './recommended.component.html',
  styleUrls: ['./recommended.component.css']
})
export class RecommendedComponent implements OnInit,OnDestroy {
  private activeSubs: Subscription[] = [];
  public recommended: Observable<ExportableProduct[]>;
  
  constructor(private filterService: FilterService,private userService: UserService,private recommendedService: RecommendedService)  {
    this.getRecommendedProducts(); 
  }

  ngOnInit(): void {

  }
  ngOnDestroy(){
    this.activeSubs.forEach((params)=>{params.unsubscribe()});
  }
  private getRecommendedProducts(){
    this.recommended = this.recommendedService
                  .getRecommendedByEmail(this.userService.getUserEmail())
                  .pipe(map(_prod => (_prod.products)))
                  
    
  }

}
