import { Request, Response } from "express";
import { AuthenticationError } from "../errors/AuthenticationError";
import { NotFoundError } from "../errors/NotFoundError";
import { AuthorizationError } from "../errors/AuthorizationError";
import { BadRequestError } from "../errors/BadRequestError";

export const errorHandler = (error: Error, req: Request, res: Response) => {
  let status;

  switch (true) {
    case error instanceof NotFoundError:
      status = 404;
      break;
    case error instanceof BadRequestError:
      status = 400;
      break;
    case error instanceof AuthenticationError:
      status = 401;
      break;
    case error instanceof AuthorizationError:
      status = 403;
      break;
    default: // Default status code for other errors
      status = 500;
  }
  console.log(error.message);

  return res
    .status(status)
    .json({ error: res.__("STATUS_CODE." + error.message) });
};
