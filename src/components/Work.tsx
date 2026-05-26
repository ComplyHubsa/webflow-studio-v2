"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import FadeIn from "./FadeIn";

const projects = [
  { id: 4, title: "Maison Sérène", subtitle: "Luxury Wellness Spa", tags: ["Hero Design", "Animations", "Brand Identity"], href: "/spa" },
  { id: 5, title: "Meridian", subtitle: "Accounting Firm", tags: ["Authority", "Trust Design", "SEO"], href: "/accountant" },
  { id: 6, title: "Flux Plumbing", subtitle: "Plumbing Business", tags: ["Water Animation", "Emergency CTA", "Lead Gen"], href: "/plumbing" },
  { id: 7, title: "Ironclad", subtitle: "Construction Company", tags: ["Hero Design", "Crane Animation", "Dark Industrial"], href: "/construction" },
  { id: 8, title: "Velour", subtitle: "Luxury Cosmetics Brand", tags: ["Interactive Shades", "Live Lipstick", "Mobile-First"], href: "/cosmetics" },
];

/* ─────────────────────────────────────────────────────────────────────────
   LUMIÈRE — Live iframe of /beauty, scaled to fit card
───────────────────────────────────────────────────────────────────────── */
function LumiereMockup() {
  return (
    <Link
      href="/beauty"
      target="_blank"
      className="absolute inset-0 block overflow-hidden"
      style={{ cursor: "pointer" }}
    >
      {/* Scaled live page */}
      <iframe
        src="/beauty"
        style={{
          width: 1280,
          height: 1400,
          transform: "scale(0.32)",
          transformOrigin: "top left",
          pointerEvents: "none",
          border: "none",
        }}
        tabIndex={-1}
        aria-hidden="true"
      />
      {/* Gold ● Live badge */}
      <div
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          gap: 5,
          background: "rgba(8,3,16,0.65)",
          backdropFilter: "blur(6px)",
          border: "1px solid rgba(212,165,83,0.45)",
          borderRadius: 20,
          padding: "4px 10px",
          fontSize: 10,
          fontWeight: 600,
          color: "#D4A553",
          letterSpacing: "0.06em",
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#D4A553",
            display: "inline-block",
          }}
        />
        Live
      </div>
    </Link>
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
   MAISON SÉRÈNE — Live iframe of the /spa hero, scaled to fit the card
───────────────────────────────────────────────────────────────────────── */
function SerenityMockup() {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: "#2A1E18" }}>
      <iframe
        src="/spa"
        title="Maison Sérène Spa Hero"
        scrolling="no"
        style={{
          border: "none",
          width: 1280,
          height: 1400,
          transformOrigin: "top left",
          transform: "scale(0.32)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 14,
          right: 14,
          background: "rgba(201,169,110,0.12)",
          border: "1px solid rgba(201,169,110,0.4)",
          color: "#C9A96E",
          fontSize: 9,
          fontWeight: 600,
          letterSpacing: "0.16em",
          padding: "4px 10px",
          borderRadius: 99,
          fontFamily: "Inter, sans-serif",
          textTransform: "uppercase",
          backdropFilter: "blur(6px)",
        }}
      >
        ● Live
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   MERIDIAN — Dark navy, bar chart dashboard, accounting firm
───────────────────────────────────────────────────────────────────────── */
function MeridianMockup() {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: "#060609" }}>
      <iframe
        src="/accountant"
        title="Meridian Accounting Hero"
        scrolling="no"
        style={{
          border: "none",
          width: 1280,
          height: 1400,
          transformOrigin: "top left",
          transform: "scale(0.32)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 14,
          right: 14,
          background: "rgba(0,255,136,0.10)",
          border: "1px solid rgba(0,255,136,0.35)",
          color: "#00FF88",
          fontSize: 9,
          fontWeight: 600,
          letterSpacing: "0.16em",
          padding: "4px 10px",
          borderRadius: 99,
          fontFamily: "Inter, sans-serif",
          textTransform: "uppercase",
          backdropFilter: "blur(6px)",
        }}
      >
        ● Live
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   FLOWFIX — Emergency banner, big phone number, service price cards
───────────────────────────────────────────────────────────────────────── */
function FluxPlumbingMockup() {
  return (
    <Link
      href="/plumbing"
      target="_blank"
      className="absolute inset-0 block overflow-hidden"
      style={{ cursor: "pointer" }}
    >
      <iframe
        src="/plumbing"
        scrolling="no"
        style={{
          width: 1280,
          height: 1400,
          transform: "scale(0.32)",
          transformOrigin: "top left",
          pointerEvents: "none",
          border: "none",
        }}
        tabIndex={-1}
        aria-hidden="true"
      />
      {/* Orange ● Live badge */}
      <div
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          gap: 5,
          background: "rgba(15,7,3,0.65)",
          backdropFilter: "blur(6px)",
          border: "1px solid rgba(232,72,30,0.5)",
          borderRadius: 20,
          padding: "4px 10px",
          fontSize: 10,
          fontWeight: 600,
          color: "#E8481E",
          letterSpacing: "0.06em",
        }}
      >
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#E8481E", display: "inline-block" }} />
        Live
      </div>
    </Link>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   IRONCLAD — Live iframe of /construction, scaled to fit card
