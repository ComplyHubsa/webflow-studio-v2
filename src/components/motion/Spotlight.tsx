"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

/* A soft bloom inside a card that follows the pointer.

   The position is springed, not set directly: a gradient pinned exactly to the
   cursor feels like a flashlight, while a fraction of lag makes it feel like
   something with weight moving under the surface.

   Colour is the site's own bronze at low alpha rather than the vivid magenta
   of the reference. On a white-and-bronze page an unrelated hot colour reads
   as a widget someone pasted in, which is the exact opposite of expensive.

   The bloom sits under the content (-z-10 inside a relative parent) and is
   clipped by the card's own overflow, so it can never wash out the text. */
export default function Spotlight({
  children,
  className = "",
  radius = 320,
  strength = 0.16,
  color = "138, 106, 47", // --accent as rgb
}: {
  children: React.ReactNode;
  className?: string;
  /** Bloom size in px. */
  radius?: number;
  /** Peak alpha at the centre. */
  strength?: number;
  color?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [hot, setHot] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 180, damping: 26, mass: 0.4 });
  const y = useSpring(my, { stiffness: 180, damping: 26, mass: 0.4 });

  const background = useMotionTemplate`radial-gradient(${radius}px circle at ${x}px ${y}px, rgba(${color}, ${strength}), rgba(${color}, 0) 70%)`;

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      onPointerMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
      }}
      onPointerEnter={(e) => {
        // Seed the position on entry, otherwise the bloom springs in from
        // wherever the pointer left the card last time.
        const r = ref.current?.getBoundingClientRect();
        if (r) {
          mx.jump(e.clientX - r.left);
          my.jump(e.clientY - r.top);
        }
        setHot(true);
      }}
      onPointerLeave={() => setHot(false)}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background }}
        animate={{ opacity: hot ? 1 : 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      />
      {children}
    </div>
  );
}
