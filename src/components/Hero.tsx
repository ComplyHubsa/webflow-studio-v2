"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;
function fadeUp(delay: number, y = 24) {
  return {
    initial: { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: EASE },
  } as const;
}

/* ─── WebGL shaders ───────────────────────────────────────────────────────── */
const VERT = `
  attribute vec2 a_pos;
  void main(){ gl_Position = vec4(a_pos,0.,1.); }
`;

/* Silk threads: FBM-warped sin stripes. Kept from the previous hero, but it
   now sits at low opacity under a white wash — texture, not the subject. */
const FRAG = `
precision mediump float;
uniform float u_time;
uniform vec2  u_mouse;
uniform vec2  u_vel;
uniform vec2  u_res;

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
  float t  = u_time * 0.08;

  vec2 m      = vec2(u_mouse.x / u_res.x, 1. - u_mouse.y / u_res.y);
  vec2 uvA    = vec2(uv.x * ar, uv.y);
  vec2 mA     = vec2(m.x  * ar, m.y);
  float mDist = length(uvA - mA);
  float influence = exp(-mDist * mDist * 12.0);
  vec2  p     = uv - u_vel * influence * 6.0;
  p.x        *= ar;

  vec2 q = vec2(
    fbm(p * 1.5 + t * 0.50),
    fbm(p * 1.5 + vec2(5.2, 1.3) + t * 0.38)
  );
  vec2 r = vec2(
    fbm(p * 1.5 + q * 0.85 + vec2(1.7, 9.2) + t * 0.28),
    fbm(p * 1.5 + q * 0.85 + vec2(8.3, 2.8) + t * 0.20)
  );
  vec2 wp = p + r * 0.42;

  float ang   = t * 0.06;
  float along = wp.x * cos(ang) + wp.y * sin(ang);
  float broad = sin(along * 22.0) * 0.5 + 0.5;
  float fine  = sin(along * 60.0) * 0.5 + 0.5;

  float fc = fbm(wp * 0.75 + t * 0.07) * 0.5 + 0.5;

  /* near-neutral greys with the faintest warm cast */
  vec3 col = mix(vec3(0.965), vec3(0.925), smoothstep(0.0, 0.55, fc));
  col = mix(col, vec3(0.945, 0.935, 0.920), smoothstep(0.45, 0.85, fc));
  col *= 0.965 + broad * 0.035;
  col  = mix(col, col * 1.03, fine * 0.25);
  col  = clamp(col, 0., 1.);

  gl_FragColor = vec4(col, 1.);
}
`;

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
  gl.attachShader(prog, mk(gl.VERTEX_SHADER, VERT));
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

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = initGL(canvas);
    if (!ctx) return;
    const { gl, uTime, uMouse, uVel, uRes } = ctx;

    let raf = 0, running = true, visible = true;
    const start = performance.now();
    const raw    = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const smooth = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const vel    = { x: 0, y: 0 };

    let canvasLeft = 0, canvasTop = 0;
    const refreshRect = () => {
      const r = canvas.getBoundingClientRect();
      canvasLeft = r.left;
      canvasTop  = r.top;
    };
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
      refreshRect();
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("scroll", refreshRect, { passive: true });

    const onMove = (e: MouseEvent) => {
      raw.x = e.clientX - canvasLeft;
      raw.y = e.clientY - canvasTop;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const draw = () => {
      if (!running || !visible) { raf = 0; return; }
      const px = smooth.x, py = smooth.y;
      smooth.x += (raw.x - smooth.x) * 0.10;
      smooth.y += (raw.y - smooth.y) * 0.10;
      vel.x = vel.x * 0.70 + ((smooth.x - px) / canvas.width)  * 0.30;
      vel.y = vel.y * 0.70 + ((smooth.y - py) / canvas.height) * 0.30;

      gl.uniform1f(uTime,  (performance.now() - start) / 1000);
      gl.uniform2f(uMouse, smooth.x, smooth.y);
      gl.uniform2f(uVel,   vel.x, vel.y);
      gl.uniform2f(uRes,   canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      raf = requestAnimationFrame(draw);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && running && raf === 0) raf = requestAnimationFrame(draw);
    }, { rootMargin: "100px" });
    io.observe(canvas);

    raf = requestAnimationFrame(draw);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", refreshRect);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center overflow-hidden pt-12">
      <div className="absolute inset-0" style={{ background: "var(--bg)" }} />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full hidden lg:block"
        style={{ opacity: 0.55 }}
      />
      {/* White wash keeps the texture behind the type rather than beside it */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 85% at 50% 38%, rgba(255,255,255,0.94) 0%, rgba(255,255,255,0.72) 45%, rgba(255,255,255,0.42) 100%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.p {...fadeUp(0.05, 10)} className="eyebrow mb-7">
          O&apos;Gorman Studio
        </motion.p>

        <motion.h1
          {...fadeUp(0.16)}
          className="display text-[clamp(2.9rem,7.2vw,5.4rem)] mb-7"
          style={{ color: "var(--text)" }}
        >
          Software for the jobs
          <br className="hidden sm:block" /> you&apos;re still doing by hand.
        </motion.h1>

        <motion.p
          {...fadeUp(0.3, 12)}
          className="lede max-w-2xl mx-auto mb-10"
        >
          A direct booking system that keeps the agent&apos;s commission in your
          pocket, sales automation that works the pipeline for you, and the
          websites they run on.
        </motion.p>

        <motion.div
          {...fadeUp(0.42, 12)}
          className="flex flex-col sm:flex-row items-center justify-center gap-x-8 gap-y-4"
        >
          <Link
            href="/bookdirect"
            className="inline-flex items-center justify-center font-medium px-7 py-3 rounded-full text-[15px] transition-opacity duration-300 hover:opacity-85"
            style={{ background: "var(--text)", color: "var(--bg)" }}
          >
            Explore BookDirect
          </Link>
          <Link
            href="/websites"
            className="inline-flex items-center gap-1 text-[15px] font-medium transition-opacity hover:opacity-70"
            style={{ color: "var(--accent)" }}
          >
            See the websites
            <span aria-hidden="true">›</span>
          </Link>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden sm:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <div
          className="w-px h-10"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0.28), transparent)",
            animation: "scrollPulse 2s ease-in-out infinite",
          }}
        />
      </motion.div>
    </section>
  );
}
