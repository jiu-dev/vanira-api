import { IsArray, IsObject, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { PropertyDTO } from "./PropertyDTO";

export class BaseProductDTO {
  @IsObject()
  @ValidateNested()
  @Type(() => PropertyDTO)
  mainProperty: PropertyDTO = new PropertyDTO();

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PropertyDTO)
  properties: PropertyDTO[] = [];
}
