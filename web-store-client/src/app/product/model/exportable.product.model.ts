export interface ExportableProduct {
    _id: string;
    m_name: string;
    m_description: string;
    m_articleType: string;
    m_category: string;
    m_season: string;
    m_price: number;
    m_size: number;
    m_quantity: number;
    mapQuantOfSizes: string,
    mapa: Map<number,number>,
    m_productImage,
    m_selectedSize: string;

};
