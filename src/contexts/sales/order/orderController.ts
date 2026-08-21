import { Request, Response } from "express";
import { CreateOrderRequest } from "./orderType";
import { createOrder, getAllOrders } from "./orderService";
import { hasCustomer } from "../../customers/customer/customerService";
import { hasProducts } from "../../catalog/product/productService";
import { AuthRequest } from "../../../shared/auth/authType";
import { hasCombos } from "../combo/comboService";

export async function create(req: Request, res: Response) {
  const { _id } = (req as AuthRequest).authorization;
  const data: CreateOrderRequest = req.body;

  if (_id != data.customerId) {
    throw new Error("Not allowed!");
  }

  await hasCustomer(data.customerId);
  await hasProducts(
    data.items.map((item) => ({ _id: item.productId, price: item.unitPrice })),
  );
  await hasCombos(data.combos);

  try {
    const order = await createOrder(data);

    res.send(order);
  } catch (error) {
    res.send(error);
  }
}

export async function getAll(req: Request, res: Response) {
  const orders = await getAllOrders();

  res.send(orders);
}
