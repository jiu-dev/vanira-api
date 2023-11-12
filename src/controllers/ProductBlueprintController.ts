import { NextFunction, Request, Response, Router } from "express";
import ProductBlueprintService from "../services/ProductBlueprintService";
import { validate } from "class-validator";
import { inject, injectable } from "tsyringe";
import { ProductBlueprintRawDTO } from "../dtos/ProductBlueprintRawDTO";
import { ProductBlueprintFetchedDTO } from "../dtos/ProductBlueprintFetchedDTO";

@injectable()
export default class ProductBlueprintController {
  private router = Router();
  constructor(
    @inject("ProductBlueprintService")
    private readonly productBlueprintService: ProductBlueprintService
  ) {
    this.initializeRoutes();
  }

  public getRouter() {
    return this.router;
  }

  private initializeRoutes() {
    this.router.post("/", this.createProductBlueprint);
    this.router.get("/", this.getProductBlueprints);
    this.router.put("/:id", this.updateProductBlueprint);
    this.router.get("/:id", this.getProductBlueprintByID);
    this.router.delete("/:id", this.deleteProductBlueprint);
  }

  private createProductBlueprint = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const inputData: ProductBlueprintRawDTO = req.body;

      const errors = await validate(inputData);
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const productBlueprintDTO =
        ProductBlueprintService.mapRawToDTO(inputData);
      const createdProductBlueprint =
        await this.productBlueprintService.createProductBlueprint(
          productBlueprintDTO
        );
      return res.status(201).json(createdProductBlueprint);
    } catch (error: any) {
      next(error);
    }
  };

  private getProductBlueprints = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const productBlueprints: ProductBlueprintFetchedDTO[] =
        await this.productBlueprintService.getProductBlueprints();
      return res.status(200).json(productBlueprints);
    } catch (error: any) {
      next(error);
    }
  };

  private updateProductBlueprint = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params; // Assuming you're using the ID from the URL
      const inputData: ProductBlueprintRawDTO = req.body;

      const errors = await validate(inputData);
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const productBlueprintDTO =
        ProductBlueprintService.mapRawToDTO(inputData);

      const updatedProductBlueprint =
        await this.productBlueprintService.updateProductBlueprint(
          id,
          productBlueprintDTO
        );

      const rawProductBlueprint = ProductBlueprintService.mapDTOToRaw(
        updatedProductBlueprint
      );
      return res.status(200).json(rawProductBlueprint);
    } catch (error: any) {
      next(error);
    }
  };

  private getProductBlueprintByID = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const productBlueprint =
        await this.productBlueprintService.getProductBlueprintByID(id);
      const rawProductBlueprint =
        ProductBlueprintService.mapDTOToRaw(productBlueprint);

      return res.status(200).json(rawProductBlueprint);
    } catch (error: any) {
      next(error);
    }
  };

  private deleteProductBlueprint = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      await this.productBlueprintService.deleteProductBlueprint(id);
      return res.status(200).send();
    } catch (error: any) {
      next(error);
    }
  };
}
