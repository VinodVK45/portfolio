import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

function GlobalBackground({ children }) {
  const shipRef = useRef(null);
  const lightRef = useRef(null);
  const contentRef = useRef(null);
  const bgRef = useRef(null); // ✅ FIX 1

  useEffect(() => {
    const tl = gsap.timeline();

    /* ===============================
       INITIAL STATES
    =============================== */
    gsap.set(shipRef.current, {
      xPercent: -50,
      yPercent: -50,
      scale: 0.25,
      opacity: 1,
    });

    gsap.set(lightRef.current, {
      opacity: 0,
      scaleY: 0,
      transformOrigin: "top center",
    });

    gsap.set(contentRef.current, {
      opacity: 0,
      y: 60,
    });

    gsap.fromTo(
      bgRef.current,
      { scale: 1.25 },
      { scale: 1, duration: 30, ease: "power2.inOut", repeat: -1, yoyo: true }
    );

    /* ===============================
   ① RIGHT → ② TOP
================================ */
tl.to(shipRef.current, {
  duration: 3,
  scale: 0.45,
  ease: "power2.inOut",
  motionPath: {
    path: [
      { x: "110vw", y: "30vh" },
      { x: "70vw", y: "18vh" },
      { x: "50vw", y: "10vh" }, // TOP CENTER
    ],
    curviness: 1.6,
  },
})
.add("shipAtTop"); // ✅ LABEL


   /* ===============================
   LIGHT + CONTENT (SYNCED)
================================ */
tl.to(
  lightRef.current,
  {
    opacity: 1,
    scaleY: 1,
    duration: 1.2,
    ease: "power2.out",
  },
  "shipAtTop+=0.2" // 🔥 perfectly synced
);

tl.to(
  contentRef.current,
  {
    opacity: 1,
    y: 0,
    duration: 1.5,
    ease: "power3.out",
  },
  "shipAtTop+=0.4"
);

    /* ===============================
   ② TOP → ③ EXIT
================================ */
tl.to(shipRef.current, {
  duration: 5,
  scale: 0.15,
  opacity: 0,
  ease: "power2.inOut",
  motionPath: {
    path: [
      { x: "50vw", y: "10vh" },
      { x: "70vw", y: "5vh" },
      { x: "120vw", y: "-20vh" },
    ],
    curviness: 1.8,
  },
});


    return () => tl.kill(); // ✅ FIX 3
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">

      {/* 🌌 BACKGROUND */}
      <div
        ref={bgRef}
        className="fixed inset-0 bg-cover bg-center will-change-transform z-0"
        style={{
          backgroundImage:
            'url("/create_a_Space_with_planets_from_long_view_with_clarity_beautifull__20251222114721_01.png")',
        }}
      />

      {/* 🛸 SPACESHIP */}
      <img
        ref={shipRef}
        src="/SpaceShip.png"
        alt="Spaceship"
        className="
          fixed
          top-0
          left-0
          w-[700px]
          pointer-events-none
          select-none
          z-[5]
        "
      />

      {/* 🔦 LIGHT BEAM */}
      <div
        ref={lightRef}
        className="
          fixed
          top-[12vh]
          left-1/2
          -translate-x-1/2
          w-[420px]
          h-[75vh]
          bg-gradient-to-b
          from-yellow-200/30
          via-sky-200/25
          to-transparent
          blur-2xl
          origin-top
          z-[4]
        "
      />

      {/* 📦 CONTENT */}
      <div ref={contentRef} className="relative z-10">
        {children}
      </div>
    </div>
  );
}

export default GlobalBackground;
