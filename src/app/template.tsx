"use client";

import { motion, useReducedMotion } from "framer-motion";

/* Runs on every route change. template.tsx (not layout.tsx) because Next gives
   templates a fresh key per route, so this remounts and replays on navigation
   — a layout would mount once and never animate again.

   Enter-only: the App Router swaps the tree on navigation, so there's no
   outgoing page left to animate. Kept short and blur-led so it reads as the
   page focusing in rather than a slide, which would fight the scroll. */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  if (reduce) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
        filter: { duration: 0.35 },
      }}
    >
      {children}
    </motion.div>
  );
}
