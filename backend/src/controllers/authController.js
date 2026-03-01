import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../database/models/index.js';
import generateToken from "../utils/generateToken.js";
const { User } = db;

// backend/controllers/auth.controller.js
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // ... validation ...
    const user = await User.create({ name, email, password: hashedPassword });

    // 🍪 Registration ke turant baad Token banao
const token = generateToken(user);
    // Cookie set karo
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
      maxAge: 24 * 60 * 60 * 1000 
    });

    res.status(201).json({
      message: "User registered and logged in successfully",
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

   const token = generateToken(user);
    // 🍪 Setting Token in Cookie
    const cookieOptions = {
      httpOnly: true, // Frontend JS can't access this (Secure from XSS)
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'Lax', // Protects against CSRF
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    };

    res.cookie('token', token, cookieOptions);

    res.status(200).json({
      message: "Login successful",
      user: { id: user.id, name: user.name, email: user.email }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔹 LOGOUT (Clearing Cookie)
export const logout = (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(400).json({
      success: false,
      message: "Invalid or expired token"
    });
  }

  // 🧹 Cookie ko clear karo
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0), // Set expiration to past
    sameSite: 'Lax'
  });

  return res.status(200).json({ 
    success: true, 
    message: "Logout successful" 
  });
};
export const getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'name', 'email']
    });

    res.status(200).json({ authenticated: true, user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};