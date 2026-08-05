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
  Silk threads: FBM-warped sin stripes create flowing line-like fabric.
  Mouse pushes coordinates before warping so lines visibly bend away.
*/
const FRAG = `
precision mediump float;
uniform float u_time;
uniform vec2  u_mouse;
uniform vec2  u_vel;
uniform vec2  u_res;

/* ── value noise ── */
float hash(vec2 p){
  p = fract(p * vec2(127.1, 311.7));
  p += dot(p, p + 43.21);
  return fract(p.x * p.y);
}
float vnoise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3. - 2. * f);
  return mix(
    mix(hash(i),           hash(i + vec2(1, 0)), f.x),
    mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), f.x), f.y);
}

/* ── FBM — 5 octaves, 30° rotation keeps directionality ── */
float fbm(vec2 p){
  float v = 0., a = 0.52;
  mat2 R = mat2(0.8660, -0.5, 0.5, 0.8660);
  for(int i = 0; i < 5; i++){
    v += a * vnoise(p);
    p  = R * p * 2.05 + vec2(13.1, 7.4);
    a *= 0.5;
  }
  return v;
}

void main(){
  vec2 uv  = gl_FragCoord.xy / u_res;
  uv.y     = 1. - uv.y;
  float ar = u_res.x / u_res.y;
  float t  = u_time * 0.10;

  /* ── mouse drag — silk follows mouse movement direction ── */
  vec2 m      = vec2(u_mouse.x / u_res.x, 1. - u_mouse.y / u_res.y);
  vec2 uvA    = vec2(uv.x * ar, uv.y);
  vec2 mA     = vec2(m.x  * ar, m.y);
  float mDist = length(uvA - mA);
  /* falloff: only pixels close to cursor are dragged */
  float influence = exp(-mDist * mDist * 12.0);
  /* displace in the direction the mouse is travelling */
  vec2  p     = uv - u_vel * influence * 6.0;
  p.x        *= ar;                         /* aspect-correct from here */

  /* ── two-pass domain warp (creates the organic curve in the threads) ── */
  vec2 q = vec2(
    fbm(p * 1.6 + vec2(0.0, 0.0)   + t * 0.50),
    fbm(p * 1.6 + vec2(5.2, 1.3)   + t * 0.38)
  );
  vec2 r = vec2(
    fbm(p * 1.6 + q * 0.85 + vec2(1.7, 9.2) + t * 0.28),
    fbm(p * 1.6 + q * 0.85 + vec2(8.3, 2.8) + t * 0.20)
  );

  /* warped coordinate used for both line drawing and colour */
  vec2 wp = p + r * 0.42;

  /* ── SILK LINES — sin stripes along a slowly-rotating diagonal ── */
  float ang   = t * 0.06;                   /* direction drifts slowly  */
  float cs    = cos(ang), sn = sin(ang);
  float along = wp.x * cs + wp.y * sn;      /* projection onto direction */

  /* broad threads (~26 visible across screen) */
  float broad  = sin(along * 26.0) * 0.5 + 0.5;

  /* fine sheen lines on top (~70 visible) — give the glossy silk highlight */
  float fine   = sin(along * 70.0) * 0.5 + 0.5;

  /* ── colour palette driven by a slow fbm pass ── */
  float fc  = fbm(wp * 0.75 + t * 0.07) * 0.5 + 0.5;
  float fc2 = fbm(wp * 0.55 + vec2(3.3, 1.1) + t * 0.05) * 0.5 + 0.5;

  /* warm stone palette — sand, clay and pale gold; dark text stays readable */
  vec3 col = mix(vec3(0.86, 0.80, 0.70), vec3(0.90, 0.85, 0.74), smoothstep(0.0,  0.45, fc));
  /* → soft taupe */
  col = mix(col, vec3(0.78, 0.72, 0.63), smoothstep(0.35, 0.65, fc));
  /* → warm clay */
  col = mix(col, vec3(0.85, 0.77, 0.68), smoothstep(0.55, 0.80, fc2) * 0.50);
  /* → pale gold */
  col = mix(col, vec3(0.91, 0.85, 0.71), smoothstep(0.70, 0.90, fc) * 0.42);

  /* ── thread shading ── */
  col *= 0.80 + broad * 0.26;
  col  = mix(col, col * 1.16, fine * 0.28);

  /* unify toward warm cream so silk reads as one cohesive tone */
  col = mix(vec3(0.94, 0.91, 0.85), col, 0.76);
  col = clamp(col, 0., 1.);

  gl_FragColor = vec4(col, 1.);
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
    uVel:   gl.getUniformLocation(prog, "u_vel"),
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
    const { gl, uTime, uMouse, uVel, uRes } = ctx;

    let raf = 0, running = true;
    let visible = true;   /* pause the draw loop when scrolled off-screen */
    const start = performance.now();

    /* raw mouse + smoothed mouse + smoothed velocity */
    const raw    = { x: window.innerWidth / 2,  y: window.innerHeight / 2 };
    const smooth = { x: window.innerWidth / 2,  y: window.innerHeight / 2 };
    const vel    = { x: 0, y: 0 };

    /* cache canvas rect to avoid layout thrash on every mousemove */
    let canvasLeft = 0, canvasTop = 0;
    const refreshCanvasRect = () => {
      const r = canvas.getBoundingClientRect();
      canvasLeft = r.left;
      canvasTop  = r.top;
    };

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
      refreshCanvasRect();
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("scroll", refreshCanvasRect, { passive: true });

    const onMove = (e: MouseEvent) => {
      raw.x = e.clientX - canvasLeft;
      raw.y = e.clientY - canvasTop;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const draw = () => {
      if (!running || !visible) { raf = 0; return; }
      /* lerp mouse position */
      const px = smooth.x, py = smooth.y;
      smooth.x += (raw.x - smooth.x) * 0.10;
      smooth.y += (raw.y - smooth.y) * 0.10;
      /* smooth velocity = direction + speed of mouse travel, in UV space */
      vel.x = vel.x * 0.70 + ((smooth.x - px) / canvas.width)  * 0.30;
      vel.y = vel.y * 0.70 + ((smooth.y - py) / canvas.height) * 0.30;

      gl.uniform1f(uTime,  (performance.now() - start) / 1000);
      gl.uniform2f(uMouse, smooth.x, smooth.y);
      gl.uniform2f(uVel,   vel.x, vel.y);
      gl.uniform2f(uRes,   canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      raf = requestAnimationFrame(draw);
    };

    /* Pause WebGL when canvas leaves viewport — frees up frame budget
       so other animations (FreeConcept's elastic border, etc.) stay smooth */
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && running && raf === 0) {
        raf = requestAnimationFrame(draw);
      }
    }, { rootMargin: "100px" });
    io.observe(canvas);

    raf = requestAnimationFrame(draw);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", refreshCanvasRect);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Mobile/tablet: static wash matching the silk palette */}
      <div
        className="absolute inset-0 lg:hidden"
        style={{ background: "linear-gradient(160deg, #f2ede3 0%, #e9e2d5 30%, #efe8db 60%, #e6ddcd 100%)" }}
      />
      {/* Desktop only: WebGL silk shader */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full hidden lg:block" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">

        {/* Who this is */}
        <motion.div {...fadeUp(0.1, 14)} className="mb-10">
          <span
            className="inline-flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.2em] px-4 py-2"
            style={{
              borderTop: "1px solid rgba(20,18,14,0.18)",
              borderBottom: "1px solid rgba(20,18,14,0.18)",
              color: "#4a4437",
            }}
          >
            Web design studio · South Africa
          </span>
        </motion.div>

        {/* Headline */}
        <div className="mb-8">
          <motion.span {...fadeUp(0.22)}
            className="block text-[clamp(2.6rem,7.5vw,6rem)] font-bold leading-[0.98] tracking-[-0.02em]"
            style={{ fontFamily: "var(--font-space)", color: "#14120e" }}
          >
            Your website is the
          </motion.span>
          <motion.span {...fadeUp(0.34)}
            className="block text-[clamp(2.6rem,7.5vw,6rem)] font-bold leading-[0.98] tracking-[-0.02em]"
            style={{ fontFamily: "var(--font-space)", color: "#14120e" }}
          >
            first thing people
          </motion.span>
          <motion.span {...fadeUp(0.46)}
            className="block text-[clamp(2.6rem,7.5vw,6rem)] font-bold leading-[0.98] tracking-[-0.02em]"
            style={{ fontFamily: "var(--font-space)", color: "#14120e" }}
          >
            judge you on.
          </motion.span>
        </div>

        {/* Subtext */}
        <motion.p
          {...fadeUp(0.58, 14)}
          className="text-lg md:text-xl max-w-2xl mx-auto mb-11 leading-[1.75]"
          style={{ color: "#4a4437" }}
        >
          I&apos;m Aidan. I build custom websites for South African small
          businesses — no templates, no agency retainer. You see the design
          before you pay a cent.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.7, 14)}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-16"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 font-semibold px-8 py-4 rounded-full text-base transition-all duration-300 hover:opacity-88"
            style={{ background: "#14120e", color: "#f4f2ee" }}
          >
            Get a free concept
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link
            href="#demos"
            className="inline-flex items-center gap-2 font-medium px-8 py-4 rounded-full text-base transition-all duration-300 hover:bg-white/50"
            style={{
              color: "#14120e",
              border: "1px solid rgba(20,18,14,0.22)",
            }}
          >
            See six real demo sites
          </Link>
        </motion.div>

        {/* Facts — each one is checkable, not a self-awarded badge */}
        <motion.div
          {...fadeUp(0.82, 14)}
          className="flex items-start justify-center gap-8 md:gap-16"
        >
          {[
            { value: "R3,500", label: "starting price"       },
            { value: "5 days", label: "typical build"        },
            { value: "R0",     label: "to see your concept"  },
          ].map((fact) => (
            <div key={fact.label} className="text-center">
              <div className="text-lg sm:text-2xl font-bold mb-1.5"
                style={{ fontFamily: "var(--font-space)", color: "#14120e" }}>
                {fact.value}
              </div>
              <div className="text-xs tracking-wide" style={{ color: "#6b6455" }}>
                {fact.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator — hidden on mobile so it doesn't overlap the facts */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <div className="w-px h-12" style={{
          background: "linear-gradient(to bottom, rgba(20,18,14,0.5), transparent)",
          animation: "scrollPulse 2s ease-in-out infinite",
        }} />
      </motion.div>
    </section>
  );
}
