import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public m_products: Product[] = [];
  public m_filterObject = {};

  constructor() { 
    this.m_products.push(new Product(1,"Timberland verdana","Crvene cipele","prolece",15,true,"cokule",39));
    this.m_products.push(new Product(2, "Nike ignis","Plave patike","leto",30,true,"patike",41));
    this.m_products.push(new Product(3, "H&M splash","Zute cizme","jesen",10,false,"cizme",22));
  }

  getProducts(): Product[]{
    return this.m_products;
  }

  filteredProducts(){
    console.log(this.m_filterObject);

    return this.m_products.filter(product => {
      console.log(product);
      if(this.m_filterObject['isShoe'] == undefined){
        return true;
      }

      //Shoes
      if(this.m_filterObject['isShoe'] && product.m_isShoe){
        if(this.m_filterObject['selectedSeason'] == product.m_season
          || this.m_filterObject['selectedSeason'] == ""){
          if(this.m_filterObject['shoeSize'] == product.m_size
            ||this.m_filterObject['shoeSize'] == 39){
            if(this.m_filterObject['minPrice'] < product.m_price
              &&this.m_filterObject['maxPrice'] > product.m_price){
                return true
            }
          }
        }
      //Misc
      }else{
        if(this.m_filterObject['minPrice'] < product.m_price
          &&this.m_filterObject['maxPrice'] > product.m_price
          &&product.m_isShoe == this.m_filterObject['isShoe']){
            
          return true;
        }
      }
      return false;
    })
  }
  updateFilters(_filterObject){
    this.m_filterObject = _filterObject;
  }
}
