"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import FadeIn from "./FadeIn";

/* ─── Spring / geometry config ───────────────────────────────────────────── */
const N          = 64;
const MAX_PUSH   = 48;    // bigger outward bulge
const INFLUENCE  = 240;   // wider catch radius
const SPRING_K   = 0.62;  // snappier follow
const DAMPING    = 0.28;  // less damping = more springy oscillation
const BR         = 24;

/* ─── Point + outward normal at arc-length s on a rounded rect ───────────── */
function ptAt(s: number, w: number, h: number, r: number) {
  const PI = Math.PI;
  const cL = 0.5 * PI * r;
  const tL = w - 2 * r;
  const rL = h - 2 * r;
  const bL = w - 2 * r;
  const lL = h - 2 * r;

  if (s < tL) return { x: r + s, y: 0, nx: 0, ny: -1 };
  s -= tL;
  if (s < cL) {
    const a = -PI / 2 + (s / cL) * (PI / 2);
    return { x: w - r + r * Math.cos(a), y: r + r * Math.sin(a), nx: Math.cos(a), ny: Math.sin(a) };
  }
  s -= cL;
  if (s < rL) return { x: w, y: r + s, nx: 1, ny: 0 };
  s -= rL;
  if (s < cL) {
    const a = (s / cL) * (PI / 2);
    return { x: w - r + r * Math.cos(a), y: h - r + r * Math.sin(a), nx: Math.cos(a), ny: Math.sin(a) };
  }
  s -= cL;
  if (s < bL) return { x: w - r - s, y: h, nx: 0, ny: 1 };
  s -= bL;
  if (s < cL) {
    const a = PI / 2 + (s / cL) * (PI / 2);
    return { x: r + r * Math.cos(a), y: h - r + r * Math.sin(a), nx: Math.cos(a), ny: Math.sin(a) };
  }
  s -= cL;
  if (s < lL) return { x: 0, y: h - r - s, nx: -1, ny: 0 };
  s -= lL;
  const a = PI + (s / cL) * (PI / 2);
  return { x: r + r * Math.cos(a), y: r + r * Math.sin(a), nx: Math.cos(a), ny: Math.sin(a) };
}

function perimeter(w: number, h: number, r: number) {
  return 2 * (w - 2 * r) + 2 * (h - 2 * r) + 2 * Math.PI * r;
}

function buildPath(pts: Array<{ x: number; y: number }>) {
  const n = pts.length;
  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)} ${cp2x.toFixed(1)} ${cp2y.toFixed(1)} ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d + " Z";
}

function useElasticBody(
  cardRef: React.RefObject<HTMLDivElement | null>,
  svgRef:  React.RefObject<SVGSVGElement | null>,
  pathRef: React.RefObject<SVGPathElement | null>,
) {
  useEffect(() => {
    const card = cardRef.current;
    const svg  = svgRef.current;
    const path = pathRef.current;
    if (!card || !svg || !path) return;

    const cardEl = card;
    const svgEl  = svg;
    const pathEl = path;

    let w = 0, h = 0;
    let rest: Array<{ x: number; y: number; nx: number; ny: number }> = [];
    let disp: Array<{ x: number; y: number; vx: number; vy: number }> = [];
    const mouse = { x: -9999, y: -9999, active: false };
    let rafId = 0;
    let running = true;
    /* Cached card position — avoids layout thrash from calling
       getBoundingClientRect() on every mousemove. Refreshed on
       resize (ResizeObserver) + scroll. */
    let rectLeft = 0, rectTop = 0;

    function refreshRect() {
      const r = cardEl.getBoundingClientRect();
      rectLeft = r.left;
      rectTop  = r.top;
    }

    function buildRest() {
      const rect = cardEl.getBoundingClientRect();
      if (rect.width === 0) {
        requestAnimationFrame(buildRest);
        return;
      }
      w = rect.width;
      h = rect.height;
      rectLeft = rect.left;
      rectTop  = rect.top;
      svgEl.setAttribute("width",  String(w));
      svgEl.setAttribute("height", String(h));

      const P = perimeter(w, h, BR);
      rest = [];
      disp = [];
      for (let i = 0; i < N; i++) {
        rest.push(ptAt((i / N) * P, w, h, BR));
        disp.push({ x: 0, y: 0, vx: 0, vy: 0 });
      }
      pathEl.setAttribute("d", buildPath(rest));
    }

    function tick() {
      if (!running) return;

      let active = false;

      for (let i = 0; i < N; i++) {
        const { x: rx, y: ry, nx, ny } = rest[i];
        const dx   = rx - mouse.x;
        const dy   = ry - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let targetX = 0, targetY = 0;
        if (mouse.active && dist < INFLUENCE && dist > 0.01) {
          const mag  = MAX_PUSH * (1 - dist / INFLUENCE) ** 2;
          const repX = dx / dist;
          const repY = dy / dist;
          const dot  = Math.max(0, repX * nx + repY * ny);
          targetX = nx * mag * dot + repX * mag * (1 - dot) * 0.5;
          targetY = ny * mag * dot + repY * mag * (1 - dot) * 0.5;
        }

        const d  = disp[i];
        const fx = (targetX - d.x) * SPRING_K;
        const fy = (targetY - d.y) * SPRING_K;
        d.vx = (d.vx + fx) * (1 - DAMPING);
        d.vy = (d.vy + fy) * (1 - DAMPING);
        d.x += d.vx;
        d.y += d.vy;

        if (
          Math.abs(d.vx) > 0.004 || Math.abs(d.vy) > 0.004 ||
          Math.abs(d.x)  > 0.04  || Math.abs(d.y)  > 0.04
        ) active = true;
      }

      pathEl.setAttribute(
        "d",
        buildPath(rest.map((p, i) => ({ x: p.x + disp[i].x, y: p.y + disp[i].y })))
      );

      rafId = (active || mouse.active) ? requestAnimationFrame(tick) : 0;
    }

    function startLoop() {
      if (rafId === 0 && running) rafId = requestAnimationFrame(tick);
    }

    function onMove(e: MouseEvent) {
      mouse.x = e.clientX - rectLeft;
      mouse.y = e.clientY - rectTop;
      mouse.active = true;
      startLoop();
    }

    function onLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
      mouse.active = false;
      startLoop();
    }

    const ro = new ResizeObserver(buildRest);
    ro.observe(cardEl);

    cardEl.addEventListener("mousemove", onMove, { passive: true });
    cardEl.addEventListener("mouseleave", onLeave);
    window.addEventListener("scroll", refreshRect, { passive: true });
    window.addEventListener("resize", refreshRect, { passive: true });

    buildRest();
    rafId = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      ro.disconnect();
      cardEl.removeEventListener("mousemove", onMove);
      cardEl.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("scroll", refreshRect);
      window.removeEventListener("resize", refreshRect);
    };
  }, [cardRef, svgRef, pathRef]);
}

