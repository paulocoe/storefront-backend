import express, { Request, Response } from "express";
import { Product, ProductStore } from "../models/products.model";
import ProductValidator from "../validators/product.validator";

const validator = new ProductValidator();
const store = new ProductStore();
const routePrefix = "/products";

const index = async (_req: Request, res: Response) => {
  const products = await store.index();
  res.json(products);
};

const show = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!id) {
    res.status(400).send("Invalid product id.");
    return;
  }

  const product = await store.show(id);
  if (!product) {
    res.status(404).send("Product not found.");
    return;
  }
  res.status(200).json(product);
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
  app.get(`${routePrefix}/`, index);
  app.get(`${routePrefix}/:id`, show);
  app.post(`${routePrefix}/create`, create);
};

export default productsRoutes;
