import mongoose, { Schema, Document, Types } from "mongoose";
import { Property } from "./PropertyModel";

export interface Product extends Document {
  mainProperty: Property;
  productProperties: Types.Array<Property["_id"]> | Property[];
  quantity: number;
}

const ProductSchema: Schema = new Schema({
  mainProperty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    price: Number,
  },
  productProperties: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      price: Number,
    },
  ],
  quantity: { type: Number, required: true },
});

const ProductModel = mongoose.model<Product>("Product", ProductSchema);

export default ProductModel;
