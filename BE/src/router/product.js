import express from "express";

import { create, getAll, getOne, remove, update } from "../controller/product";
import { checkPermission } from "../middleware/checkPermission";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", checkPermission, create);
router.delete("/:id", checkPermission, remove);
router.patch("/:id", checkPermission, update);

export default router;
