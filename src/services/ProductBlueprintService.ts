import { inject, injectable } from "tsyringe";
import { PropertyDTO } from "../dtos/PropertyDTO";
import { IProductBlueprint } from "../models/ProductBlueprintModel";
import ProductBlueprintDAO from "../daos/ProductBlueprintDAO";
import {
  OptionRawDTO,
  ProductBlueprintRawDTO,
  PropertyRawDTO,
} from "../dtos/ProductBlueprintRawDTO";
import { ProductBlueprintDTO } from "../dtos/ProductBlueprintDTO";
import { ProductBlueprintFetchedDTO } from "../dtos/ProductBlueprintFetchedDTO";

@injectable()
export default class ProductBlueprintService {
  constructor(
    @inject("ProductBlueprintDAO")
    private readonly productBlueprintDAO: ProductBlueprintDAO
  ) {}

  static mapRawToDTO(
    incomingData: ProductBlueprintRawDTO
  ): ProductBlueprintDTO {
    const transformProperties: PropertyDTO[] = [];
    incomingData.properties.map((property) => {
      return property.options.map((option) =>
        transformProperties.push({
          tag: property.mainOption.name,
          name: option.name,
          description: option.description,
        })
      );
    });

    return {
      mainProperty: {
        name: incomingData.mainProperty.name,
        description: incomingData.mainProperty.description,
      },
      properties: transformProperties,
    };
  }

  static mapDTOToRaw(dto: IProductBlueprint): ProductBlueprintRawDTO {
    // Reconstruct the properties by grouping PropertyDTOs by the tag, which corresponds to mainOption.name
    const propertiesMap = new Map<string, OptionRawDTO[]>();

    dto.properties.forEach((propertyDTO) => {
      const tag = propertyDTO.tag;
      if (typeof tag === "string") {
        const existingOptions = propertiesMap.get(tag) || [];
        const option: OptionRawDTO = {
          name: propertyDTO.name, // Provide a default value if undefined
          description: propertyDTO.description, // Provide a default value if undefined
        };
        propertiesMap.set(tag, [...existingOptions, option]);
      }
    });

    // Transform the map into the structure expected by ProductBlueprintRawDTO
    const properties: PropertyRawDTO[] = [];
    propertiesMap.forEach((options, mainOptionName) => {
      properties.push({
        mainOption: { name: mainOptionName },
        options: options,
      });
    });

    // Reconstruct the mainProperty using the mainProperty of the DTO
    const mainProperty: OptionRawDTO = {
      name: dto.mainProperty.name,
      description: dto.mainProperty.description,
    };

    // Return the reconstructed ProductBlueprintRawDTO
    return {
      _id: dto._id,
      mainProperty: mainProperty,
      properties: properties,
    };
  }

  async createProductBlueprint(data: ProductBlueprintDTO): Promise<string> {
    return await this.productBlueprintDAO.createProductBlueprint(data);
  }

  async updateProductBlueprint(blueprintID: string, data: ProductBlueprintDTO) {
    return await this.productBlueprintDAO.updateProductBlueprint(
      blueprintID,
      data
    );
  }

  async getProductBlueprints(): Promise<ProductBlueprintFetchedDTO[]> {
    const productBlueprints =
      await this.productBlueprintDAO.getProductBlueprints();

    const transformBlueprints: ProductBlueprintFetchedDTO[] =
      productBlueprints.map((blueprint: IProductBlueprint) => ({
        _id: blueprint._id,
        name: blueprint.mainProperty.name,
      }));

    return transformBlueprints;
  }

  async getProductBlueprintByID(
    blueprintID: string
  ): Promise<IProductBlueprint> {
    return await this.productBlueprintDAO.getProductBlueprintByID(blueprintID);
  }

  async deleteProductBlueprint(blueprintID: string) {
    await this.productBlueprintDAO.deleteProductBlueprint(blueprintID);
  }
}
