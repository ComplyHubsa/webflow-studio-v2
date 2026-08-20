"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";

export interface Step {
  no: string;
  label?: string;
  title: string;
  body: string;
}

/* A row of steps that light up one after another as the section scrolls
   through the viewport, with the connecting line filling behind them.

   Activation is derived from a single scroll progress value rather than one
   observer per step: observers fire on their own schedule, so steps could
   light out of order on a fast scroll. One value can only ever move forward.

   Steps already lit stay lit — `reached` never goes down. Watching a step
   un-light itself on a small upward scroll looks like a glitch, not a state. */
export default function ScrollSteps({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [reached, setReached] = useState(reduce ? steps.length - 1 : -1);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.55"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const idx = Math.min(steps.length - 1, Math.floor(p * (steps.length + 0.4)));
    setReached((prev) => (idx > prev ? idx : prev));
  });

  const lineScale = useTransform(scrollYProgress, [0, 0.85], [0, 1]);

  return (
    <div ref={ref} className="relative">
      {/* Rail: one line behind the whole row, filled by scroll progress.
          Desktop only — stacked on mobile there is nothing to connect. */}
      <div
        className="hidden lg:block absolute left-0 right-0 h-px"
        style={{ top: 28, background: "var(--border)" }}
      />
      <motion.div
        className="hidden lg:block absolute left-0 right-0 h-px origin-left"
        style={{
          top: 28,
          background: "var(--accent)",
          scaleX: reduce ? 1 : lineScale,
        }}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
        {steps.map((s, i) => {
          const lit = i <= reached;
          return (
            <div key={s.no} className="relative">
              <motion.div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-6 relative z-10"
                style={{ background: "var(--bg)" }}
                animate={{
                  borderColor: lit ? "var(--accent)" : "var(--border)",
                  scale: lit ? 1 : 0.92,
                }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                initial={false}
              >
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    border: `1px solid ${lit ? "var(--accent)" : "var(--border)"}`,
                    transition: "border-color 0.5s ease",
                  }}
                />
                <span
                  className="display text-[13px] tabular-nums"
                  style={{
                    color: lit ? "var(--accent)" : "var(--muted)",
                    letterSpacing: "0.08em",
                    transition: "color 0.5s ease",
                  }}
                >
                  {s.no}
                </span>
              </motion.div>

              <motion.div
                animate={{ opacity: lit ? 1 : 0.42, y: lit ? 0 : 6 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                initial={false}
              >
                {s.label && (
                  <div
                    className="text-[11px] font-semibold uppercase tracking-[0.14em] mb-2"
                    style={{ color: "var(--accent)" }}
                  >
                    {s.label}
                  </div>
                )}
                <h3
                  className="display text-[19px] mb-2.5"
                  style={{ color: "var(--text)" }}
                >
                  {s.title}
                </h3>
                <p
                  className="text-[15px] leading-[1.75]"
                  style={{ color: "var(--muted)" }}
                >
                  {s.body}
                </p>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
