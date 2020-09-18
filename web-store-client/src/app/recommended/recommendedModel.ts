import {ExportableProduct} from '../product/model/exportable.product.model';

export interface Recommended {
    _id: string;
    products: ExportableProduct[];
    email: string;
  }