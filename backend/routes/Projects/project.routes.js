import express from "express";
import upload from "../../middlewares/upload.js";
import {
  createProject,
  getProjects,
  getProjectsByCategory,
  updateProject,
  deleteProject,
} from "../../controllers/Projects/project.controller.js";

const router = express.Router();

const safeUpload = (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (err) return res.status(400).json({ message: err.message });
    next();
  });
};

router.post("/", safeUpload, createProject);
router.get("/", getProjects);
router.get("/category/:category", getProjectsByCategory);
router.put("/:id", safeUpload, updateProject);
router.delete("/:id", deleteProject);

export default router;
