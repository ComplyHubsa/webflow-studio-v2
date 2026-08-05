"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import FadeIn from "./FadeIn";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Quick Fix",
    price: "R500",
    desc: "Something on your existing site is broken or out of date.",
    features: [
      "Single page update",
      "Bug fixing",
      "Copy or image changes",
      "Performance tweak",
      "1 round of revisions",
      "24–48hr turnaround",
    ],
    payUrl: "https://pay.yoco.com/r/2YV6j5",
    popular: false,
  },
  {
    name: "Starter Site",
    price: "R3,500",
    desc: "One clean page that gets you online and taking calls.",
    features: [
      "Single-page site, built from scratch",
      "Mobile-friendly and fast-loading",
      "Contact form included",
      "WhatsApp and call buttons",
      "Basic SEO setup",
      "Live within 5 days",
      "1 round of revisions",
      "Free concept before you pay anything",
    ],
    payUrl: "https://pay.yoco.com/r/78RkZE",
    popular: false,
  },
  {
    name: "Premium Site",
    price: "R6,500",
    desc: "The full build — the same standard as the demo sites above.",
    features: [
      "Everything in Starter plus:",
      "Up to four pages",
      "Scroll animations and hover states",
      "Custom layout designed around your content",
      "Photo and gallery sections",
      "Live within 7–10 days",
      "2 rounds of revisions",
    ],
    payUrl: "https://pay.yoco.com/r/mO1JaL",
    popular: true,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-18 px-6 scroll-mt-24" style={{ background: "var(--surface)" }}>
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="mb-16 max-w-2xl">
            <span
              className="text-xs font-medium uppercase tracking-[0.2em] mb-5 block"
              style={{ color: "var(--accent)" }}
            >
              Pricing
            </span>
            <h2
              className="text-[clamp(2rem,4vw,3.4rem)] font-bold leading-[1.08] tracking-[-0.02em] mb-5"
              style={{ fontFamily: "var(--font-space)" }}
            >
              What it costs, in full.
            </h2>
            <p className="text-base leading-[1.8]" style={{ color: "var(--muted)" }}>
              Once-off prices, paid through Yoco. Hosting is free to start and
              your domain stays in your name. If a job needs more than this, I
              tell you before I start it — not after.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto items-start">
          {plans.map((plan, i) => (
            <FadeIn key={plan.name} delay={i * 0.14} className="w-full">
              <motion.div
                className="relative rounded-xl p-9 flex flex-col h-full"
                style={{
                  background: plan.popular ? "rgba(201,169,97,0.05)" : "rgba(255,255,255,0.02)",
                  border: plan.popular
                    ? "1px solid rgba(201,169,97,0.42)"
                    : "1px solid var(--border)",
                }}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.25 }}
              >
                {plan.popular && (
                  <div
                    className="absolute -top-2.5 left-9 text-[10px] font-semibold uppercase tracking-[0.18em] px-3 py-1 rounded-full"
                    style={{ background: "var(--accent)", color: "var(--ink)" }}
                  >
                    Most chosen
                  </div>
                )}

                <div className="mb-7">
                  <h3
                    className="text-lg font-semibold mb-1.5"
                    style={{ fontFamily: "var(--font-space)", color: "var(--text)" }}
                  >
                    {plan.name}
                  </h3>
                  <p className="text-sm leading-[1.65]" style={{ color: "var(--muted)" }}>
                    {plan.desc}
                  </p>
                </div>

                <div className="mb-8">
                  <div
                    className="text-4xl font-bold tracking-[-0.02em]"
                    style={{ fontFamily: "var(--font-space)", color: "var(--text)" }}
                  >
                    {plan.price}
                  </div>
                  <div className="text-xs mt-1.5" style={{ color: "var(--muted)" }}>
                    once-off
                  </div>
                </div>

                <ul className="flex flex-col gap-3 mb-9 flex-1">
                  {plan.features.map((feature) =>
                    feature === "Everything in Starter plus:" ? (
                      <li
                        key={feature}
                        className="text-xs uppercase tracking-[0.15em] pb-1"
                        style={{ color: "var(--muted)" }}
                      >
                        Everything in Starter, plus
                      </li>
                    ) : (
                      <li key={feature} className="flex items-start gap-3 text-sm">
                        <Check
                          size={14}
                          strokeWidth={2.5}
                          className="flex-shrink-0 mt-1"
                          style={{ color: "var(--accent)" }}
                        />
                        <span className="leading-[1.6]" style={{ color: "var(--text)" }}>
                          {feature}
                        </span>
                      </li>
                    )
                  )}
                </ul>

                <Link
                  href={plan.payUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center font-semibold py-3.5 rounded-full text-sm transition-opacity duration-300 hover:opacity-85 inline-block"
                  style={
                    plan.popular
                      ? { background: "var(--text)", color: "var(--ink)" }
                      : { border: "1px solid var(--border)", color: "var(--text)" }
                  }
                >
                  Pay and get started
                </Link>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <p className="text-sm mt-9 leading-[1.8]" style={{ color: "var(--muted)" }}>
            Rather talk it through first?{" "}
            <Link
              href="/contact"
              className="border-b pb-0.5 transition-opacity hover:opacity-70"
              style={{ color: "var(--text)", borderColor: "var(--muted)" }}
            >
              Send me the brief
            </Link>{" "}
            or WhatsApp{" "}
            <a
              href="https://wa.me/27731275190"
              target="_blank"
              rel="noopener noreferrer"
              className="border-b pb-0.5 transition-opacity hover:opacity-70"
              style={{ color: "var(--text)", borderColor: "var(--muted)" }}
            >
              073 127 5190
            </a>
            .
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
