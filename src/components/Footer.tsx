"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isStandaloneRoute } from "@/lib/routes";

const columns = [
  {
    heading: "Products",
    links: [
      { href: "/bookdirect", label: "BookDirect" },
      { href: "/sales-brain", label: "Sales Brain" },
      { href: "/websites", label: "Websites" },
      { href: "/care", label: "Care Plan" },
    ],
  },
  {
    heading: "Studio",
    links: [
      { href: "/work", label: "Work" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export default function Footer() {
  const pathname = usePathname();
  if (isStandaloneRoute(pathname)) return null;

  return (
    <footer
      className="px-6 pt-16 pb-12"
      style={{ background: "var(--surface)", borderTop: "1px solid var(--border)" }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          <div className="col-span-2 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
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
                O&apos;Gorman Studio
              </span>
            </Link>
            <p
              className="text-[14px] leading-[1.7] max-w-xs"
              style={{ color: "var(--muted)" }}
            >
              Software for South African businesses — direct booking, sales
              automation and the websites they run on.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <h4
                className="text-[11px] font-semibold uppercase tracking-[0.14em] mb-4"
                style={{ color: "var(--muted)" }}
              >
                {col.heading}
              </h4>
              <nav className="flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="text-[14px] transition-opacity hover:opacity-60"
                    style={{ color: "var(--text)" }}
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>

        <div
          className="pt-7 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-[13px]"
          style={{ borderTop: "1px solid var(--border)", color: "var(--muted)" }}
        >
          <p>© {new Date().getFullYear()} O&apos;Gorman Studio</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a
              href="https://wa.me/27731275190"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-60"
              style={{ color: "var(--text)" }}
            >
              WhatsApp 073 127 5190
            </a>
            <a
              href="mailto:webflowstudiosa@gmail.com"
              className="transition-opacity hover:opacity-60"
              style={{ color: "var(--text)" }}
            >
              webflowstudiosa@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
