"use client";

import Link from "next/link";
import FadeIn from "./FadeIn";
import ScrollSteps, { type Step } from "./motion/ScrollSteps";

/* Homepage summary of Sales Brain. The "in development" badge and the line
   about there being no price stay in even at this length — the status is the
   one thing that must never get trimmed for space. */
const managers: Step[] = [
  { no: "01", title: "The finder",  body: "Pulls businesses that match what you sell, with a real number attached." },
  { no: "02", title: "The checker", body: "Throws out the closed ones and the numbers that won't reach a human." },
  { no: "03", title: "The writer",  body: "Writes one message about their actual situation, not a mail-merge." },
  { no: "04", title: "The chaser",  body: "Tracks who replied and when a follow-up is due, so nothing goes cold." },
];

export default function SalesBrainSection() {
  return (
    <section id="salesbrain" className="px-6 py-16 md:py-24 scroll-mt-20">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <div className="max-w-2xl mb-14">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="eyebrow">Sales Brain</span>
              <span
                className="text-[10px] font-semibold uppercase tracking-[0.14em] px-2.5 py-1 rounded-full"
                style={{ border: "1px solid var(--border-strong)", color: "var(--muted)" }}
              >
                In development
              </span>
            </div>
            <h2
              className="display text-[clamp(1.9rem,3.6vw,2.9rem)] mb-4"
              style={{ color: "var(--text)" }}
            >
              A room full of managers that never stops prospecting.
            </h2>
            <p className="lede">
              Four managers, each running its own agents. You approve what goes
              out — nothing sends on its own. It isn&apos;t finished yet, so
              there&apos;s no price on it and no launch date.
            </p>
          </div>
        </FadeIn>

        <div className="mb-14">
          <ScrollSteps steps={managers} />
        </div>

        <FadeIn delay={0.18}>
          <Link
            href="/sales-brain"
            className="group inline-flex items-center gap-1 text-[15px] font-medium transition-opacity hover:opacity-70"
            style={{ color: "var(--accent)" }}
          >
            Where it actually is, and the waitlist
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              ›
            </span>
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
