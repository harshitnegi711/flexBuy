import { Router } from "express";
import { createUser, getAllUsers, uploadAvatar } from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router()


router.post("/create", upload.single("avatar"), createUser)
router.get("/get-all", getAllUsers)
router.post("/upload-avatar/:uid", upload.single("avatar"), uploadAvatar)


export default router
