import mongoose from "mongoose";
import AsyncHandler from "../utils/AsyncHandler.js"
import ApiResponse from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { Cart } from "../models/cart.model.js";
import { Order } from "../models/order.model.js";

// ------------------- creating order ------------------------ //

const placeOrder = AsyncHandler(async (req, res) => {

  const { shippingAddress } = req.body
  if (!shippingAddress) throw new ApiError(401, "shipping address missing ")

  const user = req.user
  if (!user) throw new ApiError(402, "Unauthorized Access")

  const cart = await Cart.findOne({ user: user.id }).populate({ path: "products.product" })

  const items = cart.products.map(_item => ({ product: _item.product._id, quantity: _item.quantity, price: _item.product.price }))

  if (!items.length) throw new ApiError(403, "Empty cart !!")

  const totalAmount = items.reduce((sum, curr) => sum += (curr.quantity * curr.price), 0)

  const order = await Order.create({
    user: user.id,
    items,
    totalAmount,
    shippingAddress,
    orderStatus: "placed"
  })

  if (!order) throw new ApiError(405, "erroe while creating order !!")

  cart.products = []
  cart.save()

  res.status(200).json(ApiResponse(200, order, "order placed Successfully *_* "))
})


// ------------------------------ get user orders  ----------------------- //

const getUserOrders = AsyncHandler(async (req, res) => {

  const user = req.user

  if (!user) throw new ApiError(402, "Unauthorized Access !!")

  const orders = await Order.find({ user: user.id })

  res.status(200).json(ApiResponse(200, orders, "order fetched successfully"))

})

// -------------------------- cancel order -------------------------- //

const cancelOrder = AsyncHandler(async (req, res) => {

  const user = req.user
  if (!user) throw new ApiError(401, "Unauthorized Access !!")

  const { orderId } = req.body

  if (!orderId) throw new ApiError(400, "orderId is missing !!")

  const deletedOrder = await Order.findByIdAndDelete(orderId)

  if (!deletedOrder) throw new ApiError(400, "no order of this id .")

  res.status(200).json(ApiResponse(200, deletedOrder, "order cancelled successfully ."))
})


export { placeOrder, getUserOrders, cancelOrder }




