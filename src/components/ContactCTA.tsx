"use client";

import Link from "next/link";
import FadeIn from "./FadeIn";

export default function ContactCTA() {
  return (
    <section className="py-18 px-6">
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <div
            className="relative rounded-3xl p-8 sm:p-14 md:p-20 text-center overflow-hidden"
            style={{
              background:
                "linear-gradient(145deg, rgba(108,99,255,0.13), rgba(56,189,248,0.07))",
              border: "1px solid rgba(108,99,255,0.22)",
            }}
          >
            {/* Glow */}
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(108,99,255,0.14) 0%, transparent 70%)",
              }}
            />

            {/* Static decorative rings */}
            <div
              className="absolute top-0 right-0 w-56 h-56 rounded-full border pointer-events-none"
              style={{
                borderColor: "rgba(108,99,255,0.12)",
                transform: "translate(30%, -30%)",
              }}
            />
            <div
              className="absolute bottom-0 left-0 w-36 h-36 rounded-full border pointer-events-none"
              style={{
                borderColor: "rgba(56,189,248,0.12)",
                transform: "translate(-30%, 30%)",
              }}
            />

            <div className="relative z-10">
              <span
                className="text-xs font-semibold uppercase tracking-widest mb-7 block"
                style={{ color: "var(--accent2)" }}
              >
                Ready to start?
              </span>
              <h2
                className="text-[clamp(2rem,5vw,4rem)] font-bold leading-tight tracking-tight mb-6 text-white"
                style={{ fontFamily: "var(--font-space)" }}
              >
                Let&apos;s Build Something{" "}
                <span className="gradient-text">Incredible</span>
              </h2>
              <p
                className="text-base md:text-lg max-w-xl mx-auto mb-12 leading-[1.8]"
                style={{ color: "var(--muted)" }}
              >
                Your business deserves a website that actually impresses people.
                Get in touch today — most projects are live within 3–5 days.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-white font-semibold px-9 py-4 rounded-full text-base transition-all duration-300 hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, #6c63ff, #8b5cf6)",
                    boxShadow: "0 0 30px rgba(108,99,255,0.4), 0 4px 20px rgba(0,0,0,0.3)",
                  }}
                >
                  Start a Project
                </Link>
                <a
                  href="https://wa.me/27731275190"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-medium px-9 py-4 rounded-full text-base transition-all duration-300 hover:text-white"
                  style={{ color: "var(--muted)", border: "1px solid var(--border)" }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#25D366" }}>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
