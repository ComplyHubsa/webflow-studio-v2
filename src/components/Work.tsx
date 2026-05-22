"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import FadeIn from "./FadeIn";

const projects = [
  { id: 1, title: "Lumière", subtitle: "Luxury Beauty Salon", tags: ["Booking System", "SEO", "Animations"] },
  { id: 2, title: "Ember & Oak", subtitle: "Fine Dining Restaurant", tags: ["Reservations", "Menu", "Photography"] },
  { id: 3, title: "Titan Build", subtitle: "Construction Company", tags: ["Lead Gen", "Quote Form", "SEO"] },
  { id: 4, title: "Serenity", subtitle: "Wellness Spa", tags: ["Booking", "UI Design", "Mobile First"] },
  { id: 5, title: "Meridian", subtitle: "Accounting Firm", tags: ["Authority", "Trust Design", "SEO"] },
  { id: 6, title: "FlowFix", subtitle: "Plumbing Business", tags: ["Emergency CTA", "Lead Gen", "Mobile"] },
];

/* ─────────────────────────────────────────────────────────────────────────
   LUMIÈRE — Split layout: serum bottle + product card
───────────────────────────────────────────────────────────────────────── */
function LumiereMockup() {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: "#0d0a08" }}>
      <div
        className="absolute pointer-events-none"
        style={{
          right: "10%", top: "30%", width: 200, height: 200,
          background: "radial-gradient(circle, rgba(212,180,131,0.18) 0%, transparent 70%)",
        }}
      />
      <div
        className="flex items-center justify-between relative z-10"
        style={{ padding: "18px 24px", borderBottom: "1px solid rgba(212,180,131,0.1)" }}
      >
        <span style={{ color: "rgba(212,180,131,0.85)", fontSize: 11, fontWeight: 400, letterSpacing: "0.38em", fontFamily: "Georgia, serif" }}>
          L U M I È R E
        </span>
        <div className="flex gap-5">
          {["Atelier", "Serums", "Book"].map((n) => (
            <span key={n} style={{ color: "rgba(255,255,255,0.22)", fontSize: 8 }}>{n}</span>
          ))}
        </div>
      </div>

      <div className="absolute flex" style={{ top: 54, left: 0, right: 0, bottom: 0 }}>
        <div className="flex flex-col justify-center pl-6 pr-3" style={{ width: "60%" }}>
          <div style={{ color: "rgba(212,180,131,0.5)", fontSize: 7, letterSpacing: "0.4em", marginBottom: 10, textTransform: "uppercase" }}>
            New · Vitamin C
          </div>
          <div style={{ color: "#f0ece4", fontSize: 22, fontWeight: 300, lineHeight: 1.2, marginBottom: 10, fontFamily: "Georgia, serif", letterSpacing: "0.01em" }}>
            Skin That<br />Glows From<br /><em>Within.</em>
          </div>
          <div style={{ width: 24, height: 1, background: "rgba(212,180,131,0.35)", marginBottom: 12 }} />
          <div style={{ border: "1px solid rgba(212,180,131,0.2)", padding: "8px 10px", marginBottom: 12, background: "rgba(212,180,131,0.04)" }}>
            <div style={{ color: "rgba(212,180,131,0.85)", fontSize: 9, fontFamily: "Georgia, serif" }}>Glow Serum N°3</div>
            <div className="flex items-center justify-between" style={{ marginTop: 3 }}>
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 7 }}>30ml · Vitamin C</span>
              <span style={{ color: "#f0ece4", fontSize: 10, fontFamily: "Georgia, serif" }}>R 480</span>
            </div>
          </div>
          <div className="flex items-center gap-3" style={{ marginBottom: 10 }}>
            <span style={{ color: "#d4b483", fontSize: 8, letterSpacing: 1 }}>★★★★★</span>
            <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 7 }}>248 reviews</span>
          </div>
          <span style={{ display: "inline-block", border: "1px solid rgba(212,180,131,0.45)", color: "rgba(212,180,131,0.85)", fontSize: 8, padding: "7px 16px", letterSpacing: "0.22em", fontFamily: "Georgia, serif", alignSelf: "flex-start" }}>
            SHOP THE EDIT
          </span>
        </div>

        <div className="relative flex items-end justify-center" style={{ width: "40%", paddingBottom: 30 }}>
          <div className="absolute" style={{ bottom: 24, width: 64, height: 6, background: "radial-gradient(ellipse, rgba(212,180,131,0.25) 0%, transparent 70%)", filter: "blur(2px)" }} />
          <svg width="60" height="200" viewBox="0 0 60 200" fill="none">
            <rect x="20" y="6" width="20" height="22" rx="2" fill="#1a1410" stroke="rgba(212,180,131,0.5)" strokeWidth="0.8" />
            <rect x="22" y="28" width="16" height="4" fill="rgba(212,180,131,0.3)" />
            <rect x="24" y="32" width="12" height="8" fill="rgba(212,180,131,0.15)" stroke="rgba(212,180,131,0.4)" strokeWidth="0.6" />
            <rect x="8" y="40" width="44" height="140" rx="6" fill="url(#serumGrad)" stroke="rgba(212,180,131,0.55)" strokeWidth="0.8" />
            <rect x="12" y="46" width="4" height="120" rx="2" fill="rgba(255,235,180,0.18)" />
            <rect x="14" y="90" width="32" height="40" fill="rgba(20,14,8,0.85)" stroke="rgba(212,180,131,0.3)" strokeWidth="0.4" />
            <text x="30" y="105" textAnchor="middle" fontSize="5" fill="rgba(212,180,131,0.85)" fontFamily="Georgia, serif" letterSpacing="1">LUMIÈRE</text>
            <line x1="20" y1="110" x2="40" y2="110" stroke="rgba(212,180,131,0.3)" strokeWidth="0.3" />
            <text x="30" y="118" textAnchor="middle" fontSize="3.5" fill="rgba(255,255,255,0.5)" letterSpacing="0.8">VITAMIN C</text>
            <text x="30" y="125" textAnchor="middle" fontSize="3" fill="rgba(255,255,255,0.35)" letterSpacing="0.6">GLOW SERUM N°3</text>
            <defs>
              <linearGradient id="serumGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#c9954a" stopOpacity="0.55" />
                <stop offset="60%" stopColor="#7a4d18" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#3a200a" stopOpacity="0.95" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   EMBER & OAK — Fire headline + CSS plated dish + tasting menu
