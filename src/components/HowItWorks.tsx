import FadeIn from "./FadeIn";

const steps = [
  {
    number: "01",
    title: "Book & Brief",
    desc: "Pay the deposit and fill in a short brief about your business, goals, and vision. Takes 10 minutes.",
  },
  {
    number: "02",
    title: "Design & Build",
    desc: "I design and build your custom site — no templates. You'll see a live preview within 3–5 days.",
  },
  {
    number: "03",
    title: "Review & Refine",
    desc: "You give feedback. We make adjustments until it's perfect. Unlimited revisions on core sections.",
  },
  {
    number: "04",
    title: "Launch",
    desc: "Your site goes live on your domain. Fast, secure, and optimised for Google from day one.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-18 px-6" style={{ background: "var(--surface)" }}>
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="text-center mb-20">
            <span
              className="text-xs font-semibold uppercase tracking-widest mb-6 block"
              style={{ color: "var(--accent2)" }}
            >
              Process
            </span>
            <h2
              className="text-[clamp(2rem,4.5vw,4rem)] font-bold leading-tight tracking-tight"
              style={{ fontFamily: "var(--font-space)" }}
            >
              Simple. Fast.{" "}
              <span className="gradient-text">No BS.</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <FadeIn key={step.number} delay={i * 0.12}>
              <div
                className="relative p-8 rounded-2xl h-full"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid var(--border)",
                }}
              >
                <div
                  className="text-6xl font-bold mb-7 leading-none"
                  style={{
                    fontFamily: "var(--font-space)",
                    background:
                      "linear-gradient(135deg, rgba(108,99,255,0.5), rgba(56,189,248,0.4))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
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

                {i < steps.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-12 -right-3 w-6 h-px"
                    style={{ background: "var(--border)" }}
                  />
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
