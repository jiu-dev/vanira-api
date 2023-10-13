import jwt from "jsonwebtoken";

const secretKey = "your-secret-key"; // Change this to a strong, secret key

export function generateToken(payload: any): string {
  return jwt.sign(payload, secretKey, { expiresIn: "1h" }); // You can adjust the expiration time
}

export function verifyToken(token: string): any {
  return jwt.verify(token, secretKey);
}
