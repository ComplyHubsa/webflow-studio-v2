"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { isStandaloneRoute } from "@/lib/routes";

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
      {/* Floating pill rather than a full-width bar — it reads as an object
          sitting on the page instead of a band stuck to the top. Shadow
          deepens slightly once you scroll so it lifts off the content. */}
      <motion.header
        className="fixed top-3 left-0 right-0 z-50 px-4"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className="max-w-5xl mx-auto rounded-full transition-shadow duration-500"
          style={{
            background: "rgba(255,255,255,0.78)",
            backdropFilter: "saturate(180%) blur(20px)",
            WebkitBackdropFilter: "saturate(180%) blur(20px)",
            border: "1px solid var(--border)",
            boxShadow: scrolled
              ? "0 8px 30px rgba(0,0,0,0.10)"
              : "0 2px 10px rgba(0,0,0,0.04)",
          }}
        >
          <div className="pl-2 pr-2 h-14 flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 rounded-full pl-2 pr-4 py-1.5 transition-colors duration-300 hover:bg-black/[0.04]"
            >
              <div
                className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold"
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

            <nav className="hidden md:flex items-center gap-1">
              {links.map((l) => {
                const active = pathname === l.href;
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="relative px-4 py-2 text-[13px] rounded-full transition-colors duration-200"
                    style={{
                      color: "var(--text)",
                      opacity: active ? 1 : 0.7,
                      fontWeight: active ? 600 : 450,
                    }}
                  >
                    {/* Shared layout id slides the pill between items rather
                        than cross-fading two of them. */}
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full -z-10"
                        style={{ background: "rgba(0,0,0,0.05)" }}
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    {l.label}
                  </Link>
                );
              })}
              <Link
                href="/contact"
                className="ml-2 text-[13px] font-medium px-5 py-2.5 rounded-full transition-transform duration-300 hover:scale-[1.03]"
                style={{ background: "var(--text)", color: "var(--bg)" }}
              >
                Get started
              </Link>
            </nav>

            <button
              className="md:hidden p-2.5"
              style={{ color: "var(--text)" }}
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col pt-24 px-6 pb-10 md:hidden"
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
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
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
