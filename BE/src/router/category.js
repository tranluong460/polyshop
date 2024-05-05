import express from "express";

import { create, getAll, getOne, remove, update } from "../controller/category";

import { checkPermission } from "../middleware/checkPermission";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", checkPermission, create);
router.patch("/:id", checkPermission, update);
router.delete("/:id", checkPermission, remove);

export default router;
