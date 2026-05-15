import { Router } from "express";
import user from "./routes/user.routes.js"
import product from "./routes/product.route.js"

const router = Router()

router.use("/user", user)
router.use("/product", product)

export default router
