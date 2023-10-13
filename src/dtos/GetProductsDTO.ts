export interface GetProductsDTO {
  products: ProductWithTranslateProperties[];
  propertiesSortByTag: PropertiesSortByTag[];
}

export interface TranslateProperty {
  propertyId: string;
  tag: string;
  name: string;
  description: string;
}
export interface ProductWithTranslateProperties {
  _id: string;
  mainProperty: TranslateProperty;
  quantity: number;
  productProperties: TranslateProperty[];
}

export interface PropertiesSortByTag {
  tag: string;
  options: ProductPropertyOption[];
}

export interface ProductPropertyOption {
  productPropertyId: string;
  name: string;
  description?: string;
}
