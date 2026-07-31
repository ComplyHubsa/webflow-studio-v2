"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import FadeIn from "./FadeIn";
import { Wrench, HardHat, Flower2, Calculator, Sparkles, Gem } from "lucide-react";

const industries = [
  { icon: Wrench,     industry: "Plumbing",       demo: "Flux Plumbing", href: "/plumbing",     accent: "#E8481E" },
  { icon: HardHat,    industry: "Construction",   demo: "Ironclad",      href: "/construction", accent: "#FF5722" },
  { icon: Flower2,    industry: "Spa & Wellness", demo: "Maison Sérène", href: "/spa",          accent: "#C9A96E" },
  { icon: Calculator, industry: "Accounting",     demo: "Meridian",      href: "/accountant",   accent: "#00FF88" },
  { icon: Sparkles,   industry: "Cosmetics",      demo: "Velour",        href: "/cosmetics",    accent: "#E0526F" },
  { icon: Gem,        industry: "Beauty & Salon", demo: "Lumière",       href: "/beauty",       accent: "#D4A553" },
];

export default function Industries() {
  return (
    <section className="py-18 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <span
              className="text-xs font-semibold uppercase tracking-widest mb-5 block"
              style={{ color: "var(--accent2)" }}
            >
              Live Demos
            </span>
            <h2
              className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-tight tracking-tight mb-5"
              style={{ fontFamily: "var(--font-space)" }}
            >
              Built for{" "}
              <span className="gradient-text">your industry</span>
            </h2>
            <p className="text-base max-w-lg mx-auto leading-relaxed" style={{ color: "var(--muted)" }}>
              These aren&apos;t pictures — they&apos;re real, working sites. Click any
              one, scroll it, try it on your phone. Yours gets your logo, your
              colours, your photos and your words.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {industries.map((item, i) => (
            <FadeIn key={item.industry} delay={i * 0.08} className="w-full">
              <Link
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                <motion.div
                  className="relative rounded-2xl p-7 flex flex-col gap-5 h-full"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid var(--border)",
                  }}
                  whileHover={{
                    scale: 1.03,
                    y: -4,
                    borderColor: `${item.accent}66`,
                    boxShadow: `0 0 40px ${item.accent}18`,
                  }}
                  transition={{ duration: 0.28 }}
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${item.accent}18` }}
                    >
                      <item.icon size={20} strokeWidth={2} style={{ color: item.accent }} />
                    </span>
                    <div className="min-w-0">
                      <div
                        className="text-base font-bold text-white truncate"
                        style={{ fontFamily: "var(--font-space)" }}
                      >
                        {item.industry}
                      </div>
                      <div className="text-xs truncate" style={{ color: "var(--muted)" }}>
                        {item.demo}
                      </div>
                    </div>
                  </div>

                  <div
                    className="mt-auto text-center text-sm font-semibold py-3 rounded-xl transition-all duration-300"
                    style={{
                      background: `${item.accent}12`,
                      border: `1px solid ${item.accent}40`,
                      color: item.accent,
                    }}
                  >
                    See the live demo →
                  </div>
                </motion.div>
              </Link>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <div
            className="mt-12 rounded-2xl px-7 py-6 text-center max-w-3xl mx-auto"
            style={{
              background: "rgba(108,99,255,0.04)",
              border: "1px solid rgba(108,99,255,0.18)",
            }}
          >
            <p className="text-sm leading-relaxed" style={{ color: "var(--text)" }}>
              <span className="font-semibold text-white">
                Demos like these are the Premium build — R6,500.
              </span>{" "}
              The animations, multiple pages and custom layouts are what take the
              extra time. If you just need one clean page that gets you online and
              taking calls, that&apos;s the Starter at R3,500.
            </p>
            <Link
              href="#pricing"
              className="inline-block mt-4 text-sm font-semibold underline transition-colors hover:text-white"
              style={{ color: "var(--accent2)" }}
            >
              Compare both properly ↓
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
