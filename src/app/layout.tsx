import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  title: "O'Gorman Studio | Booking software for South African businesses",
  description:
    "Direct booking software for South African guesthouses from R750/mo — guests book and pay on your own site, so the agent's 15–18% commission stays with you. Plus custom websites from R3,500.",
  keywords:
    "direct booking system South Africa, guesthouse booking software, hotel booking engine, sales automation, web design South Africa",
  openGraph: {
    title: "O'Gorman Studio",
    description:
      "Direct booking software for South African guesthouses. Guests book and pay on your own site — no commission.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
