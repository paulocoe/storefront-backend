import { Product } from "../models/products.model";
import { AbstractValidator } from "fluent-ts-validator";

export default class ProductValidator extends AbstractValidator<Product> {
  constructor() {
    super();

    this.validateIf((product) => product)
      .isDefined()
      .withFailureMessage("Product is invalid");

    this.validateIfString((product) => product.name)
      .isNotEmpty()
      .isAlphanumeric()
      .hasMinLength(3)
      .withFailureMessage("Please provide a valid product name");

    this.validateIfNumber((product) => product.price)
      .isGreaterThan(0)
      .withFailureMessage("Please provide a positive price value");

    this.validateIfNumber((product) => product.categoryId)
      .isGreaterThanOrEqual(1)
      .isLessThanOrEqual(7)
      .withFailureMessage("Please provide a valid category id");
  }
}
