import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";

/* ================= CONTEXT ================= */
const FooterContext = createContext();

/* ================= PROVIDER ================= */
export const FooterProvider = ({ children }) => {
  const [footer, setFooter] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ===== Fetch Footer ===== */
  const fetchFooter = async () => {
    try {
      setLoading(true);
      const res = await api.get("/footer");
      setFooter(res.data);
    } catch (err) {
      console.error("Failed to fetch footer", err);
    } finally {
      setLoading(false);
    }
  };

  /* ===== Update Footer (Admin) ===== */
  const updateFooter = async (data) => {
    try {
      const res = await api.put("/footer", data);
      setFooter(res.data.footer);
      return true;
    } catch (err) {
      console.error("Failed to update footer", err);
      return false;
    }
  };

  useEffect(() => {
    fetchFooter();
  }, []);

  return (
    <FooterContext.Provider
      value={{ footer, loading, fetchFooter, updateFooter }}
    >
      {children}
    </FooterContext.Provider>
  );
};

/* ================= HOOK ================= */
export const useFooter = () => {
  const context = useContext(FooterContext);
  if (!context) {
    throw new Error("useFooter must be used inside FooterProvider");
  }
  return context;
};
