import express from "express";
import { analyzeResume } from "../controllers/resume.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/analyze", authMiddleware, analyzeResume);

export default router;