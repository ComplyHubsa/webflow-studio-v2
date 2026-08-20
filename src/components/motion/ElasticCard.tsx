"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/* The path has to exist before the first paint, otherwise the card flashes
   with no background at all — the SVG is now the only thing painting it. */
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/* A card whose outline behaves like a sheet of jelly under the pointer.

   The perimeter is sampled into N points, each with a rest position and an
   outward normal. The pointer pushes nearby points out along that normal; a
   spring pulls them home.

   Two things make it read as jelly rather than a dent:

   1. NEIGHBOUR coupling. Each point is also pulled toward the average
      displacement of the two beside it, so a push travels along the edge as a
      wave. Without this every point moves alone and you get a local bulge that
      looks stamped rather than stretched — this was the single biggest reason
      the original felt stiff.
   2. Very low damping with a soft spring. The old values (k 0.62, damping
      0.28) critically damped it: the edge reached the target and stopped dead.
      Soft-and-underdamped means it overshoots and wobbles a few times.

   Low damping plus coupling can go unstable, so displacement is hard-clamped
   and velocity is bled off near the clamp. */

interface Physics {
  /** Max outward push in px. */
  push?: number;
  /** Pointer catch radius in px. */
  influence?: number;
  /** Spring constant. Lower = looser, slower wobble. */
  stiffness?: number;
  /** Per-frame velocity bleed. Lower = wobbles longer. */
  damping?: number;
  /** Pull toward neighbours' displacement — this is what makes it a wave. */
  neighbour?: number;
}

/* Tuned by simulating the ring rather than by eye. At stiffness 0.14 /
   damping 0.055 / neighbour 0.28 the wobble spread across 21 of the 72 points
   and rang for 2.2s — the whole outline rippled, which reads as broken rather
   than springy. These values keep the deformation local (15 points, same as
   the original stiff version) while still ringing for ~1s, roughly 2.5x the
   original's 0.42s. */
const DEFAULTS: Required<Physics> = {
  push: 46,
  influence: 270,
  stiffness: 0.2,
  damping: 0.12,
  neighbour: 0.14,
};

const N = 72;

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

const perimeter = (w: number, h: number, r: number) =>
  2 * (w - 2 * r) + 2 * (h - 2 * r) + 2 * Math.PI * r;

