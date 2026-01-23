import { useState } from "react";
import { useAuth } from "../Loginout/AuthContext";



import AboutAdmin from "./About/Admin.About.jsx";
import ProjectsAdmin from "./Projects/Admin.Projects.jsx";
import AdminFooter from "./Footer/Admin.Footer.jsx";

function Admin() {
  const { logout } = useAuth();
  const [active, setActive] = useState("about");


  

  return (
    <div className="w-full min-h-screen flex bg-[#0b0f19] text-white font-plusjakarta">
      
      {/* ---------- SIDEBAR ---------- */}
      <aside className="w-70 border-r border-white/10 p-8 flex flex-col">
        <div>
          <h1 className="text-3xl font-bold tracking-wide mb-1">
            Admin Panel
          </h1>
          <p className="text-sm text-white/60 mb-10">
            Portfolio Content Manager
          </p>

          <nav className="flex flex-col gap-4">
            {["about", "projects", "footer"].map((item) => (
              <button
                key={item}
                onClick={() => setActive(item)}
                className={`text-left px-4 py-3 rounded-xl transition-all
                  ${
                    active === item
                      ? "bg-yellow-400/10 text-yellow-300"
                      : "text-white/70 hover:bg-white/5"
                  }
                `}
              >
                {item === "about" && "About Me"}
                {item === "projects" && "Projects"}
                {item === "footer" && "Footer"}
              </button>
            ))}
          </nav>
        </div>

        {/* 🔓 LOGOUT */}
        <button
          onClick={logout}
          className="mt-auto px-4 py-3 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/40 transition font-semibold"
        >
          Logout
        </button>
      </aside>

      {/* ---------- CONTENT ---------- */}
      <main className="flex-1 p-14 overflow-y-auto">
        {active === "about" && <AboutAdmin />}
        {active === "projects" && <ProjectsAdmin />}
        {active === "footer" && <AdminFooter />}
      </main>
    </div>
  );
}

export default Admin;
