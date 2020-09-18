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
                .filter(_prod => this.applyFilter2(_prod)))
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

  doStaticChecks(_prod: ExportableProduct): boolean{
    let conditionArray = [false,false];
    let prodName: string = _prod['name'].toLowerCase();
    let keyword = (this.m_filterObject['selectedName']).toLowerCase();

    conditionArray[0] = prodName.indexOf(keyword) != -1;
    conditionArray[1] = this.m_filterObject['minPrice'] <= _prod['price']
                        &&this.m_filterObject['maxPrice'] >= _prod['price'];
    return conditionArray.reduce((acc,elem)=> acc && elem,true);
  }

  applyFilter2(_prod:ExportableProduct){

    // Ovo Cukic da pogleda obavezno
    // ~Dusan i Vlada~
    // Ostavicemo alternativni applyfilter koji ovaj zamenjuje c:
    // #FP #Math #CHADusMaximus
    let f = (a: any[], b: any[]): any[] => [].concat(...a.map(a2 => b.map(b2 => [].concat(a2, b2))));

    let cartesianProduct = (a: any[], b: any[], ...c: any[]) => {
      if (!b || b.length === 0) {
          return a;
      }
      const [b2, ...c2] = c;
      const fab = f(a, b);
      return cartesianProduct(fab, b2, ...c2);
    };

    let boolArray: boolean[] = [false,false,false];
    let tmpDataFrame;
    if(this.m_filterObject['selectedCategory'] != ""){
      boolArray[0] = true;
      tmpDataFrame.push([this.m_filterObject['selectedCategory']]);
    }
    if(this.m_filterObject['selectedSeasons'].length == 0){
      boolArray[1] = true;
      tmpDataFrame.push(this.m_filterObject['selectedSeasons']);
    }
    if(this.m_filterObject['selectedTypes'].length == 0){
      boolArray[2] = true;
      tmpDataFrame.push(this.m_filterObject['selectedTypes']);
    }

    let numElements = boolArray.filter(a=>a==true).length
    if(numElements==0){
      return this.doStaticChecks(_prod);
    }
    else if(numElements==3){
      let carthesian = cartesianProduct(this.m_filterObject['selectedCategory'],
                                        this.m_filterObject['selectedSeasons'],
                                        this.m_filterObject['selectedTypes']);
      let searchArray = [];
      searchArray.push(_prod['season'],
                     _prod['articleType'],
                     _prod['category']);
      let len = carthesian.map(elem => JSON.stringify(elem) == JSON.stringify(searchArray)).filter(elem=>elem==true).length;

      return len!=0 && this.doStaticChecks(_prod);
    }
    else if(numElements==1){

      let retVal=false;
      if(boolArray[0]){
        retVal = this.m_filterObject['selectedCategory'] == _prod['articleType'];
      }
      else if(boolArray[1]){
        retVal = this.m_filterObject['selectedSeasons'].indexOf(_prod['season']) != -1;
      }
      else if(boolArray[2]){
        retVal = this.m_filterObject['selectedTypes'].indexOf(_prod['category']) != -1;
      }

      return retVal && this.doStaticChecks(_prod);
    }
    else if(numElements==2){

      let carthesian;
      let searchArray = [];
      let retVal=false;

      if(boolArray[0] && boolArray[1]){
        carthesian = cartesianProduct(this.m_filterObject['selectedCategory'],
                                      this.m_filterObject['selectedSeasons']);
        searchArray.push(_prod['season'],
                         _prod['articleType']);
        retVal = carthesian.map(elem => JSON.stringify(elem) == JSON.stringify(searchArray)).filter(elem=>elem==true).length != 0;
      }
      else if(boolArray[0] && boolArray[2]){
        carthesian = cartesianProduct(this.m_filterObject['selectedCategory'],
                                      this.m_filterObject['selectedTypes']);
        searchArray.push(_prod['season'],
                         _prod['category']);
        retVal = carthesian.map(elem => JSON.stringify(elem) == JSON.stringify(searchArray)).filter(elem=>elem==true).length != 0;
      }
      else if(boolArray[1] && boolArray[2]){
        carthesian = cartesianProduct(this.m_filterObject['selectedSeasons'],
                                      this.m_filterObject['selectedTypes']);
        searchArray.push(_prod['sarticleTypeeason'],
                         _prod['category']);
        retVal = carthesian.map(elem => JSON.stringify(elem) == JSON.stringify(searchArray)).filter(elem=>elem==true).length != 0;
      }

      return retVal && this.doStaticChecks(_prod);
    }

    return false;

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
