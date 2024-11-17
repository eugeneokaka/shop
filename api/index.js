import express from "express";
/** @type {import("express").RequestHandler} */
import Mongoose from "mongoose";
import cors from "cors";
import { Product } from "./models/product.js";
import { Transaction } from "./models/transaction.js";
import productrouter from "./routes/product.js";
import transactionrouter from "./routes/transaction.js";
import expenserouter from "./routes/expense.js";
import { Expense } from "./models/expense.js";
const app = express();
Mongoose.connect("mongodb://localhost:27017/shop");
app.use(express.json());
app.use(cors());
app.use("/product", productrouter);
app.use("/transaction", transactionrouter);
app.use("/expense", expenserouter);

app.get("/", async (req, res) => {
  const expense = await Expense.create({
    total: 0,
    sold: 0,
    sales: 0,
  });
  res.json(expense);
});
app.listen(5000, () => {
  console.log("runnuing");
});
