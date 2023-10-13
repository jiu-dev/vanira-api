import express from "express";
import "reflect-metadata";
import connectToDatabase from "./database";
import {
  authController,
  productController,
  propertyController,
  userController,
} from "./container";
import bodyParser from "body-parser";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandler";
import i18n from "i18n";
import path from "path";

const app = express();
connectToDatabase();

i18n.configure({
  locales: ["en", "fr"], // List of supported languages
  defaultLocale: "fr", // Default language
  directory: path.join(__dirname, "locales"), // Path to your locales directory
  cookie: "lang", // Cookie to store the user's language preference
  queryParameter: "lang", // Query parameter to set the user's language preference
  objectNotation: true,
});

// Middleware to set the user's preferred language
app.use(i18n.init);
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use("/api/users", userController.getRouter());
app.use("/api/auth", authController.getRouter());
app.use("/api/products", productController.getRouter());
app.use("/api/properties", propertyController.getRouter());
app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

export default app;
