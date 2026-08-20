"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/* Buttons that lean toward the pointer as it approaches.

   The pull is capped at `strength` px and eased by distance, so the element
   never detaches from where it appears to live — the moment a magnetic button
   travels far enough that you can miss it, the effect has failed. */
export default function Magnetic({
  children,
  strength = 9,
  className = "",
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 260, damping: 18, mass: 0.4 });
  const y = useSpring(my, { stiffness: 260, damping: 18, mass: 0.4 });

  if (reduce) return <span className={className}>{children}</span>;

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    mx.set(Math.max(-strength, Math.min(strength, dx * 0.35)));
    my.set(Math.max(-strength, Math.min(strength, dy * 0.35)));
  };

  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className}`}
      style={{ x, y }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.span>
  );
}
