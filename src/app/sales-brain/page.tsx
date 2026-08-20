import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import ElasticCard from "@/components/motion/ElasticCard";
import ScrollSteps, { type Step } from "@/components/motion/ScrollSteps";

export const metadata: Metadata = {
  title: "Sales Brain | Automated outreach — in development",
  description:
    "Four manager agents that find leads, throw out the dead ones, write the message and chase the reply. In development — join the waitlist.",
  openGraph: {
    title: "Sales Brain — in development",
    description:
      "Manager agents that run your outreach. Not finished yet — waitlist open.",
    type: "website",
  },
};

const managers: Step[] = [
  {
    no: "01",
    title: "The finder",
    body: "Works through directories and listing sites to pull businesses that match what you sell, with a real contact number attached to each one.",
  },
  {
    no: "02",
    title: "The checker",
    body: "Throws out the ones that have closed, the ones already sorted, and the numbers that won't reach a human. Most of a raw list dies here — that's the point.",
  },
  {
    no: "03",
    title: "The writer",
    body: "Looks at each business properly and writes one message about their actual situation, not a mail-merge with a name dropped into the middle of it.",
  },
  {
    no: "04",
    title: "The chaser",
    body: "Tracks who replied, who didn't and when a follow-up is due, so nothing sits in the pipeline quietly going cold.",
  },
];

export default function SalesBrainPage() {
  return (
    <>
      <PageHero
        eyebrow="Sales Brain"
        status="In development"
        title="A room full of managers that never stops prospecting."
        lede="Four managers, each running its own agents. One finds the leads, one throws out the dead ones, one writes the message, one chases the reply. You approve what goes out — nothing sends on its own."
        primary={{ label: "Join the waitlist", href: "/contact" }}
      />

      <section className="px-6 py-16 md:py-24" style={{ background: "var(--surface)" }}>
        <div className="max-w-5xl mx-auto">
          <ScrollSteps steps={managers} />
        </div>
      </section>

      {/* The honest bit. Stated plainly rather than buried in small print. */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <h2
              className="display text-[clamp(1.9rem,3.6vw,2.9rem)] mb-6"
              style={{ color: "var(--text)" }}
            >
              Where it actually is.
            </h2>
            <p className="lede mb-5">
              It isn&apos;t finished. There is no price on this page and no
              launch date, because I&apos;d rather tell you that than invent one
              and miss it.
            </p>
            <p className="lede mb-5">
              What exists today is the machinery we run on our own outreach —
              the scraping, the verification, the message drafting. It works, and
              it&apos;s why the second manager exists at all: a raw lead list is
              full of businesses that shut down years ago, and sending to them
              burns the number you send from.
            </p>
            <p className="lede">
              What&apos;s left is turning that into something another business
              can point at their own market and run without me.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="px-6 pb-20 md:pb-28">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            {/* Same jelly physics as the free-concept block. Slightly softer
                push than the default: this card is a third the size, and the
                default 46px bulge on a small box reads as a wobble rather than
                a stretch. */}
            <ElasticCard
              radius={18}
              className="rounded-[18px]"
              style={{ background: "var(--text)" }}
              fill="var(--text)"
              physics={{ push: 34, influence: 240 }}
            >
            <div className="relative z-10 p-10 md:p-14 text-center">
              <h2
                className="display text-[clamp(1.7rem,3.2vw,2.4rem)] mb-4"
                style={{ color: "var(--bg)" }}
              >
                Put your name down.
              </h2>
              <p
                className="text-[16px] leading-[1.7] max-w-lg mx-auto mb-9"
                style={{ color: "rgba(255,255,255,0.66)" }}
              >
                Tell me what you&apos;d want it doing and who you&apos;d point it
                at. I&apos;ll come back to you when it&apos;s ready for the first
                few businesses.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center font-medium px-7 py-3 rounded-full text-[15px] transition-opacity duration-300 hover:opacity-85"
                style={{ background: "var(--bg)", color: "var(--text)" }}
              >
                Join the waitlist
              </Link>
            </div>
            </ElasticCard>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
