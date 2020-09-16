import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ExportableProduct } from '../product/model/exportable.product.model';
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-recommended',
  templateUrl: './recommended.component.html',
  styleUrls: ['./recommended.component.css']
})
export class RecommendedComponent implements OnInit,OnDestroy {
  private activeSubs: Subscription[] = [];
  public productList: ExportableProduct[];
  
  constructor(private productService: ProductService)  { 
    const newSub = this.productService.getProducts().subscribe((params)=>{this.productList = params});
    this.activeSubs.push(newSub);
  }

  ngOnInit(): void {

  }
  ngOnDestroy(){
    this.activeSubs.forEach((params)=>{params.unsubscribe()});
  }

}
