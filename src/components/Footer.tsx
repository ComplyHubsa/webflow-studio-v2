import Link from "next/link";
import { Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="relative py-24 px-6 mt-0"
      style={{
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
                style={{ background: "linear-gradient(135deg, #6c63ff, #38bdf8)" }}
              >
                W
              </div>
              <span
                className="text-white font-semibold text-lg"
                style={{ fontFamily: "var(--font-space)" }}
              >
                Webflow Studio
              </span>
            </div>
            <p className="text-[#7b7a8e] text-sm leading-relaxed max-w-xs">
              Premium custom websites for South African small businesses. Built
              to impress, designed to convert.
            </p>
          </div>

          <div>
            <h4
              className="text-white font-semibold mb-4 text-sm uppercase tracking-widest"
              style={{ color: "var(--muted)" }}
            >
              Navigation
            </h4>
            <nav className="flex flex-col gap-3">
              {[
                { href: "/", label: "Home" },
                { href: "/work", label: "Our Work" },
                { href: "/contact", label: "Contact" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-[#7b7a8e] hover:text-white text-sm transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4
              className="text-white font-semibold mb-4 text-sm uppercase tracking-widest"
              style={{ color: "var(--muted)" }}
            >
              Get in Touch
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:webflowstudiosa@gmail.com"
                className="flex items-center gap-2 text-[#7b7a8e] hover:text-white text-sm transition-colors"
              >
                <Mail size={14} />
                webflowstudiosa@gmail.com
              </a>
              <a
                href="tel:0731275190"
                className="flex items-center gap-2 text-[#7b7a8e] hover:text-white text-sm transition-colors"
              >
                <Phone size={14} />
                073 127 5190
              </a>
              <a
                href="https://wa.me/27731275190"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium mt-1 transition-colors"
                style={{ color: "var(--accent2)" }}
              >
                WhatsApp Us →
              </a>
            </div>
          </div>
        </div>

        <div
          className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs"
          style={{
            borderTop: "1px solid var(--border)",
            color: "var(--muted)",
          }}
        >
          <p>© {new Date().getFullYear()} Webflow Studio. All rights reserved.</p>
          <p>Made with care in South Africa 🇿🇦</p>
        </div>
      </div>
    </footer>
  );
}
