import express from 'express';
import { register, login, logout, getMe } from '../controllers/authController.js'; // 👈 getMe add kiya
import authMiddleware from '../middleware/user.auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

// 🔍 Yeh route frontend ki persistence handle karega
router.get("/me", authMiddleware, getMe); 

export default router;