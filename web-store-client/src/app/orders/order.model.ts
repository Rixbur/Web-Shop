import { Product } from '../product/model/product.model';

export interface Order {
  _id: string;
  products: string[] | Product[];
  name: string;
  address: string;
  email: string;
}
