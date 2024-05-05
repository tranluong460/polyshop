import express from "express";

import {
  getSecurityCode,
  resetPassword,
  getCode,
  checkCode,
  changePassword,
} from "../controller/changePassword";
import { loginMiddleware } from "../middleware/loginPermission";

const router = express.Router();

router.post("/forgot-password", getSecurityCode);
router.post("/reset-password", resetPassword);

router.post("/send-code", loginMiddleware, getCode);
router.post("/check-code", checkCode);
router.post("/change-pass", changePassword);

export default router;
