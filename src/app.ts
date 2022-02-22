import express from "express";
import productsRoutes from "./handlers/products.handler";
import userRoutes from "./handlers/users.handler";
const app = express();
const port = "3000";
const address = `0.0.0.0:${port}`;

productsRoutes(app);

app.listen(port, () => {
  console.log(`Starting app on: ${address}`);
});
