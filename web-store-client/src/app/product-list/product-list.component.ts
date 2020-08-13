import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @Input('filterObject') public filterObject;
  public colors =  ["red","blue"];
  public m_productList: Product[] = []; 
  constructor() {
    this.m_productList.push(new Product(1,"Timberland verdana","Crvene cipele","prolece",15,true,"cokule",39));
    this.m_productList.push(new Product(2, "Nike ignis","Plave patike","leto",30,true,"patike",41));
    this.m_productList.push(new Product(3, "H&M splash","Zute cizme","jesen",10,false,"cizme",22));
   }

  ngOnInit(): void {
    
  }

  filteredProducts(){
    return this.m_productList.filter(product => {
      if(this.filterObject['isSelectingShoe']){
        //Shoe
        if(this.filterObject['isSelectingShoe'] == product.m_isShoe
          || this.filterObject['isSelectingShoe'] == undefined){
          if(this.filterObject['selectedSeason'] == product.m_season
            || this.filterObject['selectedSeason'] == undefined){
            if(this.filterObject['shoeSize'] == product.m_size){
              if(this.filterObject['minPrice']<product.m_price
                &&this.filterObject['maxPrice']>product.m_price){
                  return true
              }
            }
          }
        }
      }else{
        //Misc
        if(this.filterObject['minPrice']<product.m_price
                &&this.filterObject['maxPrice']>product.m_price){
                  return true;
                }
      }
      return false;
    })
  }
}
