import { inject, injectable } from "tsyringe";
import ProductDAO from "../daos/ProductDAO";
import { ProductCreateDTO } from "../dtos/ProductCreateDTO";

@injectable()
export default class ProductService {
  constructor(@inject("ProductDAO") private productDAO: ProductDAO) {}

  async createProduct(product: ProductCreateDTO): Promise<string> {
    const createdProductId = await this.productDAO.createProduct(product);
    return createdProductId;
  }
}
