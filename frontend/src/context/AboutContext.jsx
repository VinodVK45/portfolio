import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";

/* ================= CONTEXT ================= */
const AboutContext = createContext();

/* ================= PROVIDER ================= */
export const AboutProvider = ({ children }) => {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ===== Fetch About Data ===== */
  const fetchAbout = async () => {
    try {
      setLoading(true);
      const res = await api.get("/about");

      const data = res.data || {};

      setAbout({
        ...data,
        services: Array.isArray(data.services) ? data.services : [],
      });
    } catch (err) {
      console.error("Failed to fetch About data", err);
      setAbout(null);
    } finally {
      setLoading(false);
    }
  };

  /* ===== Update About (Admin) ===== */
  const updateAbout = async (formData) => {
    try {
      const res = await api.put("/about", formData);
      const data = res.data.about || {};

      setAbout({
        ...data,
        services: Array.isArray(data.services) ? data.services : [],
      });

      return true;
    } catch (err) {
      console.error("Failed to update About", err);
      return false;
    }
  };

  useEffect(() => {
    fetchAbout();
  }, []);

  return (
    <AboutContext.Provider value={{ about, loading, fetchAbout, updateAbout }}>
      {children}
    </AboutContext.Provider>
  );
};

/* ================= HOOK ================= */
export const useAbout = () => {
  const context = useContext(AboutContext);
  if (!context) {
    throw new Error("useAbout must be used inside AboutProvider");
  }
  return context;
};
