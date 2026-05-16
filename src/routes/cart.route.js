import { Router } from "express";
import { addToCart, getUserCart, removeFromCart } from "../controllers/cart.controller.js";
import { jwtAuth } from "../middleware/auth.middleware.js";

const router = Router()


router.post("/add", jwtAuth, addToCart)
router.post("/remove", jwtAuth, removeFromCart)
router.get("/get", jwtAuth, getUserCart)


export default router
