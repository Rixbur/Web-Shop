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
  public ljubiBrat;
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



  applyFilter2(_prod:ExportableProduct){

    let f = (a: any[], b: any[]): any[] => [].concat(...a.map(a2 => b.map(b2 => [].concat(a2, b2))));

    let cartesianProduct = (a: any[], b: any[], ...c: any[]) => {
      if (!b || b.length === 0) {
          return a;
      }
      const [b2, ...c2] = c;
      const fab = f(a, b);
      return cartesianProduct(fab, b2, ...c2);
    };
    let a1 =this.m_filterObject['selectedSeasons'];
    let a2 =[this.m_filterObject['selectedCategory']];
    let ljubiBrat2 = cartesianProduct(a1,a2);
    let searchArray = [];
    searchArray.push(_prod['season'],
                     _prod['articleType']);
    return ljubiBrat2.indexOf(searchArray) != -1;

  }
  applyFilter(_prod:ExportableProduct){
    // if(this.m_filterObject['isShoe'] == undefined){
    //   return true;
    // }

    let tmp = _prod['category'];
    _prod['category'] = _prod['articleType'];
    _prod['articleType'] = tmp;


    let keyword = (this.m_filterObject['selectedName']).toLowerCase();
    let prodName: string = _prod['name'].toLowerCase();

    let selectedSeasons: string[] = this.m_filterObject['selectedSeasons'].map(season=>season.toLowerCase());

    //undefined - all types
    //true - only shoes
    //false - only bags
    let selectedTypes: string[] = this.m_filterObject['selectedTypes'].map(type=>type.toLowerCase());
    let selectedCategory: string = this.m_filterObject['selectedCategory'];
    if(_prod['price']==33){
      // console.dir(_prod);
      // console.dir(this.m_filterObject);
      // console.dir(selectedCategory);
      // console.dir(_prod['category']);
    }


    // Check it the article is in the same category as the selection
    if(selectedCategory == '' || selectedCategory == _prod['category']){

      if(keyword == "" || prodName.indexOf(keyword) != -1){

        // If object's type is not specified, do a general pattern check
        if(selectedTypes.length == 0){

          if(this.m_filterObject['minPrice'] <= _prod['price']
            &&this.m_filterObject['maxPrice'] >= _prod['price']
            &&(selectedSeasons.indexOf(_prod['season'].toLowerCase())!=-1
              || selectedSeasons.length == 0)){
              // console.log("true");
              let tmp = _prod['category'];
              _prod['category'] = _prod['articleType'];
              _prod['articleType'] = tmp;

              return true;
            }
            else{
              // console.log("false");
              let tmp = _prod['category'];
              _prod['category'] = _prod['articleType'];
              _prod['articleType'] = tmp;

              return false;
            }
        }
        // Else, check if the current item is a shoe, and wheather it matches the given pattern

        if(selectedCategory == 'shoes' && selectedCategory == _prod['category']
           && selectedTypes.indexOf(_prod['articleType']) != -1){

          if(selectedSeasons.indexOf(_prod['season'].toLowerCase())!=-1
            || selectedSeasons.length == 0){

              // Check if a shoe of the specified size exists in the store
              if(_prod['map'].get(this.m_filterObject['shoeSize']) )
              {
                // console.log(_prod['map'].get(this.m_filterObject['shoeSize']));

                if(this.m_filterObject['minPrice'] < _prod['price']
                &&this.m_filterObject['maxPrice'] > _prod['price']){
                  console.log('true');
                  let tmp = _prod['category'];
                  _prod['category'] = _prod['articleType'];
                  _prod['articleType'] = tmp;

                  return true
                }
              }
          }
        }
        // If it's not a shoe, then check if the misc object matches the same pattern
        else if(this.m_filterObject['minPrice'] < _prod['price']
              &&this.m_filterObject['maxPrice'] > _prod['price']
              &&selectedCategory == _prod['category']
              &&selectedTypes.indexOf(_prod['articleType']) != -1){

          console.log("true");
          let tmp = _prod['category'];
          _prod['category'] = _prod['articleType'];
          _prod['articleType'] = tmp;
          return true;
        }
      }
    }
    tmp = _prod['category'];
    _prod['category'] = _prod['articleType'];
    _prod['articleType'] = tmp;
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
