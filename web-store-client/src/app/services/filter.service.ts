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
  public m_carthesian: any;

  cartesianProduct(...allEntries: any[][]): any[][] {
    allEntries = allEntries.filter(entry=>entry.length!=0);
    return allEntries.reduce<any[][]>(
      (results, entries) =>
        results
          .map(result => entries.map(entry => result.concat([entry])))
          .reduce((subResults, result) => subResults.concat(result), []),
      [[]]
    )
}

  constructor(private m_productService: ProductService) {
  }

  filteredProducts(): Observable<ExportableProduct[]>{

    this.m_carthesian = this.cartesianProduct([this.m_filterObject['selectedCategory']],
                                               this.m_filterObject['selectedSeasons'],
                                               this.m_filterObject['selectedTypes']);
    console.log(this.m_carthesian);

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
    // console.log(this.m_carthesian);

    let targetArray = []
    let numDimensions =0;

    if(this.m_filterObject['selectedCategory'] != ""){
      numDimensions+=1;
      targetArray.push(_prod['articleType']);
    }
    if(this.m_filterObject['selectedSeasons'].length != 0){
      numDimensions+=1;
      targetArray.push(_prod['season'])
    };
    if(this.m_filterObject['selectedTypes'].length != 0){
      numDimensions+=1;
      targetArray.push(_prod['category']);
    }

    if(numDimensions == 0){
      //CASE 0 DIMESION

      return this.doStaticChecks(_prod);
    }
    else {
      //ALL OTHER CASES
      let len = this.m_carthesian.map(elem => JSON.stringify(elem) == JSON.stringify(targetArray)).filter(elem=>elem==true).length;

      return len!=0 && this.doStaticChecks(_prod);
    }


  }

  updateFilters(_filterObject){


    this.m_filterObject = _filterObject;
    this.m_filterProductsPromise = this.filteredProducts().toPromise()
                                                          .then(prods =>
                                                                this.m_filterProducts = prods)
                                                          .catch(err => console.log(err));
  }
}
