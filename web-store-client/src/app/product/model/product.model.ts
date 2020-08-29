import { ExportableProduct } from './exportable.product.model'

export class Product{

  _id: string;
  m_name: string;
  m_description: string;
  m_articleType: boolean;
  m_category: string;
  m_season: string;
  m_price: number;
  m_size: number;
  m_quantity: number;
  m_productImage;

  constructor(_id: string,
              name: string,
              description: string,
              season: string,
              price: number,
              articleType: string,
              category?: string,
              size?: number,
              quantity?: number,
              //mapQuantOfSizes?: Map<number, number>,
              productImage?){

    this.m_articleType = (articleType == 'shoe' ) ? true : false;
    this._id=_id
  }

  static convertCtor(_xproduct: ExportableProduct): Product{

    return new Product(_xproduct._id, _xproduct.m_name, _xproduct.m_description, _xproduct.m_season, _xproduct.m_price, _xproduct.m_articleType, _xproduct.m_category, _xproduct.m_size, _xproduct.m_quantity, _xproduct.m_productImage);
  }

  get id()
  {
      return this.id;
  }

  get description()
  {
      return this.m_description;
  }
  get season()
  {
      return this.m_season;
  }
  get category()
  {
      return this.m_category;
  }
  get price()
  {
      return this.m_price;
  }
  get articleType()
  {
      return this.m_articleType;
  }
}
