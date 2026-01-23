import api from "./api";

/* ===============================
   GET ALL PROJECTS (PUBLIC)
================================ */
export const fetchProjects = async () => {
  const res = await api.get("/projects");
  return res.data;
};

/* ===============================
   CREATE PROJECT (ADMIN)
================================ */
export const createProjectAPI = async (formData) => {
  const res = await api.post("/projects", formData);
  return res.data;
};

/* ===============================
   UPDATE PROJECT (ADMIN)
================================ */
export const updateProjectAPI = async (id, formData) => {
  const res = await api.put(`/projects/${id}`, formData);
  return res.data;
};

/* ===============================
   DELETE PROJECT (ADMIN)
================================ */
export const deleteProjectAPI = async (id) => {
  const res = await api.delete(`/projects/${id}`);
  return res.data;
};
