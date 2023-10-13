import { inject, injectable } from "tsyringe";
import { IUser } from "../models/UserModel";
import UserDAO from "../daos/UserDAO";

@injectable()
export default class UserService {
  constructor(@inject("UserDAO") private userDAO: UserDAO) {}

  async getUserById(userId: string): Promise<IUser | null> {
    return await this.userDAO.findById(userId);
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    return await this.userDAO.findByEmail(email);
  }

  async checkEmailExists(email: string) {
    const user = await this.userDAO.findByEmail(email);
    return !!user; // Returns true if user exists, false otherwise
  }

  async updateUser(
    userId: string,
    updates: Partial<IUser>
  ): Promise<IUser | null> {
    return await this.userDAO.updateUser(userId, updates);
  }

  async deleteUser(userId: string): Promise<void> {
    return await this.userDAO.deleteUser(userId);
  }
  // Add service methods to handle business logic
}
