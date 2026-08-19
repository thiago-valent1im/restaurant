import { CreateOrderRequest } from "./orderDto";
import orderEvents from "./orderEvent";
import Order from "./orderModel";

export async function createOrder(data: CreateOrderRequest) {
  const order = new Order(data);

  orderEvents.emit("order.created", order);

  return order;
}

export async function getAll() {
  return Order.find();
}
