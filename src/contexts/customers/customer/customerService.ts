import Customer from "./customerModel";
import customerEvents from "./customerEvent";
import { CreateCustomerRequest } from "./customerDto";

export async function createCustomer(data: CreateCustomerRequest) {
  const customer = await Customer.create([data]);

  customerEvents.emit("customer.created", customer);

  return customer;
}

export async function getAllCustomers() {
  return await Customer.find();
}

export async function getCustomerById(id: string) {
  const customer = await Customer.findById(id);

  if (!customer) {
    throw new Error("Customer not found");
  }

  return customer;
}
