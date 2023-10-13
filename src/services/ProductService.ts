import { inject, injectable } from "tsyringe";
import { Product } from "../models/ProductModel";
import ProductDAO from "../daos/ProductDAO";
import {
  GetProductsDTO,
  ProductPropertyOption,
  PropertiesSortByTag,
} from "../dtos/GetProductsDTO";
import { CreateProductDTO } from "../dtos/CreateProductDTO";
import PropertyService from "./PropertyService";

@injectable()
export default class ProductService {
  constructor(
    @inject("ProductDAO") private productDAO: ProductDAO,
    @inject("PropertyService") private propertyService: PropertyService
  ) {}

  async getProducts(): Promise<GetProductsDTO> {
    const data = await this.productDAO.getProducts();
    const currentLang = "fr";

    const products = data.map((product) => {
      const translateMainProperty = product.mainProperty.translations.find(
        (translation: any) => translation.langageCode === currentLang
      );
      const translateProperties = product.productProperties.map((prop) => {
        const translation = prop.translations.find(
          (translation: any) => translation.langageCode === currentLang
        );
        return {
          propertyId: prop._id,
          tag: translation.tag,
          name: translation ? translation.name : "",
          description:
            translation && translation.description
              ? translation.description
              : "",
        };
      });

      return {
        _id: product._id,
        mainProperty: {
          propertyId: product.mainProperty._id,
          tag: translateMainProperty ? translateMainProperty.tag : "",
          name: translateMainProperty ? translateMainProperty.name : "",
          description:
            translateMainProperty && translateMainProperty.description
              ? translateMainProperty.description
              : "",
        },
        quantity: product.quantity,
        productProperties: translateProperties,
      };
    });

    const tagSet = new Set(); // Use a Set to efficiently track unique tags
    const propertiesSortByTag: PropertiesSortByTag[] = [];

    // Collect unique tags and build productPropertiesOptions
    products.forEach((product) => {
      product.productProperties.forEach((prop) => {
        tagSet.add(prop.tag); // Add the tag to the Set
      });
    });

    // Convert the Set of unique tags back to an array
    const uniqueTags = Array.from(tagSet);

    // Build productPropertiesOptions for each unique tag
    uniqueTags.forEach((tag: any) => {
      const options: ProductPropertyOption[] = [];
      products.forEach((product) => {
        product.productProperties.forEach((prop) => {
          if (
            tag === prop.tag &&
            !options.some((opt) => opt.name === prop.name)
          ) {
            options.push({
              productPropertyId: prop.propertyId,
              name: prop.name,
              description: prop.description,
            });
          }
        });
      });

      propertiesSortByTag.push({
        tag: tag,
        options: options,
      });
    });
    return {
      products: products,
      propertiesSortByTag: propertiesSortByTag,
    };
  }
  async createProduct(productData: CreateProductDTO): Promise<string> {
    const mainProperty = await this.propertyService.createProperty(
      productData.mainProperty
    );

    const productProperties =
      await this.propertyService.createMultipleProperties(
        productData.productProperties
      );

    const createdProduct = await this.productDAO.createProduct({
      mainProperty: mainProperty,
      productProperties: productProperties,
      quantity: productData.quantity,
    } as Product);

    return createdProduct._id;
  }

  async deleteProduct(productId: string): Promise<void> {
    await this.productDAO.deleteProduct(productId);
  }

  async updateProduct(
    productId: string,
    productData: Partial<Product>
  ): Promise<Product | null> {
    return await this.productDAO.updateProduct(productId, productData);
  }
}
