"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, useReducedMotion } from "framer-motion";

/* A particle field that acts out what the Sales Brain actually does, pinned
   while the page scrolls past it.

   Four stages, and each is the real pipeline rather than decoration:
     1. Everything      — the raw pool, unsorted
     2. Most of it dies — the checker throwing out closed businesses and dead
                          numbers. This is the honest bit: the pile visibly
                          collapses, because most of a scraped list is rubbish.
     3. Four managers   — what survives sorts into the teams that handle it
     4. One message     — it converges to a single point, which is all the
                          prospect ever sees

   Canvas 2D, not WebGL. A few thousand flat dots is exactly what a 2D context
   is good at, and it avoids adding a 3D dependency to a page that already
   carries a video. Particle targets are recomputed on resize, not stored in
   screen space, so the composition survives a window drag.

   Colour stays inside the site palette: ink dots with bronze for the ones that
   survive the cull, so the eye follows the survivors without a new hue. */

/* The reference (cognexa.co.za) runs three.js + GSAP on a WebGL2 canvas. That
   is ~600KB of JavaScript to draw a field of small flat dots, which a 2D
   context does well for nothing — and this site's pitch is that it loads fast.
   The gap that WebGL would close is depth, so depth is faked per particle
   instead: a pseudo-z drives size and alpha, which is what actually reads as
   volume at this dot size. 2D also lets the count go up rather than down. */
const COUNT = 2600;
const STAGES = [
  { label: "Everything", note: "A raw list of businesses, unsorted and unverified." },
  { label: "Most of it dies", note: "Closed, already sorted, or the number won't reach a human." },
  { label: "Four managers", note: "What survives is split between the teams that handle it." },
  { label: "One message", note: "The prospect only ever sees the last step." },
];

type P = {
  x: number; y: number;       // current
  tx: number; ty: number;     // target
  seed: number;
  alive: boolean;             // survives the cull
  drift: number;
  z: number;                  // pseudo-depth: drives size and alpha
};

