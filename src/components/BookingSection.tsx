"use client";

import Link from "next/link";
import FadeIn from "./FadeIn";
import CountUp from "./motion/CountUp";

/* Homepage summary of BookDirect. Deliberately a condensed version rather
   than a copy of /bookdirect — four features instead of six, no pricing table
   — so the full page still has something to show when they click through. */
const highlights = [
  {
    title: "Guests pay you directly",
    body: "Payfast runs the card against your own merchant account. The money never passes through us.",
  },
  {
    title: "Two-way calendar sync",
    body: "Booking.com and Airbnb calendars read hourly and published back out, so a room sold anywhere closes everywhere.",
  },
  {
    title: "It cannot double-book",
    body: "Every hold is taken under a lock on that unit. Two guests clicking at once can't both get it.",
  },
  {
    title: "Works with any site",
    body: "Drop the widget into the site you have, or take a hosted booking page if yours can't do bookings.",
  },
];

export default function BookingSection() {
  return (
    <section
      id="booking"
      className="px-6 py-16 md:py-24 scroll-mt-20"
      style={{ background: "var(--surface)" }}
    >
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <div className="max-w-2xl mb-14">
            <div className="eyebrow mb-5">BookDirect · live now</div>
            <h2
              className="display text-[clamp(1.9rem,3.6vw,2.9rem)] mb-4"
              style={{ color: "var(--text)" }}
            >
              The booking sites take 15&ndash;18%. This takes none.
            </h2>
            <p className="lede">
              On an R1,800 room the agent&apos;s cut is about R300 a night —
              every night, forever. BookDirect puts the same booking on your own
              site, at your own rate.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6 mb-16 text-center sm:text-left">
            {[
              { value: 300, prefix: "R", label: "commission on one night, at 17%" },
              { value: 9000, prefix: "R", label: "a month, across thirty of them" },
              { value: 2, prefix: "", label: "nights a month covers the fee" },
            ].map((s) => (
              <div key={s.label}>
                <CountUp
                  value={s.value}
                  prefix={s.prefix}
                  className="display text-[clamp(2rem,4vw,2.9rem)]"
                  style={{ color: "var(--text)" }}
                />
                <p
                  className="text-[14px] leading-[1.6] mt-2"
                  style={{ color: "var(--muted)" }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10 mb-12">
          {highlights.map((h, i) => (
            <FadeIn key={h.title} delay={(i % 2) * 0.08}>
              <div>
                <div className="w-7 h-px mb-5" style={{ background: "var(--accent)" }} />
                <h3
                  className="text-[17px] font-semibold mb-2.5 tracking-[-0.01em]"
                  style={{ color: "var(--text)" }}
                >
                  {h.title}
                </h3>
                <p className="text-[15px] leading-[1.75]" style={{ color: "var(--muted)" }}>
                  {h.body}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2}>
          <Link
            href="/bookdirect"
            className="group inline-flex items-center gap-1 text-[15px] font-medium transition-opacity hover:opacity-70"
            style={{ color: "var(--accent)" }}
          >
            Everything BookDirect does
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
