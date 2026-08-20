import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Industries from "@/components/Industries";
import HowItWorks from "@/components/HowItWorks";
import FreeConcept from "@/components/FreeConcept";
import SitePricing from "@/components/SitePricing";

export const metadata: Metadata = {
  title: "Websites | Custom builds for South African businesses",
  description:
    "Hand-built websites for South African businesses from R3,500. No templates and no retainer — you see a real design for your business before you pay anything.",
  openGraph: {
    title: "Websites — O'Gorman Studio",
    description:
      "Custom websites for South African businesses. See the design before you pay.",
    type: "website",
  },
};

export default function WebsitesPage() {
  return (
    <>
      <PageHero
        eyebrow="Websites"
        status="Live"
        title="A site built for you, not picked off a shelf."
        lede="No templates and no agency retainer. I design a real homepage for your business first — if you don't like it, you walk away and owe nothing."
        primary={{ label: "Get a free concept", href: "/contact" }}
        secondary={{ label: "See the demos", href: "#demos" }}
      />
      <Industries />
      <HowItWorks />
      <FreeConcept />
      <SitePricing />
    </>
  );
}
