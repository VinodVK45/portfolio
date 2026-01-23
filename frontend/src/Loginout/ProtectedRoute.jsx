import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  // ⏳ Wait until auth is ready
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Checking authentication...
      </div>
    );
  }

  // 🔒 Not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Logged in
  return children;
}

export default ProtectedRoute;
