"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Magnetic from "./motion/Magnetic";

const EASE = [0.22, 1, 0.36, 1] as const;
const up = (delay: number, y = 22) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease: EASE },
});

interface Action {
  label: string;
  href: string;
  external?: boolean;
}

/* Shared top-of-page block so every product page opens the same way:
   eyebrow, one heavy line, one quiet paragraph, at most two actions. */
export default function PageHero({
  eyebrow,
  status,
  title,
  lede,
  primary,
  secondary,
}: {
  eyebrow: string;
  status?: string;
  title: string;
  lede: string;
  primary?: Action;
  secondary?: Action;
}) {
  return (
    <section className="relative px-6 pt-36 pb-20 md:pt-44 md:pb-28 text-center overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(90% 60% at 50% 0%, var(--surface) 0%, var(--bg) 62%)",
        }}
      />
      <div className="max-w-3xl mx-auto">
        <motion.div
          {...up(0.05, 8)}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <span className="eyebrow">{eyebrow}</span>
          {status && (
            <span
              className="text-[10px] font-semibold uppercase tracking-[0.14em] px-2.5 py-1 rounded-full"
              style={{ border: "1px solid var(--border-strong)", color: "var(--muted)" }}
            >
              {status}
            </span>
          )}
        </motion.div>

        <motion.h1
          {...up(0.14)}
          className="display text-[clamp(2.4rem,5.6vw,4.2rem)] mb-6"
          style={{ color: "var(--text)" }}
        >
          {title}
        </motion.h1>

        <motion.p {...up(0.26, 12)} className="lede max-w-2xl mx-auto">
          {lede}
        </motion.p>

        {(primary || secondary) && (
          <motion.div
            {...up(0.38, 12)}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-x-8 gap-y-4"
          >
            {primary && (
              <Magnetic>
                <Link
                  href={primary.href}
                  {...(primary.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="inline-flex items-center justify-center font-medium px-7 py-3 rounded-full text-[15px] transition-opacity duration-300 hover:opacity-85"
                  style={{ background: "var(--text)", color: "var(--bg)" }}
                >
                  {primary.label}
                </Link>
              </Magnetic>
            )}
            {secondary && (
              <Link
                href={secondary.href}
                {...(secondary.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group inline-flex items-center gap-1 text-[15px] font-medium transition-opacity hover:opacity-70"
                style={{ color: "var(--accent)" }}
              >
                {secondary.label}
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  ›
                </span>
              </Link>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
