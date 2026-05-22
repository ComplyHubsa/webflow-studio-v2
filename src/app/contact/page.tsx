import Contact from "@/components/Contact";
import FadeIn from "@/components/FadeIn";

export const metadata = {
  title: "Contact | Webflow Studio",
  description:
    "Get in touch with Webflow Studio to start your custom website project.",
};

export default function ContactPage() {
  return (
    <>
      <div
        className="pt-44 pb-10 px-6"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(108,99,255,0.08) 0%, transparent 60%)",
        }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <FadeIn>
            <span
              className="text-xs font-semibold uppercase tracking-widest mb-6 block"
              style={{ color: "var(--accent2)" }}
            >
              Let&apos;s Talk
            </span>
            <h1
              className="text-[clamp(3rem,7vw,6rem)] font-bold leading-[0.95] tracking-tight mb-7"
              style={{ fontFamily: "var(--font-space)" }}
            >
              Get in{" "}
              <span className="gradient-text">Touch</span>
            </h1>
            <p
              className="text-base md:text-lg max-w-lg mx-auto leading-[1.8]"
              style={{ color: "var(--muted)" }}
            >
              Whether you&apos;re ready to start or just want to ask a question —
              I&apos;m here. I reply within a few hours.
            </p>
          </FadeIn>
        </div>
      </div>
      <Contact />
    </>
  );
}
