import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus, ExternalLink } from "lucide-react";
import { useProjects } from "../../context/ProjectContext";

/* ================= PROJECT SECTION ================= */

// Safety check: if category or items don't exist yet, don't render items

const PROJECT_THEMES = {
  web: {
    color: "from-cyan-400 to-blue-500",
    glow: "rgba(6,182,212,0.35)",
  },
  uiux: {
    color: "from-purple-400 to-pink-500",
    glow: "rgba(168,85,247,0.35)",
  },
  editing: {
    color: "from-amber-400 to-orange-500",
    glow: "rgba(245,158,11,0.35)",
  },
};


const ProjectSection = ({ title, items = [], theme }) => {


  const scrollRef = useRef(null);

  const slide = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -260 : 260,
      behavior: "smooth",
    });
  };

  


  return (
    <div className="mb-28 w-full">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-10 px-6">
        <motion.h3
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`text-sm font-bold uppercase tracking-[0.4em] bg-linear-to-r ${theme.color} bg-clip-text text-transparent`}
        >
          {title}
        </motion.h3>
        <div className={`mt-3 h-px w-16 bg-linear-to-r ${theme.color}`} />
      </div>

      {/* ================= SLIDER ================= */}
<div className="relative w-full">
  <div
    ref={scrollRef}
    className="flex items-center gap-6 overflow-x-auto snap-x snap-mandatory px-6"
    style={{ scrollbarWidth: "none" }}
  >
    {items.map((item) => (
      <motion.a
        key={item._id}
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
        className="snap-start shrink-0 w-95 h-95
                   relative rounded-2xl overflow-hidden
                   bg-transparent border-2 border-white/90
                   shadow-md shadow-sky-200
                   group will-change-transform"
      >
        {/* GLOW */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition"
          style={{ boxShadow: `inset 0 0 50px ${theme.glow}` }}
        />

        {/* IMAGE */}
        <img
  src={item.img?.startsWith("http") ? item.img : "/placeholder.png"}
  alt={item.title}
  className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
/>


        {/* CONTENT */}
        <div className="absolute inset-0 p-4 flex flex-col justify-end
                        bg-gradient-to-t from-black/30 via-black/15 to-transparent">
          <h4 className="text-sm font-semibold tracking-wide text-white">
            {item.title}
          </h4>

          <p className="text-xs text-gray-100 mt-1 opacity-0 group-hover:opacity-100 transition">
            {item.desc}
          </p>

          {/* ACTIONS */}
          <div className="mt-3 flex items-center justify-between
                          opacity-0 group-hover:opacity-100 transition">
            <span
              className={`flex items-center gap-2 bg-linear-to-r ${theme.color}
                          px-4 py-1.5 rounded-full
                          text-[10px] font-bold uppercase tracking-wider`}
            >
              View <Plus size={16} />
            </span>

            <ExternalLink
              size={18}
              className="text-white/80 hover:text-white transition"
            />
          </div>
        </div>
      </motion.a>
    ))}
  </div>

  {/* LEFT ARROW */}
  <button
    onClick={() => slide("left")}
    className="absolute left-3 top-1/2 -translate-y-1/2
               h-10 w-10 rounded-full
               bg-black/10 border border-white/20
               hover:bg-white hover:text-black
               transition flex items-center justify-center z-20"
  >
    <ChevronLeft size={18} />
  </button>

  {/* RIGHT ARROW */}
  <button
    onClick={() => slide("right")}
    className="absolute right-3 top-1/2 -translate-y-1/2
               h-10 w-10 rounded-full
               bg-black/10 border border-white/20
               hover:bg-white hover:text-black
               transition flex items-center justify-center z-20"
  >
    <ChevronRight size={18} />
  </button>
</div>

    </div>
  );
};

/* ================= MAIN ================= */
function Projects() {
  const { projects, loading } = useProjects();

  // Guard clause to handle loading state from context
  if (loading) {
  return (
    <section className="py-32 text-center text-white/50">
      Loading projects...
    </section>
  );
}


  return (
    <section id="projects" className="relative py-32 text-white">
      <div className="mx-auto max-w-7xl">
        <header className="mb-24 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold tracking-tight"
          >
            SELECTED{" "}
            <span className="bg-linear-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              WORK
            </span>
          </motion.h2>

          <div className="flex flex-col items-center">
  <p className="mt-4 text-sm uppercase tracking-[0.5em] bg-black/70 p-2 rounded-2xl text-yellow-300">
    Curated Projects 
  </p>

  <div className="group cursor-pointer">
          <div className="mt-2 h-px w-42 bg-white origin-left scale-x-30 transition-transform duration-300 ease-out group-hover:scale-x-100" />
</div>

</div>
        </header>

        <ProjectSection 
          title="Development" 
          items ={projects.web} 
          theme={PROJECT_THEMES.web}
        />
        <ProjectSection 
          title="UI / UX Design" 
          items={projects.uiux} 
          theme={PROJECT_THEMES.uiux}
        />
        <ProjectSection 
          title="Motion & Editing" 
          items={projects.editing} 
          theme={PROJECT_THEMES.editing}
        />
      </div>
    </section>
  );
}

export default Projects;