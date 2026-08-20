import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import BookingPricing from "@/components/BookingPricing";
import BookingMock from "@/components/BookingMock";
import CountUp from "@/components/motion/CountUp";
import Accordion, { type QA } from "@/components/motion/Accordion";

/* Every answer here is something the running build actually does — no
   roadmap dressed up as a current feature. */
const faqs: QA[] = [
  {
    q: "Do I need a website already?",
    a: "No. If you have one, the booking widget drops into it with a single line of script and nothing else about your site changes. If you don't have one — or yours can't take a booking — we host a booking page for you that stands on its own, and the link goes in your Google listing, your WhatsApp and your Instagram bio.",
  },
  {
    q: "Where does the guest's money actually go?",
    a: "Straight into your own Payfast merchant account. The card is charged against your credentials, not ours, so the money never passes through us and there's nothing to pay out to you afterwards.",
  },
  {
    q: "What happens to my Booking.com and Airbnb listings?",
    a: "They keep running. We read those calendars every hour and publish yours back out to them, so a room sold on any channel closes on all of them. You're not choosing between direct bookings and the listing sites — you're just stopping them from taking a cut of the guests who would have found you anyway.",
  },
  {
    q: "Can it double-book a room?",
    a: "No. Every hold is taken under a lock on that specific unit, so two guests clicking the same room in the same second can't both get it. The one who's a fraction slower is told it's gone rather than being charged for a room you can't give them.",
  },
  {
    q: "What if I want to stop?",
    a: "It's month to month with no contract and no setup fee. Stop it whenever you like and your bookings and guest records come with you.",
  },
  {
    q: "Who sets it up?",
    a: "I do, and it's included. You send me your rooms, your rates and your existing calendar links, and I'll have it running and tested before you show it to a single guest.",
  },
];

export const metadata: Metadata = {
  title: "BookDirect | Direct booking software for SA guesthouses",
  description:
    "Guests book and pay on your own site, so the 15–18% agent commission stays with you. Two-way calendar sync with Booking.com and Airbnb, Payfast payments into your own account. From R750/mo.",
  openGraph: {
    title: "BookDirect — take your bookings direct",
    description:
      "Direct booking software for South African guesthouses. No commission, no double bookings.",
    type: "website",
  },
};

/* Everything claimed here is in the running build — Payfast against the
   lodge's own merchant account, hourly two-way iCal, the per-unit hold lock,
   the owner dashboard. No roadmap items dressed up as features. */
const features = [
  {
    title: "Guests pay you directly",
    body: "Dates, then what's actually free, then card payment. Payfast runs the transaction against your own merchant account — the money never passes through us.",
  },
  {
    title: "Two-way calendar sync",
    body: "We read your Booking.com and Airbnb calendars every hour and publish yours back out, so a room sold on one channel closes on all of them.",
  },
  {
    title: "It cannot double-book",
    body: "Every hold is taken under a lock on that specific unit. Two guests clicking the same room in the same second cannot both get it.",
  },
  {
    title: "Your own dashboard",
    body: "Bookings, calendar and rooms behind your own login. Change a rate or close a date yourself, without phoning anyone.",
  },
  {
    title: "Real availability, not a form",
    body: "One query answers the whole search — what fits the party size, what is free on those dates, what it costs per night.",
  },
  {
    title: "Your data stays yours",
    body: "Month to month, no contract. If you leave, your bookings and guest records come with you.",
  },
];

