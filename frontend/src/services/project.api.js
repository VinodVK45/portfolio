const API_URL = "http://localhost:5000/api/projects";

// GET ALL
export const fetchProjects = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
};

// CREATE
export const createProjectAPI = async (formData) => {
  const res = await fetch(API_URL, {
    method: "POST",
    body: formData, // ✅ NO HEADERS
  });
  if (!res.ok) throw new Error("Failed to create project");
  return res.json();
};

// UPDATE
export const updateProjectAPI = async (id, formData) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    body: formData, // ✅ NO HEADERS
  });
  if (!res.ok) throw new Error("Failed to update project");
  return res.json();
};

// DELETE
export const deleteProjectAPI = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete project");
  return res.json();
};
