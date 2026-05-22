"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import FadeIn from "./FadeIn";
import { Check } from "lucide-react";

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
    name: "Full Build",
    price: "R3,500",
    desc: "A complete custom website built from scratch — your digital storefront, perfected.",
    features: [
      "Custom multi-page design",
      "Mobile responsive",
      "Contact / booking form",
      "Google Analytics setup",
      "SEO optimised",
      "Fast hosting setup",
      "Unlimited revisions",
      "1 year support",
    ],
    payUrl: "https://pay.yoco.com/r/4gv1Ng",
    accent: "#6c63ff",
    popular: true,
  },
];

export default function Pricing() {
  return (
    <section className="py-18 px-6" style={{ background: "var(--surface)" }}>
      <div className="max-w-4xl mx-auto">
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
              No hidden fees. No vague quotes. Just two clear packages and a
              Yoco payment link so you can get started instantly.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 gap-8 max-w-4xl mx-auto">
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
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm">
                      <span
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: `${plan.accent}20` }}
                      >
                        <Check size={11} strokeWidth={2.5} style={{ color: plan.accent }} />
                      </span>
                      <span style={{ color: "var(--text)" }}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.payUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center font-semibold py-4 rounded-2xl text-sm transition-all duration-300 hover:scale-105 inline-block"
                  style={
                    plan.popular
                      ? {
                          background: "linear-gradient(135deg, #6c63ff, #8b5cf6)",
                          color: "#fff",
                          boxShadow: "0 0 30px rgba(108,99,255,0.3)",
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
