import Customer from "./customerModel";
import customerEvents from "./customerEvent";
import { CreateCustomerRequest } from "./customerType";
import { LoginRequest } from "../../shared/middleware/authType";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function loginCustomer(data: LoginRequest) {
  const { email, password } = data;
  const customer = await Customer.findOne({ email });

  const secretKey = process.env.JWT_SECRET;

  if (!secretKey) {
    throw new Error("JWT_SECRET environment variable is not defined.");
  }

  try {
    if (!customer || !(await bcrypt.compare(password, customer.password))) {
      throw new Error("Invalid email or password!");
    }
  } catch (error) {
    throw error;
  }

  const token = jwt.sign(
    { _id: customer._id, name: customer.name, role: "customer" },
    secretKey,
    { expiresIn: "1h" },
  );

  return token;
}

export async function createCustomer(data: CreateCustomerRequest) {
  const customer = await Customer.create(data);

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
