    import { createContext, useContext, useEffect, useState } from "react";
    import {
    fetchProjects,
    createProjectAPI,
    updateProjectAPI,
    deleteProjectAPI,
    } from "../services/project.api";

    const ProjectContext = createContext(null);

    /* ================= PROVIDER ================= */
    export function ProjectProvider({ children }) {
    const [projects, setProjects] = useState({
        web: [],
        uiux: [],
        editing: [],
    });

    const [loading, setLoading] = useState(true);

    /* ---------- FETCH FROM BACKEND ---------- */
    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        setLoading(true);
        const data = await fetchProjects();

        // Group by category
        const grouped = {
        web: [],
        uiux: [],
        editing: [],
        };

        data.forEach((p) => {
        grouped[p.category]?.push(p);
        });

        setProjects(grouped);
        setLoading(false);
    };

    /* ---------- CRUD ---------- */
    const addProject = async (project) => {
        await createProjectAPI(project);
        await loadProjects(); // 🔥 re-sync
    };

    const updateProject = async (id, data) => {
        await updateProjectAPI(id, data);
        await loadProjects();
    };

    const deleteProject = async (id) => {
        await deleteProjectAPI(id);
        await loadProjects();
    };

    return (
        <ProjectContext.Provider
        value={{
            projects,
            loading,
            addProject,
            updateProject,
            deleteProject,
        }}
        >
        {children}
        </ProjectContext.Provider>
    );
    }

    /* ================= HOOK ================= */
    export function useProjects() {
    const ctx = useContext(ProjectContext);
    if (!ctx) throw new Error("useProjects must be inside ProjectProvider");
    return ctx;
    }







