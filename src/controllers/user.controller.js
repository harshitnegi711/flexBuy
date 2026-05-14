import AsyncHandler from "../utils/AsyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import UploadOnCloudinary from "../utils/UploadOnCloudinary.js";
import jwt from "jsonwebtoken"

const createUser = AsyncHandler(async (req, res) => {

  const { fullName, username, email, password, gender } = req.body

  const localFilePath = req.file.path

  // ------------ check for any blank fields ----------------- 

  if ([fullName, username, email, password].some((_field) => !_field?.trim())) {
    throw new ApiError(400, "Fill all the required fields !!")
  }

  // -------------- checking if user alredy existed --------------------

  const user = await User.findOne({ username })
  if (user) throw new ApiError(401, "User Already Existed !!")

  // ----------- uploading avatar --------------- //

  const response = await UploadOnCloudinary(localFilePath)

  const avatar = response.url

  const newUser = await User.create({
    username, fullName, email, password, avatar, gender
  })

  const displayUser = await User.findById(newUser._id).select("-password -refreshToken")


  res.status(200).json(ApiResponse(200, displayUser, "Hiii Sans User is created -!*_*!- "))
})


// ------------ getting all users ------------------- 

const getAllUsers = AsyncHandler(async (req, res) => {

  const users = await User.find().select("-password -refreshToken")

  res.status(200).json(ApiResponse(200, users, "users fetched successfylly."))

})



// ------------------- uploading avatar --------------------- //

const uploadAvatar = AsyncHandler(async (req, res) => {

  const loggedInUser = req.user

  if (!loggedInUser) throw new ApiError(401, "Access Denied for this operation")


  if (!req.file) throw new ApiError(402, "File is missing !!")

  const localFilePath = req.file.path

  const uploadedFile = await UploadOnCloudinary(localFilePath)

  if (!uploadedFile) throw new ApiError(400, "errro while uploading on cloudinary !!")

  const user = await User.findByIdAndUpdate(loggedInUser._id, { avatar: uploadedFile.url }, { new: true }).select("-password -refreshToken")


  res.status(200).json(ApiResponse(200, user, "image uploaded successfully"))
})

// ---------------- generating access and refresh token ------------------------ //

const generateAccessAndRefreshToken = (user) => {

  const accessToken = jwt.sign({ id: user._id, username: user.username, email: user.email },
    process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY })

  const refreshToken = jwt.sign({ id: user._id },
    process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY })

  return { accessToken, refreshToken }

}

// -------------------------- loggin in --------------------------- //

const login = AsyncHandler(async (req, res) => {
  const { username, password } = req.body

  if ([username, password].some(field => !field.trim())) throw new ApiError(400, "username password are required.")

  const user = await User.findOne({ username })

  if (!user) throw new ApiError(400, "user does not exist !!")

  const isPasswordCorrect = await user.isPasswordCorrect(password)

  if (!isPasswordCorrect) throw new ApiError(401, "incorrect password !!")

  const { accessToken, refreshToken } = generateAccessAndRefreshToken(user)

  const logginUser = await User.findByIdAndUpdate(user._id, { refreshToken: refreshToken }, { new: true }).select("-password -refreshToken")

  const options = { httpOnly: true, secure: true }

  res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(ApiResponse(200, logginUser, "logged in successfully"))
})


// -------------------------- log out  --------------------------- //

const logOut = AsyncHandler(async (req, res) => {

  const loggedInUser = req.user

  if (!loggedInUser) throw new ApiError(401, "Access denied for this operation.")


  const loggedOutUser = await User.findByIdAndUpdate(loggedInUser._id, { refreshToken: "" }, { new: true }).select("-password -refreshToken")

  const options = { httpOnly: true, secure: true }

  res.status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(ApiResponse(200, loggedOutUser, "successfully logged out."))
})




export { createUser, uploadAvatar, getAllUsers, login, logOut }
