import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    price: Number,
    image: String,
    stockQuantity: Number,
  },
  { timestamps: true }
);

export const ProductModel = mongoose.model("products", ProductSchema);
