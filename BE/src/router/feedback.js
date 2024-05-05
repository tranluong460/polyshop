import express from "express";

import { create, getAll, remove, update, getOne } from "../controller/feedback";
import { loginMiddleware } from "../middleware/loginPermission";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", loginMiddleware, create);
router.delete("/:id", loginMiddleware, remove);
router.patch("/:id", loginMiddleware, update);

export default router;
