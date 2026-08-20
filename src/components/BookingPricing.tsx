"use client";

import Link from "next/link";
import FadeIn from "./FadeIn";
import { Check } from "lucide-react";

/* Deliberately not wired to the Yoco links: those charge once. Pointing a
   monthly plan at a once-off link would take a single payment while implying a
   subscription. Recurring waits for a PayFast link; until then it starts as a
   conversation. */
const plans = [
  {
    name: "Single property",
    price: "R750",
    desc: "One guesthouse, taking its own bookings.",
    features: [
      "Booking widget on your site, or a hosted booking page",
      "Card payments into your own Payfast account",
      "Owner dashboard — bookings, calendar, rooms",
      "Rates and availability you change yourself",
      "Setup and onboarding included",
    ],
    popular: false,
  },
  {
    name: "With channel sync",
    price: "R1,500",
    desc: "Also listed on Booking.com, Airbnb or LekkeSlaap.",
    features: [
      "Everything in Single property",
      "Two-way calendar sync, checked hourly",
      "A room sold anywhere closes everywhere",
      "Your calendar published back to the channels",
      "Multiple room types and per-night pricing",
    ],
    popular: true,
  },
  {
    name: "Multiple properties",
    price: "R3,500",
    desc: "Several places, one login, one owner.",
    features: [
      "Everything in Channel sync",
      "Unlimited properties on one dashboard",
      "Per-property payment accounts and reporting",
      "Priority support straight to me on WhatsApp",
      "Help moving your existing bookings across",
    ],
    popular: false,
  },
];

export default function BookingPricing() {
  return (
    <section id="pricing" className="px-6 py-16 md:py-24 scroll-mt-20">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <div className="mb-14 max-w-2xl">
            <h2
              className="display text-[clamp(1.9rem,3.6vw,2.9rem)] mb-4"
              style={{ color: "var(--text)" }}
            >
              Monthly. Cancel whenever.
            </h2>
            <p className="lede">
              No setup fee and no contract. If it isn&apos;t paying for itself
              inside the first month, stop it.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
          {plans.map((plan, i) => (
            <FadeIn key={plan.name} delay={i * 0.1} className="w-full">
              <div
                className="relative rounded-[18px] p-8 flex flex-col h-full"
                style={{
                  background: plan.popular ? "var(--text)" : "var(--bg)",
                  border: plan.popular
                    ? "1px solid var(--text)"
                    : "1px solid var(--border)",
                }}
              >
                {plan.popular && (
                  <div
                    className="text-[10px] font-semibold uppercase tracking-[0.16em] mb-5"
                    style={{ color: "var(--accent2)" }}
                  >
                    Most chosen
                  </div>
                )}

                <h3
                  className="text-[17px] font-semibold mb-1.5 tracking-[-0.01em]"
                  style={{ color: plan.popular ? "var(--bg)" : "var(--text)" }}
                >
                  {plan.name}
                </h3>
                <p
                  className="text-[14px] leading-[1.6] mb-7"
                  style={{ color: plan.popular ? "rgba(255,255,255,0.62)" : "var(--muted)" }}
                >
                  {plan.desc}
                </p>

                <div className="mb-8 flex items-baseline gap-1">
                  <span
                    className="display text-[2.5rem]"
                    style={{ color: plan.popular ? "var(--bg)" : "var(--text)" }}
                  >
                    {plan.price}
                  </span>
                  <span
                    className="text-[14px]"
                    style={{ color: plan.popular ? "rgba(255,255,255,0.62)" : "var(--muted)" }}
                  >
                    /mo
                  </span>
                </div>

                <ul className="flex flex-col gap-3 mb-9 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[14px]">
                      <Check
                        size={14}
                        strokeWidth={2.5}
                        className="flex-shrink-0 mt-1"
                        style={{ color: plan.popular ? "var(--accent2)" : "var(--accent)" }}
                      />
                      <span
                        className="leading-[1.6]"
                        style={{ color: plan.popular ? "rgba(255,255,255,0.86)" : "var(--text)" }}
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className="w-full text-center font-medium py-3 rounded-full text-[14px] transition-opacity duration-300 hover:opacity-85 inline-block"
                  style={
                    plan.popular
                      ? { background: "var(--bg)", color: "var(--text)" }
                      : { border: "1px solid var(--border-strong)", color: "var(--text)" }
                  }
                >
                  Get set up
                </Link>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
