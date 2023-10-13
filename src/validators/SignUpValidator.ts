import { checkSchema } from "express-validator";

const UserSchema = {
  create: checkSchema({
    username: {
      isLength: {
        options: { min: 3 },
        errorMessage: "Username must be at least 3 characters long",
      },
      isAlphanumeric: {
        errorMessage: "Username can only contain letters and numbers",
      },
    },
    email: {
      isEmail: {
        errorMessage: "Invalid email address",
      },
    },
    password: {
      isLength: {
        options: { min: 6 },
        errorMessage: "Password must be at least 6 characters long",
      },
    },
  }),
  // Define other schemas for different endpoints or operations
};

export default UserSchema;
