import type { Metadata } from "next";

const title = "Benmari Busa House | Self-catering in White River, Mpumalanga";
const description =
  "Eight self-catering units, a caravan park and a pool set in sixty-year-old gardens on Burger Street, White River. Twenty minutes from Mbombela.";

/* The page is a client component and can't export metadata itself. Without
   this the concept inherits the studio's title and Open Graph tags, so the
   WhatsApp link preview would announce O'Gorman Studio over the client's
   own page. */
export const metadata: Metadata = {
  title,
  description,
  robots: { index: false, follow: false },
  openGraph: {
    title,
    description,
    type: "website",
    images: [{ url: "/busahouse/pool.jpg" }],
  },
  twitter: { card: "summary_large_image", title, description },
};

export default function BusaHouseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
