import express, { Request, Response } from "express";
import { Product, ProductStore } from "../models/products.model";
import ProductValidator from "../validators/product.validator";

const validator = new ProductValidator();
const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  const products = await store.index();
  res.json(products);
};

const create = async (req: Request, res: Response) => {
  const product = req.body as Product;

  const validation = await validator.validateAsync(product);
  if (validation.isInvalid()) {
    const messages = validation.getFailureMessages();
    res.status(400).send(messages);
    return;
  }

  const productId = await store.create(product);
  res.status(201).json(productId);
};

const productsRoutes = (app: express.Application) => {
  app.get("/products", index);
  app.post("products/create", create);
};

export default productsRoutes;
