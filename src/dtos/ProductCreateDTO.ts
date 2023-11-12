import { IsNumber } from "class-validator";
import { BaseProductDTO } from "./BaseProduct";

export class ProductCreateDTO extends BaseProductDTO {
  @IsNumber()
  quantity = 0;

  @IsNumber()
  price = 0;
}
