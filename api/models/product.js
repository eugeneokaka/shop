import mongoose, { model } from "mongoose";
const userShema = new mongoose.Schema(
  {
    name: String,
    category: String,
    bprice: Number,
    mmoney: Number,
    price: Number,
    amount: Number,
    amount_sold: Number,
   
  },
  {
    timestamps: true,
  }
);
export const Product = mongoose.model("Product", userShema);
