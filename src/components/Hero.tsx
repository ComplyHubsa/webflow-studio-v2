"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

function fadeUp(delay: number, y = 32) {
  return {
    initial: { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.75, delay, ease: EASE },
  } as const;
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let visible = true;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const COUNT = 24;
    const CONNECT = 80;
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      r:  Math.random() * 1.2 + 0.4,
      a:  Math.random() * 0.4 + 0.08,
    }));

    const draw = () => {
      if (!visible) { animId = requestAnimationFrame(draw); return; }
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(108,99,255,${p.a})`;
        ctx.fill();
      }

      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECT) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(108,99,255,${0.06 * (1 - d / CONNECT)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    animId = requestAnimationFrame(draw);

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(section);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      io.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.5 }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(108,99,255,0.1) 0%, transparent 70%)",
        }}
      />

      {/* Static orbs */}
      <div
        className="absolute w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(108,99,255,0.1) 0%, transparent 70%)",
          top: "10%", left: "5%",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(56,189,248,0.07) 0%, transparent 70%)",
          bottom: "15%", right: "8%",
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div {...fadeUp(0.1, 14)} className="mb-10">
          <span
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-5 py-2.5 rounded-full"
            style={{
              background: "rgba(108,99,255,0.1)",
              border: "1px solid rgba(108,99,255,0.3)",
              color: "#a78bfa",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#6c63ff" }} />
            South Africa&apos;s Premium Web Studio
          </span>
        </motion.div>

        {/* Headline */}
        <div className="mb-8">
          <motion.span
            {...fadeUp(0.22)}
            className="block text-[clamp(3rem,9vw,7.5rem)] font-bold leading-[0.92] tracking-tight text-white"
            style={{ fontFamily: "var(--font-space)" }}
          >
            Websites That
          </motion.span>
          <motion.span
            {...fadeUp(0.34)}
            className="block text-[clamp(3rem,9vw,7.5rem)] font-bold leading-[0.92] tracking-tight gradient-text"
            style={{ fontFamily: "var(--font-space)" }}
          >
            Make You Look
          </motion.span>
          <motion.span
            {...fadeUp(0.46)}
            className="block text-[clamp(3rem,9vw,7.5rem)] font-bold leading-[0.92] tracking-tight text-white"
            style={{ fontFamily: "var(--font-space)" }}
          >
            Like a Million Bucks
          </motion.span>
        </div>

        {/* Subtext */}
        <motion.p
          {...fadeUp(0.58, 14)}
          className="text-lg md:text-xl max-w-xl mx-auto mb-12 leading-[1.8]"
          style={{ color: "var(--muted)" }}
        >
          Custom-built websites for South African small businesses. Fast, modern,
          and designed to win customers — from just{" "}
          <span style={{ color: "var(--text)" }}>R3,500</span>.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.7, 14)}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link
            href="https://pay.yoco.com/r/4gv1Ng"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white font-semibold px-9 py-4 rounded-full text-base transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #6c63ff, #8b5cf6)",
              boxShadow: "0 0 30px rgba(108,99,255,0.4), 0 4px 20px rgba(0,0,0,0.3)",
            }}
          >
            Start Your Website
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 font-medium px-9 py-4 rounded-full text-base transition-all duration-300 hover:text-white"
            style={{ color: "var(--muted)", border: "1px solid var(--border)" }}
          >
            View Our Work
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          {...fadeUp(0.82, 14)}
          className="flex items-center justify-center gap-10 md:gap-16"
        >
          {[
            { value: "100%", label: "Custom Built" },
            { value: "48hr",  label: "Turnaround" },
            { value: "R3.5k", label: "Full Build" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="text-2xl font-bold mb-1.5"
                style={{ fontFamily: "var(--font-space)", color: "var(--text)" }}
              >
                {stat.value}
              </div>
              <div className="text-xs uppercase tracking-widest" style={{ color: "var(--muted)" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <span className="text-xs uppercase tracking-widest" style={{ color: "var(--muted)" }}>
          Scroll
        </span>
        <div
          className="w-px h-12"
          style={{
            background: "linear-gradient(to bottom, var(--accent), transparent)",
            animation: "scrollPulse 2s ease-in-out infinite",
          }}
        />
      </motion.div>
    </section>
  );
}
