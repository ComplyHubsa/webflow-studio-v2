import Hero from "@/components/Hero";
import Products from "@/components/Products";
import BookingSystem from "@/components/BookingSystem";
import SalesBrain from "@/components/SalesBrain";
import Industries from "@/components/Industries";
import FreeConcept from "@/components/FreeConcept";
import Pricing from "@/components/Pricing";
import About from "@/components/About";
import ContactCTA from "@/components/ContactCTA";

/* Software first: the two products come before the website work, which is now
   a supporting service rather than the headline. HowItWorks was dropped from
   the homepage — it describes the website process only, and the page is long
   enough without it. The component is still there for a future /websites page. */
export default function Home() {
  return (
    <>
      <Hero />
      <Products />
      <BookingSystem />
      <SalesBrain />
      <Industries />
      <FreeConcept />
      <Pricing />
      <About />
      <ContactCTA />
    </>
  );
}
