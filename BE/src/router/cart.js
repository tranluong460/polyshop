import express from "express";

import { getCartByUser, addCart, updateCart } from "../controller/cart";

import { loginMiddleware } from "../middleware/loginPermission";

const router = express.Router();

router.get("/", loginMiddleware, getCartByUser);
router.post("/", loginMiddleware, addCart);
router.patch("/", loginMiddleware, updateCart);

export default router;
