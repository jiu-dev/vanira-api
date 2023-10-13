import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: any; // Change 'any' to the actual type of your user object if known
    }
  }
}