export default function FreeConcept() {
  const cardRef = useRef<HTMLDivElement>(null);
  const svgRef  = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useElasticBody(cardRef, svgRef, pathRef);

  return (
    <section className="py-18 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div ref={cardRef} className="relative rounded-3xl" style={{ background: "linear-gradient(160deg, #f0eeff 0%, #e8e6ff 25%, #ede8ff 55%, #e6ecff 100%)" }}>
            {/* SVG body — warping card shape, paints beyond bounds */}
            <svg
              ref={svgRef}
              aria-hidden="true"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                overflow: "visible",
                pointerEvents: "none",
              }}
            >
              <defs>
                <linearGradient id="freeConceptBg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%"   stopColor="#f0eeff" />
                  <stop offset="40%"  stopColor="#e8e6ff" />
                  <stop offset="100%" stopColor="#e6ecff" />
                </linearGradient>
              </defs>
              <path ref={pathRef} fill="url(#freeConceptBg)" />
            </svg>

            {/* Decoration layer — clipped to rounded rect */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(108,99,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(108,99,255,1) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
              <div
                className="absolute -top-24 -right-24 w-96 h-96 rounded-full hidden sm:block"
                style={{
                  background: "radial-gradient(circle, rgba(108,99,255,0.18) 0%, transparent 70%)",
                  filter: "blur(50px)",
                }}
              />
              <div
                className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full hidden sm:block"
                style={{
                  background: "radial-gradient(circle, rgba(167,139,250,0.22) 0%, transparent 70%)",
                  filter: "blur(50px)",
                }}
              />
            </div>

            {/* Content */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start p-6 sm:p-10 md:p-14 lg:p-16">
              {/* Left */}
              <div>
                <div
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-8"
                  style={{
                    background: "rgba(108,99,255,0.12)",
                    border: "1px solid rgba(108,99,255,0.25)",
                    color: "#6c63ff",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#6c63ff" }} />
                  Zero Risk
                </div>

                <h2
                  className="font-bold leading-[1.0] tracking-tight mb-6"
                  style={{
                    fontFamily: "var(--font-space)",
                    fontSize: "clamp(2rem, 3.5vw, 3.5rem)",
                    color: "#0d0b1a",
                  }}
                >
                  Get Your{" "}
                  <span
                    style={{
                      background: "linear-gradient(135deg, #6c63ff, #a78bfa)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Free Concept
                  </span>{" "}
                  First.
                </h2>

                <p
                  className="text-base leading-[1.85] mb-8"
                  style={{ color: "#4a4870", maxWidth: "42ch" }}
                >
                  We research your business, your competitors, and your audience
                  — then build you a fully custom design concept at{" "}
                  <strong style={{ color: "#0d0b1a" }}>absolutely no charge</strong>.
                  You only pay if you love what you see.
                </p>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 font-bold px-7 py-4 rounded-full text-white text-sm transition-all duration-300 hover:scale-105 hover:shadow-xl"
                    style={{
                      background: "linear-gradient(135deg, #6c63ff, #8b5cf6)",
                      boxShadow: "0 8px 30px rgba(108,99,255,0.35)",
                    }}
                  >
                    Claim Your Free Concept
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                  <span className="text-sm" style={{ color: "#9490b5" }}>
                    No credit card. No commitment.
                  </span>
                </div>
              </div>

              {/* Right: steps */}
              <div className="flex flex-col gap-4">
                {[
                  {
                    step: "01",
                    title: "We research your business",
                    desc: "We study your industry, competitors, and target customers before touching a pixel.",
                  },
                  {
                    step: "02",
                    title: "We design a custom concept",
                    desc: "A real, full homepage design — built specifically for your business. Not a template.",
                  },
                  {
                    step: "03",
                    title: "You decide",
                    desc: "Love it? We build the full site for R3,500. Not feeling it? Walk away — no charge, no awkward conversation.",
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="flex gap-4 items-start p-5 rounded-2xl"
                    style={{
                      background: "rgba(108,99,255,0.07)",
                      border: "1px solid rgba(108,99,255,0.14)",
                      transition: "transform 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "translateX(4px)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
                  >
                    <div
                      className="text-xs font-bold tabular-nums flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-0.5"
                      style={{ background: "rgba(108,99,255,0.14)", color: "#6c63ff" }}
                    >
                      {item.step}
                    </div>
                    <div>
                      <div className="text-sm font-semibold mb-1" style={{ color: "#0d0b1a" }}>
                        {item.title}
                      </div>
                      <div className="text-sm leading-[1.7]" style={{ color: "#6b6890" }}>
                        {item.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
