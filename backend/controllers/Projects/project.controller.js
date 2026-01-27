import Project from "../../models/Projects/Project.model.js";
import cloudinary, { uploadToCloudinary } from "../../config/cloudinary.js";

export const createProject = async (req, res) => {
  try {
    let imageUrl = null;
    if (req.file && req.file.buffer) {
      const uploadResult = await uploadToCloudinary(req.file.buffer, "projects");
      imageUrl = uploadResult.secure_url;
    } else if (req.body.img && req.body.img.startsWith("http")) {
      imageUrl = req.body.img;
    }

    if (!imageUrl) return res.status(400).json({ message: "Image required" });

    const project = await Project.create({
      ...req.body,
      img: imageUrl,
      order: Number(req.body.order) || 0
    });
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1 });
    const grouped = { web: [], uiux: [], editing: [] };
    projects.forEach((p) => grouped[p.category]?.push(p));
    res.json(grouped);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch projects" });
  }
};

// ADDED THIS TO FIX THE IMPORT ERROR IN ROUTES
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
    if (!existing) return res.status(404).json({ message: "Not found" });

    let finalImage = existing.img;
    if (req.file && req.file.buffer) {
      const uploadResult = await uploadToCloudinary(req.file.buffer, "projects");
      finalImage = uploadResult.secure_url;
    } else if (req.body.img?.startsWith("http")) {
      finalImage = req.body.img;
    }

    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      { ...req.body, img: finalImage },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
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