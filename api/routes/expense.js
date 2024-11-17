import express from "express";
const router = express.Router();
import { Expense } from "../models/expense.js";
router.get("/", async (req, res) => {
  const expense = await Expense.findOne({});
  res.json(expense);
});
export default router;
