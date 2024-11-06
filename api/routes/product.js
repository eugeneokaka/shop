import express from "express";
const router = express.Router();
import { Product } from "../models/product.js";
import { Expense } from "../models/expense.js";
// router.get("/", (req, res) => {
//   res.json("hi");
// });
export const id = "671beababa7e10f4a9340e86";
router.get("/test", async (req, res) => {
  const { q, w } = req.query;
  const product = await Product.find({}).sort({ createdAt: parseInt(q) });
  console.log(product);
  console.log(req.query);
  res.json(product);
});
router.get("/filter", async (req, res) => {
  // const { category } = req.body;
  // console.log(category);
  // if (category) {
  //   const product = await Product.find({ category: category });
  //   console.log(product);
  //   return res.json(product);
  // }
  // console.log("no mathc");
  // const product = await Product.find({});
  // res.json(product);
  const { c } = req.query;
  console.log("filter");
  if (c) {
    const category = { category: c };
    const product = await Product.find(category);
    console.log(product);
    return res.json(product);
  }
  res.json("not found");
});
router.get("/", async (req, res) => {
  // const product = await Product.find({});

  const search = (data) => {
    console.log(query);
    const fliterd = data.filter((item) => {
      return item["name"].toLowerCase().includes(query);
    });
    console.log(fliterd);
    return fliterd;
  };
  const { q, c, query } = req.query;

  console.log("this is c", c, "this is q", q);
  // if (c) {
  //   const product = await Product.find({ category: c });
  //   console.log(product);
  //   res.json(product);
  // }

  if (!q) {
    console.log("not q");
    console.log(query);
    const product = await Product.find({});
    const newproduct = product.filter((item) => {
      return item["name"].toLocaleLowerCase().includes(query);
    });
    console.log(newproduct);
    return res.json(newproduct);
  }
  // if (query) {
  //   const product = await Product.find({ category: query });
  //   return res.json(product);
  // }
  try {
    // const product = await Product.find({ category: c }).sort({
    //   createdAt: parseInt(q),
    // });

    if (c) {
      const category = { category: c };
      const product = await Product.find(category).sort({
        createdAt: parseInt(q),
      });
      const newproduct = product.filter((item) => {
        return item["name"].toLocaleLowerCase().includes(query);
      });
      console.log(newproduct);
      return res.json(newproduct);
      // return res.json(product);
    }
    const product = await Product.find({}).sort({
      createdAt: parseInt(q),
    });
    const newproduct = product.filter((item) => {
      return item["name"].toLocaleLowerCase().includes(query);
    });
    res.json(newproduct);
  } catch (er) {
    return res.json({ erro: "erro" });
  }
  // const expense = await Expense.findById(id);
  // console.log(expense.category["food"]);
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
