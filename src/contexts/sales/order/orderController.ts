import { Request, Response } from "express";
import { CreateOrderRequest } from "./orderDto";
import { createOrder, getAllOrders } from "./orderService";
import { getCustomerById } from "../../customers/customer/customerService";
import { getProductByIdsAndPrice } from "../../catalog/product/productService";

export async function create(req: Request, res: Response) {
  const data: CreateOrderRequest = req.body;

  await getCustomerById(data.customerId);
  await getProductByIdsAndPrice(
    data.items.map((item) => ({ _id: item.productId, price: item.unitPrice })),
  );

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
