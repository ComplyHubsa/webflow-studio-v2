"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  once?: boolean;
  /** Slight scale-up on entry — use sparingly, on cards rather than text. */
  lift?: boolean;
}

const TRANSLATE: Record<string, { x?: number; y?: number }> = {
  up:    { y: 34 },
  down:  { y: -34 },
  left:  { x: 34 },
  right: { x: -34 },
  none:  {},
};

/* Used by every section on the site, so this is the single place that sets
   how the whole page feels arriving. Blur on entry is what separates a
   considered reveal from a plain fade — it reads as focus pulling in.

   Honours prefers-reduced-motion: content appears instantly rather than
   moving, which some people need and which also keeps it accessible. */
export default function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className = "",
  once = true,
  lift = false,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-60px" });
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  const hidden = {
    opacity: 0,
    filter: "blur(8px)",
    ...(lift ? { scale: 0.985 } : {}),
    ...TRANSLATE[direction],
  };
  const shown = { opacity: 1, filter: "blur(0px)", scale: 1, x: 0, y: 0 };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={hidden}
      animate={isInView ? shown : hidden}
      transition={{
        duration: 0.85,
        delay,
        ease: [0.16, 1, 0.3, 1],
        filter: { duration: 0.6, delay },
      }}
    >
      {children}
    </motion.div>
  );
}
