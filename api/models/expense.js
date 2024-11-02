import mongoose, { model } from "mongoose";
const categoryshema = new mongoose.Schema({
  food: { type: Number, default: 0 },
  stationary: { type: Number, default: 0 },
  clothes: { type: Number, default: 0 },
  electronics: { type: Number, default: 0 },
  others: { type: Number, default: 0 },
});

const ExpenseShema = new mongoose.Schema(
  {
    category: {
      food: { type: Number, default: 0 },
      stationary: { type: Number, default: 0 },
      clothes: { type: Number, default: 0 },
      electronics: { type: Number, default: 0 },
      others: { type: Number, default: 0 },
    },
    total: Number,
    sold: Number,
    sales: Number,
  },
  {
    timestamps: true,
  }
);
export const Expense = mongoose.model("Expense", ExpenseShema);
