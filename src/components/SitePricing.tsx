"use client";

import Link from "next/link";
import FadeIn from "./FadeIn";

/* Website builds are once-off, so these keep their Yoco links — unlike the
   BookDirect tiers, a single charge is exactly what's intended here. */
const plans = [
  {
    name: "Starter",
    price: "R3,500",
    desc: "One clean page that gets you online and taking enquiries.",
    points: ["Single page, built from scratch", "Enquiry form and WhatsApp buttons", "Live within 5 days", "1 round of revisions"],
    payUrl: "https://pay.yoco.com/r/78RkZE",
    popular: false,
  },
  {
    name: "Premium",
    price: "R6,500",
    desc: "The full build — the same standard as the demos above.",
    points: ["Up to four pages", "Custom layout around your content", "Gallery and photo sections", "Live within 7–10 days", "2 rounds of revisions"],
    payUrl: "https://pay.yoco.com/r/mO1JaL",
    popular: true,
  },
  {
    name: "Quick Fix",
    price: "R500",
    desc: "Something on your existing site is broken or out of date.",
    points: ["Single page update", "Bug fixing", "Copy or image changes", "24–48hr turnaround"],
    payUrl: "https://pay.yoco.com/r/2YV6j5",
    popular: false,
  },
];

export default function SitePricing() {
  return (
    <section id="pricing" className="px-6 py-16 md:py-24 scroll-mt-20">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <div className="mb-14 max-w-2xl">
            <h2
              className="display text-[clamp(1.9rem,3.6vw,2.9rem)] mb-4"
              style={{ color: "var(--text)" }}
            >
              Once-off, in rand.
            </h2>
            <p className="lede">
              Your domain stays in your name and I set the hosting up for you.
              If a job needs more than this, I tell you before I start it.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
          {plans.map((plan, i) => (
            <FadeIn key={plan.name} delay={i * 0.1} className="w-full">
              <div
                className="rounded-[18px] p-8 flex flex-col h-full"
                style={{
                  background: plan.popular ? "var(--text)" : "var(--bg)",
                  border: plan.popular ? "1px solid var(--text)" : "1px solid var(--border)",
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
                <div className="mb-8">
                  <span
                    className="display text-[2.5rem]"
                    style={{ color: plan.popular ? "var(--bg)" : "var(--text)" }}
                  >
                    {plan.price}
                  </span>
                </div>
                <ul className="flex flex-col gap-2.5 mb-9 flex-1">
                  {plan.points.map((p) => (
                    <li
                      key={p}
                      className="text-[14px] leading-[1.6]"
                      style={{ color: plan.popular ? "rgba(255,255,255,0.86)" : "var(--muted)" }}
                    >
                      {p}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.payUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center font-medium py-3 rounded-full text-[14px] transition-opacity duration-300 hover:opacity-85 inline-block"
                  style={
                    plan.popular
                      ? { background: "var(--bg)", color: "var(--text)" }
                      : { border: "1px solid var(--border-strong)", color: "var(--text)" }
                  }
                >
                  Pay and get started
                </Link>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.24}>
          <p className="text-[14px] mt-10 leading-[1.75]" style={{ color: "var(--muted)" }}>
            Keeping it running afterwards — hosting, backups, small changes — is
            the{" "}
            <Link
              href="/care"
              className="underline underline-offset-4"
              style={{ color: "var(--text)" }}
            >
              Care Plan at R450/mo
            </Link>
            , and it&rsquo;s optional.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
