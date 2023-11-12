import mongoose, { Schema, Document, Model } from "mongoose";
import { IProperty } from "./PropertyModel";

export interface IProductBlueprint extends Document {
  mainProperty: IProperty["_id"];
  properties: IProperty["_id"][];
}

const ProductBlueprintSchema: Schema = new Schema({
  mainProperty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
  },
  properties: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
    },
  ],
});

type ProductBlueprintModelType = Model<IProductBlueprint>;

const ProductBlueprintModel = mongoose.model<
  IProductBlueprint,
  ProductBlueprintModelType
>("ProductBlueprint", ProductBlueprintSchema);

export default ProductBlueprintModel;
