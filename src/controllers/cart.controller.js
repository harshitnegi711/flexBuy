import { Cart } from "../models/cart.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import AsyncHandler from "../utils/AsyncHandler.js";

// ------------ adding product to cart ----------------- //

const addToCart = AsyncHandler(async (req, res) => {

  const loggedInUser = req.user

  if (!loggedInUser) throw new ApiError(400, "Unauthorized access !!")

  const { productId } = req.body

  let cart = await Cart.findOne({ user: loggedInUser.id })

  if (!cart) {
    cart = await Cart.create({ user: loggedInUser.id, products: [] })
  }

  const existingProduct = cart.products.find(item => item.product.toString() === productId)

  if (existingProduct) {
    existingProduct.quantity += 1
  } else {
    cart.products.push({ product: productId, quantity: 1 })
  }

  await cart.save()

  res.status(200).json(ApiResponse(200, cart, "Product added to cart "))
})


// -------------------- removing products from Cart -------------------------- //

const removeFromCart = AsyncHandler(async (req, res) => {

  const { productId, action } = req.body

  if ([productId, action].some(field => !field.trim())) throw new ApiError(401, "full all the required fields")

  const user = req.user
  if (!user) throw new ApiError(401, "Unauthorized Access !!")

  const cart = await Cart.findOne({ user: user.id })


  const existingProduct = cart.products.find(_product => _product.product.toString() === productId)


  if (action === "decrease") {
    if (existingProduct.quantity > 1) { existingProduct.quantity -= 1 } else {
      const latestProductList = cart.products.filter(_product => _product.product.toString() !== productId)
      cart.products = latestProductList
    }
  }
  if (action === "remove") {
    const latestProductList = cart.products.filter(_product => _product.product.toString() !== productId)
    cart.products = latestProductList
  }

  await cart.save()

  res.status(200).json(ApiResponse(200, cart, "product removed successfully ."))
})



// -------------------------- get Cart by user Id ---------------------------- //

const getUserCart = AsyncHandler(async (req, res) => {

  const user = req.user
  if (!user) throw new ApiError(400, "Unauthorized Access .")

  const cart = await Cart.findOne({ user: user.id }).populate({ path: "products.product", select: "-createdAt -updatedAt -__v" })

  if (!cart) throw new ApiError(401, "cart not found.")


  res.status(200).json(ApiResponse(200, cart, "Cart fetched successfylly"))

})



export { addToCart, removeFromCart, getUserCart }
