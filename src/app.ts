import express from "express";
import productsRoutes from "./handlers/products.handler";
import bodyParser from "body-parser";
//import userRoutes from "./handlers/users.handler";
const app = express();
const port = "3000";
const address = `0.0.0.0:${port}`;

app.use(bodyParser.json());
productsRoutes(app);

app.listen(port, () => {
  console.log(`Starting app on: ${address}`);
});