───────────────────────────────────────────────────────────────────────── */
function EmberOakMockup() {
  const dishes = [
    { name: "Wagyu Tartare", desc: "smoked yolk · capers", price: "R 285" },
    { name: "Coal-Fired Lamb", desc: "rosemary · jus", price: "R 420" },
    { name: "Dark Chocolate", desc: "olive oil · sea salt", price: "R 145" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden flex flex-col" style={{ background: "linear-gradient(170deg, #090100 0%, #1a0500 40%, #2e0d00 75%, #120300 100%)" }}>
      <div className="absolute pointer-events-none" style={{ top: 80, right: 30, width: 200, height: 200, background: "radial-gradient(circle, rgba(220,100,10,0.30) 0%, transparent 70%)" }} />

      <div className="flex items-center justify-between" style={{ padding: "14px 22px" }}>
        <span style={{ color: "rgba(201,162,39,0.7)", fontSize: 9, letterSpacing: "0.22em" }}>EMBER & OAK</span>
        <div className="flex gap-3 items-center">
          <span style={{ color: "rgba(255,255,255,0.22)", fontSize: 8 }}>Menu</span>
          <span style={{ color: "rgba(255,255,255,0.22)", fontSize: 8 }}>Wine</span>
          <span style={{ color: "rgba(201,162,39,0.85)", fontSize: 7, border: "1px solid rgba(201,162,39,0.4)", padding: "3px 8px", letterSpacing: "0.15em" }}>RESERVE</span>
        </div>
      </div>

      <div className="flex flex-1" style={{ padding: "10px 22px 0" }}>
        <div className="flex flex-col justify-center" style={{ flex: 1.4 }}>
          <div style={{ color: "#ffffff", fontSize: 28, fontWeight: 900, lineHeight: 0.92, letterSpacing: "-0.03em", textTransform: "uppercase" }}>
            Where<br />Fire Meets<br /><span style={{ color: "#d49b1a" }}>Flavour.</span>
          </div>
          <div style={{ color: "rgba(201,162,39,0.55)", fontSize: 7, letterSpacing: "0.25em", marginTop: 10 }}>EST. 2019 · CAPE TOWN</div>
          <div className="flex items-center gap-2" style={{ marginTop: 14 }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#4ade80" }} />
            <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 7 }}>Tonight · 4 tables left</span>
          </div>
        </div>

        <div className="relative flex items-center justify-center" style={{ width: 110 }}>
          <div style={{ width: 96, height: 96, borderRadius: "50%", background: "radial-gradient(circle, #f4ede0 0%, #d9cfb9 70%, #b0a288 100%)", boxShadow: "0 4px 18px rgba(0,0,0,0.6)", position: "relative" }}>
            <div className="absolute" style={{ top: 8, left: 8, right: 8, bottom: 8, borderRadius: "50%", border: "1px solid rgba(0,0,0,0.08)", background: "radial-gradient(circle, #faf4e8 30%, #e8dcc4 100%)" }} />
            <div className="absolute" style={{ top: 32, left: 24, width: 32, height: 24, borderRadius: "60% 40% 55% 45% / 50%", background: "linear-gradient(135deg, #5a2a10 0%, #8a4720 50%, #3a1a08 100%)", boxShadow: "inset -1px -2px 2px rgba(0,0,0,0.4)" }} />
            <div className="absolute" style={{ top: 50, left: 18, width: 48, height: 8, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(120,30,15,0.85) 0%, transparent 70%)", transform: "rotate(-15deg)" }} />
            <div className="absolute" style={{ top: 28, right: 22, width: 12, height: 4, borderRadius: "50%", background: "#4a6b2e", transform: "rotate(25deg)" }} />
            <div className="absolute" style={{ top: 60, right: 28, width: 6, height: 6, borderRadius: "50%", background: "#7ba23f" }} />
            <div className="absolute" style={{ top: 38, left: 60, width: 3, height: 3, borderRadius: "50%", background: "#c9a23f" }} />
          </div>
        </div>
      </div>

      <div style={{ margin: "10px 22px 0", padding: "8px 10px", border: "1px solid rgba(201,162,39,0.18)", background: "rgba(201,162,39,0.04)" }}>
        <div style={{ color: "rgba(201,162,39,0.65)", fontSize: 6, letterSpacing: "0.3em", marginBottom: 5 }}>TONIGHT&apos;S TASTING · 3 COURSES</div>
        {dishes.map((d, i) => (
          <div key={d.name} className="flex items-center justify-between" style={{ paddingTop: i === 0 ? 0 : 3, paddingBottom: 3, borderTop: i === 0 ? "none" : "1px solid rgba(201,162,39,0.08)" }}>
            <div>
              <div style={{ color: "#fff", fontSize: 8, fontWeight: 500 }}>{d.name}</div>
              <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 6, marginTop: 1 }}>{d.desc}</div>
            </div>
            <span style={{ color: "#d49b1a", fontSize: 8 }}>{d.price}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4" style={{ marginTop: 10, padding: "10px 22px", borderTop: "1px solid rgba(201,162,39,0.12)" }}>
        {["Starters", "Mains", "Desserts", "Wine"].map((item) => (
          <span key={item} style={{ color: "rgba(255,255,255,0.28)", fontSize: 7 }}>{item}</span>
        ))}
        <span style={{ color: "rgba(201,162,39,0.8)", fontSize: 7, fontWeight: 600, marginLeft: "auto" }}>Reserve →</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   TITAN BUILD — Stats bar, skyline SVG, project list
───────────────────────────────────────────────────────────────────────── */
function TitanBuildMockup() {
  const recentProjects = [
    { name: "N1 Bridge", loc: "Cape Town", year: "2024" },
    { name: "Harbour Refit", loc: "Durban", year: "2023" },
    { name: "Sandton Tower", loc: "JHB", year: "2023" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: "#0b0b0b" }}>
      <div className="flex" style={{ borderBottom: "2px solid #f97316" }}>
        {[["200+", "PROJECTS"], ["20yr", "EXPERIENCE"], ["100%", "ON TIME"]].map(([num, label], i) => (
          <div key={label} className="flex-1 text-center" style={{ padding: "8px 0", borderRight: i < 2 ? "1px solid rgba(249,115,22,0.2)" : "none" }}>
            <div style={{ color: "#f97316", fontSize: 14, fontWeight: 900, lineHeight: 1 }}>{num}</div>
            <div style={{ color: "rgba(255,255,255,0.28)", fontSize: 6, letterSpacing: "0.15em", marginTop: 2 }}>{label}</div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between" style={{ padding: "10px 20px" }}>
        <div className="flex items-center gap-2">
          <div style={{ width: 3, height: 18, background: "#f97316" }} />
          <span style={{ color: "#fff", fontSize: 12, fontWeight: 900, letterSpacing: "0.12em" }}>TITAN BUILD</span>
        </div>
        <span style={{ color: "#f97316", fontSize: 7, border: "1px solid rgba(249,115,22,0.35)", padding: "3px 9px" }}>FREE QUOTE →</span>
      </div>

      <div className="flex" style={{ padding: "8px 20px 0" }}>
        <div style={{ flex: 1 }}>
          <div style={{ color: "#f97316", fontSize: 7, letterSpacing: "0.25em", marginBottom: 6 }}>CIVIL ENGINEERING</div>
          <div style={{ color: "#fff", fontSize: 28, fontWeight: 900, lineHeight: 0.92, textTransform: "uppercase", letterSpacing: "-0.04em" }}>
            We Build<br />What <span style={{ color: "#f97316" }}>Others</span><br />Can&apos;t.
          </div>
        </div>

        <div className="relative" style={{ width: 90, paddingTop: 8 }}>
          <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
            <defs>
              <linearGradient id="skyGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f97316" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
              </linearGradient>
            </defs>
            <rect x="0" y="0" width="90" height="90" fill="url(#skyGlow)" />
            <rect x="6" y="22" width="14" height="68" fill="#1a1a1a" stroke="#f97316" strokeWidth="0.8" />
            <rect x="9" y="26" width="2" height="2" fill="#f97316" opacity="0.9" />
            <rect x="13" y="26" width="2" height="2" fill="#f97316" opacity="0.5" />
            <rect x="9" y="32" width="2" height="2" fill="#f97316" opacity="0.7" />
            <rect x="13" y="32" width="2" height="2" fill="#f97316" opacity="0.9" />
            <rect x="9" y="38" width="2" height="2" fill="#f97316" opacity="0.4" />
            <rect x="13" y="38" width="2" height="2" fill="#f97316" opacity="0.8" />
            <rect x="22" y="38" width="16" height="52" fill="#0d0d0d" stroke="rgba(249,115,22,0.6)" strokeWidth="0.7" />
            <rect x="26" y="44" width="2" height="2" fill="#f97316" opacity="0.7" />
            <rect x="32" y="44" width="2" height="2" fill="#f97316" opacity="0.5" />
            <rect x="26" y="52" width="2" height="2" fill="#f97316" opacity="0.9" />
            <rect x="32" y="52" width="2" height="2" fill="#f97316" opacity="0.4" />
            <rect x="40" y="30" width="20" height="60" fill="#161616" stroke="rgba(249,115,22,0.8)" strokeWidth="0.7" />
            <rect x="44" y="35" width="2" height="2" fill="#f97316" opacity="0.6" />
            <rect x="48" y="35" width="2" height="2" fill="#f97316" opacity="0.8" />
            <rect x="52" y="35" width="2" height="2" fill="#f97316" opacity="0.5" />
            <rect x="44" y="42" width="2" height="2" fill="#f97316" opacity="0.9" />
            <rect x="48" y="42" width="2" height="2" fill="#f97316" opacity="0.4" />
            <rect x="52" y="42" width="2" height="2" fill="#f97316" opacity="0.7" />
            <rect x="44" y="50" width="2" height="2" fill="#f97316" opacity="0.5" />
            <rect x="48" y="50" width="2" height="2" fill="#f97316" opacity="0.8" />
            <rect x="62" y="44" width="12" height="46" fill="#0d0d0d" stroke="rgba(249,115,22,0.5)" strokeWidth="0.6" />
            <rect x="65" y="50" width="2" height="2" fill="#f97316" opacity="0.6" />
            <rect x="69" y="50" width="2" height="2" fill="#f97316" opacity="0.4" />
            <line x1="14" y1="22" x2="14" y2="6" stroke="#f97316" strokeWidth="0.6" />
            <line x1="14" y1="6" x2="32" y2="6" stroke="#f97316" strokeWidth="0.6" />
            <line x1="14" y1="6" x2="2" y2="6" stroke="#f97316" strokeWidth="0.6" />
            <line x1="14" y1="6" x2="32" y2="12" stroke="rgba(249,115,22,0.5)" strokeWidth="0.3" />
            <line x1="14" y1="6" x2="2" y2="12" stroke="rgba(249,115,22,0.5)" strokeWidth="0.3" />
            <line x1="28" y1="6" x2="28" y2="12" stroke="#f97316" strokeWidth="0.5" />
          </svg>
        </div>
      </div>

      <div className="relative" style={{ marginTop: 16, height: 14, overflow: "hidden" }}>
        <div className="absolute" style={{ top: 4, left: "-5%", width: "110%", height: 4, background: "#f97316", transform: "rotate(-5deg)", transformOrigin: "left center" }} />
      </div>

      <div style={{ padding: "8px 20px 0" }}>
        <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 6, letterSpacing: "0.25em", marginBottom: 6 }}>RECENT PROJECTS</div>
        <div className="flex flex-col gap-1.5">
          {recentProjects.map((p) => (
            <div key={p.name} className="flex items-center justify-between" style={{ padding: "5px 8px", background: "rgba(249,115,22,0.05)", borderLeft: "2px solid #f97316" }}>
              <div className="flex items-center gap-2">
                <span style={{ color: "#fff", fontSize: 9, fontWeight: 700 }}>{p.name}</span>
                <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 7 }}>· {p.loc}</span>
              </div>
              <span style={{ color: "rgba(249,115,22,0.7)", fontSize: 7, fontWeight: 600 }}>{p.year}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   SERENITY — Minimal cream spa with botanical leaf bullets + treatment menu
───────────────────────────────────────────────────────────────────────── */
function SerenityMockup() {
  const treatments = [
    { name: "Hot Stone Massage", dur: "90 min", price: "R 450" },
    { name: "Aromatherapy Facial", dur: "60 min", price: "R 380" },
    { name: "Couples Retreat", dur: "120 min", price: "R 890" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden flex flex-col" style={{ background: "#f9f6f1" }}>
      <div className="flex items-center justify-between" style={{ padding: "18px 26px", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
        <span style={{ color: "#2d3a2e", fontSize: 10, fontWeight: 400, letterSpacing: "0.42em" }}>SERENITY</span>
        <div className="flex gap-4">
          {["Rituals", "Book", "About"].map((n) => (
            <span key={n} style={{ color: "rgba(0,0,0,0.25)", fontSize: 8 }}>{n}</span>
          ))}
        </div>
      </div>

      <div style={{ padding: "18px 26px 8px" }}>
        <div style={{ color: "rgba(0,0,0,0.25)", fontSize: 7, letterSpacing: "0.38em", marginBottom: 8, textTransform: "uppercase" }}>Wellness · Spa Retreat</div>
        <div style={{ color: "#1a1a1a", fontSize: 26, fontWeight: 300, lineHeight: 1.1, fontFamily: "Georgia, serif" }}>
          Be <em style={{ fontStyle: "italic", color: "#5c7a6e" }}>Still.</em>
        </div>
      </div>

      <div style={{ padding: "0 26px", flex: 1 }}>
        <div style={{ color: "rgba(45,58,46,0.5)", fontSize: 6, letterSpacing: "0.32em", marginTop: 6, marginBottom: 8, textTransform: "uppercase" }}>─── This Week&apos;s Rituals</div>
        <div className="flex flex-col gap-2.5">
          {treatments.map((t) => (
            <div key={t.name} className="flex items-center justify-between" style={{ paddingBottom: 8, borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
              <div className="flex items-start gap-2.5">
                <svg width="10" height="14" viewBox="0 0 10 14" style={{ marginTop: 2 }}>
                  <path d="M5 1 C2 3 1 7 2 10 C3 12 5 13 5 13 C5 13 7 12 8 10 C9 7 8 3 5 1Z" fill="rgba(92,122,110,0.18)" stroke="rgba(45,58,46,0.4)" strokeWidth="0.5" />
                  <line x1="5" y1="3" x2="5" y2="13" stroke="rgba(45,58,46,0.3)" strokeWidth="0.4" />
                </svg>
                <div>
                  <div style={{ color: "#1a1a1a", fontSize: 10, fontFamily: "Georgia, serif" }}>{t.name}</div>
                  <div style={{ color: "rgba(0,0,0,0.35)", fontSize: 7, marginTop: 1 }}>{t.dur}</div>
                </div>
              </div>
              <span style={{ color: "#2d3a2e", fontSize: 10, fontFamily: "Georgia, serif" }}>{t.price}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between" style={{ padding: "14px 26px", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        <span style={{ color: "rgba(0,0,0,0.4)", fontSize: 7 }}>Sea Point · Cape Town</span>
        <span style={{ color: "#2d3a2e", fontSize: 8, letterSpacing: "0.22em", borderBottom: "1px solid rgba(45,58,46,0.4)", paddingBottom: 2 }}>RESERVE YOUR RITUAL</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   MERIDIAN — Dark navy, bar chart dashboard, accounting firm
───────────────────────────────────────────────────────────────────────── */
function MeridianMockup() {
  const bars = [38, 52, 44, 65, 55, 78, 90];
  const monthLabels = ["J", "F", "M", "A", "M", "J", "J"];

  return (
    <div className="absolute inset-0 overflow-hidden flex flex-col" style={{ background: "linear-gradient(140deg, #060f1e 0%, #0b1e3a 100%)" }}>
      <div className="flex items-center justify-between" style={{ padding: "14px 20px", borderBottom: "1px solid rgba(129,140,248,0.1)" }}>
        <div className="flex items-center gap-2">
          <div style={{ width: 8, height: 8, background: "#818cf8", borderRadius: 2 }} />
          <span style={{ color: "#fff", fontSize: 11, fontWeight: 700, letterSpacing: "0.16em" }}>MERIDIAN</span>
        </div>
        <div className="flex gap-3 items-center">
          {["Services", "Team"].map((n) => (
            <span key={n} style={{ color: "rgba(255,255,255,0.22)", fontSize: 7 }}>{n}</span>
          ))}
          <span style={{ color: "#818cf8", fontSize: 7, border: "1px solid rgba(129,140,248,0.4)", padding: "3px 7px", borderRadius: 3 }}>Login</span>
        </div>
      </div>

      <div className="flex" style={{ padding: "16px 20px 0" }}>
        <div style={{ flex: 1.1, paddingRight: 8 }}>
          <div style={{ color: "#818cf8", fontSize: 6.5, letterSpacing: "0.35em", marginBottom: 8 }}>CHARTERED ACCOUNTANTS</div>
          <div style={{ color: "#fff", fontSize: 18, fontWeight: 700, lineHeight: 1.15, marginBottom: 8, letterSpacing: "-0.02em" }}>
            Your Numbers.<br />Our Edge.
          </div>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 8, lineHeight: 1.6, marginBottom: 12 }}>
            Tax, audit & advisory<br />for ambitious businesses.
          </div>
          <span style={{ background: "#818cf8", color: "#fff", fontSize: 7, fontWeight: 700, padding: "6px 12px", borderRadius: 4, letterSpacing: "0.06em", display: "inline-block" }}>
            BOOK CONSULT →
          </span>
        </div>

        <div style={{ width: 130, background: "rgba(129,140,248,0.06)", border: "1px solid rgba(129,140,248,0.18)", borderRadius: 6, padding: "8px 9px" }}>
          <div className="flex items-center justify-between" style={{ marginBottom: 6 }}>
            <span style={{ color: "#fff", fontSize: 7, fontWeight: 700 }}>Tax Year 2026</span>
            <span style={{ color: "#4ade80", fontSize: 6, background: "rgba(74,222,128,0.12)", padding: "1px 4px", borderRadius: 2 }}>ON TRACK</span>
          </div>
          <div className="grid grid-cols-2 gap-1.5" style={{ marginBottom: 7 }}>
            <div style={{ background: "rgba(0,0,0,0.25)", borderRadius: 3, padding: "4px 6px" }}>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 5.5, letterSpacing: "0.1em" }}>FILED</div>
              <div style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>234</div>
            </div>
            <div style={{ background: "rgba(0,0,0,0.25)", borderRadius: 3, padding: "4px 6px" }}>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 5.5, letterSpacing: "0.1em" }}>DUE</div>
              <div style={{ color: "#818cf8", fontSize: 12, fontWeight: 700 }}>12</div>
            </div>
          </div>
          <div style={{ color: "rgba(129,140,248,0.45)", fontSize: 5.5, letterSpacing: "0.15em", marginBottom: 3 }}>REVENUE YoY</div>
          <div className="flex items-end gap-1" style={{ height: 36 }}>
            {bars.map((h, i) => (
              <div key={i} className="flex flex-col items-center" style={{ flex: 1 }}>
                <div style={{ width: "100%", height: `${h}%`, background: i === bars.length - 1 ? "#818cf8" : `rgba(129,140,248,${0.14 + i * 0.08})`, borderRadius: "1px 1px 0 0" }} />
              </div>
            ))}
          </div>
          <div className="flex" style={{ marginTop: 2 }}>
            {monthLabels.map((m, i) => (
              <div key={i} style={{ flex: 1, textAlign: "center", color: "rgba(255,255,255,0.3)", fontSize: 5 }}>{m}</div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1" style={{ padding: "12px 20px 14px", marginTop: "auto" }}>
        {["SARS Registered", "SAICA Member", "200+ Clients", "15yr Track Record"].map((b) => (
          <span key={b} style={{ color: "rgba(129,140,248,0.6)", fontSize: 6.5, background: "rgba(129,140,248,0.07)", border: "1px solid rgba(129,140,248,0.18)", padding: "2px 7px", borderRadius: 99, whiteSpace: "nowrap" }}>{b}</span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   FLOWFIX — Emergency banner, big phone number, service price cards
───────────────────────────────────────────────────────────────────────── */
function FlowFixMockup() {
  const services = [
    { name: "Burst Pipe", time: "30min", price: "R 450" },
    { name: "Blocked Drain", time: "45min", price: "R 350" },
    { name: "Geyser Install", time: "2hr",  price: "R 1 200" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden flex flex-col" style={{ background: "#05101e" }}>
      <div className="flex items-center justify-center gap-2" style={{ background: "#c81c1c", padding: "8px" }}>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,0.95)" }} />
        <span style={{ color: "#fff", fontSize: 8, fontWeight: 800, letterSpacing: "0.2em" }}>24/7 EMERGENCY · CAPE TOWN</span>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,0.95)" }} />
      </div>

      <div className="flex items-center justify-between" style={{ padding: "10px 18px" }}>
        <div className="flex items-center gap-2">
          <div style={{ width: 4, height: 20, background: "#38bdf8", borderRadius: 2 }} />
          <span style={{ color: "#fff", fontSize: 14, fontWeight: 900, letterSpacing: "0.08em" }}>FLOWFIX</span>
        </div>
        <div className="flex gap-3 items-center">
          {["Services", "Areas"].map((n) => (
            <span key={n} style={{ color: "rgba(255,255,255,0.25)", fontSize: 7 }}>{n}</span>
          ))}
          <span style={{ background: "#c81c1c", color: "#fff", fontSize: 7, fontWeight: 800, padding: "3px 8px", borderRadius: 2, letterSpacing: "0.1em" }}>CALL</span>
        </div>
      </div>

      <div style={{ padding: "8px 18px 0" }}>
        <div style={{ color: "#38bdf8", fontSize: 7, letterSpacing: "0.3em", marginBottom: 4 }}>PLUMBING & DRAINAGE</div>
        <div style={{ color: "#ffffff", fontSize: 22, fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1 }}>073 127 5190</div>
        <div className="flex items-center gap-3" style={{ marginTop: 4 }}>
          <span style={{ color: "#fbbf24", fontSize: 8 }}>★★★★★</span>
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 7 }}>4.9 · 320 reviews</span>
        </div>
      </div>

      <div style={{ padding: "10px 18px 0" }}>
        <div style={{ color: "rgba(56,189,248,0.55)", fontSize: 6, letterSpacing: "0.28em", marginBottom: 6 }}>UPFRONT PRICING · NO CALLOUT FEE</div>
        <div className="flex flex-col gap-1.5">
          {services.map((s) => (
            <div key={s.name} className="flex items-center justify-between" style={{ padding: "6px 9px", background: "rgba(56,189,248,0.06)", border: "1px solid rgba(56,189,248,0.14)", borderRadius: 3 }}>
              <div className="flex items-center gap-2">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                  <path d="M14 6a4 4 0 1 1 4 4L7 21l-3-3L14 7v-1Z" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div>
                  <div style={{ color: "#fff", fontSize: 9, fontWeight: 600 }}>{s.name}</div>
                  <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 6.5 }}>arrive ~{s.time}</div>
                </div>
              </div>
              <div className="text-right">
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 5.5, letterSpacing: "0.1em" }}>FROM</div>
                <div style={{ color: "#38bdf8", fontSize: 10, fontWeight: 800 }}>{s.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-1" style={{ padding: "10px 18px 12px", marginTop: "auto" }}>
        {["Sea Point", "Camps Bay", "City Bowl", "Southern Suburbs"].map((t) => (
          <span key={t} style={{ color: "rgba(56,189,248,0.55)", fontSize: 6.5, background: "rgba(56,189,248,0.06)", border: "1px solid rgba(56,189,248,0.12)", padding: "2px 6px", borderRadius: 2 }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

const MOCKUPS: Record<number, () => React.ReactElement> = {
  1: LumiereMockup,
  2: EmberOakMockup,
  3: TitanBuildMockup,
  4: SerenityMockup,
  5: MeridianMockup,
  6: FlowFixMockup,
};

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const Mockup = MOCKUPS[project.id];
  return (
    <FadeIn delay={index * 0.09}>
      <motion.div
        className="relative rounded-2xl overflow-hidden cursor-default"
        style={{ height: 440 }}
        whileHover={{ scale: 1.02, y: -4 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <Mockup />
      </motion.div>
    </FadeIn>
  );
}

export default function Work({ hideHeader = false }: { hideHeader?: boolean }) {
  return (
    <section className="py-18 px-6">
      <div className="max-w-7xl mx-auto">
        {!hideHeader && (
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest mb-5 block" style={{ color: "var(--accent2)" }}>
                  Portfolio
                </span>
                <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-tight tracking-tight" style={{ fontFamily: "var(--font-space)" }}>
                  Work That{" "}
                  <span className="gradient-text">Speaks for Itself</span>
                </h2>
              </div>
              <Link href="/work" className="text-sm font-medium flex items-center gap-2 self-start md:self-auto transition-colors hover:text-white" style={{ color: "var(--accent2)" }}>
                View all projects →
              </Link>
            </div>
          </FadeIn>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
