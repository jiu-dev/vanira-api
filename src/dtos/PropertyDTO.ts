import { IsString } from "class-validator";
import { IProperty } from "../models/PropertyModel";

export class PropertyDTO {
  @IsString()
  tag?: IProperty["tag"];

  @IsString()
  name: IProperty["name"] = "";

  @IsString()
  description?: IProperty["description"];
}
