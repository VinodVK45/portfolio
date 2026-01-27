import Project from "../../models/Projects/Project.model.js";
import { uploadToCloudinary } from "../../config/cloudinary.js";

export const createProject = async (req, res) => {
  try {
    let imageUrl = req.body.img;
    if (req.file && req.file.buffer) {
      const result = await uploadToCloudinary(req.file.buffer, "projects");
      imageUrl = result.secure_url;
    }
    if (!imageUrl) return res.status(400).json({ message: "Image required" });

    const project = await Project.create({ ...req.body, img: imageUrl });
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1 });
    const grouped = { web: [], uiux: [], editing: [] };
    projects.forEach(p => grouped[p.category]?.push(p));
    res.json(grouped);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProjectsByCategory = async (req, res) => {
  try {
    const projects = await Project.find({ category: req.params.category });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const existing = await Project.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: "Project not found" });

    let finalImage = req.body.img || existing.img;

    if (req.file && req.file.buffer) {
      const result = await uploadToCloudinary(req.file.buffer, "projects");
      finalImage = result.secure_url;
    }

    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      { ...req.body, img: finalImage },
      { new: true, runValidators: true }
    );
    res.json(updated);
  } catch (err) {
    console.error("PROJECT UPDATE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};