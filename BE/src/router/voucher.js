import express from "express";
import { create, getAll, getOne, checkVoucher } from "../controller/voucher";

import { checkPermission } from "../middleware/checkPermission";
import { loginMiddleware } from "../middleware/loginPermission";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", checkPermission, create);
router.post("/check-voucher", loginMiddleware, checkVoucher);

export default router;
