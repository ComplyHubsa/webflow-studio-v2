"use client";

import { motion } from "framer-motion";
import FadeIn from "./FadeIn";

/* Deliberately no "sites delivered" or "satisfaction" numbers — nobody can
   verify those, and unverifiable claims make the real ones look invented.
   Every card below is something a client can hold me to. */
const promises = [
  {
    title: "Your money, direct",
    body: "Card payments run through your own Payfast account. We never hold a cent of your takings.",
  },
  {
    title: "No lock-in",
    body: "The booking system is month to month. Stop it whenever — your data comes with you.",
  },
  {
    title: "One person",
    body: "I build it myself. You deal with me on WhatsApp, not an account manager.",
  },
  {
    title: "You see it first",
    body: "For websites, a real design for your business before any money changes hands.",
  },
];

export default function About() {
  return (
    <section className="py-18 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          <FadeIn direction="left">
            <div>
              <span
                className="text-xs font-medium uppercase tracking-[0.2em] mb-6 block"
                style={{ color: "var(--accent)" }}
              >
                Who you&apos;re dealing with
              </span>
              <h2
                className="text-[clamp(2.2rem,4.5vw,3.6rem)] font-bold leading-[1.08] tracking-[-0.02em] mb-8"
                style={{ fontFamily: "var(--font-space)" }}
              >
                A one-man studio, and that&apos;s the point.
              </h2>
              <p
                className="text-base md:text-lg leading-[1.9] mb-5"
                style={{ color: "var(--muted)" }}
              >
                I&apos;m Aidan, and I build software in South Africa. This
                started as website work, and turned into software the day I
                worked out what the booking sites were quietly taking off
                guesthouses every single night.
              </p>
              <p
                className="text-base md:text-lg leading-[1.9]"
                style={{ color: "var(--muted)" }}
              >
                So now I build the things underneath the website too — the
                booking engine, the payment flow, the calendar sync. Small
                enough that you get me on WhatsApp, and that what you ask for on
                Monday is in by Friday.
              </p>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.15}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {promises.map((card) => (
                <motion.div
                  key={card.title}
                  className="rounded-xl p-6 flex flex-col gap-2.5"
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid var(--border)",
                  }}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.25 }}
                >
                  <div
                    className="text-lg font-semibold"
                    style={{ fontFamily: "var(--font-space)", color: "var(--text)" }}
                  >
                    {card.title}
                  </div>
                  <div className="text-sm leading-[1.7]" style={{ color: "var(--muted)" }}>
                    {card.body}
                  </div>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
