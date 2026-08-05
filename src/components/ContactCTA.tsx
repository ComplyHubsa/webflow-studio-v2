"use client";

import Link from "next/link";
import FadeIn from "./FadeIn";

export default function ContactCTA() {
  return (
    <section className="py-18 px-6">
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <div
            className="rounded-2xl p-8 sm:p-14 md:p-16"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
            }}
          >
            <h2
              className="text-[clamp(1.9rem,4vw,3.2rem)] font-bold leading-[1.08] tracking-[-0.02em] mb-6"
              style={{ fontFamily: "var(--font-space)", color: "var(--text)" }}
            >
              Tell me about your business.
            </h2>
            <p
              className="text-base md:text-lg max-w-xl mb-10 leading-[1.8]"
              style={{ color: "var(--muted)" }}
            >
              Send me the brief and I&apos;ll come back with a concept, usually
              within two working days. If you&apos;d rather just ask a question
              first, WhatsApp is faster.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 font-semibold px-8 py-4 rounded-full text-base transition-opacity duration-300 hover:opacity-85"
                style={{ background: "var(--text)", color: "var(--ink)" }}
              >
                Start the brief
              </Link>
              <a
                href="https://wa.me/27731275190"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 font-medium px-8 py-4 rounded-full text-base transition-colors duration-300 hover:text-white"
                style={{ color: "var(--muted)", border: "1px solid var(--border)" }}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#25D366" }}>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                073 127 5190
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
