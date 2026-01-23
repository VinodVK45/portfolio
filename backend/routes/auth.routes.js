import express from "express";
import {
  loginAdmin,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import { forgotPasswordLimiter } from "../middlewares/rateLimit.middleware.js";

// 🔐 ADMIN SEED (TEMP – REMOVE AFTER SUCCESS)
import createAdminIfNotExists from "../utils/createAdmin.js";

const router = express.Router();

/* ================= AUTH ================= */

// Login
router.post("/login", loginAdmin);

// Forgot password (RATE LIMITED)
router.post(
  "/forgot-password",
  forgotPasswordLimiter,
  forgotPassword
);

// Reset password
router.post("/reset-password/:token", resetPassword);

/* ================= TEMP ADMIN SEED ================= */
/* ⚠️ CALL ONCE, THEN DELETE */
router.post("/seed-admin", async (req, res) => {
  try {
    await createAdminIfNotExists();
    res.json({ message: "Admin seeded successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

/* ================= PROTECTED ================= */

// Verify token
router.get("/me", authMiddleware, (req, res) => {
  res.json({
    ok: true,
    adminId: req.adminId,
  });
});

export default router;
