import Customer from "./customerModel";
import customerEvents from "./customerEvent";
import { CreateCustomerRequest } from "./customerDto";

export async function createCustomer(data: CreateCustomerRequest) {
  const customer = new Customer(data);

  customerEvents.emit("customer.created", customer);

  return customer;
}
