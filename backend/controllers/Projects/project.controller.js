import Project from "../../models/Projects/Project.model.js";
import { uploadToCloudinary } from "../../config/cloudinary.js";

/* ================= CREATE PROJECT ================= */
export const createProject = async (req, res) => {
  try {
    let imageUrl = req.body.img;

    // ✅ Priority 1: Uploaded File
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, "projects");
      imageUrl = result.secure_url;
    }

    if (!imageUrl) {
      return res.status(400).json({ message: "Image or Image URL is required" });
    }

    // ✅ Create with explicit fields to avoid 'order' being NaN
    const projectData = {
      title: req.body.title,
      desc: req.body.desc,
      url: req.body.url,
      category: req.body.category,
      order: Number(req.body.order) || 0,
      img: imageUrl
    };

    const project = await Project.create(projectData);
    res.status(201).json(project);
  } catch (err) {
    console.error("CREATE PROJECT ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

/* ================= GET ALL (GROUPED) ================= */
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1 });
    const grouped = { web: [], uiux: [], editing: [] };
    
    projects.forEach(p => {
      if (grouped[p.category]) {
        grouped[p.category].push(p);
      }
    });
    
    res.json(grouped);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch projects" });
  }
};

/* ================= UPDATE PROJECT ================= */
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await Project.findById(id);
    
    if (!existing) {
      return res.status(404).json({ message: "Project not found" });
    }

    // ✅ Logic: File > New URL > Existing Image
    let finalImage = existing.img;
    
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, "projects");
      finalImage = result.secure_url;
    } else if (req.body.img && req.body.img.startsWith("http")) {
      finalImage = req.body.img;
    }

    // ✅ Explicit Update to prevent field injection
    const updateData = {
      title: req.body.title || existing.title,
      desc: req.body.desc || existing.desc,
      url: req.body.url || existing.url,
      category: req.body.category || existing.category,
      order: req.body.order !== undefined ? Number(req.body.order) : existing.order,
      img: finalImage
    };

    const updated = await Project.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json(updated);
  } catch (err) {
    console.error("PROJECT UPDATE ERROR:", err);
    res.status(500).json({ message: "Update failed: " + err.message });
  }
};

/* ================= DELETE PROJECT ================= */
export const deleteProject = async (req, res) => {
  try {
    const result = await Project.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Deleted successfully" });
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