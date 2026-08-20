"use client";

import Link from "next/link";
import FadeIn from "./FadeIn";
import ElasticCard from "./motion/ElasticCard";

/* The elastic-edge physics used to live in this file. It now sits in
   ElasticCard so the Sales Brain block can run the identical simulation —
   two copies of a spring solver drift apart the moment either is tuned. */
const steps = [
  {
    step: "01",
    title: "I research your business",
    desc: "Your industry, your competitors and the customers you want — before I touch a pixel.",
  },
  {
    step: "02",
    title: "I design a real homepage",
    desc: "Built for your business specifically. Not a template with your logo dropped in.",
  },
  {
    step: "03",
    title: "You decide",
    desc: "Like it? I build it out from R3,500. Don't? Walk away — no charge, no awkward follow-up.",
  },
];

export default function FreeConcept() {
  return (
    <section className="py-18 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <ElasticCard
            radius={24}
            className="rounded-3xl"
            style={{
              background:
                "linear-gradient(160deg, #f2ede3 0%, #e9e2d5 30%, #efe8db 60%, #e6ddcd 100%)",
            }}
            fill="url(#freeConceptBg)"
            defs={
              <linearGradient id="freeConceptBg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#f2ede3" />
                <stop offset="40%" stopColor="#e9e2d5" />
                <stop offset="100%" stopColor="#e6ddcd" />
              </linearGradient>
            }
          >
            {/* Decoration layer — clipped to the rounded rect */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
              <div
                className="absolute inset-0 opacity-[0.05]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(20,18,14,1) 1px, transparent 1px), linear-gradient(90deg, rgba(20,18,14,1) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start p-6 sm:p-10 md:p-14 lg:p-16">
              <div>
                <div
                  className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] px-4 py-2 mb-8"
                  style={{
                    borderTop: "1px solid rgba(20,18,14,0.2)",
                    borderBottom: "1px solid rgba(20,18,14,0.2)",
                    color: "#4a4437",
                  }}
                >
                  Nothing to lose
                </div>

                <h2
                  className="font-bold leading-[1.05] tracking-[-0.02em] mb-6"
                  style={{
                    fontFamily: "var(--font-space)",
                    fontSize: "clamp(2rem, 3.5vw, 3.2rem)",
                    color: "#14120e",
                  }}
                >
                  See the design before you pay for it.
                </h2>

                <p
                  className="text-base leading-[1.85] mb-8"
                  style={{ color: "#4a4437", maxWidth: "44ch" }}
                >
                  I look at your business, your competitors and the customers
                  you&apos;re after, then design a real homepage for you at{" "}
                  <strong style={{ color: "#14120e" }}>no charge</strong>. If it
                  isn&apos;t right, you&apos;ve lost nothing but the five minutes
                  it took to brief me.
                </p>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 font-semibold px-7 py-4 rounded-full text-sm transition-opacity duration-300 hover:opacity-88"
                    style={{ background: "#14120e", color: "#f4f2ee" }}
                  >
                    Send me the brief
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M3 8H13M13 8L9 4M13 8L9 12"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                  <span className="text-sm" style={{ color: "#6b6455" }}>
                    No card, no deposit.
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                {steps.map((item) => (
                  <div
                    key={item.step}
                    className="flex gap-4 items-start p-5 rounded-xl"
                    style={{
                      background: "rgba(20,18,14,0.045)",
                      border: "1px solid rgba(20,18,14,0.1)",
                      transition: "transform 0.2s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "translateX(4px)")
                    }
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
                  >
                    <div
                      className="text-xs font-semibold tabular-nums flex-shrink-0 mt-0.5"
                      style={{ color: "#8a7a4f", letterSpacing: "0.1em" }}
                    >
                      {item.step}
                    </div>
                    <div>
                      <div
                        className="text-sm font-semibold mb-1"
                        style={{ color: "#14120e" }}
                      >
                        {item.title}
                      </div>
                      <div className="text-sm leading-[1.7]" style={{ color: "#5c5648" }}>
                        {item.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ElasticCard>
        </FadeIn>
      </div>
    </section>
  );
}
