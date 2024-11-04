import "reflect-metadata";
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { AppDataSource } from "./database/data-source";
import routeUser from "./routes/user";
import routeStore from "./routes/store";
import routeSeller from "./routes/seller";
import routeSale from "./routes/sale";
import routeSaleItems from "./routes/sale_items";
import routeProduct from "./routes/product";
import routeGroup from "./routes/group";
import routeComplement from "./routes/complement";
import routeCategory from "./routes/categories";
import routeAddress from "./routes/addresses";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/user", routeUser);
app.use("/store", routeStore);
app.use("/seller", routeSeller);
app.use("/sale", routeSale);
app.use("/sale_items", routeSaleItems);
app.use("/product", routeProduct);
app.use("/group", routeGroup);
app.use("/complement", routeComplement);
app.use("/category", routeCategory);
app.use("/address", routeAddress);

AppDataSource.initialize()
  .then(() => {
    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  })
  .catch((error) => console.log(error))
