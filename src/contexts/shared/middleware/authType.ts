import { Request } from "express";

export interface AuthRequest extends Request {
  authorization: {
    _id: string;
    name: string;
    role: string;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}
