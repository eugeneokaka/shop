import express from "express";
const router = express.Router();
import { Expense } from "../models/expense.js";
import { Transaction } from "../models/transaction.js";
import { Product } from "../models/product.js";
router.get("/", async (req, res) => {
  try {
    const expense = await Expense.findOne({});
    const transaction = await Transaction.find({});
    const product = await Product.find({});
    const random = {
      name: "sommt",
    };

    const findmaxprofit = (arr) => {
      let max = arr[0];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].profit > max.profit) {
          max = arr[i];
        }
      }
      return max;
    };
    const findleasrprofit = (arr) => {
      let least = arr[0];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].profit < least.profit) {
          least = arr[i];
        }
      }
      return least;
    };
    const mostsold = (arr) => {
      let most = { number_sold: -1 };
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].number_sold > most.number_sold) {
          most = arr[i];
        }
      }
      return most;
    };
    const leastsold = (arr) => {
      let least = { number_sold: 10 };
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].number_sold < least.number_sold) {
          least = arr[i];
        }
      }
      return least;
    };
    const maxprofit = findmaxprofit(product);
    const lestprofit = findleasrprofit(product);
    const mostsolditem = mostsold(product);
    const leastsolditem = leastsold(product);
    console.log(leastsold(product));
    res.json({ expense, maxprofit, lestprofit, mostsolditem, leastsolditem });
  } catch (err) {
    console.log(err);
    return res.json(err);
  }
});
export default router;
