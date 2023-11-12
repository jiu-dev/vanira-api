import { Types } from "mongoose";

export type ProductPropertiesWithObjectIDDTO = {
  mainProperty: Types.ObjectId;
  properties: Types.ObjectId[];
};
