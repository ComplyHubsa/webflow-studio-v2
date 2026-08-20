"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { isStandaloneRoute } from "@/lib/routes";

/* Real routes now, not homepage anchors — each product has its own page. */
const links = [
  { href: "/bookdirect", label: "BookDirect" },
  { href: "/sales-brain", label: "Sales Brain" },
  { href: "/websites", label: "Websites" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  if (isStandaloneRoute(pathname)) return null;

  return (
    <>
      {/* Always translucent rather than transparent-then-solid: the bar stays
          one consistent object instead of appearing on scroll. */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-shadow duration-300"
        style={{
          background: "rgba(255,255,255,0.72)",
          backdropFilter: "saturate(180%) blur(20px)",
          WebkitBackdropFilter: "saturate(180%) blur(20px)",
          borderBottom: `1px solid ${scrolled ? "var(--border)" : "transparent"}`,
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-12 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold tracking-tight"
              style={{ background: "var(--text)", color: "var(--bg)" }}
            >
              OG
            </div>
            <span
              className="font-semibold text-[15px] tracking-[-0.01em]"
              style={{ color: "var(--text)" }}
            >
              O&apos;Gorman
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-9">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[13px] transition-opacity duration-200 hover:opacity-100"
                style={{
                  color: "var(--text)",
                  opacity: pathname === l.href ? 1 : 0.72,
                  fontWeight: pathname === l.href ? 600 : 450,
                }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="text-[13px] font-medium px-4 py-1.5 rounded-full transition-opacity duration-300 hover:opacity-80"
              style={{ background: "var(--text)", color: "var(--bg)" }}
            >
              Get started
            </Link>
          </nav>

          <button
            className="md:hidden p-1.5 -mr-1.5"
            style={{ color: "var(--text)" }}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col pt-20 px-6 pb-10 md:hidden"
            style={{
              background: "rgba(255,255,255,0.97)",
              backdropFilter: "blur(30px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="flex flex-col">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.25 }}
                  style={{ borderBottom: "1px solid var(--border)" }}
                >
                  <Link
                    href={l.href}
                    className="block py-5 text-2xl display"
                    style={{ color: "var(--text)" }}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-auto">
              <Link
                href="/contact"
                className="inline-block w-full text-center text-base font-medium py-4 rounded-full"
                style={{ background: "var(--text)", color: "var(--bg)" }}
              >
                Get started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
