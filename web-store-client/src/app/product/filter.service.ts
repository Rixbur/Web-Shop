import { Injectable } from '@angular/core';
import { ExportableProduct } from './model/exportable.product.model';
import { Observable } from 'rxjs';
import { ProductService } from '../product/product.service';
import { filter, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FilterService {

  public m_filterObject = {};

  constructor(private m_productService: ProductService) {
    // this.m_products.push(new Product(1,"Timberland verdana","Crvene cipele","prolece",15,true,"cokule",39));
    // this.m_products.push(new Product(2, "Nike ignis","Plave patike","leto",30,true,"patike",41));
    // this.m_products.push(new Product(3, "H&M splash","Zute cizme","jesen",10,false,"cizme",22));
  }

  filteredProducts(): Observable<ExportableProduct[]>{
    return this.m_productService.getProducts()
    .pipe(
      map((_prodList: ExportableProduct[]) =>
        _prodList
        //.map(_prod => Product.convertCtor(_prod))
        .filter(_prod => this.applyFilter(_prod)))
    );
  }

  applyFilter(_prod:ExportableProduct){
    console.log(_prod);
    console.log(this.m_filterObject['minPrice']);
    console.log(this.m_filterObject['maxPrice']);
    console.log(_prod['category']);
    console.log(_prod['price']);
    //Shoes
    if(this.m_filterObject['isShoe'] && _prod['articleType']){
      if(this.m_filterObject['selectedSeason'] == _prod['season']
        || this.m_filterObject['selectedSeason'] == ""){
        if(this.m_filterObject['shoeSize'] == _prod['size']
          ||this.m_filterObject['shoeSize'] == 39){
          if(this.m_filterObject['minPrice'] < _prod['price']
            &&this.m_filterObject['maxPrice'] > _prod['price']){
              return true
          }
        }
      }
    //Misc
    }else{
      if(this.m_filterObject['minPrice'] < _prod['price']
        &&this.m_filterObject['maxPrice'] > _prod['price']
        &&_prod.m_articleType == this.m_filterObject['isShoe']){

        return true;
      }
    }
    return false;
  }
  updateFilters(_filterObject){
    this.m_filterObject = _filterObject;
  }
}
