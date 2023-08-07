import express from "express";

import { create, getAll, getOne, remove, update } from "../controller/card";
import { loginMiddleware } from "../middleware/loginPermission";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", loginMiddleware, create);
router.patch("/:id", loginMiddleware, update);
router.delete("/:id", loginMiddleware, remove);

export default router;
