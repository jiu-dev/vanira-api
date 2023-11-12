import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    const connectionOptions = {};
    if (process.env.MONGODB_URI) {
      await mongoose.connect(process.env.MONGODB_URI, connectionOptions);
      console.log("Connected to MongoDB");
      console.log(process.env.MONGODB_URI);
    }
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export default connectToDatabase;
