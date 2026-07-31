import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import HowItWorks from "@/components/HowItWorks";
import Industries from "@/components/Industries";
import FreeConcept from "@/components/FreeConcept";
import Pricing from "@/components/Pricing";
import ContactCTA from "@/components/ContactCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <HowItWorks />
      <Industries />
      <FreeConcept />
      <Pricing />
      <ContactCTA />
    </>
  );
}
