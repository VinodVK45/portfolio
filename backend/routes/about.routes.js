import express from "express";
import { getAbout, updateAbout } from "../controllers/about.controller.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.get("/", getAbout);

// ✅ MULTER SAFE WRAPPER
router.put("/", (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (err) return res.status(400).json({ message: err.message });
    next();
  });
}, updateAbout);

export default router;
