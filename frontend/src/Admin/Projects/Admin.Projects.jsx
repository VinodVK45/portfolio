import React, { useState } from "react";
import { useProjects } from "../../context/ProjectContext";

/* ===============================
   ADMIN PROJECTS – FIXED VERSION
   =============================== */

function AdminProjects() {
  /* ---------- CONTEXT ---------- */
  const {
    projects,
    createProject,   // ✅ FIXED (was addProject)
    updateProject,
    deleteProject,
  } = useProjects();

  const [imagePreview, setImagePreview] = useState(null);

  /* ---------- UI STATE ---------- */
  const [activeCategory, setActiveCategory] = useState("web");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  /* ---------- FORM STATE ---------- */
  const [form, setForm] = useState({
    title: "",
    desc: "",
    img: "",
    url: "",
    category: "web",
    order: 0,
    imageFile: null,
  });

  /* ---------- HANDLERS ---------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const openAddModal = () => {
    setEditingProject(null);
    setForm({
      title: "",
      desc: "",
      img: "",
      url: "",
      category: activeCategory,
      order: 0,
      imageFile: null,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (project) => {
    setEditingProject(project);
    setForm({
      title: project.title,
      desc: project.desc,
      img: project.img,
      url: project.url,
      category: project.category,
      order: project.order || 0,
      imageFile: null,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
    setImagePreview(null);
  };

  /* ===============================
     SAVE PROJECT (FIXED)
     =============================== */
  const handleSave = async (e) => {
    e.preventDefault();

    try {
      if (!form.title || !form.desc || !form.url) {
        alert("Title, description and URL are required");
        return;
      }

      if (!form.imageFile && !form.img && !editingProject) {
        alert("Please upload an image or provide an image URL");
        return;
      }

      if (form.img && !form.img.startsWith("http")) {
        alert("Local file paths are not allowed.");
        return;
      }

      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("desc", form.desc);
      formData.append("url", form.url);
      formData.append("category", form.category);
      formData.append("order", form.order);

      if (form.imageFile) {
        formData.append("image", form.imageFile);
      } else if (form.img.startsWith("http")) {
        formData.append("img", form.img);
      }

      let success;

      if (editingProject) {
        success = await updateProject(editingProject._id, formData);
      } else {
        success = await createProject(formData); // ✅ FIXED
      }

      if (!success) {
        alert("Failed to save project. Check console.");
        return;
      }

      closeModal();
    } catch (error) {
      console.error("SAVE PROJECT ERROR:", error);
      alert("Failed to save project. Check console.");
    }
  };

  return (
    <section className="min-h-screen p-8 bg-[#0b0b0b] text-white">
      {/* HEADER */}
      <header className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-sm text-white/60">
            Manage your portfolio projects
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-6 py-3 rounded-lg bg-amber-500 text-black font-semibold"
        >
          + Add Project
        </button>
      </header>

      {/* CATEGORY TABS */}
      <div className="mb-8 flex gap-4">
        {["web", "uiux", "editing"].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm font-semibold ${
              activeCategory === cat
                ? "bg-white text-black"
                : "bg-white/10 text-white/70"
            }`}
          >
            {cat === "web" && "Web Development"}
            {cat === "uiux" && "UI / UX Design"}
            {cat === "editing" && "Motion & Editing"}
          </button>
        ))}
      </div>

      {/* PROJECT LIST */}
      <div className="space-y-4">
        {projects[activeCategory]?.length === 0 && (
          <div className="rounded-xl border border-white/10 p-10 text-center text-white/50">
            No projects added yet.
          </div>
        )}

        {projects[activeCategory]?.map((project) => (
          <div
            key={project._id}
            className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4"
          >
            <div className="flex items-center gap-4">
              <div className="h-16 w-24 rounded-md bg-black/40 overflow-hidden">
                <img
                  src={
                    project.img?.startsWith("http")
                      ? project.img
                      : "/placeholder.png"
                  }
                  alt={project.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div>
                <h4 className="font-semibold">{project.title}</h4>
                <p className="text-xs text-white/60">{project.desc}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => openEditModal(project)}
                className="px-3 py-1 text-xs rounded bg-white/10"
              >
                Edit
              </button>

              <button
                onClick={() => deleteProject(project._id)}
                className="px-3 py-1 text-xs rounded bg-red-500/20 text-red-400"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="w-full max-w-xl rounded-2xl bg-[#111] p-6 border border-white/10">
            <h2 className="mb-6 text-xl font-bold">
              {editingProject ? "Edit Project" : "Add New Project"}
            </h2>

            <div className="space-y-4">
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Project Title"
                className="w-full rounded-lg bg-black/40 p-3"
              />

              <textarea
                name="desc"
                value={form.desc}
                onChange={handleChange}
                placeholder="Short Description"
                className="w-full rounded-lg bg-black/40 p-3"
              />

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;

                  setForm((p) => ({
                    ...p,
                    imageFile: file,
                    img: "",
                  }));

                  setImagePreview(URL.createObjectURL(file));
                }}
                className="w-full rounded-lg bg-black/40 p-2 text-sm"
              />

              <input
                name="img"
                value={form.img}
                onChange={handleChange}
                placeholder="Paste Image URL"
                className="w-full rounded-lg bg-black/40 p-3"
              />

              <input
                name="url"
                value={form.url}
                onChange={handleChange}
                placeholder="Project URL"
                className="w-full rounded-lg bg-black/40 p-3"
              />

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full rounded-lg bg-black/40 p-3"
              >
                <option value="web">Web Development</option>
                <option value="uiux">UI / UX Design</option>
                <option value="editing">Motion & Editing</option>
              </select>

              <input
                type="number"
                name="order"
                value={form.order}
                onChange={handleChange}
                className="w-full rounded-lg bg-black/40 p-3"
              />
            </div>

            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={closeModal}
                className="px-5 py-2 rounded bg-white/10"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="px-5 py-2 rounded bg-amber-500 text-black font-semibold"
              >
                Save Project
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default AdminProjects;
