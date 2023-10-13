import { inject, injectable } from "tsyringe";
import { Property } from "../models/PropertyModel";
import PropertyDAO from "../daos/PropertyDAO";
import { CreatePropertyDTO } from "../dtos/CreatePropertyDTO";

@injectable()
export default class PropertyService {
  constructor(
    @inject("PropertyDAO")
    private PropertyDAO: PropertyDAO
  ) {}

  async getAllProperty(): Promise<Property[]> {
    return this.PropertyDAO.getAllProperty();
  }

  async createProperty(PropertyData: CreatePropertyDTO): Promise<Property> {
    const createdProperty = await this.PropertyDAO.createProperty(PropertyData);

    if (!createdProperty._id) {
      throw new Error("Missing _id field");
    }

    return createdProperty;
  }

  async createMultipleProperties(
    properties: CreatePropertyDTO[]
  ): Promise<Property[]> {
    const createdProperties = await this.PropertyDAO.createMultipleProperties(
      properties
    );

    return createdProperties.map((property: Property) => {
      if (!property._id) {
        throw new Error("Missing _id field");
      }
      return property;
    });
  }

  async deleteProperty(PropertyId: string): Promise<void> {
    await this.PropertyDAO.deleteProperty(PropertyId);
  }

  async updateProperty(
    PropertyId: string,
    updatedData: Partial<Property>
  ): Promise<Property | null> {
    const updatedProperty = await this.PropertyDAO.updateProperty(
      PropertyId,
      updatedData
    );
    return updatedProperty;
  }
}
