import mongoose, { Schema, Document, Types } from "mongoose";
import { PropertyDocument } from "./PropertyModel";

export interface Compatibility extends Document {
  property: PropertyDocument;
  incompatible: Types.Array<PropertyDocument["_id"]> | PropertyDocument[];
}

const compatibilitySchema: Schema = new Schema({
  property: { type: Schema.Types.ObjectId, ref: "Property" },
  incompatible: [{ type: Schema.Types.ObjectId, ref: "Property" }],
});

const CompatibilityModel = mongoose.model("Compatibility", compatibilitySchema);

export default CompatibilityModel;
