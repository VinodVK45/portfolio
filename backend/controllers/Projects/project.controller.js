import Project from "../../models/Projects/Project.model.js";
import cloudinary, { uploadToCloudinary } from "../../config/cloudinary.js";

/* ===============================
   CREATE PROJECT
================================ */
export const createProject = async (req, res) => {
  try {
    let imageUrl = null;

    if (req.file && req.file.buffer) {
      try {
        const uploadResult = await uploadToCloudinary(
          req.file.buffer,
          "projects"
        );
        imageUrl = uploadResult.secure_url;
      } catch (err) {
        console.error("CLOUDINARY ERROR:", err);
        return res.status(500).json({ message: "Image upload failed" });
      }
    } else if (req.body.img && req.body.img.startsWith("http")) {
      imageUrl = req.body.img;
    }

    if (!imageUrl) {
      return res.status(400).json({
        message: "Image file or valid image URL is required",
      });
    }

    const project = await Project.create({
      title: req.body.title,
      desc: req.body.desc,
      url: req.body.url,
      category: req.body.category,
      order: Number(req.body.order) || 0,
      img: imageUrl,
    });

    return res.status(201).json(project);
  } catch (err) {
    console.error("CREATE PROJECT ERROR:", err);
    return res.status(500).json({ message: "Failed to create project" });
  }
};

/* ===============================
   GET ALL PROJECTS
================================ */
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1 });

    const grouped = { web: [], uiux: [], editing: [] };
    projects.forEach((p) => grouped[p.category]?.push(p));

    return res.json(grouped);
  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch projects" });
  }
};

/* ===============================
   UPDATE PROJECT
================================ */
export const updateProject = async (req, res) => {
  try {
    const existing = await Project.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: "Project not found" });

    let finalImage = existing.img;

    if (req.file && req.file.buffer) {
      try {
        const uploadResult = await uploadToCloudinary(
          req.file.buffer,
          "projects"
        );
        finalImage = uploadResult.secure_url;
      } catch (err) {
        console.error("CLOUDINARY ERROR:", err);
        return res.status(500).json({ message: "Image upload failed" });
      }
    } else if (req.body.img?.startsWith("http")) {
      finalImage = req.body.img;
    }

    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title ?? existing.title,
        desc: req.body.desc ?? existing.desc,
        url: req.body.url ?? existing.url,
        category: req.body.category ?? existing.category,
        order: req.body.order ?? existing.order,
        img: finalImage,
      },
      { new: true }
    );

    return res.json(updated);
  } catch (err) {
    console.error("UPDATE PROJECT ERROR:", err);
    return res.status(500).json({ message: "Failed to update project" });
  }
};

/* ===============================
   DELETE PROJECT
================================ */
export const deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    return res.json({ message: "Project deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