function buildPath(pts: Array<{ x: number; y: number }>) {
  const n = pts.length;
  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    d += ` C ${(p1.x + (p2.x - p0.x) / 6).toFixed(1)} ${(p1.y + (p2.y - p0.y) / 6).toFixed(1)}` +
         ` ${(p2.x - (p3.x - p1.x) / 6).toFixed(1)} ${(p2.y - (p3.y - p1.y) / 6).toFixed(1)}` +
         ` ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d + " Z";
}

export default function ElasticCard({
  children,
  fill,
  defs,
  radius = 24,
  className = "",
  style,
  physics,
}: {
  children: React.ReactNode;
  /** SVG fill — a colour, or url(#id) paired with `defs`. */
  fill: string;
  defs?: React.ReactNode;
  radius?: number;
  className?: string;
  style?: React.CSSProperties;
  physics?: Physics;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const reduce = useReducedMotion();

  useIsoLayoutEffect(() => {
    if (reduce) return;
    const cardEl = cardRef.current;
    const svgEl = svgRef.current;
    const pathEl = pathRef.current;
    if (!cardEl || !svgEl || !pathEl) return;

    const P = { ...DEFAULTS, ...physics };
    const CLAMP = P.push * 1.9;

    let w = 0, h = 0;
    let rest: Array<{ x: number; y: number; nx: number; ny: number }> = [];
    let disp: Array<{ x: number; y: number; vx: number; vy: number }> = [];
    const mouse = { x: -9999, y: -9999, active: false };
    let rafId = 0;
    let retryId = 0;
    let running = true;
    let rectLeft = 0, rectTop = 0;

    const refreshRect = () => {
      const r = cardEl.getBoundingClientRect();
      rectLeft = r.left;
      rectTop = r.top;
    };

    /* Arrow consts, not hoisted `function` declarations: TypeScript won't
       carry the null-check narrowing on cardEl into a hoisted function,
       since one could in principle be called before the check runs. */
    const buildRest = () => {
      const rect = cardEl.getBoundingClientRect();
      if (rect.width === 0) {
        // Not laid out yet (hidden tab, display:none ancestor, pre-paint).
        // Track the id and check `running` so this retry can't outlive the
        // component — untracked, it spins forever holding the node.
        if (running) retryId = requestAnimationFrame(buildRest);
        return;
      }
      w = rect.width;
      h = rect.height;
      rectLeft = rect.left;
      rectTop = rect.top;
      svgEl.setAttribute("width", String(w));
      svgEl.setAttribute("height", String(h));

      const per = perimeter(w, h, radius);
      rest = [];
      disp = [];
      for (let i = 0; i < N; i++) {
        rest.push(ptAt((i / N) * per, w, h, radius));
        disp.push({ x: 0, y: 0, vx: 0, vy: 0 });
      }
      pathEl.setAttribute("d", buildPath(rest));
    };

    const tick = () => {
      if (!running) return;
      let active = false;

      for (let i = 0; i < N; i++) {
        const { x: rx, y: ry, nx, ny } = rest[i];
        const dx = rx - mouse.x;
        const dy = ry - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let targetX = 0, targetY = 0;
        if (mouse.active && dist < P.influence && dist > 0.01) {
          const mag = P.push * (1 - dist / P.influence) ** 2;
          const repX = dx / dist;
          const repY = dy / dist;
          const dot = Math.max(0, repX * nx + repY * ny);
          targetX = nx * mag * dot + repX * mag * (1 - dot) * 0.5;
          targetY = ny * mag * dot + repY * mag * (1 - dot) * 0.5;
        }

        const d = disp[i];
        const prev = disp[(i - 1 + N) % N];
        const next = disp[(i + 1) % N];

        // spring home + pull toward neighbours (the wave)
        const fx = (targetX - d.x) * P.stiffness
                 + ((prev.x + next.x) * 0.5 - d.x) * P.neighbour;
        const fy = (targetY - d.y) * P.stiffness
                 + ((prev.y + next.y) * 0.5 - d.y) * P.neighbour;

        d.vx = (d.vx + fx) * (1 - P.damping);
        d.vy = (d.vy + fy) * (1 - P.damping);
        d.x += d.vx;
        d.y += d.vy;

        // Hard clamp with velocity bleed — underdamped + coupled can diverge.
        const m = Math.hypot(d.x, d.y);
        if (m > CLAMP) {
          const s = CLAMP / m;
          d.x *= s;
          d.y *= s;
          d.vx *= 0.5;
          d.vy *= 0.5;
        }

        if (Math.abs(d.vx) > 0.004 || Math.abs(d.vy) > 0.004 ||
            Math.abs(d.x) > 0.04 || Math.abs(d.y) > 0.04) active = true;
      }

      pathEl.setAttribute(
        "d",
        buildPath(rest.map((p, i) => ({ x: p.x + disp[i].x, y: p.y + disp[i].y })))
      );

      rafId = active || mouse.active ? requestAnimationFrame(tick) : 0;
    };

    const startLoop = () => {
      if (rafId === 0 && running) rafId = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX - rectLeft;
      mouse.y = e.clientY - rectTop;
      mouse.active = true;
      startLoop();
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
      mouse.active = false;
      startLoop();
    };

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
      cancelAnimationFrame(retryId);
      ro.disconnect();
      cardEl.removeEventListener("mousemove", onMove);
      cardEl.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("scroll", refreshRect);
      window.removeEventListener("resize", refreshRect);
    };
  }, [reduce, radius, physics]);

  return (
    <div ref={cardRef} className={`relative ${className}`} style={style}>
      {/* Painted shape. Sits under the content and is allowed to bleed past
          the box so the wobble isn't cropped at the card edge. */}
      <svg
        ref={svgRef}
        aria-hidden="true"
        style={{ position: "absolute", top: 0, left: 0, overflow: "visible", pointerEvents: "none" }}
      >
        {defs && <defs>{defs}</defs>}
        {/* fill goes through style, not the attribute: a presentation
            attribute won't resolve var(--text). */}
        <path ref={pathRef} style={{ fill }} />
      </svg>
      {children}
    </div>
  );
}
