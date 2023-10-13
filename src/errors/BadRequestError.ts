export class BadRequestError extends Error {
  errors: string[];
  constructor(errors: string[]) {
    super("Bad request: Validation failed.");
    this.name = "BadRequestError";
    this.errors = errors;
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}
