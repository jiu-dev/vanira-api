import { NextFunction, Request, Response, Router } from "express";
import AuthService from "../services/AuthService";
import { inject, injectable } from "tsyringe";
import {
  handleValidationErrors,
  loginValidation,
  registrationValidation,
} from "../middleware/validation";

@injectable()
export default class AuthController {
  private router = Router();

  constructor(@inject("AuthService") private authService: AuthService) {
    this.initializeRoutes();
  }

  public getRouter() {
    return this.router;
  }

  private initializeRoutes() {
    this.router.post(
      "/register",
      registrationValidation,
      handleValidationErrors,
      this.register
    );
    this.router.post(
      "/login",
      loginValidation,
      handleValidationErrors,
      this.login
    );
  }

  private register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await this.authService.register(req.body);
      res.status(201).json({ message: "User registered successfully" });
    } catch (e: any) {
      next(e);
    }
  };

  private login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      console.log(email);
      const token = await this.authService.login(email, password);
      res.json({ token });
    } catch (e: any) {
      next(e);
    }
  };
}
