"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import FadeIn from "./FadeIn";
import { Check } from "lucide-react";

/* Booking plans are monthly and lead the section — that ordering is the
   software-first repositioning. They deliberately do NOT link to the Yoco
   pay links: those are once-off charges, and pointing a subscription at one
   would take a single payment and imply a recurring one. Recurring goes
   through PayFast once that link exists; until then it starts as a conversation. */
const bookingPlans = [
  {
    name: "Single property",
    price: "R750",
    per: "/mo",
    desc: "One guesthouse taking its own bookings instead of paying an agent.",
    features: [
      "Booking widget on your own site, or a hosted booking page if you don't have one",
      "Card payments through your own Payfast account",
      "Owner dashboard — bookings, calendar and rooms",
      "Rates and availability you change yourself",
      "Setup and onboarding included",
    ],
    popular: false,
  },
  {
    name: "With channel sync",
    price: "R1,500",
    per: "/mo",
    desc: "For places also listed on Booking.com, Airbnb or LekkeSlaap.",
    features: [
      "Everything in Single property plus:",
      "Two-way calendar sync with the OTAs, checked hourly",
      "A room booked anywhere closes everywhere — no double bookings",
      "Your calendar published back out to the channels",
      "Multiple room types and per-night pricing",
    ],
    popular: true,
  },
  {
    name: "Multiple properties",
    price: "R3,500",
    per: "/mo",
    desc: "Several places run from one login, under one owner.",
    features: [
      "Everything in Channel sync plus:",
      "Unlimited properties on one dashboard",
      "Per-property payment accounts and reporting",
      "Priority support straight to me on WhatsApp",
      "Help moving your existing bookings across",
    ],
    popular: false,
  },
];

const sitePlans = [
  {
    name: "Starter Site",
    price: "R3,500",
    desc: "One clean page that gets you online and taking enquiries.",
    payUrl: "https://pay.yoco.com/r/78RkZE",
  },
  {
    name: "Premium Site",
    price: "R6,500",
    desc: "The full build — the same standard as the demo sites above.",
    payUrl: "https://pay.yoco.com/r/mO1JaL",
  },
  {
    name: "Quick Fix",
    price: "R500",
    desc: "Something on your existing site is broken or out of date.",
    payUrl: "https://pay.yoco.com/r/2YV6j5",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-18 px-6 scroll-mt-24" style={{ background: "var(--surface)" }}>
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="mb-14 max-w-2xl">
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
              The booking system is monthly and you can stop it whenever — no
              contract and no setup fee. Websites are once-off. Everything is in
              rand, and if a job needs more than this I tell you before I start
              it, not after.
            </p>
          </div>
        </FadeIn>

        {/* ── Booking system — monthly, leads the section ── */}
        <FadeIn>
          <h3
            className="text-xs font-medium uppercase tracking-[0.2em] mb-6"
            style={{ color: "var(--muted)" }}
          >
            BookDirect — monthly
          </h3>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start mb-16">
          {bookingPlans.map((plan, i) => (
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

                <div className="mb-8 flex items-baseline gap-1">
                  <span
                    className="text-4xl font-bold tracking-[-0.02em]"
                    style={{ fontFamily: "var(--font-space)", color: "var(--text)" }}
                  >
                    {plan.price}
                  </span>
                  <span className="text-sm" style={{ color: "var(--muted)" }}>
                    {plan.per}
                  </span>
                </div>

                <ul className="flex flex-col gap-3 mb-9 flex-1">
                  {plan.features.map((feature) =>
                    feature.startsWith("Everything in") ? (
                      <li
                        key={feature}
                        className="text-xs uppercase tracking-[0.15em] pb-1"
                        style={{ color: "var(--muted)" }}
                      >
                        {feature.replace(" plus:", ", plus")}
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
                  href="/contact"
                  className="w-full text-center font-semibold py-3.5 rounded-full text-sm transition-opacity duration-300 hover:opacity-85 inline-block"
                  style={
                    plan.popular
                      ? { background: "var(--text)", color: "var(--ink)" }
                      : { border: "1px solid var(--border)", color: "var(--text)" }
                  }
                >
                  Get set up
                </Link>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        {/* ── Websites — once-off, secondary ── */}
        <FadeIn>
          <h3
            className="text-xs font-medium uppercase tracking-[0.2em] mb-6"
            style={{ color: "var(--muted)" }}
          >
            Websites — once-off
          </h3>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
          {sitePlans.map((plan, i) => (
            <FadeIn key={plan.name} delay={i * 0.1} className="w-full">
              <motion.div
                className="rounded-xl p-7 flex flex-col h-full"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid var(--border)",
                }}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.25 }}
              >
                <div className="flex items-baseline justify-between mb-3">
                  <h3
                    className="text-base font-semibold"
                    style={{ fontFamily: "var(--font-space)", color: "var(--text)" }}
                  >
                    {plan.name}
                  </h3>
                  <span
                    className="text-2xl font-bold tracking-[-0.02em]"
                    style={{ fontFamily: "var(--font-space)", color: "var(--text)" }}
                  >
                    {plan.price}
                  </span>
                </div>
                <p className="text-sm leading-[1.7] mb-7 flex-1" style={{ color: "var(--muted)" }}>
                  {plan.desc}
                </p>
                <Link
                  href={plan.payUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center font-semibold py-3 rounded-full text-sm transition-opacity duration-300 hover:opacity-85 inline-block"
                  style={{ border: "1px solid var(--border)", color: "var(--text)" }}
                >
                  Pay and get started
                </Link>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <div
            className="mt-5 rounded-xl p-6 flex flex-col sm:flex-row sm:items-center gap-4"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid var(--border)",
            }}
          >
            <div className="flex-1">
              <h3
                className="text-base font-semibold mb-1"
                style={{ fontFamily: "var(--font-space)", color: "var(--text)" }}
              >
                After a site is live — Care Plan, R450/mo
              </h3>
              <p className="text-sm leading-[1.65]" style={{ color: "var(--muted)" }}>
                Hosting, domain and SSL handled, monthly backups, uptime
                monitoring, and WhatsApp support straight to me. Optional —
                you can host it yourself instead.
              </p>
            </div>
            <Link
              href="/care"
              className="text-center font-semibold py-3 px-6 rounded-full text-sm transition-opacity duration-300 hover:opacity-85 whitespace-nowrap"
              style={{ border: "1px solid var(--border)", color: "var(--text)" }}
            >
              See what&rsquo;s covered
            </Link>
          </div>

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
