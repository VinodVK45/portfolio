import { motion } from "framer-motion";


function Hero() {
  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-screen overflow-hidden  text-white">

        {/* CONTENT */}
        <div className="relative z-10 flex min-h-screen items-center px-6">
          <div className="mx-auto w-full max-w-7xl mt-30 text-center">

            {/* INTRO */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-4 uppercase text-[42px] tracking-[0.2em] text-center  text-gray-50"
            >
              Hi, I am
            </motion.p>

            {/* NAME */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative mb-10 overflow-hidden"
            >
              <span className="block font-black uppercase leading-none tracking-tight text-center text-[14vw] sm:text-[90px] md:text-[120px] lg:text-[160px]">
                <span className="inline-block">Vinod </span>
                <span className="inline-block text-transparent bg-linear-to-br from-amber-200 via-yellow-300 to-amber-500 bg-clip-text drop-shadow-[0_0_35px_rgba(251,191,36,0.35)]">
                  Kumar
                </span>
              </span>
            </motion.h1>

            {/* ROLES */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mx-auto max-w-3xl rounded-full border border-white/90 bg-black/70 px-8 py-3 shadow-md shadow-sky-200"
            >
              <p className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-[11px] uppercase tracking-[0.3em]">
                <span className="bg-linear-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent font-semibold">
                  Full Stack Developer
                </span>
                <span className="text-white/20">•</span>
                <span className="bg-linear-to-r from-sky-300 to-blue-400 bg-clip-text text-transparent font-semibold">
                  UI/UX Designer
                </span>
                <span className="text-white/20">•</span>
                <span className="bg-linear-to-r from-pink-300 to-rose-400 bg-clip-text text-transparent font-semibold">
                  Video Editor
                </span>
              </p>
            </motion.div>

            {/* AVAILABILITY BADGE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-10 inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/70 px-6 py-2 text-[10px] uppercase tracking-[0.35em] text-white shadow-md shadow-sky-200"
            >
              <span className="h-2 w-2 rounded-full bg-green-500  animate-pulse" />
              Available for Freelance
            </motion.div>

            {/* CTA BUTTONS */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="mt-10 flex flex-wrap justify-center  gap-4 sm:gap-6"
            >
              <a
                href="#projects"
                className="relative z-20 rounded-full border border-white/40 bg-black/70 px-10 py-4 text-[11px] uppercase tracking-[0.2em] text-white  transition hover:-translate-y-1 shadow-md shadow-sky-200 hover:bg-white/10"
              >
                Explore Work →
              </a>

              <a
                href="#contact"
                className="relative z-20 rounded-full border border-white/40 bg-black/70 px-10 py-4 text-[10px] uppercase tracking-[0.2em] text-white  transition hover:-translate-y-1 shadow-md shadow-sky-200 hover:bg-white/10"
              >
                Contact Me ✦
              </a>
            </motion.div>
          </div>
        </div>

        
      </section>

    </>
  );
}

export default Hero;
