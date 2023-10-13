import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const DB_URL = process.env.MONGODB_URI || "mongodb://localhost:27017/aere_proj";

const connectToDatabase = async () => {
  try {
    const connectionOptions = {};
    await mongoose.connect(DB_URL, connectionOptions);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export default connectToDatabase;
