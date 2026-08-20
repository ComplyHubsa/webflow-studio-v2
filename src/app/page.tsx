import Hero from "@/components/Hero";
import Products from "@/components/Products";
import About from "@/components/About";
import ContactCTA from "@/components/ContactCTA";

/* The homepage is now an overview, not the whole pitch. Each product carries
   its own page — /bookdirect, /sales-brain, /websites — so this stays short
   enough that the three cards are the first real thing you reach. */
export default function Home() {
  return (
    <>
      <Hero />
      <Products />
      <About />
      <ContactCTA />
    </>
  );
}
