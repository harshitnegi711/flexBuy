import { Router } from "express";
import { createProduct, getAllProducts } from "../controllers/product.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { jwtAuth } from "../middleware/auth.middleware.js";

const router = Router()

router.post("/create", createProduct)
router.get("/get-all", jwtAuth, getAllProducts)


export default router
