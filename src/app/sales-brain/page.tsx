import type { Metadata } from "next";
import Link from "next/link";
import PageTheme from "@/components/PageTheme";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import ElasticCard from "@/components/motion/ElasticCard";
import SalesBrainField from "@/components/SalesBrainField";
import SalesBrainMock from "@/components/SalesBrainMock";

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

export default function SalesBrainPage() {
  return (
    <>
      <PageTheme name="sales-brain" />

      <PageHero
        eyebrow="Sales Brain"
        status="In development"
        title="A room full of managers that never stops prospecting."
        lede="Four managers, each running its own agents. One finds the leads, one throws out the dead ones, one writes the message, one chases the reply. You approve what goes out — nothing sends on its own."
        primary={{ label: "Join the waitlist", href: "/contact" }}
      />

      {/* The exploded stack replaces the step row that used to sit here — both
          described the same four managers, and saying it twice on one page
          just makes the page longer. */}
      <SalesBrainField />

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

      {/* Proof it runs, placed after the honest status rather than before it —
          the claim comes first, the evidence backs it up. */}
      <section className="px-6 pb-16 md:pb-24">
        <FadeIn lift>
          <SalesBrainMock />
        </FadeIn>
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
                style={{ color: "var(--bg)", opacity: 0.66 }}
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
