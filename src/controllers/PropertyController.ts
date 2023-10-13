import { Request, Response, Router } from "express";
import PropertyService from "../services/PropertyService";
import { inject, injectable } from "tsyringe";
import { Property } from "../models/PropertyModel";
import { CreatePropertyDTO } from "../dtos/CreatePropertyDTO";

@injectable()
export default class PropertyController {
  private router = Router();

  constructor(
    @inject("PropertyService")
    private PropertyService: PropertyService
  ) {
    this.initializeRoutes();
  }

  public getRouter() {
    return this.router;
  }

  private initializeRoutes() {
    this.router.get("/", this.getAllProperty);
    this.router.post("/", this.createProperty);
    this.router.put("/:PropertyId", this.updateProperty);
    this.router.delete("/:PropertyId", this.deleteProperty);
  }

  private getAllProperty = async (req: Request, res: Response) => {
    try {
      const Property = await this.PropertyService.getAllProperty();
      res.status(200).json(Property);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  private createProperty = async (req: Request, res: Response) => {
    try {
      const propertyData: CreatePropertyDTO = req.body;
      const createdProperty = await this.PropertyService.createProperty(
        propertyData
      );
      res.status(201).json(createdProperty);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  private deleteProperty = async (req: Request, res: Response) => {
    try {
      const PropertyId: string = req.params.PropertyId;
      await this.PropertyService.deleteProperty(PropertyId);
      res.status(204).end(); // No content
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  private updateProperty = async (req: Request, res: Response) => {
    try {
      const PropertyId: string = req.params.PropertyId; // Assuming you're passing the ID in the URL
      const updatedData: Partial<Property> = req.body; // Assuming you're sending the data in the request body
      const updatedProperty = await this.PropertyService.updateProperty(
        PropertyId,
        updatedData
      );
      if (updatedProperty) {
        res.status(200).json(updatedProperty);
      } else {
        res.status(404).json({ error: "Product Property not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}
