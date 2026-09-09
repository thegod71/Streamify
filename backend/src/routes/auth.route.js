import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
const router = express.Router();
import {
  login,
  signup,
  logout,
  onboard,
} from "../controllers/auth.controller.js";

router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);
router.post("/onboarding", protectRoute, onboard);

export default router;
