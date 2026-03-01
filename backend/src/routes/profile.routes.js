import express from "express";
import { getProfile, upsertProfile } from "../controllers/profile.controller.js";
import authMiddleware from "../middleware/user.auth.js";

const router = express.Router();

// Get profile
router.get("/", authMiddleware, getProfile);

// Create or Update profile
router.post("/", authMiddleware, upsertProfile);

export default router;