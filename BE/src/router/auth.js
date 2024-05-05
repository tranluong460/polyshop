import express from "express";

import {
  getAll,
  getOne,
  logIn,
  register,
  verify,
  getUserByToken,
} from "../controller/auth";

import { checkPermission } from "../middleware/checkPermission";
import { loginMiddleware } from "../middleware/loginPermission";

const router = express.Router();

router.get("/", checkPermission, getAll);
router.get("/:id", checkPermission, getOne);

router.post("/login", logIn);
router.post("/register", register);
router.post("/verify", verify);
router.post("/get-user-token", loginMiddleware, getUserByToken);

export default router;
