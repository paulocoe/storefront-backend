import express, { Request, Response } from "express";
import { Product, ProductStore } from "../models/products.model";
import ProductValidator from "../validators/product.validator";

const validator = new ProductValidator();
const store = new ProductStore();
const routePrefix = "/products";
const generalError = new Error("Something wrong happened");

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
  try {
    const product = req.body as Product;

    const validation = await validator.validateAsync(product);
    if (validation.isInvalid()) {
      const messages = validation.getFailureMessages();
      res.status(400).json(messages);
      return;
    }

    const productId = await store.create(product);
    res.status(201).json(productId);
  } catch (error) {
    console.error(error);
    res.status(500).json(generalError);
  }
};

const mostPopular = async (req: Request, res: Response) => {
  try {
    const products = await store.mostPopular();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json(generalError);
  }
};

const byCategory = async (req: Request, res: Response) => {
  try {
    const categoryId = Number(req.params.categoryId);
    if (!categoryId) {
      res.status(400).json({ message: "Invalid category id" });
      return;
    }

    const products = await store.byCategory(categoryId);
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json(generalError);
  }
};

const productsRoutes = (app: express.Application) => {
  app.get(`${routePrefix}/`, index);
  app.get(`${routePrefix}/mostPopular`, mostPopular);
  app.get(`${routePrefix}/byCategory/:categoryId`, byCategory);
  app.get(`${routePrefix}/:id`, show);
  app.post(`${routePrefix}/create`, create);
};

export default productsRoutes;
