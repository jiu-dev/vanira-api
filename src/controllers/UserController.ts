import { Request, Response, Router } from "express";
import UserService from "../services/UserService";
import { IUser } from "../models/UserModel";
import { inject, injectable } from "tsyringe";

@injectable()
export default class UserController {
  private router = Router();

  constructor(@inject("UserService") private userService: UserService) {
    this.initializeRoutes();
  }

  public getRouter() {
    return this.router;
  }

  private initializeRoutes() {
    this.router.get("/:userId", this.getUserById);
    this.router.get("/email/:email", this.getUserByEmail);
    this.router.get("/check-email/:email", this.checkEmailExists);
    this.router.put("/:userId", this.updateUser);
    this.router.delete("/:userId", this.deleteUser);
  }

  private getUserById = async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId;
      const user = await this.userService.getUserById(userId);

      console.log("yeahyou:w");
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  private getUserByEmail = async (req: Request, res: Response) => {
    try {
      const email = req.params.email;
      const user = await this.userService.getUserByEmail(email);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  private checkEmailExists = async (req: Request, res: Response) => {
    try {
      const email = req.params.email;
      console.log(email);
      const exists = await this.userService.checkEmailExists(email);
      console.log(exists);
      res.json({ exists });
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  private updateUser = async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId;
      const updates: Partial<IUser> = req.body;
      const updatedUser = await this.userService.updateUser(userId, updates);
      if (updatedUser) {
        res.status(200).json(updatedUser);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  private deleteUser = async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId;
      await this.userService.deleteUser(userId);
      res.status(204).send(); // No content
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };
}
