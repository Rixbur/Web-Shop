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
        .map(_prod => this.mapParsing(_prod))
        .filter(_prod => this.applyFilter(_prod)))
    );
  }
  mapParsing(_prod:ExportableProduct){
      for(const key in _prod){
        if(key=='mapQuantOfSizes'){
          _prod.mapa = new Map(JSON.parse(_prod[key]));
        }
      }
      //console.log(_prod.mapa);
      return _prod;
  }

  applyFilter(_prod:ExportableProduct){
    // if(this.m_filterObject['isShoe'] == undefined){
    //   return true;
    // }
    let keyword = this.m_filterObject['name']
    let prodName: string = _prod['name']

    let selectedType: string = this.m_filterObject['type']
    console.log(_prod);
    console.log(this.m_filterObject);
    //
    //
    console.log('true');
    if(selectedType == "" || selectedType == _prod['category']){

      if(keyword == "" || prodName.indexOf(keyword) != -1){

        // If object's category is not specified, show the current object
        if(this.m_filterObject['isShoe'] == undefined){
          return true;
        }
        // Else, check if the current shoe matches the given pattern
        if(this.m_filterObject['isShoe'] && _prod['articleType']){

          if(this.m_filterObject['selectedSeason'] == _prod['season']
            || this.m_filterObject['selectedSeason'] == ""){
              if(_prod['mapa'].get(this.m_filterObject['shoeSize']))
              {
                console.log(_prod['mapa'].get(this.m_filterObject['shoeSize']));

                if(this.m_filterObject['minPrice'] < _prod['price']
                &&this.m_filterObject['maxPrice'] > _prod['price']){
                  console.log('true');
                  return true
                }
            }
          }
        }
        // If it's not a shoe, then check if the misc object matches the same pattern
        else if(this.m_filterObject['minPrice'] < _prod['price']
                &&this.m_filterObject['maxPrice'] > _prod['price']
                &&_prod.m_articleType == this.m_filterObject['isShoe']){

          return true;
        }
      }
    }

    if(selectedType == "" || selectedType == _prod['category'] &&
      this.m_filterObject['isShoe'] && _prod['articleType']){

      if(keyword == "" || prodName.indexOf(keyword) != -1){

        if(this.m_filterObject['minPrice'] < _prod['price']
          &&this.m_filterObject['maxPrice'] > _prod['price']
          &&_prod.m_articleType == this.m_filterObject['isShoe']){
            console.log('true');
        return true;
        }
      }
    }

    console.log('false');

    return false;
  }
  updateFilters(_filterObject){
    this.m_filterObject = _filterObject;

  }
}
