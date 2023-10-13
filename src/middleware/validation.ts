import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const registrationValidation = [
  body("firstname")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Firstname must be at least 3 characters"),
  body("lastname")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Lastname must be at least 3 characters"),
  body("email").trim().isEmail().withMessage("Invalid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

export const loginValidation = [
  body("email").notEmpty().isLength({ min: 3 }).withMessage("3 char"),
  body("password").notEmpty().isLength({ min: 3 }).withMessage("3 char"),
];

export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  console.log(errors.array());
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};
