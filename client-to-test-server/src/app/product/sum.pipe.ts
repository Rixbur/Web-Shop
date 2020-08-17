import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './product.model';

@Pipe({
  name: 'sum'
})
export class SumPipe implements PipeTransform {

  transform(products: Product[]): number {
    return products
      .map(product => product.price)
      .reduceRight((acc, next) => acc + next);
  }

}
