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

/* ─── WebGL shaders ───────────────────────────────────────────────────────── */
const VERT = `
  attribute vec2 a_pos;
  void main(){ gl_Position = vec4(a_pos,0.,1.); }
`;

/*
  Silk effect via layered domain-warped FBM.
  Mouse creates a push (repel) + swirl that deforms the fabric.
*/
const FRAG = `
precision mediump float;
uniform float u_time;
uniform vec2  u_mouse;   /* raw pixel coords          */
uniform vec2  u_res;     /* viewport size in pixels   */

/* ── value noise ── */
float hash(vec2 p){
  p = fract(p * vec2(127.1,311.7));
  p += dot(p, p+43.21);
  return fract(p.x*p.y);
}
float vnoise(vec2 p){
  vec2 i=floor(p), f=fract(p);
  f = f*f*(3.-2.*f);
  return mix(
    mix(hash(i),        hash(i+vec2(1,0)), f.x),
    mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), f.x), f.y);
}

/* ── fractal brownian motion (5 oct, rotated to add directionality) ── */
float fbm(vec2 p){
  float v=0., a=0.52;
  mat2 R = mat2( 0.8660,-0.5, 0.5, 0.8660 ); /* 30-deg rotation */
  for(int i=0;i<5;i++){
    v += a * vnoise(p);
    p  = R * p * 2.05 + vec2(13.1,7.4);
    a *= 0.5;
  }
  return v;
}

void main(){
  vec2 uv  = gl_FragCoord.xy / u_res;
  uv.y     = 1.-uv.y;
  float ar = u_res.x / u_res.y;
  float t  = u_time * 0.14;

  /* mouse in UV space */
  vec2 m = vec2(u_mouse.x/u_res.x, 1.-u_mouse.y/u_res.y);

  /* ── mouse distortion — push outward + swirl ── */
  vec2  delta  = (uv - m) * vec2(ar, 1.);
  float mDist  = length(delta);
  float denom  = mDist + 0.0001;

  float pushAmt  = exp(-mDist*mDist * 6.5) * 0.55;
  vec2  push     = (delta/denom) * pushAmt;

  float swirlAmt = exp(-mDist*mDist * 5.0) * 0.38;
  vec2  swirl    = vec2(-delta.y, delta.x) / denom * swirlAmt;

  vec2 p = uv + push + swirl;

  /* ── domain warping — two rounds, creates silk folds ── */
  vec2 q = vec2(
    fbm(p*2.3 + vec2(0.0, 0.0) + t*0.55),
    fbm(p*2.3 + vec2(5.2, 1.3) + t*0.42)
  );
  vec2 r = vec2(
    fbm(p*2.3 + 0.9*q + vec2(1.7,9.2) + t*0.30),
    fbm(p*2.3 + 0.9*q + vec2(8.3,2.8) + t*0.22)
  );

  float f  = fbm(p*1.7 + 0.7*r + t*0.18);
  f        = f*0.5+0.5;          /* remap → [0,1]   */
  float rx = r.x*0.5+0.5;
  float ry = r.y*0.5+0.5;

  /* ── silk colour palette ── */
  /* rose pink → peach cream */
  vec3 col = mix(vec3(1.00,0.72,0.80), vec3(1.00,0.90,0.72), smoothstep(0.0,0.46,f));
  /* → soft lavender */
  col = mix(col, vec3(0.83,0.79,1.00), smoothstep(0.36,0.66,f));
  /* → mint green (driven by r.x) */
  col = mix(col, vec3(0.79,0.95,0.83), smoothstep(0.52,0.85,rx));
  /* → warm white sheen (bright silk highlight) */
  col = mix(col, vec3(1.00,0.98,0.95), smoothstep(0.70,0.88,f)*0.60);
  /* → cool blue in shadows */
  col = mix(col, vec3(0.76,0.87,1.00), smoothstep(0.28,0.0,f)*0.32);
  /* → blush (driven by r.y) */
  col = mix(col, vec3(1.00,0.82,0.88), smoothstep(0.60,0.85,ry)*0.40);

  /* lighten overall to stay silky-bright */
  col = mix(vec3(0.99,0.97,0.98), col, 0.78);
  col = clamp(col,0.,1.);

  gl_FragColor = vec4(col,1.);
}
`;

/* ─── WebGL setup ─────────────────────────────────────────────────────────── */
function initGL(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext("webgl");
  if (!gl) return null;

  const mk = (type: number, src: string) => {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return s;
  };
  const prog = gl.createProgram()!;
  gl.attachShader(prog, mk(gl.VERTEX_SHADER,   VERT));
  gl.attachShader(prog, mk(gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(prog);
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER,
    new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]),
    gl.STATIC_DRAW);
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

/* ─── Component ───────────────────────────────────────────────────────────── */
export default function Hero() {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = initGL(canvas);
    if (!ctx) return;
    const { gl, uTime, uMouse, uRes } = ctx;

    let raf = 0, running = true;
    const start = performance.now();

    /* raw mouse + smoothed mouse (lerp for silk drag feel) */
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
      /* 0.07 lerp → responsive but still silky-smooth drag */
      smooth.x += (raw.x - smooth.x) * 0.07;
      smooth.y += (raw.y - smooth.y) * 0.07;

      gl.uniform1f(uTime,  (performance.now() - start) / 1000);
      gl.uniform2f(uMouse, smooth.x, smooth.y);
      gl.uniform2f(uRes,   canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

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
          <motion.span {...fadeUp(0.22)}
            className="block text-[clamp(3rem,9vw,7.5rem)] font-bold leading-[0.92] tracking-tight"
            style={{ fontFamily: "var(--font-space)", color: "#1a0b2e" }}
          >
            Websites That
          </motion.span>
          <motion.span {...fadeUp(0.34)}
            className="block text-[clamp(3rem,9vw,7.5rem)] font-bold leading-[0.92] tracking-tight gradient-text"
            style={{ fontFamily: "var(--font-space)" }}
          >
            Make You Look
          </motion.span>
          <motion.span {...fadeUp(0.46)}
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
              boxShadow: "0 0 30px rgba(108,99,255,0.35), 0 4px 20px rgba(0,0,0,0.1)",
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
              background: "rgba(255,255,255,0.45)",
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
            { value: "100%",    label: "Custom Built" },
            { value: "3–5 days", label: "Turnaround"  },
            { value: "R3.5k",   label: "Full Build"   },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold mb-1.5"
                style={{ fontFamily: "var(--font-space)", color: "#1a0b2e" }}>
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
        <span className="text-xs uppercase tracking-widest" style={{ color: "#9490b5" }}>Scroll</span>
        <div className="w-px h-12" style={{
          background: "linear-gradient(to bottom, #6c63ff, transparent)",
          animation: "scrollPulse 2s ease-in-out infinite",
        }} />
      </motion.div>
    </section>
  );
}
