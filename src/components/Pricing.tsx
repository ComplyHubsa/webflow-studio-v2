"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import FadeIn from "./FadeIn";
import { Check, Wrench, HardHat, Flower2, Calculator, Sparkles, Gem } from "lucide-react";

const STARTER_PAY_URL = "https://pay.yoco.com/r/78RkZE";

const industries = [
  { icon: Wrench,     industry: "Plumbing",       demo: "Flux Plumbing", href: "/plumbing",     accent: "#E8481E" },
  { icon: HardHat,    industry: "Construction",   demo: "Ironclad",      href: "/construction", accent: "#FF5722" },
  { icon: Flower2,    industry: "Spa & Wellness", demo: "Maison Sérène", href: "/spa",          accent: "#C9A96E" },
  { icon: Calculator, industry: "Accounting",     demo: "Meridian",      href: "/accountant",   accent: "#00FF88" },
  { icon: Sparkles,   industry: "Cosmetics",      demo: "Velour",        href: "/cosmetics",    accent: "#E0526F" },
  { icon: Gem,        industry: "Beauty & Salon", demo: "Lumière",       href: "/beauty",       accent: "#D4A553" },
];

const plans = [
  {
    name: "Quick Fix",
    price: "R500",
    desc: "Need a small change or fix on your existing site? I've got you.",
    features: [
      "Single page update",
      "Bug fixing",
      "Copy / image changes",
      "Performance tweak",
      "1 round of revisions",
      "24–48hr turnaround",
    ],
    payUrl: "https://pay.yoco.com/r/2YV6j5",
    accent: "#38bdf8",
    popular: false,
  },
  {
    name: "Starter Site",
    price: "R3,500",
    desc: "Your business online, done right.",
    features: [
      "Clean, professional website built from scratch",
      "Mobile-friendly and fast-loading",
      "Contact form included",
      "WhatsApp & call button",
      "Basic SEO setup",
      "Live within 5 days",
      "1 round of revisions",
      "Free concept before you pay anything",
    ],
    payUrl: "https://pay.yoco.com/r/78RkZE",
    accent: "#6c63ff",
    popular: false,
  },
  {
    name: "Premium Site",
    price: "R6,500",
    desc: "A website that turns heads and wins customers.",
    features: [
      "Everything in Starter plus:",
      "Smooth scroll animations throughout",
      "Interactive hover effects and transitions",
      "Multi-page site (Home, Work, Contact)",
      "Advanced custom layout and design",
      "Live within 7–10 days",
      "2 rounds of revisions",
      "Free concept before you pay anything",
    ],
    payUrl: "https://pay.yoco.com/r/mO1JaL",
    accent: "#a78bfa",
    popular: true,
  },
];

