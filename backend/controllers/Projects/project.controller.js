import Project from "../../models/Projects/Project.model.js";
import { uploadToCloudinary } from "../../config/cloudinary.js";

/* ================= CREATE ================= */
export const createProject = async (req, res) => {
  try {
    let image = req.body.img;

    if (req.file?.buffer) {
      const result = await uploadToCloudinary(req.file.buffer, "projects");
      image = result.secure_url;
    }

    if (!image) {
      return res.status(400).json({ message: "Image required" });
    }

    const project = await Project.create({
      title: req.body.title,
      desc: req.body.desc,
      url: req.body.url,
      category: req.body.category,
      order: Number(req.body.order) || 0,
      img: image,
    });

    res.status(201).json(project);
  } catch (err) {
    console.error("CREATE PROJECT ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

/* ================= READ ================= */
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1 });
    const grouped = { web: [], uiux: [], editing: [] };

    projects.forEach((p) => grouped[p.category]?.push(p));
    res.json(grouped);
  } catch {
    res.status(500).json({ message: "Fetch failed" });
  }
};

/* ================= UPDATE ================= */
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Not found" });

    let image = project.img;

    if (req.file?.buffer) {
      const result = await uploadToCloudinary(req.file.buffer, "projects");
      image = result.secure_url;
    } else if (req.body.img?.startsWith("http")) {
      image = req.body.img;
    }

    Object.assign(project, {
      title: req.body.title ?? project.title,
      desc: req.body.desc ?? project.desc,
      url: req.body.url ?? project.url,
      category: req.body.category ?? project.category,
      order:
        req.body.order !== undefined
          ? Number(req.body.order)
          : project.order,
      img: image,
    });

    await project.save();
    res.json(project);
  } catch (err) {
    console.error("PROJECT UPDATE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

/* ================= DELETE ================= */
export const deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch {
    res.status(500).json({ message: "Delete failed" });
  }
};

export const getProjectsByCategory = async (req, res) => {
  try {
    res.json(await Project.find({ category: req.params.category }));
  } catch {
    res.status(500).json({ message: "Fetch failed" });
  }
};
