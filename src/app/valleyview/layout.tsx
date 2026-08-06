import type { Metadata } from "next";

const title = "Valley View Backpackers | Graskop, Panorama Route";
const description =
  "Timber cabins, private rooms and a six-bed dorm in Graskop, from R200 per person. Fifteen minutes' walk from the village, secure parking, book direct.";

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
    images: [{ url: "/valleyview/p16.jpg" }],
  },
  twitter: { card: "summary_large_image", title, description },
};

export default function ValleyViewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
