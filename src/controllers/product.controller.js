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

    res.status(200).json(ApiResponse(200, product, "Successfully  created. "))

})


// ------------------------ Get all products ----------------------- //


const getAllProducts = AsyncHandler(async (req, res) => {

    const loggedInUser = req.user

    const { searchInput, minPrice, maxPrice } = req.body

    if (!loggedInUser) throw new ApiError(402, "Unauthorized Access !!")

    const filter = {}

    if (searchInput?.trim()) {
        filter.productName = { $regex: searchInput, $options: "i" }
    }

    if (minPrice || maxPrice) {

        filter.price = {};

        if (minPrice) {
            filter.price.$gte = Number(minPrice);
        }

        if (maxPrice) {
            filter.price.$lte = Number(maxPrice);
        }
    }

    const products = await Product.find(filter)

    res.status(200).json(ApiResponse(200, products, "Successfully fetched all products *_*"))
})

// ----------------------- delete Product ----------------- //

const deleteProduct = AsyncHandler(async (req, res) => {
    const user = req.user
    if (!user) throw new ApiError(400, "Unauthorized access")

    const { productId } = req.body
    console.log("-------------> ", productId)

    if (!productId) throw new ApiError(401, "productId is missing.")

    const deletedProduct = await Product.findByIdAndDelete(productId)

    if (!deletedProduct) throw new ApiError(400, "invalid product id")

    res.status(200).json(ApiResponse(200, deletedProduct, "product deleted successfylly ."))
})





export { createProduct, getAllProducts, deleteProduct }


