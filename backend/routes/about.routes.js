import express from "express";
import { getAbout, updateAbout } from "../controllers/about.controller.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

// ✅ TEST ROUTE (VERY IMPORTANT FOR DEBUG)
router.get("/test", (req, res) => {
  res.json({ message: "About route working ✅" });
});

// ✅ GET ABOUT DATA
router.get("/", getAbout);

// ✅ UPDATE ABOUT DATA (ADMIN)
router.put("/", upload.single("image"), updateAbout);

export default router;
