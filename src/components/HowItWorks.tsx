import FadeIn from "./FadeIn";

/* Order matters: the concept comes before any payment. This has to match the
   promise made in FreeConcept further down the page. */
const steps = [
  {
    number: "01",
    title: "Tell me about it",
    desc: "Fill in the brief or send me a WhatsApp. What you do, who you serve, what you want the site to achieve. Five minutes.",
  },
  {
    number: "02",
    title: "I design a concept",
    desc: "I look at your industry and your competitors, then design a real homepage for your business. No charge, no obligation.",
  },
  {
    number: "03",
    title: "You decide",
    desc: "Happy with it? Pay and I build the rest. Not for you? Walk away — you owe me nothing and there's no follow-up call.",
  },
  {
    number: "04",
    title: "Live on your domain",
    desc: "I handle the hosting, the domain setup and getting you indexed on Google. You get a site you can actually update.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-18 px-6" style={{ background: "var(--surface)" }}>
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="mb-16 max-w-2xl">
            <span
              className="text-xs font-medium uppercase tracking-[0.2em] mb-5 block"
              style={{ color: "var(--accent)" }}
            >
              How it works
            </span>
            <h2
              className="text-[clamp(2rem,4vw,3.4rem)] font-bold leading-[1.08] tracking-[-0.02em]"
              style={{ fontFamily: "var(--font-space)" }}
            >
              Four steps, and you only pay at step three.
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <FadeIn key={step.number} delay={i * 0.12}>
              <div
                className="relative p-8 rounded-xl h-full"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid var(--border)",
                }}
              >
                <div
                  className="text-sm font-semibold mb-6 tabular-nums"
                  style={{
                    fontFamily: "var(--font-space)",
                    color: "var(--accent)",
                    letterSpacing: "0.1em",
                  }}
                >
                  {step.number}
                </div>
                <h3
                  className="text-lg font-semibold mb-4"
                  style={{ fontFamily: "var(--font-space)", color: "var(--text)" }}
                >
                  {step.title}
                </h3>
                <p className="text-sm leading-[1.85]" style={{ color: "var(--muted)" }}>
                  {step.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
