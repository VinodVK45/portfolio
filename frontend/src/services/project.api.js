const API_URL = `${import.meta.env.VITE_API_BASE_URL}/projects`;

/* ===============================
   GET ALL PROJECTS (PUBLIC)
================================ */
export const fetchProjects = async () => {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error("Failed to fetch projects");
  }

  return res.json();
};

/* ===============================
   CREATE PROJECT (ADMIN)
================================ */
export const createProjectAPI = async (formData) => {
  const token = localStorage.getItem("adminToken");

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData, // ✅ FormData → no Content-Type
  });

  if (!res.ok) {
    throw new Error("Failed to create project");
  }

  return res.json();
};

/* ===============================
   UPDATE PROJECT (ADMIN)
================================ */
export const updateProjectAPI = async (id, formData) => {
  const token = localStorage.getItem("adminToken");

  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to update project");
  }

  return res.json();
};

/* ===============================
   DELETE PROJECT (ADMIN)
================================ */
export const deleteProjectAPI = async (id) => {
  const token = localStorage.getItem("adminToken");

  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to delete project");
  }

  return res.json();
};
