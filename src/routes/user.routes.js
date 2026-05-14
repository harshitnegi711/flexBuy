import { Router } from "express";
import { createUser, getAllUsers, login, logOut, uploadAvatar } from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { jwtAuth } from "../middleware/auth.middleware.js";

const router = Router()


router.post("/create", upload.single("avatar"), createUser)
router.get("/get-all", jwtAuth, getAllUsers)
router.post("/upload-avatar", jwtAuth, upload.single("avatar"), uploadAvatar)
router.post("/login", login)
router.post("/logout", jwtAuth, logOut)


export default router
