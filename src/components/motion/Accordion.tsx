"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export interface QA {
  q: string;
  a: string;
}

/* Numbered accordion. One panel open at a time — with several open the
   numbers stop lining up with anything and it turns back into a wall of text,
   which is what the accordion was for.

   Height animates from 0 to "auto"; framer measures the natural height, so the
   copy never has to be a fixed length. The +/- is a rotating single glyph
   rather than two swapped icons, so there's nothing to cross-fade. */
export default function Accordion({ items }: { items: QA[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} style={{ borderTop: "1px solid var(--border)" }}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="w-full flex items-start gap-5 md:gap-8 text-left py-7 group"
            >
              <span
                className="display text-[13px] tabular-nums pt-1.5 shrink-0"
                style={{
                  color: isOpen ? "var(--accent)" : "var(--muted)",
                  letterSpacing: "0.08em",
                  transition: "color 0.3s ease",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <span
                className="display text-[clamp(1.05rem,1.9vw,1.4rem)] flex-1 transition-opacity group-hover:opacity-70"
                style={{ color: "var(--text)" }}
              >
                {item.q}
              </span>

              <motion.span
                aria-hidden="true"
                className="shrink-0 text-2xl leading-none pt-0.5 font-light"
                style={{ color: "var(--muted)" }}
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ type: "spring", stiffness: 320, damping: 24 }}
              >
                +
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    height: { duration: 0.42, ease: [0.16, 1, 0.3, 1] },
                    opacity: { duration: 0.28 },
                  }}
                  style={{ overflow: "hidden" }}
                >
                  <p
                    className="text-[15px] leading-[1.8] pb-8 pl-[calc(1.6rem+1.25rem)] md:pl-[calc(1.6rem+2rem)] pr-10 max-w-3xl"
                    style={{ color: "var(--muted)" }}
                  >
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
      <div style={{ borderTop: "1px solid var(--border)" }} />
    </div>
  );
}
