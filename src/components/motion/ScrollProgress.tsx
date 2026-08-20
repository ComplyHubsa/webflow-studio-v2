"use client";

import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

/* A hairline that fills as you read. Springed rather than linear so it eases
   into place instead of tracking the scrollbar exactly — the lag is what
   makes it feel like an object rather than a readout. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  const width = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 40,
    restDelta: 0.001,
  });

  if (reduce) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[60]"
      style={{
        scaleX: width,
        background:
          "linear-gradient(90deg, var(--accent) 0%, var(--accent2) 100%)",
      }}
    />
  );
}
