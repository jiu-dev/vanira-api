import mongoose, { Schema, Document } from "mongoose";

export interface Property extends Document {
  tag: string;
  name: string;
  description?: string;
  translations: {
    langageCode: string;
    tag: string;
    name: string;
    description?: string;
  }[];
}

const PropertySchema: Schema = new Schema({
  tag: String,
  name: { type: String, required: true },
  description: String,
  translations: [
    {
      langageCode: { type: String, required: true },
      tag: { type: String, required: true },
      name: { type: String, required: true },
      description: String,
    },
  ],
});

const PropertyModel = mongoose.model<Property>("Property", PropertySchema);

export default PropertyModel;
