import { useState } from "react";
import { useAuth } from "./AuthContext";
import api from "../api/api";
import toast from "react-hot-toast";

function AdminLogin() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password); // navigation happens here
    } catch {
      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async () => {
    if (!email) {
      toast.error("Please enter your email first");
      return;
    }

    try {
      await api.post("/auth/forgot-password", { email });
      toast.success("Password reset link sent to your email");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <form onSubmit={submit} className="bg-white/10 p-8 rounded-xl w-[360px]">
        <h1 className="text-2xl mb-6 text-white">Admin Login</h1>

        <input
          className="w-full mb-4 p-3 rounded bg-black text-white"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full mb-4 p-3 rounded bg-black text-white"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <div
          onClick={forgotPassword}
          className="text-sm text-amber-400 cursor-pointer mb-6 text-right"
        >
          Forgot password?
        </div>

        <button
          disabled={loading}
          className="w-full bg-amber-400 p-3 rounded font-bold"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
