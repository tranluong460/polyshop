import express from "express";

import { create, remove, update, getCardByUser } from "../controller/card";
import { loginMiddleware } from "../middleware/loginPermission";

const router = express.Router();

router.get("/", loginMiddleware, getCardByUser);
router.post("/", loginMiddleware, create);
router.patch("/:id", loginMiddleware, update);
router.delete("/:id", loginMiddleware, remove);

export default router;
