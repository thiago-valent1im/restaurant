import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "./authType";

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!req.headers.authorization) {
    res.status(401).json("Authorization header is missing.");
    return;
  }

  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    res.status(401).json("Token is missing.");
    return;
  }

  const secretKey = process.env.JWT_SECRET;

  if (!secretKey) {
    res
      .status(500)
      .json(
        "JWT_SECRET environment variable is not defined. Please check your .env file and ensure it contains a valid Jwt secret key.",
      );
    return;
  }

  try {
    (req as AuthRequest).authorization = jwt.verify(token, secretKey) as {
      _id: string;
      name: string;
      role: string;
    };
  } catch (error) {
    res.status(401).json("Invalid token.");
    return;
  }

  next();
}
