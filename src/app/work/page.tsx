import Work from "@/components/Work";
import ContactCTA from "@/components/ContactCTA";
import FadeIn from "@/components/FadeIn";

export const metadata = {
  title: "Our Work | Webflow Studio",
  description:
    "Explore our portfolio of custom websites built for South African small businesses.",
};

export default function WorkPage() {
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
              Portfolio
            </span>
            <h1
              className="text-[clamp(3rem,7vw,6rem)] font-bold leading-[0.95] tracking-tight mb-7"
              style={{ fontFamily: "var(--font-space)" }}
            >
              Our{" "}
              <span className="gradient-text">Work</span>
            </h1>
            <p
              className="text-base md:text-lg max-w-lg mx-auto leading-[1.8]"
              style={{ color: "var(--muted)" }}
            >
              Every site we build is custom — no templates, no shortcuts. Here&apos;s
              a selection of projects we&apos;re proud of.
            </p>
          </FadeIn>
        </div>
      </div>
      <Work hideHeader />
      <ContactCTA />
    </>
  );
}
