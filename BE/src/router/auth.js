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

const router = express.Router();

router.get("/", checkPermission, getAll);
router.get("/:id", getOne);
router.post("/login", logIn);
router.post("/verify", verify);
router.post("/register", register);
router.post("/get-user-token", getUserByToken);

export default router;
