import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  productImage: {
    type: String,
    required: true
  }
}, { timestamps: true })



export const Product = mongoose.model("Product", ProductSchema)
