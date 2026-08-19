import { Request, Response } from "express";
import { CreateCustomerRequest } from "./customerDto";
import { createCustomer } from "./customerService";

export async function create(req: Request, res: Response) {
  const data: CreateCustomerRequest = req.body;

  try {
    const customer = await createCustomer(data);

    res.send(customer);
  } catch (error) {
    res.send(error);
  }
}
