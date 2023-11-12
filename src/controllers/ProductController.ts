import { Request, Response, Router } from "express";
import ProductService from "../services/ProductService";
import { inject, injectable } from "tsyringe";
import { validate } from "class-validator";
import { ProductCreateDTO } from "../dtos/ProductCreateDTO";

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
    this.router.post("/", this.createProduct);
  }

  private createProduct = async (req: Request, res: Response) => {
    try {
      const inputData: ProductCreateDTO = req.body;

      const errors = await validate(inputData);
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const createdProductId = await this.productService.createProduct(
        inputData
      );
      res.status(201).json(createdProductId);
    } catch (error) {
      res.status(500).json({ error: "500.INTERNAL_ERROR_SERVER" });
    }
  };
}
