import { Request, Response } from "express";
import { CreateProductRequest } from "./productType";
import { createProduct, getAllProducts } from "./productService";

export async function create(req: Request, res: Response) {
  const data: CreateProductRequest = req.body;

  try {
    const product = await createProduct(data);

    res.send(product);
  } catch (error) {
    res.send(error);
  }
}

export async function getAll(req: Request, res: Response) {
  const products = await getAllProducts();
  res.send(products);
}
