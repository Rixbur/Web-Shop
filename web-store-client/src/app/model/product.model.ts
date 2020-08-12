export class Product{
    static s_id: number = 0;

    constructor(public m_id: number,
                public m_name: string,
                public m_desription: string,
                public m_season: string | null,
                public m_category: string, 
                public m_price: number){
        Product.s_id++;
    }

    get description()
    {
        return this.m_desription;
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
}