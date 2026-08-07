import type { Metadata } from "next";

const title = "Hazyview Country Cottages | 13 km from Kruger";
const description =
  "Nine self-catering cottages, en-suite rooms, a tented camp and dormitories for fifty, in a leafy garden thirteen kilometres from the Kruger gate. Rates from R260.";

/* The page is a client component and can't export metadata itself. Without
   this the concept inherits the studio's title and Open Graph tags, so the
   WhatsApp preview would announce O'Gorman Studio over the client's page. */
export const metadata: Metadata = {
  title,
  description,
  robots: { index: false, follow: false },
  openGraph: {
    title,
    description,
    type: "website",
    images: [{ url: "/hazyview/pool-hero.jpg" }],
  },
  twitter: { card: "summary_large_image", title, description },
};

export default function HazyviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
