import express from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  deletePost,
} from "../controllers/postController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public Routes
router.get("/", getAllPosts);
router.get("/:id", getPostById);

// Protected Routes
router.post("/", protect, createPost);
router.delete("/:id", protect, deletePost);

export default router;