import Contact from "@/components/Contact";
import FadeIn from "@/components/FadeIn";

export const metadata = {
  title: "Contact | O'Gorman Studio",
  description:
    "Get in touch with O'Gorman Studio to start your custom website project.",
};

export default function ContactPage() {
  return (
    <>
      <div className="pt-44 pb-10 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <span
              className="text-xs font-medium uppercase tracking-[0.2em] mb-5 block"
              style={{ color: "var(--accent)" }}
            >
              Contact
            </span>
            <h1
              className="text-[clamp(2.4rem,5.5vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.02em] mb-6"
              style={{ fontFamily: "var(--font-space)" }}
            >
              Tell me about your business.
            </h1>
            <p
              className="text-base md:text-lg max-w-xl leading-[1.8]"
              style={{ color: "var(--muted)" }}
            >
              The more you give me here, the closer the first concept lands.
              Ready to start or just weighing it up — either is fine. I reply
              within a few hours.
            </p>
          </FadeIn>
        </div>
      </div>
      <Contact />
    </>
  );
}
