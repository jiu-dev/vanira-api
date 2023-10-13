import { Request, Response, Router } from "express";
import ProductService from "../services/ProductService";
import { inject, injectable } from "tsyringe";
import { Product } from "../models/ProductModel";
import { CreateProductDTO } from "../dtos/CreateProductDTO";

@injectable()
export default class ProductController {
  private router = Router();

  constructor(
    @inject("ProductService") private productService: ProductService
  ) {
    this.initializeRoutes();
  }

  public getRouter() {
    return this.router;
  }

  private initializeRoutes() {
    this.router.get("/", this.getProducts);
    this.router.post("/", this.createProduct);
    this.router.put("/:productId", this.updateProduct);
    this.router.delete("/:productId", this.deleteProduct);
  }

  private getProducts = async (req: Request, res: Response) => {
    try {
      const products = await this.productService.getProducts();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: "500.INTERNAL_ERROR_SERVER" });
    }
  };

  private createProduct = async (req: Request, res: Response) => {
    try {
      const productData: CreateProductDTO = req.body;
      const createdProductId = await this.productService.createProduct(
        productData
      );
      res.status(201).json(createdProductId);
    } catch (error) {
      res.status(500).json({ error: "500.INTERNAL_ERROR_SERVER" });
    }
  };

  private deleteProduct = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const productId = req.params.productId;
      await this.productService.deleteProduct(productId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "500.INTERNAL_ERROR_SERVER" });
    }
  };

  private updateProduct = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const productId = req.params.productId;
      const productData: Partial<Product> = req.body;
      const updatedProduct = await this.productService.updateProduct(
        productId,
        productData
      );
      if (updatedProduct) {
        res.status(200).json(updatedProduct);
      } else {
        res.status(404).json({ error: "NOT_FOUND" });
      }
    } catch (error) {
      res.status(500).json({ error: "500.INTERNAL_ERROR_SERVER" });
    }
  };
}
