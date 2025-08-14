import express from "express";
import {
  loginUser,
  refreshUser,
  registerUser,
} from "../controllers/user/userController.js";

const router = express();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/refresh", refreshUser);

export default router;
