"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { isStandaloneRoute } from "@/lib/routes";

/* Anchors are written as "/#id" rather than "#id" so they still resolve when
   the nav is rendered on /work, /contact or any other route. */
const links = [
  { href: "/#booking", label: "Booking system" },
  { href: "/#salesbrain", label: "Sales Brain" },
  { href: "/#demos", label: "Websites" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  if (isStandaloneRoute(pathname)) return null;

  /* The homepage hero is a light silk canvas — white nav text disappears on it
     until the bar picks up its dark background on scroll. */
  const onLightHero = pathname === "/" && !scrolled;

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "py-3" : "py-5"
        }`}
        style={{
          background: scrolled ? "rgba(5,5,7,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        }}
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div
              className="w-8 h-8 rounded-md flex items-center justify-center text-xs font-bold tracking-tight"
              style={{ background: "var(--accent)", color: "var(--ink)" }}
            >
              OG
            </div>
            <span
              className="font-semibold text-lg tracking-[-0.01em]"
              style={{
                fontFamily: "var(--font-space)",
                color: onLightHero ? "var(--ink)" : "#fff",
              }}
            >
              O&apos;Gorman Studio
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium transition-opacity duration-200 hover:opacity-100"
                style={{
                  color: onLightHero ? "var(--ink)" : "#fff",
                  opacity: pathname === l.href ? 1 : 0.6,
                }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="text-sm font-semibold px-5 py-2.5 rounded-full transition-opacity duration-300 hover:opacity-85"
              style={
                onLightHero
                  ? { background: "var(--ink)", color: "var(--text)" }
                  : { background: "var(--text)", color: "var(--ink)" }
              }
            >
              Get started
            </Link>
          </nav>

          <button
            className="md:hidden p-2"
            style={{ color: onLightHero ? "var(--ink)" : "#fff" }}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col pt-24 px-6 pb-10"
            style={{ background: "rgba(5,5,7,0.98)", backdropFilter: "blur(30px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="flex flex-col gap-6 mt-4">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.25 }}
                >
                  <Link
                    href={l.href}
                    className={`text-3xl font-bold tracking-tight ${
                      pathname === l.href ? "text-white" : "text-[#7b7a8e]"
                    }`}
                    style={{ fontFamily: "var(--font-space)" }}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-auto">
              <Link
                href="/contact"
                className="inline-block w-full text-center text-lg font-semibold py-4 rounded-full"
                style={{ background: "var(--text)", color: "var(--ink)" }}
              >
                Get a free concept
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
