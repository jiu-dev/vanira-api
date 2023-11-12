import { IsArray, IsObject, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class OptionRawDTO {
  @IsString()
  name = "";

  @IsString()
  description?: string;
}

export class PropertyRawDTO {
  @IsObject()
  mainOption: OptionRawDTO = new OptionRawDTO();

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OptionRawDTO)
  options: OptionRawDTO[] = [];
}

export class ProductBlueprintRawDTO {
  _id?: string;

  @IsObject()
  @ValidateNested()
  @Type(() => OptionRawDTO)
  mainProperty: OptionRawDTO = new OptionRawDTO();

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PropertyRawDTO)
  properties: PropertyRawDTO[] = [];
}
