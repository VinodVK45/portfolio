import Project from "../../models/Projects/Project.model.js";
import cloudinary from "../../config/cloudinary.js";

/* ===============================
   CREATE PROJECT (4K SAFE)
================================ */
export const createProject = async (req, res) => {
  try {
    let imageUrl = req.body.img;

    // ✅ IMAGE UPLOAD (STREAM – 4K SAFE)
    if (req.file && req.file.buffer) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "projects",
            resource_type: "image",
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );

        stream.end(req.file.buffer);
      });

      imageUrl = uploadResult.secure_url;
    }

    // ❌ NO IMAGE PROVIDED
    if (!imageUrl || !imageUrl.startsWith("http")) {
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
   GET ALL PROJECTS (GROUPED)
================================ */
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1 });

    const grouped = {
      web: [],
      uiux: [],
      editing: [],
    };

    for (const project of projects) {
      if (grouped[project.category]) {
        grouped[project.category].push(project);
      }
    }

    return res.status(200).json(grouped);
  } catch (error) {
    console.error("GET PROJECTS ERROR:", error);
    return res.status(500).json({ message: "Failed to fetch projects" });
  }
};

/* ===============================
   GET PROJECTS BY CATEGORY
================================ */
export const getProjectsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const projects = await Project.find({ category }).sort({ order: 1 });
    return res.status(200).json(projects);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* ===============================
   UPDATE PROJECT (4K SAFE)
================================ */
export const updateProject = async (req, res) => {
  try {
    const existing = await Project.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ message: "Project not found" });
    }

    const updateData = {
      title: req.body.title ?? existing.title,
      desc: req.body.desc ?? existing.desc,
      url: req.body.url ?? existing.url,
      category: req.body.category ?? existing.category,
      order: req.body.order ?? existing.order,
      img: existing.img,
    };

    // ✅ IMAGE UPLOAD (STREAM – SAFE)
    if (req.file && req.file.buffer) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "projects" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

      updateData.img = uploadResult.secure_url;
    }

    // ✅ URL UPDATE
    if (req.body.img && req.body.img.startsWith("http")) {
      updateData.img = req.body.img;
    }

    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    return res.status(200).json(updated);
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
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    return res.status(200).json({
      message: "Project deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
