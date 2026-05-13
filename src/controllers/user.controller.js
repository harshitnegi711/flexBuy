import AsyncHandler from "../utils/AsyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import UploadOnCloudinary from "../utils/UploadOnCloudinary.js";

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

  const { uid } = req.params

  console.log("req-----------> ", uid)

  if (!req.file) throw new ApiError(402, "File is missing !!")

  const localFilePath = req.file.path

  const uploadedFile = await UploadOnCloudinary(localFilePath)

  if (!uploadedFile) throw new ApiError(400, "errro while uploading on cloudinary !!")

  const user = await User.findByIdAndUpdate(uid, { avatar: uploadedFile.url }, { new: true }).select("-password -refreshToken")


  res.status(200).json(ApiResponse(200, user, "image uploaded successfully"))
})


export { createUser, uploadAvatar, getAllUsers }
