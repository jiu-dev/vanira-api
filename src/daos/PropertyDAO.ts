import { injectable } from "tsyringe";
import PropertyModel, { Property } from "../models/PropertyModel";
import { CreatePropertyDTO } from "../dtos/CreatePropertyDTO";

@injectable()
export default class PropertyDAO {
  async getAllProperty(): Promise<Property[]> {
    try {
      return await PropertyModel.find();
    } catch (error: any) {
      throw new Error(`Failed to fetch product Property: ${error.message}`);
    }
  }
  async createProperty(propertyData: CreatePropertyDTO): Promise<Property> {
    const createdProperty = await PropertyModel.create(propertyData);
    return createdProperty;
  }

  async createMultipleProperties(
    properties: CreatePropertyDTO[]
  ): Promise<Property[]> {
    const createdProperties = await PropertyModel.insertMany(properties);
    return createdProperties;
  }

  async deleteProperty(propertyId: string): Promise<void> {
    await PropertyModel.findByIdAndDelete(propertyId);
  }

  async updateProperty(
    propertyId: string,
    updatedData: Partial<Property>
  ): Promise<Property | null> {
    const updatedProperty = await PropertyModel.findByIdAndUpdate(
      propertyId,
      updatedData,
      { new: true }
    );
    return updatedProperty;
  }
}
