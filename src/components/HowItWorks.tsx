import FadeIn from "./FadeIn";
import ScrollSteps, { type Step } from "./motion/ScrollSteps";

/* Order matters: the concept comes before any payment. This has to match the
   promise made in FreeConcept further down the page. */
const steps: Step[] = [
  {
    no: "01",
    label: "Get started",
    title: "Tell me about it",
    body: "Fill in the brief or send me a WhatsApp. What you do, who you serve, what you want the site to achieve. Five minutes.",
  },
  {
    no: "02",
    label: "No charge",
    title: "I design a concept",
    body: "I look at your industry and your competitors, then design a real homepage for your business. No cost, no obligation.",
  },
  {
    no: "03",
    label: "Your call",
    title: "You decide",
    body: "Happy with it? Pay and I build the rest. Not for you? Walk away — you owe me nothing and there's no follow-up call.",
  },
  {
    no: "04",
    label: "Handled",
    title: "Live on your domain",
    body: "I handle the hosting, the domain setup and getting you indexed on Google. You get a site you can actually update.",
  },
];

export default function HowItWorks() {
  return (
    <section className="px-6 py-16 md:py-24" style={{ background: "var(--surface)" }}>
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <div className="mb-16 max-w-2xl">
            <div className="eyebrow mb-5">How it works</div>
            <h2
              className="display text-[clamp(1.9rem,3.6vw,2.9rem)]"
              style={{ color: "var(--text)" }}
            >
              Four steps, and you only pay at step three.
            </h2>
          </div>
        </FadeIn>

        <ScrollSteps steps={steps} />
      </div>
    </section>
  );
}
