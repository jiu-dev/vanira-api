import { container } from "tsyringe";
import UserController from "./controllers/UserController";
import UserService from "./services/UserService";
import UserDAO from "./daos/UserDAO";
import ProductController from "./controllers/ProductController";
import ProductService from "./services/ProductService";
import ProductDAO from "./daos/ProductDAO";
import PropertyController from "./controllers/PropertyController";
import PropertyService from "./services/PropertyService";
import PropertyDAO from "./daos/PropertyDAO";
import AuthService from "./services/AuthService";
import AuthController from "./controllers/AuthController";

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

container.register("PropertyController", {
  useClass: PropertyController,
});

container.register("PropertyService", {
  useClass: PropertyService,
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

export const userController =
  container.resolve<UserController>("UserController");
export const productController =
  container.resolve<ProductController>("ProductController");
export const propertyController =
  container.resolve<PropertyController>("PropertyController");
export const authController =
  container.resolve<AuthController>("AuthController");
