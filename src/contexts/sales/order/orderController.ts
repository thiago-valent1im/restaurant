import { Request, Response } from "express";
import { CreateOrderRequest } from "./orderDto";
import { createOrder } from "./orderService";

export async function create(req: Request, res: Response) {
  const data: CreateOrderRequest = req.body;

  try {
    const order = await createOrder(data);

    res.send(order);
  } catch (error) {
    res.send(error);
  }
}
