"use client";

import { motion } from "framer-motion";
import FadeIn from "./FadeIn";

const stats = [
  { number: "20+", label: "Sites Delivered", icon: "◈" },
  { number: "100%", label: "Client Satisfaction", icon: "◉" },
  { number: "3–5 days", label: "Avg Turnaround", icon: "◎" },
  { number: "ZA", label: "Based in SA", icon: "◇" },
];

export default function About() {
  return (
    <section className="py-18 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          <FadeIn direction="left">
            <div>
              <span
                className="text-xs font-semibold uppercase tracking-widest mb-6 block"
                style={{ color: "var(--accent2)" }}
              >
                About
              </span>
              <h2
                className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.05] tracking-tight mb-8"
                style={{ fontFamily: "var(--font-space)" }}
              >
                We Build Sites That{" "}
                <span className="gradient-text">Actually Work</span>
              </h2>
              <p
                className="text-base md:text-lg leading-[1.9] mb-5"
                style={{ color: "var(--muted)" }}
              >
                Hi, I&apos;m Aidan — a South African web designer obsessed with
                building digital experiences that make small businesses look
                world-class. Every pixel is intentional. Every line of code is
                hand-crafted.
              </p>
              <p
                className="text-base md:text-lg leading-[1.9] mb-10"
                style={{ color: "var(--muted)" }}
              >
                I work with local South African businesses who deserve a
                premium online presence without agency price tags. No
                templates. No shortcuts. Just clean, fast, beautiful websites
                built to convert visitors into customers.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Next.js", "React", "Tailwind CSS", "Framer Motion", "SEO"].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium px-4 py-2 rounded-full"
                    style={{
                      background: "rgba(108,99,255,0.1)",
                      border: "1px solid rgba(108,99,255,0.2)",
                      color: "var(--accent2)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.15}>
            <div className="grid grid-cols-2 gap-3 sm:gap-5">
              {stats.map((card) => (
                <motion.div
                  key={card.label}
                  className="glass rounded-2xl p-4 sm:p-7 flex flex-col gap-2 sm:gap-3"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25 }}
                >
                  <span className="text-lg sm:text-xl" style={{ color: "var(--accent2)", opacity: 0.6 }}>
                    {card.icon}
                  </span>
                  <div
                    className="text-2xl sm:text-3xl md:text-4xl font-bold"
                    style={{ fontFamily: "var(--font-space)", color: "var(--text)" }}
                  >
                    {card.number}
                  </div>
                  <div className="text-xs uppercase tracking-widest" style={{ color: "var(--muted)" }}>
                    {card.label}
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
