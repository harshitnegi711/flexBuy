import { Router } from "express";
import { jwtAuth } from "../middleware/auth.middleware.js";
import { cancelOrder, getUserOrders, placeOrder } from "../controllers/order.controller.js";

const router = Router()

router.post("/create", jwtAuth, placeOrder)
router.get("/get", jwtAuth, getUserOrders)
router.delete("/cancel", jwtAuth, cancelOrder)


export default router
