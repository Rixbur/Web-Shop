import { ExportableProduct } from '../product/model/exportable.product.model';

export interface Order {
  _id: string;
  products: string[] | ExportableProduct[];
  name: string;
  address: string;
  email: string;
}