export default function SalesBrainField() {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();
  const [stage, setStage] = useState(0);
  const progress = useRef(0);

  const { scrollYProgress } = useScroll({
    target: wrap,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progress.current = v;
    const s = Math.min(STAGES.length - 1, Math.floor(v * STAGES.length * 0.999));
    setStage(s);
  });

  useEffect(() => {
    if (reduce) return;
    const cv = canvas.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0, dpr = 1;
    let parts: P[] = [];
    let raf = 0;
    let running = true;

    /* Deterministic 0..1 hash. Using `% 1` here returns NEGATIVE values for
       half the inputs, which silently cut survivors from the intended ~34% to
       18% and left the four clusters too sparse to read. Subtracting the floor
       is what actually gives a unit range. */
    const rand = (n: number) => {
      const v = Math.sin(n * 12.9898) * 43758.5453;
      return v - Math.floor(v);
    };

    const build = () => {
      const r = cv.getBoundingClientRect();
      dpr = Math.min(2, window.devicePixelRatio || 1);
      w = r.width; h = r.height;
      cv.width = Math.floor(w * dpr);
      cv.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      parts = Array.from({ length: COUNT }, (_, i) => {
        const s = i / COUNT;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          tx: 0, ty: 0,
          seed: s,
          // Deterministic so the same dots always survive — a reshuffle on
          // every scroll would read as noise rather than a filter.
          alive: rand(i + 1) > 0.65,
          drift: 0.4 + rand(i + 7) * 0.9,
          z: rand(i + 31),
        };
      });
    };

    const targets = (p: P, i: number, t: number) => {
      const cx = w / 2, cy = h / 2;
      const a = p.seed * Math.PI * 2 * 9;
      const spread = Math.min(w, h) * 0.42;

      // 1: loose cloud
      const c1x = cx + Math.cos(a) * spread * (0.35 + rand(i + 3));
      const c1y = cy + Math.sin(a * 1.3) * spread * (0.35 + rand(i + 5));

      // 2: survivors hold, the rest fall away and fade
      const c2x = p.alive ? c1x * 0.9 + cx * 0.1 : c1x + (rand(i + 11) - 0.5) * 520;
      const c2y = p.alive ? c1y * 0.9 + cy * 0.1 : c1y + 240 + rand(i + 13) * 300;

      // 3: four clusters
      const g = i % 4;
      const gx = cx + (g % 2 === 0 ? -1 : 1) * Math.min(w * 0.22, 240);
      const gy = cy + (g < 2 ? -1 : 1) * Math.min(h * 0.2, 120);
      const c3x = gx + Math.cos(a) * 62 * (0.4 + rand(i + 17));
      const c3y = gy + Math.sin(a) * 62 * (0.4 + rand(i + 19));

      // 4: converge to one point
      const c4x = cx + Math.cos(a) * 10 * rand(i + 23);
      const c4y = cy + Math.sin(a) * 10 * rand(i + 29);

      const seg = t * 3; // three transitions across four stages
      let ax = c1x, ay = c1y, bx = c2x, by = c2y, k = seg;
      if (seg >= 2) { ax = c3x; ay = c3y; bx = c4x; by = c4y; k = seg - 2; }
      else if (seg >= 1) { ax = c2x; ay = c2y; bx = c3x; by = c3y; k = seg - 1; }
      const e = k * k * (3 - 2 * k); // smoothstep
      p.tx = ax + (bx - ax) * e;
      p.ty = ay + (by - ay) * e;
    };

    const draw = () => {
      if (!running) return;
      const t = progress.current;
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        targets(p, i, t);
        p.x += (p.tx - p.x) * 0.055 * p.drift;
        p.y += (p.ty - p.y) * 0.055 * p.drift;

        // Culled dots fade out through stage 2 and never come back.
        let alpha = 1;
        if (!p.alive) alpha = Math.max(0, 1 - Math.max(0, t * 3 - 0.55) * 1.6);
        if (alpha <= 0.01) continue;

        // Near dots are bigger and darker, far ones smaller and fainter —
        // this is the only thing standing in for real depth.
        const size = 1 + p.z * 1.6;
        const depth = 0.35 + p.z * 0.65;
        const survivor = p.alive && t * 3 > 0.9;
        ctx.fillStyle = survivor
          ? `rgba(138, 106, 47, ${0.5 * alpha * depth})`
          : `rgba(29, 29, 31, ${0.34 * alpha * depth})`;
        ctx.fillRect(p.x, p.y, size, size);
      }
      raf = requestAnimationFrame(draw);
    };

    build();
    const ro = new ResizeObserver(build);
    ro.observe(cv);
    raf = requestAnimationFrame(draw);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [reduce]);

  if (reduce) {
    return (
      <div className="max-w-3xl mx-auto px-6 flex flex-col gap-4">
        {STAGES.map((s) => (
          <div key={s.label} className="card p-6">
            <h3 className="display text-[19px] mb-2" style={{ color: "var(--text)" }}>
              {s.label}
            </h3>
            <p className="text-[15px] leading-[1.75]" style={{ color: "var(--muted)" }}>
              {s.note}
            </p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={wrap} className="relative" style={{ height: "340vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(65% 55% at 50% 48%, var(--surface) 0%, var(--bg) 72%)",
          }}
        />
        <canvas ref={canvas} className="absolute inset-0 w-full h-full" />

        <div className="absolute inset-x-0 bottom-20 px-6">
          <div className="max-w-md mx-auto text-center">
            <motion.div
              key={stage}
              initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="eyebrow mb-3">
                {String(stage + 1).padStart(2, "0")}
              </div>
              <h3
                className="display text-[clamp(1.5rem,2.6vw,2rem)] mb-3"
                style={{ color: "var(--text)" }}
              >
                {STAGES[stage].label}
              </h3>
              <p className="text-[15px] leading-[1.7]" style={{ color: "var(--muted)" }}>
                {STAGES[stage].note}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
