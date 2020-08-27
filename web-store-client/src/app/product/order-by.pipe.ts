import { Product } from './product.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(products: Product[], ascending = true): any {
    if (products == null) {
        return [];
    }
    return products.sort((a, b) => {
        return ascending ? (a.price - b.price) : (b.price - a.price);
    });
  }

}
