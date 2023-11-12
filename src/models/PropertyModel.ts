import mongoose, { Schema, Document } from "mongoose";

export interface IProperty extends Document {
  tag: string;
  name: string;
  description: string;
}

const PropertySchema: Schema = new Schema({
  tag: String,
  name: { type: String, required: true },
  description: String,
});

const PropertyModel = mongoose.model<IProperty>("Property", PropertySchema);

export default PropertyModel;
