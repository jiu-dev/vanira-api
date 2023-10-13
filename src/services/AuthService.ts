import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { UserSignUpDTO } from "../dtos/UserDTO";
import UserDAO from "../daos/UserDAO";
import { AuthenticationError } from "../errors/AuthenticationError";
import { NotFoundError } from "../errors/NotFoundError";

@injectable()
export default class AuthService {
  constructor(@inject("UserDAO") private userDAO: UserDAO) {}

  async register(userData: UserSignUpDTO) {
    userData.password = await bcrypt.hash(userData.password, 10);
    return this.userDAO.createUser(userData);
  }

  async login(email: string, password: string) {
    const user = await this.userDAO.findByEmail(email);
    if (!user) {
      throw new NotFoundError("404.NOT_FOUND");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new AuthenticationError("401.INVALID_PASSWORD");
    }

    const token = jwt.sign({ email: user.email }, "your-secret-key", {
      expiresIn: "1h",
    });

    return token;
  }
}
