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

  constructor(id: string,
              name: string,
              description: string,
              season: string,
              price: number,
              articleType: string,
              category: string,
              size: number = 10,
              quantity: number = 10,
              //mapQuantOfSizes?: Map<number, number>,
              productImage?){

    this.m_articleType = (articleType == 'shoe' ) ? true : false;
    this._id= id;
    this.m_name=  name;
    this.m_description = description;
    this.m_category = category;
    this.m_season = season;
    this.m_price = price;
    this.m_size = size;
    this.m_quantity = quantity;
    this.m_productImage = productImage;
  }

  static convertCtor(_xproduct: ExportableProduct): Product{
    const product = new Product(_xproduct._id, _xproduct.m_name, _xproduct.m_description, _xproduct.m_season, 
        _xproduct.m_price, _xproduct.m_articleType, _xproduct.m_category, _xproduct.m_size, _xproduct.m_quantity, 
        _xproduct.m_productImage);
    console.log(_xproduct);
    console.log(product);
    return product;
  }

  get id()
  {
      return this._id;
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
