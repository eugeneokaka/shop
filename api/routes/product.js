import express from "express";
const router = express.Router();
import { Product } from "../models/product.js";
import { Expense } from "../models/expense.js";
// router.get("/", (req, res) => {
//   res.json("hi");
// });
export const id = "671beababa7e10f4a9340e86";
router.get("/", async (req, res) => {
  const product = await Product.find({});
  // const expense = await Expense.findById(id);
  // console.log(expense.category["food"]);
  // console.log(expense);
  res.json({ product });
});
router.post("/", async (req, res) => {
  const { name, category, price, amount, bprice } = req.body;
  // const product = await Product.create({
  //   name,
  //   amount,
  //   price,
  //   category,
  // });

  const expense = await Expense.findById("671beababa7e10f4a9340e86");
  const newtotal = expense.total + bprice;
  const cat = expense.category;
  // cat[category] = cat[category] + bprice;
  // console.log(cat, newtotal);
  const product = await Product.create(req.body);
  const newexpense = await Expense.updateMany(
    { _id: id },
    { $set: { total: newtotal } }
  );

  res.json({ product, newexpense });
});
export default router;
