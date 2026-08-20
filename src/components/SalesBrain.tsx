"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import FadeIn from "./FadeIn";

/* This one is NOT finished, and the copy says so in three separate places.
   A waitlist that oversells becomes a refund conversation later. */
const managers = [
  {
    no: "01",
    role: "The finder",
    body: "Works through directories and listing sites to pull businesses that match what you sell, with a real contact number attached.",
  },
  {
    no: "02",
    role: "The checker",
    body: "Throws out the ones that are closed, already sorted, or where the number won't reach anyone. Most lists die here, and that's the point.",
  },
  {
    no: "03",
    role: "The writer",
    body: "Looks at each business properly and writes one message about their situation — not a mail-merge with a name dropped into it.",
  },
  {
    no: "04",
    role: "The chaser",
    body: "Tracks who replied, who didn't, and when a follow-up is due — so nothing sits in the pipeline going cold.",
  },
];

export default function SalesBrain() {
  return (
    <section id="salesbrain" className="py-18 px-6 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="mb-14 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span
                className="text-xs font-medium uppercase tracking-[0.2em]"
                style={{ color: "var(--accent)" }}
              >
                Sales Brain
              </span>
              <span
                className="text-[10px] font-semibold uppercase tracking-[0.16em] px-2.5 py-1 rounded-full"
                style={{ border: "1px solid var(--border)", color: "var(--muted)" }}
              >
                In development
              </span>
            </div>
            <h2
              className="text-[clamp(2rem,4vw,3.4rem)] font-bold leading-[1.08] tracking-[-0.02em] mb-6"
              style={{ fontFamily: "var(--font-space)" }}
            >
              A room full of managers that never stops prospecting.
            </h2>
            <p className="text-base leading-[1.85] mb-4" style={{ color: "var(--muted)" }}>
              Four managers, each running its own agents. One finds the leads,
              one throws out the dead ones, one writes the message, one chases
              the reply. You approve what goes out — nothing sends on its own.
            </p>
            <p className="text-base leading-[1.85]" style={{ color: "var(--muted)" }}>
              It&rsquo;s being built out of the system we already run on our own
              outreach, which is why the second manager exists at all: half of
              every lead list is businesses that shut down years ago.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {managers.map((m, i) => (
            <FadeIn key={m.no} delay={i * 0.1}>
              <motion.div
                className="relative p-8 rounded-xl h-full"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid var(--border)",
                }}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.25 }}
              >
                <div
                  className="text-sm font-semibold mb-6 tabular-nums"
                  style={{
                    fontFamily: "var(--font-space)",
                    color: "var(--accent)",
                    letterSpacing: "0.1em",
                  }}
                >
                  {m.no}
                </div>
                <h3
                  className="text-lg font-semibold mb-4"
                  style={{ fontFamily: "var(--font-space)", color: "var(--text)" }}
                >
                  {m.role}
                </h3>
                <p className="text-sm leading-[1.85]" style={{ color: "var(--muted)" }}>
                  {m.body}
                </p>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.34}>
          <div
            className="mt-8 rounded-xl p-8 flex flex-col sm:flex-row sm:items-center gap-5"
            style={{
              background: "rgba(201,169,97,0.05)",
              border: "1px solid rgba(201,169,97,0.42)",
            }}
          >
            <div className="flex-1">
              <h3
                className="text-lg font-semibold mb-2"
                style={{ fontFamily: "var(--font-space)", color: "var(--text)" }}
              >
                Not finished yet — put your name down
              </h3>
              <p className="text-sm leading-[1.8]" style={{ color: "var(--muted)" }}>
                There&rsquo;s no price and no launch date on this yet, and I&rsquo;d
                rather say that than invent one. Tell me what you&rsquo;d want it
                doing and I&rsquo;ll come back to you when it&rsquo;s ready for
                the first few businesses.
              </p>
            </div>
            <Link
              href="/contact"
              className="text-center font-semibold py-3.5 px-7 rounded-full text-sm transition-opacity duration-300 hover:opacity-85 whitespace-nowrap"
              style={{ background: "var(--text)", color: "var(--ink)" }}
            >
              Join the waitlist
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
