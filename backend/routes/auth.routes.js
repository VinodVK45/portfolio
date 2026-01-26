import express from "express";
import {
  loginAdmin,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

/* ================= AUTH ================= */

// Login
router.post("/login", loginAdmin);

// Forgot password
router.post("/forgot-password", forgotPassword);

// Reset password
router.post("/reset-password/:token", resetPassword);

/* ================= PROTECTED ================= */

// Verify token
router.get("/me", authMiddleware, (req, res) => {
  res.json({
    ok: true,
    adminId: req.adminId,
  });
});

export default router;