export default function Pricing() {
  return (
    <section className="py-18 px-6" style={{ background: "var(--surface)" }}>
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center mb-20">
            <span
              className="text-xs font-semibold uppercase tracking-widest mb-6 block"
              style={{ color: "var(--accent2)" }}
            >
              Pricing
            </span>
            <h2
              className="text-[clamp(2rem,4.5vw,4rem)] font-bold leading-tight tracking-tight mb-4"
              style={{ fontFamily: "var(--font-space)" }}
            >
              Transparent.{" "}
              <span className="gradient-text">Affordable.</span>
            </h2>
            <p className="text-base max-w-md mx-auto" style={{ color: "var(--muted)" }}>
              No hidden fees. No vague quotes. See a live site for your
              industry, pick a package, and pay instantly via Yoco.
            </p>
          </div>
        </FadeIn>

        {/* ── Pick your industry ─────────────────────────────────────── */}
        <FadeIn>
          <div className="text-center mb-10">
            <h3
              className="text-2xl font-bold tracking-tight mb-2 text-white"
              style={{ fontFamily: "var(--font-space)" }}
            >
              Pick your industry
            </h3>
            <p className="text-sm max-w-md mx-auto" style={{ color: "var(--muted)" }}>
              Every site starts from a live demo you can try right now. Yours
              gets your logo, colours, photos and words — live in 5 days.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-20">
          {industries.map((item, i) => (
            <FadeIn key={item.industry} delay={i * 0.08} className="w-full">
              <motion.div
                className="relative rounded-2xl p-6 flex flex-col gap-4 h-full"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid var(--border)",
                }}
                whileHover={{
                  scale: 1.03,
                  borderColor: `${item.accent}66`,
                  boxShadow: `0 0 32px ${item.accent}14`,
                }}
                transition={{ duration: 0.25 }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${item.accent}18` }}
                  >
                    <item.icon size={19} strokeWidth={2} style={{ color: item.accent }} />
                  </span>
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-white truncate" style={{ fontFamily: "var(--font-space)" }}>
                      {item.industry}
                    </div>
                    <div className="text-xs truncate" style={{ color: "var(--muted)" }}>
                      {item.demo}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 mt-auto">
                  <Link
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-center text-xs font-semibold py-2.5 rounded-xl transition-all duration-300 hover:brightness-125"
                    style={{
                      background: `${item.accent}12`,
                      border: `1px solid ${item.accent}40`,
                      color: item.accent,
                    }}
                  >
                    See live demo →
                  </Link>
                  <Link
                    href={STARTER_PAY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-center text-xs font-medium py-2 rounded-xl transition-colors hover:text-white"
                    style={{ color: "var(--muted)" }}
                  >
                    Start with this — R3,500
                  </Link>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <FadeIn key={plan.name} delay={i * 0.18} className="w-full">
              <motion.div
                className="relative rounded-3xl p-10 flex flex-col h-full"
                style={{
                  background: plan.popular
                    ? "linear-gradient(145deg, rgba(108,99,255,0.12), rgba(139,92,246,0.06))"
                    : "rgba(255,255,255,0.02)",
                  border: plan.popular
                    ? "1px solid rgba(108,99,255,0.4)"
                    : "1px solid var(--border)",
                  boxShadow: plan.popular ? "0 0 60px rgba(108,99,255,0.1)" : "none",
                }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {plan.popular && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full text-white"
                    style={{ background: "linear-gradient(135deg, #6c63ff, #8b5cf6)" }}
                  >
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <h3
                    className="text-xl font-bold mb-1 text-white"
                    style={{ fontFamily: "var(--font-space)" }}
                  >
                    {plan.name}
                  </h3>
                  <p className="text-sm" style={{ color: "var(--muted)" }}>
                    {plan.desc}
                  </p>
                </div>

                <div className="mb-8">
                  <div
                    className="text-5xl font-bold tracking-tight"
                    style={{ fontFamily: "var(--font-space)", color: plan.accent }}
                  >
                    {plan.price}
                  </div>
                  <div className="text-xs mt-1" style={{ color: "var(--muted)" }}>
                    Once-off payment
                  </div>
                </div>

                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {plan.features.map((feature) =>
                    feature === "Everything in Starter plus:" ? (
                      <li key={feature} className="flex items-center gap-2 pt-1">
                        <div className="flex-1 h-px" style={{ background: `${plan.accent}30` }} />
                        <span className="text-xs uppercase tracking-widest flex-shrink-0" style={{ color: plan.accent, opacity: 0.7 }}>
                          + plus
                        </span>
                        <div className="flex-1 h-px" style={{ background: `${plan.accent}30` }} />
                      </li>
                    ) : (
                      <li key={feature} className="flex items-center gap-3 text-sm">
                        <span
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ background: `${plan.accent}20` }}
                        >
                          <Check size={11} strokeWidth={2.5} style={{ color: plan.accent }} />
                        </span>
                        <span style={{ color: "var(--text)" }}>{feature}</span>
                      </li>
                    )
                  )}
                </ul>

                <Link
                  href={plan.payUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center font-semibold py-4 rounded-2xl text-sm transition-all duration-300 hover:scale-105 inline-block"
                  style={
                    plan.popular
                      ? {
                          background: "linear-gradient(135deg, #a78bfa, #6c63ff)",
                          color: "#fff",
                          boxShadow: "0 0 30px rgba(167,139,250,0.35)",
                        }
                      : plan.name === "Starter Site"
                      ? {
                          background: "rgba(108,99,255,0.1)",
                          border: "1px solid rgba(108,99,255,0.3)",
                          color: plan.accent,
                        }
                      : {
                          background: "rgba(56,189,248,0.1)",
                          border: "1px solid rgba(56,189,248,0.3)",
                          color: plan.accent,
                        }
                  }
                >
                  Pay & Get Started →
                </Link>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <p className="text-center text-sm mt-8" style={{ color: "var(--muted)" }}>
            Prefer to chat first?{" "}
            <Link
              href="/contact"
              className="underline transition-colors hover:text-white"
              style={{ color: "var(--accent2)" }}
            >
              Send a message
            </Link>{" "}
            or WhatsApp{" "}
            <a
              href="https://wa.me/27731275190"
              target="_blank"
              rel="noopener noreferrer"
              className="underline transition-colors hover:text-white"
              style={{ color: "var(--accent2)" }}
            >
              073 127 5190
            </a>
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
