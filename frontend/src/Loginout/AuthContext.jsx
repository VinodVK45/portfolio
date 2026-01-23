import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= INIT AUTH (ON REFRESH) ================= */
  useEffect(() => {
    const storedToken = localStorage.getItem("adminToken");
    if (storedToken) {
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  const isAuthenticated = !!token;

  /* ================= LOGIN ================= */
  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });

    const jwtToken = res.data.token;

    localStorage.setItem("adminToken", jwtToken);
    setToken(jwtToken);

    navigate("/admin");
  };

  /* ================= LOGOUT ================= */
  const logout = () => {
    localStorage.removeItem("adminToken");
    setToken(null);
    navigate("/login");
  };

  /* ================= SYNC LOGOUT ACROSS TABS ================= */
  useEffect(() => {
    const syncLogout = (event) => {
      if (event.key === "adminToken" && !event.newValue) {
        setToken(null);
        navigate("/login");
      }
    };

    window.addEventListener("storage", syncLogout);
    return () => window.removeEventListener("storage", syncLogout);
  }, [navigate]);

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        isAuthenticated,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
