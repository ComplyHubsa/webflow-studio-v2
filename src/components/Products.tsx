"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import FadeIn from "./FadeIn";

/* Status sits on every card because Sales Brain is not finished. A product
   grid that hides that gets found out on the first sales call. */
const products = [
  {
    name: "BookDirect",
    status: "Live",
    live: true,
    tagline: "Direct booking system",
    body: "Guests pick their dates, see what's free and pay by card — on your own site. The money lands in your account, not an agent's.",
    price: "From R750/mo",
    href: "/bookdirect",
    cta: "Explore BookDirect",
    dark: true,
  },
  {
    name: "Sales Brain",
    status: "In development",
    live: false,
    tagline: "Automated outreach",
    body: "Manager agents that find the leads, throw out the dead ones, write the message and keep the follow-ups moving.",
    price: "Waitlist open",
    href: "/sales-brain",
    cta: "Join the waitlist",
    dark: false,
  },
  {
    name: "Websites",
    status: "Live",
    live: true,
    tagline: "Custom builds",
    body: "Hand-built sites for South African businesses. No templates, no retainer — and you see the design before you pay.",
    price: "From R3,500",
    href: "/websites",
    cta: "See the websites",
    dark: false,
  },
];

export default function Products() {
  return (
    <section id="products" className="px-6 py-16 md:py-24 scroll-mt-20">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <div className="mb-14 max-w-2xl">
            <h2
              className="display text-[clamp(1.9rem,3.6vw,2.9rem)] mb-4"
              style={{ color: "var(--text)" }}
            >
              Three products. Two of them are running.
            </h2>
            <p className="lede">
              The booking system and the websites are live and in use. The Sales
              Brain is still being built — it&apos;s here so you can put your
              name down, not so you can buy it today.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {products.map((p, i) => (
            <FadeIn key={p.name} delay={i * 0.09} className="w-full">
              <Link href={p.href} className="block h-full group">
                <motion.div
                  className="rounded-[18px] p-8 flex flex-col h-full"
                  style={{
                    background: p.dark ? "var(--text)" : "var(--surface)",
                    border: p.dark ? "1px solid var(--text)" : "1px solid transparent",
                  }}
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 340, damping: 26 }}
                >
                  <div className="flex items-center justify-between mb-8">
                    <span
                      className="text-[10px] font-semibold uppercase tracking-[0.16em]"
                      style={{
                        color: p.dark
                          ? "var(--accent2)"
                          : p.live
                          ? "var(--accent)"
                          : "var(--muted)",
                      }}
                    >
                      {p.status}
                    </span>
                  </div>

                  <div
                    className="display text-[1.75rem] mb-1.5"
                    style={{ color: p.dark ? "var(--bg)" : "var(--text)" }}
                  >
                    {p.name}
                  </div>
                  <div
                    className="text-[14px] mb-6"
                    style={{ color: p.dark ? "rgba(255,255,255,0.62)" : "var(--muted)" }}
                  >
                    {p.tagline}
                  </div>

                  <p
                    className="text-[15px] leading-[1.75] mb-8 flex-1"
                    style={{ color: p.dark ? "rgba(255,255,255,0.82)" : "var(--muted)" }}
                  >
                    {p.body}
                  </p>

                  <div
                    className="text-[14px] font-semibold mb-4"
                    style={{ color: p.dark ? "var(--bg)" : "var(--text)" }}
                  >
                    {p.price}
                  </div>

                  <span
                    className="text-[14px] font-medium inline-flex items-center gap-1 transition-opacity group-hover:opacity-70"
                    style={{ color: p.dark ? "var(--accent2)" : "var(--accent)" }}
                  >
                    {p.cta}
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      ›
                    </span>
                  </span>
                </motion.div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
