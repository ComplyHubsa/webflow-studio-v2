import type { Metadata } from "next";

/* The page is a client component and cannot export metadata, so without this
   it inherits the studio's root title -- the browser tab would read
   "O'Gorman Studio" while the client looks at their own concept. */
const title = "Tramonto Lodge | Keidebees";
const description =
  "FILL IN -- one line about Tramonto Lodge, taken from their own site. Rooms, setting, what makes the place worth a night.";

export const metadata: Metadata = {
  title,
  description,
  /* A concept is for one prospect, not for search engines. */
  robots: { index: false, follow: false },
  /* Sent over WhatsApp, so the link preview matters more than the tab:
     without these the card inherits the studio's og tags and announces
     the wrong business name. */
  openGraph: {
    title,
    description,
    type: "website",
    images: [{ url: "/tramontolodge/hero.jpg", width: 1800, height: 1200 }],
  },
  twitter: { card: "summary_large_image", title, description },
};

export default function Layout(props: LayoutProps<"/tramontolodge">) {
  return props.children;
}
