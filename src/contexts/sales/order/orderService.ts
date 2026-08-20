import { CreateOrderRequest } from "./orderDto";
import orderEvents from "./orderEvent";
import Order from "./orderModel";

export async function createOrder(data: CreateOrderRequest) {
  const order = await Order.create(data);

  orderEvents.emit("order.created", order);

  return order;
}

export async function getAllOrders() {
  return await Order.find();
}
