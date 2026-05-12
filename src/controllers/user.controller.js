import AsyncHandler from "../utils/AsyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";

const createUser = AsyncHandler(async (req, res) => {

  const { fullName, username, email, password, avatar, gender } = req.body

  console.log("req------> ", req.body)

  // ------------ check for any blank fields ----------------- 

  if ([fullName, username, email, password].some((_field) => !_field?.trim())) {
    throw new ApiError(400, "Fill all the required fields !!")
  }

  // -------------- checking if user alredy existed --------------------

  const user = await User.findOne({ username })
  if (user) throw new ApiError(401, "User Already Existed !!")



  const newUser = await User.create({
    username, fullName, email, password
  })

  const displayUser = await User.findById(newUser._id).select("-password -refreshToken")


  res.status(200).json(ApiResponse(200, displayUser, "Hiii Sans User is created -!*_*!- "))
})


export { createUser }
