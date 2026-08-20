"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

/* A trailing ring that grows over anything clickable.

   Two separate springs: the dot is stiff so it sits under the pointer, the
   ring is loose so it arrives a beat later. That difference is the whole
   effect — a single element following exactly just looks like a second cursor.

   Pointer-events are off throughout, and the whole thing is skipped on touch
   and for reduced-motion, where a trailing ring is either useless or unwanted. */
export default function Cursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hot, setHot] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const ringX = useSpring(x, { stiffness: 190, damping: 22, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 190, damping: 22, mass: 0.5 });

  useEffect(() => {
    if (reduce) return;
    // Fine pointer only — no ring on phones and tablets.
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement | null;
      setHot(!!el?.closest('a, button, [role="button"], input, textarea, select'));
    };
    const leave = () => {
      x.set(-100);
      y.set(-100);
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, [reduce, x, y]);

  if (!enabled) return null;

  /* Ring only, and the native cursor is left visible. A custom dot under the
     real arrow just reads as double vision, and hiding the system cursor
     outright costs more in usability than the effect is worth. */
  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 z-[70] pointer-events-none rounded-full hidden lg:block"
        style={{
          x: ringX,
          y: ringY,
          border: "1px solid var(--text)",
        }}
        animate={{
          width: hot ? 42 : 26,
          height: hot ? 42 : 26,
          marginLeft: hot ? -21 : -13,
          marginTop: hot ? -21 : -13,
          opacity: hot ? 0.85 : 0.32,
        }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
      />
    </>
  );
}
