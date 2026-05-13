import { v2 as cloudinary } from 'cloudinary'
import { ApiError } from './ApiError.js';
import fs from "fs"

const UploadOnCloudinary = async (localFilePath) => {
  try {

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    });

    if (!localFilePath) throw new ApiError(402, "local path is missing !!")

    console.log("uploading on cloudinary ...")

    const response = await cloudinary.uploader.upload(localFilePath, { resource_type: "auto" })

    console.log("uploaded on cloudinary ...")

    fs.unlinkSync(localFilePath)

    return response

  } catch (error) {

    console.log("error while uploading on cloudinary----> ", error)
    fs.unlinkSync(localFilePath)

  }

}


export default UploadOnCloudinary
