import { CreateProductRequest } from "./productType";
import productEvents from "./productEvent";
import Product from "./productModel";

export async function createProduct(data: CreateProductRequest) {
  const product = await Product.create(data);

  productEvents.emit("product.created", product);

  return product;
}

export async function getAllProducts() {
  return await Product.find();
}

export async function getProductById(id: string) {
  const product = await Product.findById(id);

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
}

export async function hasProducts(products: { _id: string; price: number }[]) {
  const result = await Product.find({
    $or: products,
  });

  if (result.length !== products.length) {
    throw new Error("Some products were not found or have an invalid price");
  }

  return products;
}
