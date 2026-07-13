import express from "express";
import {
  getAllUsers,
  getUserById,
  toggleFollowUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public Routes
router.get("/", getAllUsers);
router.get("/:id", getUserById);

// Protected Route
router.put("/:id/follow", protect, toggleFollowUser);

export default router;