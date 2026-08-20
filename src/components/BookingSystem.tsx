"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import FadeIn from "./FadeIn";
import { Check } from "lucide-react";

/* Every line here maps to something that actually exists in the build —
   Payfast checkout, the two-way iCal sync, the per-unit hold lock, the owner
   dashboard. Nothing aspirational: this product is already taking bookings. */
const features = [
  {
    title: "Guests pay on your site",
    body: "Dates, then what's free, then card payment. Payfast runs the transaction against your own merchant account — the money never sits with us.",
  },
  {
    title: "Two-way calendar sync",
    body: "We pull Booking.com and Airbnb calendars every hour and publish yours back out, so a room booked on one channel closes on all of them.",
  },
  {
    title: "It can't double-book",
    body: "Every hold is taken under a lock on that specific unit. Two guests clicking the same room at the same second can't both get it.",
  },
  {
    title: "An owner dashboard",
    body: "Your bookings, your calendar and your rooms, on your own login. Rates and availability are yours to change without phoning anyone.",
  },
];

export default function BookingSystem() {
  return (
    <section
      id="booking"
      className="py-18 px-6 scroll-mt-24"
      style={{ background: "var(--surface)" }}
    >
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="mb-14 max-w-3xl">
            <span
              className="text-xs font-medium uppercase tracking-[0.2em] mb-5 block"
              style={{ color: "var(--accent)" }}
            >
              BookDirect · live now
            </span>
            <h2
              className="text-[clamp(2rem,4vw,3.4rem)] font-bold leading-[1.08] tracking-[-0.02em] mb-6"
              style={{ fontFamily: "var(--font-space)" }}
            >
              The booking sites take 15&ndash;18%. This takes none.
            </h2>
            <p className="text-base leading-[1.85]" style={{ color: "var(--muted)" }}>
              On a R1,800 room, an agent&rsquo;s commission is roughly R300 a
              night — every night, forever. BookDirect puts the same booking on
              your own site at your own rate. Two nights a month covers what it
              costs to run.
            </p>
          </div>
        </FadeIn>

        {/* The two ways it goes in — the second one is the whole pitch for
            guesthouses whose current site can't take a booking at all. */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          {[
            {
              label: "Already have a site",
              title: "Drop it into the site you've got",
              body: "One line of script and the booking widget appears on your existing pages. Nothing else about your site changes.",
            },
            {
              label: "No site, or it can't take bookings",
              title: "We host the booking page for you",
              body: "You get a proper booking page of your own that works on its own — the link goes in your Google listing, your WhatsApp and your Instagram bio.",
            },
          ].map((card, i) => (
            <FadeIn key={card.title} delay={i * 0.12}>
              <div
                className="rounded-xl p-8 h-full"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid var(--border)",
                }}
              >
                <div
                  className="text-xs font-medium uppercase tracking-[0.18em] mb-4"
                  style={{ color: "var(--accent)" }}
                >
                  {card.label}
                </div>
                <h3
                  className="text-xl font-semibold mb-3"
                  style={{ fontFamily: "var(--font-space)", color: "var(--text)" }}
                >
                  {card.title}
                </h3>
                <p className="text-sm leading-[1.85]" style={{ color: "var(--muted)" }}>
                  {card.body}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ background: "var(--border)" }}>
          {features.map((f, i) => (
            <FadeIn key={f.title} delay={i * 0.07} className="w-full">
              <motion.div
                className="flex flex-col gap-3 h-full p-8"
                style={{ background: "var(--surface)" }}
                whileHover={{ backgroundColor: "rgba(255,255,255,0.025)" }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-start gap-3">
                  <Check
                    size={15}
                    strokeWidth={2.5}
                    className="flex-shrink-0 mt-1"
                    style={{ color: "var(--accent)" }}
                  />
                  <h3
                    className="text-base font-semibold"
                    style={{ fontFamily: "var(--font-space)", color: "var(--text)" }}
                  >
                    {f.title}
                  </h3>
                </div>
                <p className="text-sm leading-[1.85] pl-[27px]" style={{ color: "var(--muted)" }}>
                  {f.body}
                </p>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.28}>
          <div className="mt-8 flex flex-col sm:flex-row gap-3.5">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 font-semibold px-8 py-4 rounded-full text-base transition-opacity duration-300 hover:opacity-85"
              style={{ background: "var(--text)", color: "var(--ink)" }}
            >
              Set it up for my place
              <span aria-hidden="true">→</span>
            </Link>
            <a
              href="https://wa.me/27731275190"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 font-medium px-8 py-4 rounded-full text-base transition-opacity duration-300 hover:opacity-85"
              style={{ border: "1px solid var(--border)", color: "var(--text)" }}
            >
              WhatsApp me about it
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
