import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowerCase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowerCase: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    default: "other",
  },
  avatar: {
    type: String,
    default: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
  },
  refreshToken: {
    type: String,
    default: ""
  }

}, { timestamps: true }
)


// ---------------- encrypting password before saving a record ------------------------- //


userSchema.pre("save", async function() {

  if (!this.isModified("password")) return

  this.password = await bcrypt.hash(this.password, 10)

})

// ------------------- checking password ------------------------ //

userSchema.methods.isPasswordCorrect = async function(password) {
  const res = await bcrypt.compare(password, this.password)
  return res
}


export const User = mongoose.model("User", userSchema)

