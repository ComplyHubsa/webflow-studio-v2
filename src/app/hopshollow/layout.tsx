import type { Metadata } from "next";

/* The page itself is a client component and can't export metadata, so without
   this it inherits the studio's root title — the browser tab would read
   "O'Gorman Studio" while the client is looking at their own concept. */
const title = "Hops Hollow Country House | Long Tom Pass, Mpumalanga";
const description =
  "Seven en-suite rooms, a restaurant and a brew pub at the summit of the Long Tom Pass. Brewing since 2001. From R580 per person.";

export const metadata: Metadata = {
  title,
  description,
  robots: { index: false, follow: false },
  /* Sent over WhatsApp, so the link preview matters more than the tab: without
     these the card inherits the studio's og tags and announces the wrong name. */
  openGraph: {
    title,
    description,
    type: "website",
    images: [{ url: "/hopshollow/Hops-14.jpg", width: 1800, height: 1200 }],
  },
  twitter: { card: "summary_large_image", title, description },
};

export default function HopsHollowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
