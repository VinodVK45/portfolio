import { motion } from "framer-motion";
import { useAbout } from "../../context/AboutContext";

/* ================= TEXT RENDER HELPER ================= */
const renderStyledText = (text, gradient = false) => {
  if (!text) return null;

  return text.split("**").map((part, index) =>
    index % 2 === 1 ? (
      <motion.span
        key={index}
        initial={{ opacity: 0.6, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={
          gradient
            ? "bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent font-bold drop-shadow-[0_0_12px_rgba(255,170,60,0.35)]"
            : "text-white font-semibold"
        }
      >
        {part}
      </motion.span>
    ) : (
      part
    )
  );
};

function About() {
  const { about, loading } = useAbout();

  if (loading) {
    return (
      <section className="py-32 text-center text-white/60">
        Loading About...
      </section>
    );
  }

  const data = about || {
    subtitle: "About Me",
    paragraph1: "",
    paragraph2: "",
    paragraph3: "",
    highlightText: "",
    services: [],
    image: null,
    location: "",
  };

  return (
    <section
      id="about"
      className="relative bg-transparent text-white py-32 px-6 overflow-hidden"
    >
      {/* Ambient Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* GRID */}
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

        {/* LEFT — CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative order-2 lg:order-1"
        >
          {/* Subtitle */}
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.6em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.4em" }}
            transition={{ duration: 0.8 }}
            className="text-amber-500 uppercase tracking-[0.4em] text-sm font-bold mb-6 block relative"
          >
            {data.subtitle}
            <span className="absolute left-0 -bottom-2 h-[2px] w-16 bg-amber-500/40 rounded-full" />
          </motion.span>

          {/* Decorative Quote */}
          <span className="absolute -top-14 -left-8 text-[140px] text-amber-500/10 font-serif select-none">
            “
          </span>

          {/* TEXT */}
          <div className="space-y-8 text-[18px] md:text-[22px] leading-relaxed text-gray-300 font-light relative z-10">
            {[data.paragraph1, data.paragraph2, data.paragraph3].map(
              (text, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.15, duration: 0.7 }}
                >
                  {renderStyledText(text)}
                </motion.p>
              )
            )}

            {/* HIGHLIGHT TEXT */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-white font-bold text-3xl md:text-4xl"
            >
              {renderStyledText(data.highlightText, true)}
            </motion.p>
          </div>

          {/* SERVICES */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.08 } },
            }}
            className="mt-10 flex flex-wrap gap-3"
          >
            {data.services.map((service) => (
              <motion.span
                key={service}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{
                  scale: 1.06,
                  boxShadow: "0 0 18px rgba(255,170,60,0.25)",
                }}
                className="px-5 py-2 rounded-full bg-black/70 border border-white/10 text-xs uppercase tracking-widest text-white/80 backdrop-blur-md hover:border-amber-500/50 transition"
              >
                {service}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT — IMAGE (TOP ALIGNED FIXED) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative flex justify-center lg:justify-end order-1 lg:order-2"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="relative"
          >
            {/* Offset Frame */}
            <div className="absolute -bottom-4 -right-6 w-full h-full border-2 border-amber-500/50 rounded-2xl" />

            {/* Image */}
            <div className="relative w-[300px] h-[400px] md:w-[400px] md:h-[460px] overflow-hidden rounded-2xl border border-white/10 bg-[#111] shadow-lg shadow-sky-200/60">
              {data.image?.url && (
                <img
                  src={data.image.url}
                  alt="About Image"
                  className="h-full w-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
            </div>

            {/* Corner */}
            <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-amber-500" />

            {/* Location */}
            <motion.div
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-8 bg-white/90 text-black py-3 px-6 rounded-xl font-bold text-sm shadow-2xl backdrop-blur-md"
            >
              {data.location}
            </motion.div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

export default About;
