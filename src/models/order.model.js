import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        min: 0,
        required: true,
      }
    }
  ],
  shippingAddress: {
    fullname: String,
    phoneNumber: Number,
    pinCode: Number,
    address: String,
  },
  totalAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  orderStatus: {
    type: String,
    enum: ["pending", "placed", "cancelled"],
    default: "pending",
  },

}, { timestamps: true })


export const Order = mongoose.model("Order", orderSchema)
