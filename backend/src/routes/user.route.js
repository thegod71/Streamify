import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getRecommendedUsers,
  getMyFriends,
} from "../controllers/user.controlles.js";

const router = express.Router();

router.use(protectRoute); // Apply the protectRoute middleware to all routes in this router

router.get("/", getRecommendedUsers);
router.get("/friends", getMyFriends);

export default router;
