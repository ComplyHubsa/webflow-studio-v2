import Hero from "@/components/Hero";
import Products from "@/components/Products";
import BookingSection from "@/components/BookingSection";
import SalesBrainSection from "@/components/SalesBrainSection";
import Industries from "@/components/Industries";
import FreeConcept from "@/components/FreeConcept";
import BookingPricing from "@/components/BookingPricing";
import About from "@/components/About";
import ContactCTA from "@/components/ContactCTA";

/* The full homepage: every product gets a real section here, and each one
   links through to its own page for the detail. The two summary sections are
   condensed on purpose — if they carried the whole page, there'd be no reason
   to click through, and two copies of the same copy drift apart. */
export default function Home() {
  return (
    <>
      <Hero />
      <Products />
      <BookingSection />
      <SalesBrainSection />
      <Industries />
      <FreeConcept />
      <BookingPricing />
      <About />
      <ContactCTA />
    </>
  );
}
