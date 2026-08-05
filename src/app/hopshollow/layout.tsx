import type { Metadata } from "next";

/* The page itself is a client component and can't export metadata, so without
   this it inherits the studio's root title — the browser tab would read
   "O'Gorman Studio" while the client is looking at their own concept. */
export const metadata: Metadata = {
  title: "Hops Hollow Country House | Long Tom Pass, Mpumalanga",
  description:
    "Seven en-suite rooms, a restaurant and a brew pub at the summit of the Long Tom Pass. Brewing since 2001. From R580 per person.",
  robots: { index: false, follow: false },
};

export default function HopsHollowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
