import { injectable } from "tsyringe";
import UserModel, { IUser } from "../models/UserModel";
import { UserSignUpDTO } from "../dtos/UserDTO";

@injectable()
export default class UserRepository {
  async createUser(user: UserSignUpDTO): Promise<IUser> {
    try {
      const newUser = new UserModel(user);
      return await newUser.save();
    } catch (error: any) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }

  async findById(userId: string): Promise<IUser | null> {
    try {
      return await UserModel.findById(userId).exec();
    } catch (error: any) {
      throw new Error(`Failed to find user by ID: ${error.message}`);
    }
  }

  async findByEmail(email: string): Promise<IUser | null> {
    try {
      return await UserModel.findOne({ email });
    } catch (error: any) {
      throw new Error(`Failed to find user by mail: ${error.message}`);
    }
  }

  async updateUser(
    userId: string,
    updates: Partial<IUser>
  ): Promise<IUser | null> {
    try {
      return await UserModel.findByIdAndUpdate(userId, updates, {
        new: true,
      }).exec();
    } catch (error: any) {
      throw new Error(`Failed to update user: ${error.message}`);
    }
  }

  async deleteUser(userId: string): Promise<void> {
    try {
      await UserModel.findByIdAndRemove(userId).exec();
    } catch (error: any) {
      throw new Error(`Failed to delete user: ${error.message}`);
    }
  }
}
