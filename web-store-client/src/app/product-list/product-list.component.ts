import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  public colors =  ["red","blue"];
  public m_productList: Product[] = []; 
  constructor() {
    this.m_productList.push(new Product(1,"Timberland verdana","Crvene cipele","prolece","cokule",15));
    this.m_productList.push(new Product(2, "Nike ignis","Plave patike","leto","patike",30));
    this.m_productList.push(new Product(3, "H&M splash","Zute cizme","jesen","cizme",10));
   }

  ngOnInit(): void {
    
  }

}
