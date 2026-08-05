import Work from "@/components/Work";
import ContactCTA from "@/components/ContactCTA";
import FadeIn from "@/components/FadeIn";

export const metadata = {
  title: "Our Work | O'Gorman Studio",
  description:
    "Explore our portfolio of custom websites built for South African small businesses.",
};

export default function WorkPage() {
  return (
    <>
      <div className="pt-44 pb-10 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <span
              className="text-xs font-medium uppercase tracking-[0.2em] mb-5 block"
              style={{ color: "var(--accent)" }}
            >
              Portfolio
            </span>
            <h1
              className="text-[clamp(2.4rem,5.5vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.02em] mb-6"
              style={{ fontFamily: "var(--font-space)" }}
            >
              Selected work.
            </h1>
            <p
              className="text-base md:text-lg max-w-xl leading-[1.8]"
              style={{ color: "var(--muted)" }}
            >
              Every site here was built from scratch — no templates, no theme
              bought off a marketplace.
            </p>
          </FadeIn>
        </div>
      </div>
      <Work hideHeader />
      <ContactCTA />
    </>
  );
}