export default function BookDirectPage() {
  return (
    <>
      <PageHero
        eyebrow="BookDirect"
        status="Live"
        title="Take the booking. Keep the commission."
        lede="The listing sites take 15–18% of every night you sell through them. BookDirect puts the same booking on your own site, at your own rate, paid straight into your own account."
        primary={{ label: "Get set up", href: "/contact" }}
        secondary={{ label: "WhatsApp me", href: "https://wa.me/27731275190", external: true }}
      />

      <section className="px-6 pb-4">
        <FadeIn lift>
          <BookingMock />
        </FadeIn>
      </section>

      {/* The maths is the pitch — put a number on it early */}
      <section className="px-6 py-16 md:py-24" style={{ background: "var(--surface)" }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 text-center">
              {[
                { value: 300, prefix: "R", label: "commission on one R1,800 night, at 17%" },
                { value: 9000, prefix: "R", label: "a month, if you sell thirty of them" },
                { value: 2, prefix: "", label: "nights a month covers what BookDirect costs" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="mb-3">
                    <CountUp
                      value={s.value}
                      prefix={s.prefix}
                      className="display text-[clamp(2.4rem,5vw,3.4rem)]"
                      style={{ color: "var(--text)" }}
                    />
                  </div>
                  <p
                    className="text-[15px] leading-[1.6] max-w-[15rem] mx-auto"
                    style={{ color: "var(--muted)" }}
                  >
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Two ways in — the second is the pitch for sites that can't take a booking */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <h2
              className="display text-[clamp(1.9rem,3.6vw,2.9rem)] mb-4 max-w-2xl"
              style={{ color: "var(--text)" }}
            >
              It works with the site you have, or without one.
            </h2>
            <p className="lede max-w-2xl mb-12">
              Most guesthouse sites cannot take a booking at all. You do not need
              to rebuild yours to fix that.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                label: "You have a website",
                title: "Drop it into what you've got",
                body: "One line of script and the booking widget appears on your existing pages. Nothing else about your site changes, and you don't move hosting.",
              },
              {
                label: "You don't, or it can't take bookings",
                title: "We host the booking page",
                body: "You get a proper booking page of your own that stands on its own. The link goes in your Google listing, your WhatsApp and your Instagram bio.",
              },
            ].map((c, i) => (
              <FadeIn key={c.title} delay={i * 0.12}>
                <div className="card p-9 h-full">
                  <div className="eyebrow mb-4">{c.label}</div>
                  <h3
                    className="display text-xl mb-3"
                    style={{ color: "var(--text)" }}
                  >
                    {c.title}
                  </h3>
                  <p className="text-[15px] leading-[1.75]" style={{ color: "var(--muted)" }}>
                    {c.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:py-24" style={{ background: "var(--surface)" }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <h2
              className="display text-[clamp(1.9rem,3.6vw,2.9rem)] mb-14 max-w-2xl"
              style={{ color: "var(--text)" }}
            >
              What it does.
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
            {features.map((f, i) => (
              <FadeIn key={f.title} delay={(i % 3) * 0.08}>
                <div>
                  <div
                    className="w-7 h-px mb-5"
                    style={{ background: "var(--accent)" }}
                  />
                  <h3
                    className="text-[17px] font-semibold mb-3 tracking-[-0.01em]"
                    style={{ color: "var(--text)" }}
                  >
                    {f.title}
                  </h3>
                  <p className="text-[15px] leading-[1.75]" style={{ color: "var(--muted)" }}>
                    {f.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <BookingPricing />

      <section className="px-6 py-16 md:py-24" style={{ background: "var(--surface)" }}>
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <h2
              className="display text-[clamp(1.9rem,3.6vw,2.9rem)] mb-12"
              style={{ color: "var(--text)" }}
            >
              The questions I get asked.
            </h2>
          </FadeIn>
          <FadeIn delay={0.08}>
            <Accordion items={faqs} />
          </FadeIn>
        </div>
      </section>

      <section className="px-6 py-20 md:py-28 text-center">
        <div className="max-w-2xl mx-auto">
          <FadeIn>
            <h2
              className="display text-[clamp(1.9rem,3.6vw,2.9rem)] mb-5"
              style={{ color: "var(--text)" }}
            >
              Want to see it on your own place?
            </h2>
            <p className="lede mb-9">
              Send me your property and I&apos;ll set it up with your rooms and
              your rates so you can click through it yourself before deciding.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-x-8 gap-y-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center font-medium px-7 py-3 rounded-full text-[15px] transition-opacity duration-300 hover:opacity-85"
                style={{ background: "var(--text)", color: "var(--bg)" }}
              >
                Set it up for my place
              </Link>
              <a
                href="https://wa.me/27731275190"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[15px] font-medium transition-opacity hover:opacity-70"
                style={{ color: "var(--accent)" }}
              >
                073 127 5190
                <span aria-hidden="true">›</span>
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
