import { useState } from "react";
import api from "../api/api";


function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const res = await api.post("/auth/forgot-password", { email });
      setMsg(res.data.message || "Reset link sent");
    } catch (err) {
      setMsg(
        err.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0f19] text-white">
      <form
        onSubmit={submit}
        className="w-full max-w-md p-8 rounded-2xl bg-black/40 border border-white/10"
      >
        <h1 className="text-2xl font-bold mb-6">
          Forgot Password
        </h1>

        <input
          type="email"
          required
          placeholder="Admin email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-3 rounded bg-black border border-white/20"
        />

        {msg && (
          <p className="text-sm text-yellow-300 mb-4">
            {msg}
          </p>
        )}

        <button
          disabled={loading}
          className="w-full py-3 bg-amber-500 text-black font-bold rounded-lg hover:bg-amber-400 transition"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
