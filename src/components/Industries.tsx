"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import FadeIn from "./FadeIn";
import Marquee from "./motion/Marquee";
import Spotlight from "./motion/Spotlight";

/** "#C2410C" -> "194, 65, 12" for use inside an rgba() string. */
function hexToRgb(hex: string) {
  const n = parseInt(hex.replace("#", ""), 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
}

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

function DemoCard({ item }: { item: (typeof industries)[number] }) {
  return (
    <Link
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
      style={{ width: 288 }}
    >
      <motion.div
        className="h-full rounded-[18px]"
        style={{ background: "var(--surface)", border: "1px solid transparent" }}
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 340, damping: 26 }}
      >
        {/* Bloom picks up each demo's own accent, so the six cards read as six
            different brands rather than one repeated component. */}
        <Spotlight
          className="rounded-[18px] h-full p-7 flex flex-col"
          color={hexToRgb(item.accent)}
          strength={0.18}
        >
        <div className="flex items-center justify-between mb-10">
          <span className="text-[11px] tabular-nums tracking-[0.15em]" style={{ color: "var(--muted)" }}>
            {item.no}
          </span>
          <span className="w-6 h-1 rounded-full" style={{ background: item.accent }} />
        </div>

        <div className="display text-[1.6rem] mb-1" style={{ color: "var(--text)" }}>
          {item.demo}
        </div>
        <div className="text-[14px] mb-8" style={{ color: "var(--muted)" }}>
          {item.industry}
        </div>

        <span
          className="text-[14px] font-medium inline-flex items-center gap-1 mt-auto transition-opacity group-hover:opacity-70"
          style={{ color: item.accent }}
        >
          Open the live site
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
            ↗
          </span>
        </span>
        </Spotlight>
      </motion.div>
    </Link>
  );
}

export default function Industries() {
  return (
    <section id="demos" className="px-6 py-16 md:py-24 scroll-mt-20 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <div className="mb-12 max-w-2xl">
            <div className="eyebrow mb-5">Demo sites</div>
            <h2
              className="display text-[clamp(1.9rem,3.6vw,2.9rem)] mb-4"
              style={{ color: "var(--text)" }}
            >
              Six sites I built to show what yours could be.
            </h2>
            <p className="lede">
              Working sites, not screenshots — open one, scroll it, try it on
              your phone. The businesses are invented; the build is real.
            </p>
          </div>
        </FadeIn>
      </div>

      {/* Full-bleed so the row runs past the container edges as it scrolls. */}
      <FadeIn delay={0.1}>
        <Marquee speed={52} className="-mx-6">
          {industries.map((item) => (
            <DemoCard key={item.industry} item={item} />
          ))}
        </Marquee>
      </FadeIn>

      <div className="max-w-5xl mx-auto">
        <FadeIn delay={0.2}>
          <p className="text-[14px] leading-[1.8] mt-10 max-w-2xl" style={{ color: "var(--muted)" }}>
            <span className="font-semibold" style={{ color: "var(--text)" }}>
              Sites like these are the Premium build at R6,500.
            </span>{" "}
            The animations, extra pages and custom layouts are what take the
            time. If you only need one clean page, that&apos;s the Starter at
            R3,500.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
