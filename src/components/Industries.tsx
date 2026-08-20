"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import FadeIn from "./FadeIn";

/* Muted, print-ish brand colours. The previous set (notably a #00FF88 lime for
   the accounting demo) read as generated rather than chosen. */
const industries = [
  { no: "01", industry: "Plumbing",       demo: "Flux Plumbing", href: "/plumbing",     accent: "#C2410C" },
  { no: "02", industry: "Construction",   demo: "Ironclad",      href: "/construction", accent: "#92400E" },
  { no: "03", industry: "Spa & wellness", demo: "Maison Sérène", href: "/spa",          accent: "#8C7851" },
  { no: "04", industry: "Accounting",     demo: "Meridian",      href: "/accountant",   accent: "#0F766E" },
  { no: "05", industry: "Cosmetics",      demo: "Velour",        href: "/cosmetics",    accent: "#9F1239" },
  { no: "06", industry: "Skincare",       demo: "Lumière",       href: "/beauty",       accent: "#86527A" },
];

export default function Industries() {
  return (
    <section id="demos" className="py-18 px-6 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="mb-14 max-w-2xl">
            <span
              className="text-xs font-medium uppercase tracking-[0.2em] mb-5 block"
              style={{ color: "var(--accent)" }}
            >
              Demo sites
            </span>
            <h2
              className="text-[clamp(2rem,4vw,3.4rem)] font-bold leading-[1.08] tracking-[-0.02em] mb-5"
              style={{ fontFamily: "var(--font-space)" }}
            >
              Six sites I built to show what yours could be.
            </h2>
            <p className="text-base leading-[1.8]" style={{ color: "var(--muted)" }}>
              These are working sites, not screenshots — open one, scroll it, try
              it on your phone. The businesses are invented; the build is real.
              Yours would carry your name, your photos and your words.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "var(--border)" }}>
          {industries.map((item, i) => (
            <FadeIn key={item.industry} delay={i * 0.06} className="w-full">
              <Link
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                <motion.div
                  className="relative flex flex-col gap-6 h-full p-8"
                  style={{ background: "var(--bg)" }}
                  whileHover={{ backgroundColor: "#f5f5f7" }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="text-xs tabular-nums tracking-[0.15em]"
                      style={{ color: "var(--muted)" }}
                    >
                      {item.no}
                    </span>
                    <span
                      className="w-6 h-1 rounded-full"
                      style={{ background: item.accent }}
                    />
                  </div>

                  <div className="mt-auto">
                    <div
                      className="text-2xl font-bold mb-1.5"
                      style={{ fontFamily: "var(--font-space)", color: "var(--text)" }}
                    >
                      {item.demo}
                    </div>
                    <div className="text-sm" style={{ color: "var(--muted)" }}>
                      {item.industry}
                    </div>
                  </div>

                  <div
                    className="text-sm font-medium inline-flex items-center gap-1.5"
                    style={{ color: item.accent }}
                  >
                    Open the live site
                    <span aria-hidden="true">↗</span>
                  </div>
                </motion.div>
              </Link>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <div
            className="mt-10 rounded-xl px-7 py-6 max-w-3xl"
            style={{ border: "1px solid var(--border)" }}
          >
            <p className="text-sm leading-[1.8]" style={{ color: "var(--muted)" }}>
              <span className="font-semibold" style={{ color: "var(--text)" }}>
                Sites like these are the Premium build at R6,500.
              </span>{" "}
              The animations, extra pages and custom layouts are what take the
              time. If you only need one clean page that gets you online and
              taking calls, that&apos;s the Starter at R3,500.
            </p>
            <Link
              href="#pricing"
              className="inline-block mt-4 text-sm font-medium border-b pb-0.5 transition-opacity hover:opacity-70"
              style={{ color: "var(--accent)", borderColor: "var(--accent)" }}
            >
              Compare the two
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
