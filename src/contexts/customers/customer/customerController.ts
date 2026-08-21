import { Request, Response } from "express";
import { CreateCustomerRequest } from "./customerType";
import {
  createCustomer,
  getAllCustomers,
  loginCustomer,
} from "./customerService";
import { AuthRequest, LoginRequest } from "../../../shared/auth/authType";

export async function login(req: Request, res: Response) {
  const data: LoginRequest = req.body;

  try {
    const token = await loginCustomer(data);
    res.send(token);
  } catch (error) {
    res.send(error);
  }
}

export async function create(req: Request, res: Response) {
  const data: CreateCustomerRequest = req.body;

  try {
    const customer = await createCustomer(data);
    res.send(customer);
  } catch (error) {
    res.send(error);
  }
}

export async function getAll(req: Request, res: Response) {
  const { role } = (req as AuthRequest).authorization;

  if (role !== "admin") {
    throw new Error("Not allowed!");
  }

  const customers = await getAllCustomers();

  res.send(customers);
}
