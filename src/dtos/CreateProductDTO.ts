import { CreatePropertyDTO } from "./CreatePropertyDTO";

export interface CreateProductDTO {
  mainProperty: CreatePropertyDTO;
  productProperties: CreatePropertyDTO[];
  quantity: number;
}
