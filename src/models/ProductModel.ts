import mongoose, { Schema, Document } from "mongoose";
import { ProductCreateDTO } from "../dtos/ProductCreateDTO";

export interface ProductDocument extends Document, ProductCreateDTO {}

const ProductSchema: Schema = new Schema({
  price: Number,
  mainProperty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
  },
  productProperties: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
    },
  ],
});

const ProductModel = mongoose.model<ProductDocument>("Product", ProductSchema);

export default ProductModel;
