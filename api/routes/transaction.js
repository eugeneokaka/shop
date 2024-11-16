import express from "express";
const router = express.Router();
import { Transaction } from "../models/transaction.js";
import id from "./product.js";
import { Expense } from "../models/expense.js";
import { Product } from "../models/product.js";
// router.get("/", async (req, res) => {
//   const transactions = await Transaction.find({});
//   res.json(transactions);
// });

router.post("/", async (req, res) => {
  let { name, category, price, amount, mpesa_id, id, method } = req.body;
  console.log("visited");
  console.log(req.body);
  // res.json(req.body);
  amount = parseInt(amount);

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
  console.log(product.amount);
  const newproduct = await Product.updateOne(
    { _id: id },
    { $set: { amount: newamount } }
  );

  res.json(transaction);
});
router.get("/test", async (req, res) => {
  const { d } = req.query;
  const { date } = req.body;

  // const da = "2024-11-11T06:34:05.080+00:00";
  // const date1 = new Date(da);
  // console.log(date1.toLocaleDateString());

  // const transaction = await Transaction.find({
  //   createdAt: { $gte: date1.toLocaleDateString() },
  // });
  // const transaction = await Transaction.find({ name: "cookies" }).find({
  //   amount: 4,
  // });
  res.json(transaction);
});
router.get("/", async (req, res) => {
  const { q, c, query, d } = req.query;

  // console.log("this is c", c, "this is q", q, "this is query", query);
  // console.log("date:", d);
  const date = new Date(d);
  console.log(req.query);
  if (d === "undefined") {
    console.log("date is undifines");
  }

  if (!q) {
    console.log("not q");
    console.log(query);
    const transaction = await Transaction.find({});
    const newproduct = transaction.filter((item) => {
      return item["name"].toLocaleLowerCase().includes(query);
    });
    console.log(newproduct);
    return res.json(newproduct);
  }

  try {
    if (c) {
      console.log("in c");
      const category = { category: c };
      if (d != "undefined") {
        const transaction = await Transaction.find(category)
          .sort({
            createdAt: parseInt(q),
          })
          .find({
            createdAt: {
              $gte: date,
            },
          });
        const newproduct = transaction.filter((item) => {
          return item["name"].toLocaleLowerCase().includes(query);
        });
        // console.log(newproduct);
        return res.json(newproduct);
      }
      const transaction = await Transaction.find(category).sort({
        createdAt: parseInt(q),
      });

      console.log(transaction);
      const newproduct = transaction.filter((item) => {
        return item["name"].toLocaleLowerCase().includes(query);
      });
      // console.log(newproduct);
      return res.json(newproduct);
    }
    console.log("outside c");
    if (d != "undefined") {
      const transaction = await Transaction.find({})
        .sort({
          createdAt: parseInt(q),
        })
        .find({
          createdAt: {
            $gte: date,
          },
        });
      const newproduct = transaction.filter((item) => {
        return item["name"].toLocaleLowerCase().includes(query);
      });
      return res.json(newproduct);
    }
    const transaction = await Transaction.find({}).sort({
      createdAt: parseInt(q),
    });
    const newproduct = transaction.filter((item) => {
      return item["name"].toLocaleLowerCase().includes(query);
    });
    res.json(newproduct);
  } catch (er) {
    console.log(er);
    return res.json({ erro: "erro" });
  }
});
export default router;
