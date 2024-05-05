import express from "express";

import { favorite, getFavoriteByUser } from "../controller/favorites";
import { loginMiddleware } from "../middleware/loginPermission";

const router = express.Router();

router.post("/:id", loginMiddleware, favorite);
router.get("/", loginMiddleware, getFavoriteByUser);

export default router;
