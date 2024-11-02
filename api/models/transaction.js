import mongoose, { model } from "mongoose";
const userShema = new mongoose.Schema(
  {
    name: String,
    category: String,
    price: Number,
    amount: Number,
    id: String,
    method: String,
    mpesa_id: {
      type: String,
      required: false,
    },
    amountb: Number,
    amounta: Number,
  },
  {
    timestamps: true,
  }
);
export const Transaction = mongoose.model("Transaction", userShema);
