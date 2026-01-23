import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

/* ================= CONTEXT ================= */
const AboutContext = createContext();

/* ================= PROVIDER ================= */
export const AboutProvider = ({ children }) => {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  const API = "http://localhost:5000/api/about";


  /* ===== Fetch About Data ===== */
  const fetchAbout = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API);
      setAbout(res.data);
    } catch (err) {
      console.error("Failed to fetch About data", err);
    } finally {
      setLoading(false);
    }
  };

  /* ===== Update About (Admin) ===== */
  const updateAbout = async (formData) => {
    try {
      const res = await axios.put(API, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setAbout(res.data.about);
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
    <AboutContext.Provider
      value={{
        about,
        loading,
        fetchAbout,
        updateAbout,
      }}
    >
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
