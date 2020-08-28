import { ExportableProduct } from './model/exportable.product.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(products: ExportableProduct[], ascending = true): any {
    if (products == null) {
        return [];
    }
    return products.sort((a, b) => {
        return ascending ? (a.m_price - b.m_price) : (b.m_price - a.m_price);
    });
  }

}
