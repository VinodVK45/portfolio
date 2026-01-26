import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";

/* ================= CONTEXT ================= */
const ProjectContext = createContext();

/* ================= PROVIDER ================= */
export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState({
    web: [],
    uiux: [],
    editing: [],
  });

  const [loading, setLoading] = useState(true);

  /* ================= FETCH PROJECTS ================= */
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await api.get("/projects");
      setProjects(res.data); // ✅ already grouped
    } catch (err) {
      console.error("Failed to fetch projects", err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= CREATE PROJECT ================= */
  const createProject = async (formData) => {
    try {
      const res = await api.post("/projects", formData);
      const newProject = res.data;

      setProjects((prev) => ({
        ...prev,
        [newProject.category]: [
          ...(prev[newProject.category] || []),
          newProject,
        ],
      }));

      return true;
    } catch (err) {
      console.error("Create project failed", err);
      return false;
    }
  };

  /* ================= UPDATE PROJECT ================= */
  const updateProject = async (id, formData) => {
    try {
      const res = await api.put(`/projects/${id}`, formData);
      const updated = res.data;

      setProjects((prev) => ({
        ...prev,
        [updated.category]: prev[updated.category].map((p) =>
          p._id === id ? updated : p
        ),
      }));

      return true;
    } catch (err) {
      console.error("Update project failed", err);
      return false;
    }
  };

  /* ================= DELETE PROJECT ================= */
  const deleteProject = async (id) => {
    try {
      await api.delete(`/projects/${id}`);

      setProjects((prev) => {
        const updated = {};
        for (const key in prev) {
          updated[key] = prev[key].filter((p) => p._id !== id);
        }
        return updated;
      });

      return true;
    } catch (err) {
      console.error("Delete project failed", err);
      return false;
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <ProjectContext.Provider
      value={{
        projects,
        loading,
        fetchProjects,
        createProject,
        updateProject,
        deleteProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

/* ================= HOOK ================= */
export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProjects must be used inside ProjectProvider");
  }
  return context;
};
