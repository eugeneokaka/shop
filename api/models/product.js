import mongoose, { model } from "mongoose";
const userShema = new mongoose.Schema(
  {
    name: String,
    category: String,
    bprice: Number,
    mmoney: Number,
    price: Number,
    amount: Number,
    number_sold: { type: Number, default: 0 },
    profit: { type: Number, default: 0 },
    sales: { type: Number, default: 0 },
    expired: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model("Product", userShema);
