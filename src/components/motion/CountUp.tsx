"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/* Counts a figure up when it scrolls into view.

   Kept as plain rAF over a framer spring so the value can be re-formatted
   every frame — "R9,000" needs its prefix and thousands separator back on the
   way past, which a raw motion value can't do. */
export default function CountUp({
  value,
  prefix = "",
  suffix = "",
  duration = 1400,
  className = "",
  style,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setN(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // easeOutExpo — fast out of the gate, long settle
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setN(Math.round(value * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration, reduce]);

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}
      {n.toLocaleString("en-ZA")}
      {suffix}
    </span>
  );
}
