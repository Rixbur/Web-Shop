import { Injectable } from '@angular/core';
import { ExportableProduct } from '../product/model/exportable.product.model';
import { Observable } from 'rxjs';
import { ProductService } from './product.service';
import { filter, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FilterService {

  public m_filterObject = {};
  public m_filterProducts = [];
  public m_filterProductsPromise;
  constructor(private m_productService: ProductService) {
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
    // console.dir(_prod);
      for(const key in _prod){
        if(key=='mapSizeQuantities'){
          _prod.map = new Map(JSON.parse(_prod[key]));
        }
      }
      // console.log(_prod.map);
      return _prod;
  }

  applyFilter(_prod:ExportableProduct){
    // if(this.m_filterObject['isShoe'] == undefined){
    //   return true;
    // }
    let keyword = this.m_filterObject['selectedName']
    let prodName: string = _prod['name']

    let selectedSeasons = this.m_filterObject['selectedSeasons'];
    let selectedCategories: string[] = this.m_filterObject['selectedTypes']

    // console.log(_prod);
    // console.log(this.m_filterObject);

    if(selectedCategories.length == 0 || selectedCategories.indexOf(_prod['category'].toLowerCase()) != -1 ){

      if(keyword == "" || prodName.indexOf(keyword) != -1){

        // If object's type is not specified, show the current object

        if(this.m_filterObject['selectedTypes'].length == 0 ){

          if(this.m_filterObject['minPrice'] < _prod['price']
            &&this.m_filterObject['maxPrice'] > _prod['price']){
              // console.log("true");
              return true;
            }
            else{
              // console.log("false");
              return false;
            }
        }
        // Else, check if the current shoe matches the given pattern
        if( this.m_filterObject['selectedTypes'].indexOf(_prod['articleType']) != -1 ){

          if(selectedSeasons.indexOf(_prod['season'].toLowerCase())!=-1
            || selectedSeasons.lenght == 0){

              // Check if a shoe of the specified size exists in the store
              if(_prod['map'].get(this.m_filterObject['shoeSize']) )
              {
                // console.log(_prod['map'].get(this.m_filterObject['shoeSize']));

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
              &&this.m_filterObject['selectedTypes'].indexOf(_prod['articleType']) ){

          console.log("true");
          return true;
        }
      }
    }


    console.log('false');

    return false;
  }
  updateFilters(_filterObject){


    this.m_filterObject = _filterObject;
    this.m_filterProductsPromise = this.filteredProducts().toPromise()
                                                          .then(prods =>
                                                                this.m_filterProducts = prods)
                                                          .catch(err => console.log(err));
  }
}
