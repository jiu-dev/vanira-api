import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  token?: string;
  profilePicture?: string;
  firstname: string;
  lastname: string;
}

const UserSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      minlength: 6,
    },
    token: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
    firstname: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 55,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 55,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model<IUser>("User", UserSchema);

export default UserModel;
