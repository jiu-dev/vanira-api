import { inject, injectable } from "tsyringe";
import ProductModel, { ProductDocument } from "../models/ProductModel";
import PropertyDAO from "./PropertyDAO";
import { Model } from "mongoose";
import { ProductCreateDTO } from "../dtos/ProductCreateDTO";

@injectable()
export default class ProductDAO {
  constructor(
    @inject("ProductModel")
    private readonly productModel: Model<ProductDocument>,
    @inject("PropertyDAO")
    private propertyDAO: PropertyDAO
  ) {}

  async createProduct(inputData: ProductCreateDTO): Promise<string> {
    try {
      const result = await this.propertyDAO.createProductProperties(
        inputData.mainProperty,
        inputData.properties
      );

      const createdProduct = await this.productModel.create({
        mainProperty: result.mainProperty,
        properties: result.properties,
        price: inputData.price,
      });

      return createdProduct._id;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteProduct(productId: string): Promise<void> {
    await ProductModel.findByIdAndDelete(productId);
  }
}
