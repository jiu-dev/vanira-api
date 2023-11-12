import { container } from "tsyringe";
import UserController from "./../controllers/UserController";
import UserService from "./../services/UserService";
import UserDAO from "./../daos/UserDAO";
import ProductController from "./../controllers/ProductController";
import ProductService from "./../services/ProductService";
import ProductDAO from "./../daos/ProductDAO";
import PropertyDAO from "./../daos/PropertyDAO";
import AuthService from "./../services/AuthService";
import AuthController from "./../controllers/AuthController";
import ProductBlueprintController from "./../controllers/ProductBlueprintController";
import ProductBlueprintService from "./../services/ProductBlueprintService";
import ProductBlueprintDAO from "./../daos/ProductBlueprintDAO";
import { Model } from "mongoose";
import ProductModel, { ProductDocument } from "../models/ProductModel";
import PropertyModel, { IProperty } from "../models/PropertyModel";
import ProductBlueprintModel, {
  IProductBlueprint,
} from "../models/ProductBlueprintModel";

container.register("UserController", {
  useClass: UserController,
});

container.register("UserService", {
  useClass: UserService,
});

container.register("UserDAO", {
  useClass: UserDAO,
});

container.register("ProductController", {
  useClass: ProductController,
});

container.register("ProductService", {
  useClass: ProductService,
});

container.register("ProductDAO", {
  useClass: ProductDAO,
});

container.register("PropertyDAO", {
  useClass: PropertyDAO,
});

container.register("AuthController", {
  useClass: AuthController,
});

container.register("AuthService", {
  useClass: AuthService,
});

container.register("ProductBlueprintController", {
  useClass: ProductBlueprintController,
});

container.register("ProductBlueprintService", {
  useClass: ProductBlueprintService,
});

container.register("ProductBlueprintDAO", {
  useClass: ProductBlueprintDAO,
});

container.register<Model<ProductDocument>>("ProductModel", {
  useFactory: () => ProductModel,
});

container.register<Model<IProperty>>("PropertyModel", {
  useFactory: () => PropertyModel,
});

container.register<Model<IProductBlueprint>>("ProductBlueprintModel", {
  useFactory: () => ProductBlueprintModel,
});

export const userController =
  container.resolve<UserController>("UserController");
export const productController =
  container.resolve<ProductController>("ProductController");
export const authController =
  container.resolve<AuthController>("AuthController");
export const productBlueprintController =
  container.resolve<ProductBlueprintController>("ProductBlueprintController");
