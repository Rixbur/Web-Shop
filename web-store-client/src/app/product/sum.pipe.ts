import { Pipe, PipeTransform } from '@angular/core';
import { ExportableProduct } from './model/exportable.product.model';

@Pipe({
  name: 'sum'
})
export class SumPipe implements PipeTransform {

  transform(products: ExportableProduct[]): number {
    return products
      .map(product => product.m_price)
      .reduceRight((acc, next) => acc + next);
  }

}

