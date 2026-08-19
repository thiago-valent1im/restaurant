import { CreateProductRequest } from "./productDto";
import productEvents from "./productEvent";
import Product from "./productModel";

export async function createProduct(data: CreateProductRequest) {
  const product = new Product(data);

  productEvents.emit("product.created", product);

  return product;
}

export async function getAllProducts() {
  return Product.find();
}
