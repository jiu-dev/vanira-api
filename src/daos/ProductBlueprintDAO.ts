import { injectable, inject } from "tsyringe";
import { IProductBlueprint } from "../models/ProductBlueprintModel";
import PropertyDAO from "./PropertyDAO";
import { Model } from "mongoose";
import { ConflictError } from "../errors/ConflictError";
import { IProperty } from "../models/PropertyModel";
import { ProductPropertiesWithObjectIDDTO } from "../dtos/ProductPropertiesWithObjectIDDTO";
import { NotFoundError } from "../errors/NotFoundError";
import { ProductBlueprintDTO } from "../dtos/ProductBlueprintDTO";

@injectable()
export default class ProductBlueprintDAO {
  constructor(
    @inject("ProductBlueprintModel")
    private readonly productBlueprintModel: Model<IProductBlueprint>,
    @inject("PropertyModel")
    private readonly propertyModel: Model<IProperty>,
    @inject("PropertyDAO")
    private propertyDAO: PropertyDAO
  ) {}

  async createProductBlueprint(data: ProductBlueprintDTO): Promise<string> {
    const properties: ProductPropertiesWithObjectIDDTO =
      await this.propertyDAO.createProductProperties(
        data.mainProperty,
        data.properties
      );

    const property = await this.propertyModel.findOne({
      name: data.mainProperty.name,
    });

    const existingProductBlueprint = await this.productBlueprintModel.findOne({
      mainProperty: property,
    });

    if (existingProductBlueprint) {
      throw new ConflictError("409.CONFLICT");
    }

    const productBlueprint = await this.productBlueprintModel.create(
      properties
    );

    return productBlueprint._id;
  }

  async updateProductBlueprint(blueprintID: string, data: ProductBlueprintDTO) {
    // Combine the findById and update operation to reduce database calls
    const blueprint = await this.productBlueprintModel
      .findById(blueprintID)
      .populate("properties");
    if (!blueprint) {
      throw new NotFoundError("404.NOT_FOUND");
    }

    // Filter the properties that need to be deleted
    const propertiesToDelete = blueprint.properties
      .filter(
        (property) =>
          !data.properties.some(
            (prop) => property.name === prop.name && property.tag === prop.tag
          )
      )
      .map((property) => property._id);

    if (
      blueprint.mainProperty.name !== data.mainProperty.name &&
      blueprint.mainProperty.tag !==
        (data.mainProperty.tag ? data.mainProperty.tag : null)
    ) {
      propertiesToDelete.push(blueprint.mainProperty._id);
    }
    // Discard orphan properties
    await this.discardOrphanProperty(propertiesToDelete);

    const properties: ProductPropertiesWithObjectIDDTO =
      await this.propertyDAO.createProductProperties(
        data.mainProperty,
        data.properties
      );

    await this.productBlueprintModel.findByIdAndUpdate(
      blueprint._id,
      {
        mainProperty: properties.mainProperty,
        properties: properties.properties,
      },
      { new: true }
    );

    return await this.getProductBlueprintByID(blueprint._id);
  }

  async getProductBlueprints(): Promise<IProductBlueprint[]> {
    return await this.productBlueprintModel.find().populate("mainProperty");
  }

  async getProductBlueprintByID(
    blueprintID: string
  ): Promise<IProductBlueprint> {
    const productBlueprint = await this.productBlueprintModel
      .findById(blueprintID)
      .populate("mainProperty")
      .populate("properties");

    if (!productBlueprint) {
      throw new NotFoundError("404.NOT_FOUND");
    }

    return productBlueprint;
  }

  async deleteProductBlueprint(blueprintID: string) {
    const productBlueprint = await this.productBlueprintModel.findById(
      blueprintID
    );

    if (!productBlueprint) {
      throw new NotFoundError("404.NOT_FOUND");
    }

    await this.propertyModel.deleteOne(productBlueprint.mainProperty);
    await this.discardOrphanProperty(productBlueprint.properties);
    await this.productBlueprintModel.deleteOne({ _id: blueprintID });
  }

  async discardOrphanProperty(properties: IProperty[]) {
    for (const propertyId of properties) {
      // Check if the property is used by any other ProductBlueprint
      const count = await this.productBlueprintModel.countDocuments({
        $or: [{ properties: propertyId }, { mainProperty: propertyId }],
      });

      // If the property is not used by any other ProductBlueprint, delete it
      if (count === 1) {
        await this.propertyModel.deleteOne({ _id: propertyId });
      }
    }
  }
}
