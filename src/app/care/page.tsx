import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { Server, PencilLine, ShieldCheck, MessageCircle, X } from "lucide-react";

export const metadata = {
  title: "Website Care Plan | O'Gorman Studio",
  description:
    "Keep your site online, backed up and up to date — R450/month, cancel anytime.",
  // Handover-only page: sent directly to clients, not meant for search results.
  robots: { index: false, follow: false },
};

// TODO: replace with the PayFast recurring subscription link once created
// (R450, monthly, unlimited cycles, return URL -> /start)
const SUBSCRIBE_URL = "";

const included = [
  {
    icon: Server,
    title: "Hosting, domain & SSL handled",
    desc: "Renewals, certificates, the lot. You never get a \"your site is down\" phone call.",
  },
  {
    icon: PencilLine,
    title: "2 small changes a month",
    desc: "New price, changed hours, an extra service, swap a photo. WhatsApp me and it's done.",
  },
  {
    icon: ShieldCheck,
    title: "Monthly backups & uptime monitoring",
    desc: "If anything breaks I usually know before you do — and there's always a copy to restore.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp support",
    desc: "Straight to me, no ticket system. Reply within 1 business day.",
  },
];

const excluded = [
  "New pages or a redesign — that's a separate quote",
  "Unused changes don't roll over month to month",
  "Online shop, bookings, or anything structural",
];

export default function CarePlanPage() {
  return (
    <div
      className="min-h-screen pt-44 pb-24 px-6"
      style={{
        background:
          "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(108,99,255,0.08) 0%, transparent 60%)",
      }}
    >
      <div className="max-w-3xl mx-auto">
        <FadeIn>
          <div className="text-center mb-14">
            <span
              className="text-xs font-semibold uppercase tracking-widest mb-6 block"
              style={{ color: "var(--accent2)" }}
            >
              Optional Add-On
            </span>
            <h1
              className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[0.95] tracking-tight mb-6"
              style={{ fontFamily: "var(--font-space)" }}
            >
              Keep it{" "}
              <span className="gradient-text">running.</span>
            </h1>
            <p
              className="text-base md:text-lg max-w-lg mx-auto leading-[1.8]"
              style={{ color: "var(--muted)" }}
            >
              Your site is yours — paid for, once-off, no strings. This is just
              for if you&apos;d rather not think about it again.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div
            className="rounded-3xl p-8 md:p-10 mb-8 text-center"
            style={{
              background:
                "linear-gradient(145deg, rgba(108,99,255,0.12), rgba(139,92,246,0.06))",
              border: "1px solid rgba(108,99,255,0.4)",
              boxShadow: "0 0 60px rgba(108,99,255,0.1)",
            }}
          >
            <div
              className="text-6xl font-bold tracking-tight mb-1"
              style={{ fontFamily: "var(--font-space)", color: "var(--accent2)" }}
            >
              R450
            </div>
            <div className="text-sm mb-1" style={{ color: "var(--muted)" }}>
              per month
            </div>
            <div className="text-sm font-semibold" style={{ color: "#4ade80" }}>
              First month free · cancel anytime
            </div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {included.map((item, i) => (
            <FadeIn key={item.title} delay={0.15 + i * 0.08}>
              <div
                className="rounded-2xl p-6 h-full"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid var(--border)",
                }}
              >
                <span
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "rgba(108,99,255,0.12)" }}
                >
                  <item.icon size={19} strokeWidth={2} style={{ color: "var(--accent)" }} />
                </span>
                <div
                  className="text-sm font-bold text-white mb-1.5"
                  style={{ fontFamily: "var(--font-space)" }}
                >
                  {item.title}
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                  {item.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.45}>
          <div
            className="rounded-2xl p-6 mb-10"
            style={{
              background: "rgba(255,255,255,0.015)",
              border: "1px solid var(--border)",
            }}
          >
            <div
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "var(--muted)" }}
            >
              Not included — so there are no surprises
            </div>
            <ul className="flex flex-col gap-2.5">
              {excluded.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm">
                  <X
                    size={15}
                    strokeWidth={2.5}
                    className="mt-0.5 flex-shrink-0"
                    style={{ color: "#f87171" }}
                  />
                  <span style={{ color: "var(--muted)" }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>

        <FadeIn delay={0.55}>
          <div className="text-center">
            {SUBSCRIBE_URL ? (
              <a
                href={SUBSCRIBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block font-semibold py-4 px-10 rounded-2xl text-sm transition-all duration-300 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #a78bfa, #6c63ff)",
                  color: "#fff",
                  boxShadow: "0 0 30px rgba(167,139,250,0.35)",
                }}
              >
                Start my care plan →
              </a>
            ) : (
              <a
                href="https://wa.me/27731275190?text=Hi%20Aidan%2C%20I%27d%20like%20to%20start%20the%20R450%20care%20plan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block font-semibold py-4 px-10 rounded-2xl text-sm transition-all duration-300 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #a78bfa, #6c63ff)",
                  color: "#fff",
                  boxShadow: "0 0 30px rgba(167,139,250,0.35)",
                }}
              >
                WhatsApp me to start →
              </a>
            )}
            <p className="text-sm mt-6" style={{ color: "var(--muted)" }}>
              Not interested? Genuinely no problem — your site keeps working
              exactly as it is. Questions:{" "}
              <a
                href="https://wa.me/27731275190"
                target="_blank"
                rel="noopener noreferrer"
                className="underline transition-colors hover:text-white"
                style={{ color: "var(--accent2)" }}
              >
                073 127 5190
              </a>
            </p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
