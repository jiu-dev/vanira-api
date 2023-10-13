import { injectable } from "tsyringe";
import ProductModel, { Product } from "../models/ProductModel";

@injectable()
export default class ProductDAO {
  async getProducts(): Promise<Product[]> {
    try {
      const products = await ProductModel.find()
        .populate({
          path: "productProperties",
        })
        .populate({ path: "mainProperty" });
      return products;
    } catch (error: any) {
      throw new Error(`Failed to get product: ${error.message}`);
    }
  }
  async createProduct(productData: Product): Promise<Product> {
    try {
      const newProduct = new ProductModel(productData);
      console.log(newProduct);
      return await newProduct.save();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteProduct(productId: string): Promise<void> {
    await ProductModel.findByIdAndDelete(productId);
  }

  async updateProduct(
    productId: string,
    productData: Partial<Product>
  ): Promise<Product | null> {
    return await ProductModel.findByIdAndUpdate(productId, productData, {
      new: true,
    });
  }
}
