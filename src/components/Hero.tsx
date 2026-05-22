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

/* ─── WebGL fluid silk shader ─────────────────────────────────────────────── */
const VERT = `
  attribute vec2 a_pos;
  void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
  precision mediump float;
  uniform float u_time;
  uniform vec2  u_mouse;
  uniform vec2  u_res;

  void main() {
    vec2 uv = gl_FragCoord.xy / u_res;
    uv.y = 1.0 - uv.y;

    /* mouse in normalised coords (flipped y to match uv) */
    vec2 m = vec2(u_mouse.x / u_res.x, 1.0 - u_mouse.y / u_res.y);

    float t = u_time * 0.22;
    vec2 ar = vec2(u_res.x / u_res.y, 1.0); /* aspect correction */

    /* ── 6 drifting blob centres ── */
    vec2 p0 = vec2(0.18 + 0.16 * sin(t * 0.71),        0.22 + 0.18 * cos(t * 0.53));
    vec2 p1 = vec2(0.78 + 0.14 * cos(t * 0.63),        0.30 + 0.20 * sin(t * 0.41));
    vec2 p2 = vec2(0.50 + 0.20 * sin(t * 0.89 + 1.2),  0.72 + 0.16 * cos(t * 0.67));
    vec2 p3 = vec2(0.14 + 0.11 * cos(t * 0.57 + 2.0),  0.78 + 0.14 * sin(t * 0.73));
    vec2 p4 = vec2(0.87 + 0.09 * sin(t * 0.45 + 0.8),  0.14 + 0.11 * cos(t * 0.82));
    vec2 p5 = vec2(0.55 + 0.18 * cos(t * 0.59 + 3.1),  0.48 + 0.19 * sin(t * 0.48));

    /* ── blob colours (pastel silk) ── */
    vec3 c0 = vec3(1.00, 0.76, 0.82); /* rose pink          */
    vec3 c1 = vec3(1.00, 0.91, 0.76); /* warm peach-cream   */
    vec3 c2 = vec3(0.86, 0.82, 1.00); /* soft lavender      */
    vec3 c3 = vec3(0.82, 0.94, 0.86); /* mint green         */
    vec3 c4 = vec3(1.00, 0.86, 0.94); /* blush              */
    vec3 c5 = vec3(0.80, 0.91, 1.00); /* sky blue           */
    vec3 cm = vec3(0.93, 0.88, 1.00); /* mouse — cool lilac */

    float R  = 0.38; /* blob spread radius */
    float Rm = 0.28; /* mouse blob radius  */

    #define W(p, r) exp(-dot((uv - p) * ar, (uv - p) * ar) / ((r) * (r)))

    float w0 = W(p0, R);
    float w1 = W(p1, R);
    float w2 = W(p2, R);
    float w3 = W(p3, R);
    float w4 = W(p4, R);
    float w5 = W(p5, R);
    float wm = W(m,  Rm) * 0.85;

    float total = w0 + w1 + w2 + w3 + w4 + w5 + wm + 0.0001;
    vec3 col = (w0*c0 + w1*c1 + w2*c2 + w3*c3 + w4*c4 + w5*c5 + wm*cm) / total;

    /* fade to near-white where blobs are weak */
    float coverage = clamp(total * 0.75, 0.0, 1.0);
    col = mix(vec3(0.99, 0.97, 0.98), col, coverage);

    gl_FragColor = vec4(col, 1.0);
  }
`;

function initGL(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext("webgl");
  if (!gl) return null;

  function compile(type: number, src: string) {
    const s = gl!.createShader(type)!;
    gl!.shaderSource(s, src);
    gl!.compileShader(s);
    return s;
  }

  const prog = gl.createProgram()!;
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(prog);
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW
  );

  const loc = gl.getAttribLocation(prog, "a_pos");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  return {
    gl,
    uTime:  gl.getUniformLocation(prog, "u_time"),
    uMouse: gl.getUniformLocation(prog, "u_mouse"),
    uRes:   gl.getUniformLocation(prog, "u_res"),
  };
}

export default function Hero() {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = initGL(canvas);
    if (!ctx) return;

    const { gl, uTime, uMouse, uRes } = ctx;
    let animId = 0;
    let running = true;
    const start = performance.now();

    /* raw + smoothed mouse */
    const raw    = { x: window.innerWidth / 2,  y: window.innerHeight / 2 };
    const smooth = { x: window.innerWidth / 2,  y: window.innerHeight / 2 };

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const onMove = (e: MouseEvent) => { raw.x = e.clientX; raw.y = e.clientY; };
    window.addEventListener("mousemove", onMove, { passive: true });

    const draw = () => {
      if (!running) return;
      /* ease mouse towards cursor — feel like silk being dragged */
      smooth.x += (raw.x - smooth.x) * 0.045;
      smooth.y += (raw.y - smooth.y) * 0.045;

      gl.uniform1f(uTime,  (performance.now() - start) / 1000);
      gl.uniform2f(uMouse, smooth.x, smooth.y);
      gl.uniform2f(uRes,   canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animId = requestAnimationFrame(draw);
    };
    animId = requestAnimationFrame(draw);

    return () => {
      running = false;
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* WebGL fluid silk canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Content — dark text on light silk background */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">

        {/* Badge */}
        <motion.div {...fadeUp(0.1, 14)} className="mb-10">
          <span
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-5 py-2.5 rounded-full"
            style={{
              background: "rgba(108,99,255,0.12)",
              border: "1px solid rgba(108,99,255,0.28)",
              color: "#5b50cc",
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
            className="block text-[clamp(3rem,9vw,7.5rem)] font-bold leading-[0.92] tracking-tight"
            style={{ fontFamily: "var(--font-space)", color: "#1a0b2e" }}
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
            className="block text-[clamp(3rem,9vw,7.5rem)] font-bold leading-[0.92] tracking-tight"
            style={{ fontFamily: "var(--font-space)", color: "#1a0b2e" }}
          >
            Like a Million Bucks
          </motion.span>
        </div>

        {/* Subtext */}
        <motion.p
          {...fadeUp(0.58, 14)}
          className="text-lg md:text-xl max-w-xl mx-auto mb-12 leading-[1.8]"
          style={{ color: "#5c5478" }}
        >
          Custom-built websites for South African small businesses. Fast, modern,
          and designed to win customers — from just{" "}
          <span style={{ color: "#1a0b2e", fontWeight: 600 }}>R3,500</span>.
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
              boxShadow: "0 0 30px rgba(108,99,255,0.35), 0 4px 20px rgba(0,0,0,0.12)",
            }}
          >
            Start Your Website
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 font-medium px-9 py-4 rounded-full text-base transition-all duration-300"
            style={{
              color: "#5c5478",
              border: "1px solid rgba(108,99,255,0.25)",
              background: "rgba(255,255,255,0.4)",
            }}
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
            { value: "3–5 days", label: "Turnaround" },
            { value: "R3.5k", label: "Full Build" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="text-2xl font-bold mb-1.5"
                style={{ fontFamily: "var(--font-space)", color: "#1a0b2e" }}
              >
                {stat.value}
              </div>
              <div className="text-xs uppercase tracking-widest" style={{ color: "#7b709e" }}>
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
        <span className="text-xs uppercase tracking-widest" style={{ color: "#9490b5" }}>
          Scroll
        </span>
        <div
          className="w-px h-12"
          style={{
            background: "linear-gradient(to bottom, #6c63ff, transparent)",
            animation: "scrollPulse 2s ease-in-out infinite",
          }}
        />
      </motion.div>
    </section>
  );
}