───────────────────────────────────────────────────────────────────────── */
function IroncladMockup() {
  return (
    <Link
      href="/construction"
      target="_blank"
      className="absolute inset-0 block overflow-hidden"
      style={{ cursor: "pointer", background: "#080808" }}
    >
      <iframe
        src="/construction"
        scrolling="no"
        style={{
          width: 1280,
          height: 1400,
          transform: "scale(0.32)",
          transformOrigin: "top left",
          pointerEvents: "none",
          border: "none",
        }}
        tabIndex={-1}
        aria-hidden="true"
      />
      {/* Orange ● Live badge */}
      <div
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          gap: 5,
          background: "rgba(8,8,8,0.65)",
          backdropFilter: "blur(6px)",
          border: "1px solid rgba(255,87,34,0.5)",
          borderRadius: 20,
          padding: "4px 10px",
          fontSize: 10,
          fontWeight: 600,
          color: "#FF5722",
          letterSpacing: "0.06em",
        }}
      >
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#FF5722", display: "inline-block" }} />
        Live
      </div>
    </Link>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
/* ─────────────────────────────────────────────────────────────────────────
   VELOUR — Live iframe of /cosmetics, scaled to fit card
───────────────────────────────────────────────────────────────────────── */
function VelourMockup() {
  return (
    <Link
      href="/cosmetics"
      target="_blank"
      className="absolute inset-0 block overflow-hidden"
      style={{ background: "#F5E8DC", cursor: "pointer" }}
    >
      <iframe
        src="/cosmetics"
        style={{
          width: 1280,
          height: 1400,
          transform: "scale(0.32)",
          transformOrigin: "top left",
          pointerEvents: "none",
          border: "none",
        }}
        tabIndex={-1}
        aria-hidden="true"
      />
      <div
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          gap: 5,
          background: "rgba(42,12,22,0.65)",
          backdropFilter: "blur(6px)",
          border: "1px solid rgba(168,51,76,0.45)",
          borderRadius: 20,
          padding: "4px 10px",
          fontSize: 10,
          fontWeight: 600,
          color: "#A8334C",
          letterSpacing: "0.06em",
        }}
      >
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#A8334C", display: "inline-block" }} />
        Live
      </div>
    </Link>
  );
}

const MOCKUPS: Record<number, () => any> = {
  1: LumiereMockup,
  2: EmberOakMockup,
  3: TitanBuildMockup,
  4: SerenityMockup,
  5: MeridianMockup,
  6: FluxPlumbingMockup,
  7: IroncladMockup,
  8: VelourMockup,
};

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const Mockup = MOCKUPS[project.id];
  const hasHref = "href" in project && project.href;

  const card = (
    <motion.div
      className="relative rounded-2xl overflow-hidden"
      style={{ height: "min(440px, 70vw)", cursor: hasHref ? "pointer" : "default" }}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <Mockup />
    </motion.div>
  );
  return (
    <FadeIn delay={index * 0.09}>
      {hasHref ? (
        <Link href={project.href as string} target="_blank" rel="noopener noreferrer">
          {card}
        </Link>
      ) : card}
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
