import { inject, injectable } from "tsyringe";
import { IProperty } from "../models/PropertyModel";
import { Model, Types } from "mongoose";
import { PropertyDTO } from "../dtos/PropertyDTO";
import { ProductPropertiesWithObjectIDDTO } from "../dtos/ProductPropertiesWithObjectIDDTO";

@injectable()
export default class PropertyDAO {
  constructor(
    @inject("PropertyModel")
    private readonly propertyModel: Model<IProperty>
  ) {}

  async createProductProperties(
    productMainProperty: PropertyDTO,
    productProperties: PropertyDTO[]
  ): Promise<ProductPropertiesWithObjectIDDTO> {
    // Check if the main property exists or create it if not
    const mainProperty = await this.propertyModel.findOneAndUpdate(
      { name: productMainProperty.name, tag: productMainProperty.tag },
      { $setOnInsert: productMainProperty },
      { upsert: true, new: true }
    );

    // Find or create other properties
    const propertyQueries = productProperties.map((property) => ({
      updateOne: {
        filter: { name: property.name, tag: property.tag },
        update: { $setOnInsert: property },
        upsert: true,
      },
    }));

    // Perform the bulk operation
    await this.propertyModel.bulkWrite(propertyQueries, { ordered: false });

    const existingProperties = await this.propertyModel.find(
      {
        $or: productProperties.map((property) => ({
          name: property.name,
          tag: property.tag,
        })),
      },
      { _id: 1 }
    ); // Project only the _id field
    const propertyIds = existingProperties.map((property) => property._id);

    return {
      mainProperty: mainProperty._id,
      properties: propertyIds,
    };
  }

  async deleteManyById(IDs: Types.ObjectId[]) {
    console.log(IDs);
    this.propertyModel.deleteMany({ _id: { $in: IDs } });
  }
}
