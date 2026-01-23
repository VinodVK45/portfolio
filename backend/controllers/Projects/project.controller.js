import Project from "../../models/Projects/Project.model.js";
import cloudinary from "../../config/cloudinary.js";

/* ===============================
   CREATE PROJECT (Cloudinary / URL)
   =============================== */
export const createProject = async (req, res) => {
  try {
    console.log("REQ FILE:", !!req.file);
    console.log("REQ BODY:", req.body);

    let imageUrl = req.body.img;

    // ✅ IMAGE FILE UPLOAD (SAFE)
    if (req.file) {
      const result = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
        {
          folder: "projects",
          resource_type: "image",
        }
      );

      imageUrl = result.secure_url;
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
    return res.status(500).json({ message: err.message });
  }
};




/* ===============================
   GET ALL PROJECTS
   =============================== */
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1 });
    return res.status(200).json(projects);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* ===============================
   GET PROJECTS BY CATEGORY
   =============================== */
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
   UPDATE PROJECT
   =============================== */
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
      img: existing.img, // 🔥 KEEP OLD IMAGE
    };

    // ✅ FILE UPLOAD HAS HIGHEST PRIORITY
    if (req.file) {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "projects" },
        async (error, result) => {
          if (error) {
            return res.status(500).json({ message: "Cloudinary error", error });
          }

          updateData.img = result.secure_url;

          const updated = await Project.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
          );

          return res.status(200).json(updated);
        }
      );

      uploadStream.end(req.file.buffer);
      return;
    }

    // ✅ URL UPDATE ONLY IF VALID
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
    console.error("UPDATE ERROR:", err);
    return res.status(400).json({ message: err.message });
  }
};



/* ===============================
   DELETE PROJECT
   =============================== */
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    return res
      .status(200)
      .json({ message: "Project deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
