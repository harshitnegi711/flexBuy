import mongoose from "mongoose"
import AsyncHandler from "../utils/AsyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import { Product } from "../models/product.model.js"

// ------------------ creating new product ---------------------- //

const createProduct = AsyncHandler(async (req, res) => {

    const { productName, price, description, productImage } = req.body

    if ([productName, description, productImage].some(item => !item.trim()) || price === undefined) throw new ApiError(401, "fill all required fields")

    const existingProduct = await Product.findOne({ productName })

    if (existingProduct) throw new ApiError(402, "product already exist !!")

    const product = await Product.create({
        productImage, productName, price, description
    })

    res.status(200).json(ApiResponse(200, product, "Successfully Sans "))

})


// ------------------------ Get all products ----------------------- //


const getAllProducts = AsyncHandler(async (req, res) => {

    const loggedInUser = req.user

    if (!loggedInUser) throw new ApiError(402, "Unauthorized Access !!")

    const products = await Product.find()

    res.status(200).json(ApiResponse(200, products, "Successfully fetched all products *_*"))
})



export { createProduct, getAllProducts }


