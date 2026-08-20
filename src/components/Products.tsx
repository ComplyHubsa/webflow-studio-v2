"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import FadeIn from "./FadeIn";

/* Software first, websites last — that ordering is the repositioning.
   Status is stated on each card because Sales Brain is not finished, and a
   product page that hides that gets found out on the first sales call. */
const products = [
  {
    name: "BookDirect",
    status: "Live",
    live: true,
    tagline: "Direct booking system",
    body: "Guests pick their dates, see what's actually free and pay by card — on your own site. The money lands in your account, not an agent's.",
    price: "From R750/mo",
    href: "#booking",
    cta: "How it works",
    accent: "#0F766E",
  },
  {
    name: "Sales Brain",
    status: "In development",
    live: false,
    tagline: "Automated outreach",
    body: "Manager agents that find the leads, verify them, write the message and keep the follow-ups moving — so the pipeline runs while you're working.",
    price: "Waitlist open",
    href: "#salesbrain",
    cta: "Join the waitlist",
    accent: "#8C7851",
  },
  {
    name: "Websites",
    status: "Live",
    live: true,
    tagline: "Custom builds",
    body: "Hand-built sites for South African businesses. No templates and no retainer — and you see the design before you pay anything.",
    price: "From R3,500 once-off",
    href: "#demos",
    cta: "See six live demos",
    accent: "#92400E",
  },
];

export default function Products() {
  return (
    <section id="products" className="py-18 px-6 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="mb-14 max-w-2xl">
            <span
              className="text-xs font-medium uppercase tracking-[0.2em] mb-5 block"
              style={{ color: "var(--accent)" }}
            >
              What we build
            </span>
            <h2
              className="text-[clamp(2rem,4vw,3.4rem)] font-bold leading-[1.08] tracking-[-0.02em] mb-5"
              style={{ fontFamily: "var(--font-space)" }}
            >
              Three products. Two of them are running.
            </h2>
            <p className="text-base leading-[1.8]" style={{ color: "var(--muted)" }}>
              The booking system and the websites are live and being used. The
              Sales Brain is still being built — it&apos;s listed here so you can
              put your name down, not so you can buy it today.
            </p>
          </div>
        </FadeIn>

        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-px"
          style={{ background: "var(--border)" }}
        >
          {products.map((p, i) => (
            <FadeIn key={p.name} delay={i * 0.09} className="w-full">
              <motion.div
                className="flex flex-col h-full p-8"
                style={{ background: "var(--bg)" }}
                whileHover={{ backgroundColor: "rgba(255,255,255,0.025)" }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between mb-7">
                  <span
                    className="w-6 h-1 rounded-full"
                    style={{ background: p.accent }}
                  />
                  <span
                    className="text-[10px] font-semibold uppercase tracking-[0.16em] px-2.5 py-1 rounded-full"
                    style={
                      p.live
                        ? { background: "rgba(201,169,97,0.14)", color: "var(--accent)" }
                        : { border: "1px solid var(--border)", color: "var(--muted)" }
                    }
                  >
                    {p.status}
                  </span>
                </div>

                <div
                  className="text-2xl font-bold mb-1.5"
                  style={{ fontFamily: "var(--font-space)", color: "var(--text)" }}
                >
                  {p.name}
                </div>
                <div className="text-sm mb-5" style={{ color: "var(--muted)" }}>
                  {p.tagline}
                </div>

                <p
                  className="text-sm leading-[1.8] mb-7 flex-1"
                  style={{ color: "var(--muted)" }}
                >
                  {p.body}
                </p>

                <div
                  className="text-sm font-semibold mb-5"
                  style={{ fontFamily: "var(--font-space)", color: "var(--text)" }}
                >
                  {p.price}
                </div>

                <Link
                  href={p.href}
                  className="text-sm font-medium inline-flex items-center gap-1.5 transition-opacity hover:opacity-70"
                  style={{ color: p.accent }}
                >
                  {p.cta}
                  <span aria-hidden="true">→</span>
                </Link>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
