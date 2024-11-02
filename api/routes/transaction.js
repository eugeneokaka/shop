import express from "express";
const router = express.Router();
import { Transaction } from "../models/transaction.js";
import id from "./product.js";
import { Expense } from "../models/expense.js";
import { Product } from "../models/product.js";
router.get("/", async (req, res) => {
  const transactions = await Transaction.find({});
  res.json(transactions);
});
router.post("/", async (req, res) => {
  const { name, category, price, amount, mpesa_id, id, method } = req.body;

  const product = await Product.findById(`${id}`);

  if (product.amount < amount) {
    return res.json("not enought");
  }
  const transaction = await Transaction.create(req.body);
  const expense = await Expense.findById("671beababa7e10f4a9340e86");
  const sold = expense.sold + price;
  console.log("sold:", sold);
  const sales = sold - expense.total;
  console.log("sales", sales);
  const cat = expense.category;
  cat[category] = cat[category] + price;
  console.log("cat", cat);
  const newexpense = await Expense.updateMany(
    { _id: "671beababa7e10f4a9340e86" },
    { $set: { category: cat, sold, sales } }
  );
  const newamount = product.amount - amount;
  const newproduct = await Product.updateOne(
    { _id: id },
    { $set: { amount: newamount } }
  );

  res.json(transaction);
});
export default router;
