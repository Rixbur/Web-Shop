import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
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
export class RecommendedComponent implements OnInit,OnDestroy,OnChanges {
  private activeSubs: Subscription[] = [];
  public recommended: Observable<ExportableProduct[]>;
  
  constructor(private filterService: FilterService,private userService: UserService,private recommendedService: RecommendedService)  {
    this.getRecommendedProducts(); 
  }
  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {

  }
  ngOnDestroy(){
    this.activeSubs.forEach((params)=>{params.unsubscribe()});
  }
  ngOnChange(){
    this.getRecommendedProducts(); 
  }
  private getRecommendedProducts(){
    this.recommended = this.recommendedService
                  .getRecommendedByEmail(this.userService.getUserEmail())
                  .pipe(map(_prod => (_prod.products)))
 
  }
  addToRecommended(product:ExportableProduct){
    if(this.userService.hasUser()){
      this.recommended = this.recommendedService
        .patchProduct(this.userService.getUserEmail(),{p_id:product['_id']})
        .pipe(switchMap(() => this.recommendedService
                                        .getRecommendedByEmail(this.userService.getUserEmail())
                                        .pipe(map(_prod => (_prod.products)))
                  ))
    }
  }
  removeFromRecommended(product:ExportableProduct){
    this.recommended = this.recommendedService
                  .patchProduct(this.userService.getUserEmail() + "/remove",{p_id:product['_id']})
                  .pipe(switchMap(() => this.recommendedService
                                        .getRecommendedByEmail(this.userService.getUserEmail())
                                        .pipe(map(_prod => (_prod.products)))
                  ))
  }
}
