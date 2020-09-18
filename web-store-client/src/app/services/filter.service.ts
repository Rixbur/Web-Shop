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

    let boolArray: boolean[] = [true,true,true];


    if(this.m_filterObject['selectedTypes'].length == 0){
      boolArray[2] = false;
    }
    if(this.m_filterObject['selectedSeasons'].length == 0){
      boolArray[1] = false;
    }
    if(this.m_filterObject['selectedCategory'] == ""){
      boolArray[0] = false;
    }

    let targetArray = []

    if(boolArray[0]){
      targetArray.push(_prod['articleType']);
    }
    if(boolArray[1]){
      targetArray.push(_prod['season'])
    };
    if(boolArray[2]){
      targetArray.push(_prod['category']);
    }

    // console.dir(boolArray)


    let numDimensions = boolArray.filter(a=>a==true).length;
    // console.log(numDimensions);



    if(numDimensions == 0){
      //CASE 0 DIMESION
      return this.doStaticChecks(_prod);
    }
    else if(numDimensions == 1){
      //CASE 1 DIMESION
      let oneDCarthArray = [];
      if(boolArray[0]){

        oneDCarthArray=[this.m_filterObject['selectedCategory']];
      }
      if(boolArray[1]){

        oneDCarthArray=this.m_filterObject['selectedSeasons'];
      }
      if(boolArray[2]){

        oneDCarthArray=this.m_filterObject['selectedTypes'];
      }

      let len = oneDCarthArray.map(elem => elem == targetArray).filter(elem=>elem==true).length;
      return len!=0 && this.doStaticChecks(_prod);

    }
    else if (numDimensions == 2){
      //CASE 2 DIMESION

      let tmpCarthesian: any[];
      let args = [undefined,undefined];
      let i = 0;


      if(boolArray[0]){
        args[i]=[this.m_filterObject['selectedCategory']];
        i+=1;
      }
      if(boolArray[1]){
        args[i]=this.m_filterObject['selectedSeasons'];
        i+=1;
      }
      if(boolArray[2]){
        args[i]=this.m_filterObject['selectedTypes'];
      }
      tmpCarthesian = this.cartesianProduct(args[0],args[1]);

      // console.dir(tmpCarthesian);

      let len = tmpCarthesian.map(elem => JSON.stringify(elem) == JSON.stringify(targetArray)).filter(elem=>elem==true).length;

      return len!=0 && this.doStaticChecks(_prod);

    }else if(numDimensions == 3){
      //CASE 3 DIMESIONS
      let tmpCarthesian: any[];
      let args = [[this.m_filterObject['selectedCategory']],
                  this.m_filterObject['selectedSeasons'],
                  this.m_filterObject['selectedTypes']];

      tmpCarthesian = this.cartesianProduct(args[0],args[1],args[2]);

      // console.dir(tmpCarthesian);

      let len = tmpCarthesian.map(elem => JSON.stringify(elem) == JSON.stringify(targetArray)).filter(elem=>elem==true).length;
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
