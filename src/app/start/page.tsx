import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { CheckCircle2, ClipboardList, Rocket } from "lucide-react";

export const metadata = {
  title: "Payment Received | Webflow Studio",
  description:
    "Thanks for your payment — one quick step and your 5-day build starts.",
};

const INTAKE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSc4q-WmPPrWh65uwuPbEkmgnMJY8vrFyA6J5hWXJ6K5lmUa5A/viewform";

const steps = [
  {
    icon: CheckCircle2,
    title: "Payment received",
    desc: "You're booked in. No contracts, no waiting on quotes.",
    done: true,
  },
  {
    icon: ClipboardList,
    title: "Fill in the intake form",
    desc: "One form, once — your logo, photos, words and demo choice. Your 5-day clock starts the moment it's submitted.",
    done: false,
  },
  {
    icon: Rocket,
    title: "Live in 5 days",
    desc: "Preview link on day 3, one round of revisions, live on your domain by day 5.",
    done: false,
  },
];

export default function StartPage() {
  return (
    <div
      className="min-h-screen pt-44 pb-24 px-6"
      style={{
        background:
          "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(108,99,255,0.08) 0%, transparent 60%)",
      }}
    >
      <div className="max-w-2xl mx-auto text-center">
        <FadeIn>
          <span
            className="text-xs font-semibold uppercase tracking-widest mb-6 block"
            style={{ color: "var(--accent2)" }}
          >
            Payment Received
          </span>
          <h1
            className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[0.95] tracking-tight mb-6"
            style={{ fontFamily: "var(--font-space)" }}
          >
            One more step and{" "}
            <span className="gradient-text">we&apos;re building.</span>
          </h1>
          <p
            className="text-base md:text-lg max-w-md mx-auto leading-[1.8] mb-14"
            style={{ color: "var(--muted)" }}
          >
            Everything I need to build your site fits in one form. Fill it in
            once, completely — then I take it from there.
          </p>
        </FadeIn>

        <div className="flex flex-col gap-4 text-left mb-12">
          {steps.map((step, i) => (
            <FadeIn key={step.title} delay={i * 0.12}>
              <div
                className="flex items-start gap-4 rounded-2xl p-6"
                style={{
                  background: step.done
                    ? "rgba(74,222,128,0.05)"
                    : "rgba(255,255,255,0.02)",
                  border: step.done
                    ? "1px solid rgba(74,222,128,0.25)"
                    : "1px solid var(--border)",
                }}
              >
                <span
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: step.done
                      ? "rgba(74,222,128,0.12)"
                      : "rgba(108,99,255,0.12)",
                  }}
                >
                  <step.icon
                    size={19}
                    strokeWidth={2}
                    style={{ color: step.done ? "#4ade80" : "var(--accent)" }}
                  />
                </span>
                <div>
                  <div
                    className="text-sm font-bold text-white mb-1"
                    style={{ fontFamily: "var(--font-space)" }}
                  >
                    {i + 1}. {step.title}
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.4}>
          <a
            href={INTAKE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-semibold py-4 px-10 rounded-2xl text-sm transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #a78bfa, #6c63ff)",
              color: "#fff",
              boxShadow: "0 0 30px rgba(167,139,250,0.35)",
            }}
          >
            Open the intake form →
          </a>
          <p className="text-sm mt-6" style={{ color: "var(--muted)" }}>
            Stuck on anything? WhatsApp me on{" "}
            <a
              href="https://wa.me/27731275190"
              target="_blank"
              rel="noopener noreferrer"
              className="underline transition-colors hover:text-white"
              style={{ color: "var(--accent2)" }}
            >
              073 127 5190
            </a>{" "}
            — I reply fast.
          </p>
        </FadeIn>
      </div>
    </div>
  );
}
