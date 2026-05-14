import jwt, { decode } from "jsonwebtoken"
import AsyncHandler from "../utils/AsyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"


const jwtAuth = AsyncHandler(async (req, res, next) => {

  const accessToken = req.cookies.accessToken || req.header("Authorization")?.replace("Bearer", "")

  if (!accessToken) throw new ApiError(400, "Access token not found.")

  const decodedAccessToken = jwt.decode(accessToken)

  const user = await User.findById(decodedAccessToken.id).select("-password -refreshToken")

  if (!user) throw new ApiError(400, "Invalid Access.")

  req.user = user

  next()
}

)


export { jwtAuth }

