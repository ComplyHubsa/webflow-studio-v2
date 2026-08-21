"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/* A soft, waxy, translucent blob — the reference is a lit 3D surface, not a
   gradient, which is why the flat CSS attempts failed. Three things make it
   read the way it does, and all three matter:

   1. LOW-frequency, LARGE-amplitude displacement. The reference has four or
      five broad lobes, not surface fizz. High-frequency noise reads as a
      golf ball.
   2. Normals recomputed from the displaced surface. If you displace positions
      but keep the sphere's original normals, the lighting stays perfectly
      spherical and the lobes become invisible — the single most common way
      this effect fails. Here the normal is rebuilt per-vertex by sampling the
      noise at two tangent offsets.
   3. Wrapped, subsurface-ish shading rather than plain Lambert. Wax is lit
      round the back of the terminator; a hard N·L makes it look like plastic.

   Colour comes from the geometry, not from a texture: pale cyan pools where
   the surface faces away and down, warm pink catches the upper rim, and a
   fresnel term lifts the silhouette so light appears to pass through the edge. */

const VERT = /* glsl */ `
uniform float uTime;
uniform float uAmp;
uniform float uFreq;
uniform float uSeed;

/* Up to four live contacts. xyz is the direction of the touch in OBJECT space
   (the mesh spins, so a world-space direction would smear the dent around the
   surface as it rotates); w is how hard the contact is, 0..1. */
const int MAXC = 6;
uniform vec4 uContacts[MAXC];

varying vec3 vNormalW;
varying vec3 vPosW;
varying float vDisp;

/* Ashima simplex noise (3D) */
vec3 mod289(vec3 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 mod289(vec4 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 permute(vec4 x){ return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }
float snoise(vec3 v){
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

/* Two octaves only — the lobes should be broad and readable, and a third
   octave immediately turns the silhouette crunchy. */
float lobes(vec3 p){
  float t = uTime;
  float a = snoise(p * uFreq + vec3(0.0, 0.0, t * 0.16) + uSeed);
  float b = snoise(p * (uFreq * 2.0) + vec3(t * 0.11, uSeed, 0.0)) * 0.16;
  return a + b;
}

/* Radius of the surface in a given direction: the lobes, then flattened by any
   contact pushing from that side.

   Every sample of the surface — the vertex itself and both tangent probes used
   to rebuild the normal — has to go through THIS function. Apply the squash in
   main() only and the normals describe the unsquashed body, so the dent is
   there in silhouette but invisible in the shading.

   The perpendicular bulge is what makes it read as soft rather than eroded: a
   real soft body pressed on one side has to put that volume somewhere. */
float radiusScale(vec3 dir){
  float s = 1.0 + lobes(dir) * uAmp;
  for (int i = 0; i < MAXC; i++){
    vec4 c = uContacts[i];
    if (c.w <= 0.001) continue;
    float f = max(0.0, dot(dir, c.xyz));
    /* Deliberately not named "flat" — that is a reserved interpolation
       qualifier in GLSL ES 3.00, and using it as a variable name fails with a
       bare syntax error that points at the line without saying why. */
    float dent = pow(f, 1.8);               // wide, soft contact patch
    s *= (1.0 - 0.72 * c.w * dent);         // press in where it touches
    s *= (1.0 + 0.20 * c.w * (1.0 - dent)); // and bulge everywhere else
  }
  return s;
}

void main(){
  /* Sample the noise on the UNIT sphere, never on the raw position.
     Sampling p directly makes the effective frequency scale with the radius,
     so a size-2 blob got roughly twice the lobes of a size-1 one and the
     silhouette came out as a frilly starburst rather than a few broad lobes.
     Worse, the base point was sampled at radius scale while the two tangent
     offsets were sampled normalized — so the normal was reconstructed from a
     different surface than the one being drawn, which flattened the shading. */
  vec3 dir = normalize(position);
  float R = length(position);
  float d = lobes(dir);

  /* Rebuild the normal from the displaced surface: offset along two tangents,
     displace all three with the same function, cross the differences. Skipping
     this leaves sphere-normals on a lumpy body and the lobes disappear. */
  vec3 tangent = normalize(cross(dir, abs(dir.y) < 0.99 ? vec3(0.0,1.0,0.0) : vec3(1.0,0.0,0.0)));
  vec3 bitangent = normalize(cross(dir, tangent));
  float e = 0.04;

  vec3 dA = normalize(dir + tangent * e);
  vec3 dB = normalize(dir + bitangent * e);
  vec3 dispP = dir * R * radiusScale(dir);
  vec3 dispA = dA  * R * radiusScale(dA);
  vec3 dispB = dB  * R * radiusScale(dB);
  vec3 newN = normalize(cross(dispA - dispP, dispB - dispP));
  /* cross() can come out inward-facing depending on winding — flip it back
     toward the original normal so half the surface isn't lit from inside. */
  if (dot(newN, dir) < 0.0) newN = -newN;

  vDisp = d;
  vNormalW = normalize(mat3(modelMatrix) * newN);
  vec4 world = modelMatrix * vec4(dispP, 1.0);
  vPosW = world.xyz;
  gl_Position = projectionMatrix * viewMatrix * world;
}
`;

const FRAG = /* glsl */ `
precision highp float;
uniform vec3 uCamPos;
uniform vec3 uTintLow;
uniform vec3 uTintHigh;
uniform sampler2D uEnv;
uniform float uEnvStrength;
varying vec3 vNormalW;
varying vec3 vPosW;
varying float vDisp;

/* Equirectangular lookup. The environment is what produces a small ROUND
   highlight: a directional light reflected off a curved lobe always smears
   into a band no matter how high the specular exponent goes, because the
   light has no shape. A tiny bright disc in an env map has shape, so its
   reflection stays compact — and the same map gives the surface something to
   look wet with. */
vec2 equirectUv(vec3 dir){
  float u = atan(dir.z, dir.x) * 0.15915494 + 0.5;   // 1/(2*PI)
  float v = asin(clamp(dir.y, -1.0, 1.0)) * 0.31830989 + 0.5; // 1/PI
  return vec2(u, v);
}

void main(){
  vec3 N = normalize(vNormalW);
  vec3 V = normalize(uCamPos - vPosW);

  vec3 L1 = normalize(vec3(-0.45, 0.75, 0.55));   // key, upper-left
  vec3 L2 = normalize(vec3(0.6, -0.35, 0.3));     // bounce, lower-right

  /* Wrapped diffuse: light bleeds past the terminator the way it does through
     wax. A plain max(dot(N,L),0.0) here looks like painted plastic. */
  float w = 0.55;
  float key = pow(clamp((dot(N, L1) + w) / (1.0 + w), 0.0, 1.0), 1.25);
  float fill = clamp((dot(N, L2) + w) / (1.0 + w), 0.0, 1.0) * 0.42;

  float fres = pow(1.0 - clamp(dot(N, V), 0.0, 1.0), 2.6);

  /* Broad sheen plus one tight highlight. The first pass had the broad term
     too wide (pow 14) and the tight one too weak, so the two blurred into a
     single haze and nothing read as a hard specular. Tightening the broad term
     and roughly doubling the sharp one gives the small bright dot the
     reference has near the upper-left. */
  vec3 H = normalize(L1 + V);
  float specBroad = pow(clamp(dot(N, H), 0.0, 1.0), 24.0) * 0.20;
  float specTight = pow(clamp(dot(N, H), 0.0, 1.0), 230.0) * 1.05;

  /* Base pulled down off pure white. At 0.965 the midtones swamped both tints
     and the whole body went white — the reference keeps colour through the
     middle and only reaches white at the highlights. */
  vec3 base = vec3(0.935, 0.935, 0.962);

  /* Cyan pools where the surface turns away and down; pink catches the top.
     Both ramps start much earlier than before so the colour reaches the
     midtones instead of clinging to the extremes. */
  float downness = clamp(-N.y * 0.5 + 0.5, 0.0, 1.0);
  /* Pulled back from 0.18: starting the ramp that low tinted almost the whole
     body and the blob went cyan overall. The reference is a WHITE body with
     cyan pooling in the lower third only. */
  vec3 col = mix(base, uTintLow, smoothstep(0.46, 1.0, downness) * 0.9);
  col = mix(col, uTintHigh, smoothstep(0.12, 0.95, clamp(N.y, 0.0, 1.0)) * 0.72);

  /* Less flat ambient, more key. 0.62 ambient lifted everything toward white
     and left no headroom for the highlights to sit above. */
  col *= (0.50 + key * 0.60 + fill);

  /* Environment reflection, weighted toward grazing angles like a real
     coating. This carries the compact highlight; the analytic speculars are
     now only a soft underlay beneath it. */
  vec3 R = reflect(-V, N);
  vec3 env = texture2D(uEnv, equirectUv(R)).rgb;
  float coat = uEnvStrength * (0.22 + fres * 0.85);
  col += env * coat;
  col += vec3(specBroad + specTight * 0.35);

  /* Pink rim goes on LAST, and as a mix rather than an add. Previously it was
     added before the environment term, which then piled white on top of the
     exact same grazing angles and washed it out — the rim came back nearly
     white. Weighting by N.y keeps it on the upper rim, where the reference
     has it, instead of ringing the whole silhouette. */
  float upperRim = fres * smoothstep(-0.15, 0.75, N.y);
  col = mix(col, uTintHigh, clamp(upperRim * 0.85, 0.0, 0.72));
  /* Deeper creases read very slightly cooler, which is what gives the lobes
     their soft edge instead of a hard crease line. */
  col = mix(col, col * vec3(0.94, 0.97, 1.03), smoothstep(0.1, -0.6, vDisp) * 0.5);

  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;

/* A tiny equirectangular environment, drawn rather than loaded — an HDR file
   would be a few hundred KB for something this simple, and this needs no
   network request at all.

   The small bright disc is the whole point: it is what the surface reflects as
   a compact round highlight. Everything else is a soft sky gradient so the
   body has something gentle to pick up at grazing angles. */
function makeEnvTexture(): THREE.Texture {
  const w = 512, h = 256;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const g = c.getContext("2d")!;

  // sky: bright above the horizon, cooler and deeper below
  const sky = g.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, "#ffffff");
  sky.addColorStop(0.42, "#e8eeff");
  sky.addColorStop(0.62, "#b9c6ec");
  sky.addColorStop(1, "#8ea0d4");
  g.fillStyle = sky;
  g.fillRect(0, 0, w, h);

  // broad soft source, upper left — gives the wide sheen
  const broad = g.createRadialGradient(w * 0.3, h * 0.26, 0, w * 0.3, h * 0.26, w * 0.2);
  broad.addColorStop(0, "rgba(255,255,255,0.95)");
  broad.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = broad;
  g.fillRect(0, 0, w, h);

  // the key: small, hard-edged, very bright — this is the round highlight
  const key = g.createRadialGradient(w * 0.33, h * 0.2, 0, w * 0.33, h * 0.2, w * 0.035);
  key.addColorStop(0, "#ffffff");
  key.addColorStop(0.55, "rgba(255,255,255,0.92)");
  key.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = key;
  g.fillRect(0, 0, w, h);

  // faint warm bounce opposite it, so the unlit side isn't dead
  const warm = g.createRadialGradient(w * 0.76, h * 0.66, 0, w * 0.76, h * 0.66, w * 0.24);
  warm.addColorStop(0, "rgba(255,214,238,0.5)");
  warm.addColorStop(1, "rgba(255,214,238,0)");
  g.fillStyle = warm;
  g.fillRect(0, 0, w, h);

  const tex = new THREE.CanvasTexture(c);
  // Wrap horizontally (longitude is continuous), clamp vertically (poles).
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.generateMipmaps = true;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export interface BlobSpec {
  size: number;          // world radius
  seed: number;
  amp?: number;          // lobe depth
  freq?: number;         // lobe count — lower is broader
  tintLow?: string;
  tintHigh?: string;
  /** How wet it looks — how strongly it reflects the environment. */
  envStrength?: number;
  spin?: number;
}

export default function Blob({
  blobs,
  className = "",
  avoid,
}: {
  blobs: BlobSpec[];
  className?: string;
  /** Soft elliptical no-go zone in world units — used to keep the field off
      the headline so the type sits on clean white instead of on a blob. */
  avoid?: { x: number; y: number; rx: number; ry: number };
}) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0, 7.2);

    // One texture shared by every blob — it is identical for all of them.
    const envTex = makeEnvTexture();

    const meshes = blobs.map((b) => {
      /* Detail 96 is ~92k triangles. The displacement is smooth, so a coarse
         sphere shows facets along the silhouette where it matters most. */
      const geo = new THREE.IcosahedronGeometry(b.size, 96);
      const mat = new THREE.ShaderMaterial({
        vertexShader: VERT,
        fragmentShader: FRAG,
        transparent: false,
        uniforms: {
          uTime: { value: Math.random() * 40 },
          uAmp: { value: b.amp ?? 0.30 },
          uFreq: { value: b.freq ?? 0.78 },
          uSeed: { value: b.seed },
          uCamPos: { value: camera.position },
          /* Saturated further than they look: both are multiplied down by the
             lighting before they reach the screen, so picking the colour you
             actually want here gives you a washed-out version of it. */
          uTintLow: { value: new THREE.Color(b.tintLow ?? "#63cbe8") },
          uTintHigh: { value: new THREE.Color(b.tintHigh ?? "#f0a8dc") },
          uEnv: { value: envTex },
          uEnvStrength: { value: b.envStrength ?? 0.5 },
          uContacts: {
            value: Array.from({ length: 6 }, () => new THREE.Vector4(0, 0, 0, 0)),
          },
        },
      });
      const mesh = new THREE.Mesh(geo, mat);
      scene.add(mesh);
      return { mesh, mat, spec: b };
    });

    let raf = 0;
    let running = true;
    const start = performance.now();
    let last = performance.now();

    /* ── free-floating physics ──────────────────────────────────────────────
       No attractor and no centre pull: each blob just carries a velocity and
       bounces off the four frustum walls and off the other blobs. Everything
       stays on z=0 so a 2D collision test matches exactly what you see; give
       them different depths and they would visually overlap while "colliding"
       somewhere else. */
    type Body = { x: number; y: number; vx: number; vy: number; r: number; m: number };
    const bodies: Body[] = meshes.map(({ spec }) => ({
      x: 0, y: 0, vx: 0, vy: 0,
      /* Effective radius allows for the lobes: the mesh is `size` but the
         displaced surface reaches past it, so colliding on `size` alone lets
         the visible edges pass through each other. */
      r: spec.size * (1 + (spec.amp ?? 0.3) * 0.35),
      m: Math.pow(spec.size, 3),
    }));

    /* Live contacts per body, rebuilt every frame and pushed to the shader.
       Reused arrays rather than fresh ones — this runs 60 times a second. */
    type Contact = { x: number; y: number; s: number };
    const contacts: Contact[][] = bodies.map(() => []);
    const CONTACT_SLOTS = 6;
    const scratchQ = new THREE.Quaternion();
    const scratchV = new THREE.Vector3();

    let halfW = 0, halfH = 0;
    let seeded = false;

    const SPEED_MIN = 0.16;
    const SPEED_MAX = 0.44;

    const seedBodies = () => {
      /* Scatter, then push apart until nothing overlaps. Starting them
         interpenetrating makes the first second look like an explosion as the
         solver untangles them. */
      bodies.forEach((b, i) => {
        b.x = (Math.random() * 2 - 1) * Math.max(0.1, halfW - b.r);
        b.y = (Math.random() * 2 - 1) * Math.max(0.1, halfH - b.r);
        const a = (i / bodies.length) * Math.PI * 2 + Math.random();
        const sp = SPEED_MIN + Math.random() * (SPEED_MAX - SPEED_MIN);
        b.vx = Math.cos(a) * sp;
        b.vy = Math.sin(a) * sp;
      });
      for (let pass = 0; pass < 60; pass++) {
        let moved = false;
        for (let i = 0; i < bodies.length; i++) {
          for (let j = i + 1; j < bodies.length; j++) {
            const A = bodies[i], B = bodies[j];
            const dx = B.x - A.x, dy = B.y - A.y;
            const d = Math.hypot(dx, dy) || 0.0001;
            const min = A.r + B.r;
            if (d < min) {
              const nx = dx / d, ny = dy / d;
              const push = (min - d) / 2;
              A.x -= nx * push; A.y -= ny * push;
              B.x += nx * push; B.y += ny * push;
              moved = true;
            }
          }
        }
        if (!moved) break;
      }
      seeded = true;
    };

    /* SOFT contacts, not impulses.

       An impulse reverses velocity within a single frame, which is the hard
       click these used to have. Instead, overlap is allowed and answered with a
       spring: the deeper they press, the harder they are pushed apart, so a
       contact plays out over many frames — squash in, hold, ease away.

       CONTACT_BAND is how far they may sink into each other, as a fraction of
       their combined radius; it also normalises the squash strength sent to the
       shader. */
    /* Stiffness was picked by simulation, not by feel. At 9.0 the contacts
       already lasted half a second, but the bodies only sank 3.5% into each
       other — soft in timing, invisible in shape. Sweeping it:

         K=9.0 → 4.9% sink   K=3.0 → 7.6%   K=1.6 → 10.9%
         K=1.0 → 16.1%       K=0.6 → 21.6%

       1.0 gives a real, visible squash with contacts running ~2.3s, which is
       the slow press-and-drift-apart rather than a click. */
    const PROXIMITY = 1.30;     // start deforming this far out
    const CONTACT_BAND = 0.60;  // hard limit on how far they may sink
    const SQUASH_REF = 0.20;    // sink that counts as a full-strength dent
    const STIFFNESS = 0.5;      // spring constant of the "flesh"
    const CONTACT_DAMP = 0.45;  // bleeds the bounce so they part slowly
    const AVOID_K = 2.6;        // how firmly the protected zone repels

    /* The pointer is just another body — same proximity squash, same soft
       spring — except it has infinite mass, so blobs move and it does not.
       Reusing the contact path means it dents them exactly the way they dent
       each other, rather than being a second effect that looks different. */
    const CURSOR_R = 0.42;
    const CURSOR_K = 4.5;       // firmer than blob-on-blob so pushing feels direct
    const pointer = { x: 0, y: 0, active: false };

    const step = (dt: number) => {
      // clear last frame's contacts
      for (const c of contacts) c.length = 0;

      for (const b of bodies) {
        b.x += b.vx * dt;
        b.y += b.vy * dt;
      }

      /* Soft walls too — they should flatten against the edge and push off it,
         not ping. Position is still hard-clamped well outside the squash band
         so nothing can escape if the spring is outrun. */
      bodies.forEach((b, i) => {
        const soft = b.r * CONTACT_BAND;
        const push = (over: number, nx: number, ny: number) => {
          const s = Math.min(1, over / (b.r * SQUASH_REF));
          b.vx += nx * STIFFNESS * over * dt;
          b.vy += ny * STIFFNESS * over * dt;
          const vn = b.vx * nx + b.vy * ny;
          if (vn < 0) { b.vx -= nx * vn * CONTACT_DAMP * dt; b.vy -= ny * vn * CONTACT_DAMP * dt; }
          contacts[i].push({ x: -nx, y: -ny, s });
        };
        if (b.x - b.r < -halfW) push(-halfW - (b.x - b.r), 1, 0);
        if (b.x + b.r > halfW)  push((b.x + b.r) - halfW, -1, 0);
        if (b.y - b.r < -halfH) push(-halfH - (b.y - b.r), 0, 1);
        if (b.y + b.r > halfH)  push((b.y + b.r) - halfH, 0, -1);

        /* Ease out of the protected zone. A soft field rather than a hard
           wall: they should curve away from the headline, not visibly bounce
           off an invisible box in the middle of the page. */
        if (avoid) {
          const ex = (b.x - avoid.x) / (avoid.rx + b.r);
          const ey = (b.y - avoid.y) / (avoid.ry + b.r);
          const e = Math.hypot(ex, ey);
          if (e < 1) {
            const inv = 1 / (e || 1e-4);
            b.vx += ex * inv * AVOID_K * (1 - e) * dt;
            b.vy += ey * inv * AVOID_K * (1 - e) * dt;
          }
        }

        const hard = b.r * (1 - CONTACT_BAND);
        b.x = Math.max(-halfW - b.r + hard, Math.min(halfW + b.r - hard, b.x));
        b.y = Math.max(-halfH - b.r + hard, Math.min(halfH + b.r - hard, b.y));
      });

      // the pointer, treated as an immovable body
      if (pointer.active) {
        bodies.forEach((b, i) => {
          const dx = b.x - pointer.x, dy = b.y - pointer.y;
          const d = Math.hypot(dx, dy) || 0.0001;
          const min = b.r + CURSOR_R;
          const reach = min * PROXIMITY;
          if (d >= reach) return;

          const nx = dx / d, ny = dy / d;
          const strength = Math.min(1, (reach - d) / (reach - min * 0.72));
          // the dent faces the cursor, so xyz points from blob toward pointer
          contacts[i].push({ x: -nx, y: -ny, s: strength });

          if (d >= min) return;
          const overlap = min - d;
          b.vx += nx * CURSOR_K * overlap * dt;
          b.vy += ny * CURSOR_K * overlap * dt;
        });
      }

      // pairwise soft contacts
      for (let i = 0; i < bodies.length; i++) {
        for (let j = i + 1; j < bodies.length; j++) {
          const A = bodies[i], B = bodies[j];
          const dx = B.x - A.x, dy = B.y - A.y;
          const d = Math.hypot(dx, dy) || 0.0001;
          const min = A.r + B.r;
          const reach = min * PROXIMITY;
          if (d >= reach) continue;

          const nx = dx / d, ny = dy / d;
          const overlap = min - d;
          /* Deformation starts BEFORE they touch and keeps building as they
             press. Tying it to overlap alone capped the look at whatever the
             physics happened to allow — sweeping the spring showed that tops
             out around 30% sink and drags contacts past five seconds, which is
             slower than it is mushy. Decoupling the two lets the surfaces
             flatten into each other properly while the motion stays brisk. */
          const strength = Math.min(1, (reach - d) / (reach - min * 0.72));

          // tell each surface where it is being pressed (proximity-based)
          contacts[i].push({ x: nx, y: ny, s: strength });
          contacts[j].push({ x: -nx, y: -ny, s: strength });

          // no force until they genuinely overlap — approach is visual only
          if (d >= min) continue;

          // spring apart, scaled by mass so the small one moves further
          const f = STIFFNESS * overlap * dt;
          A.vx -= (nx * f) / A.m; A.vy -= (ny * f) / A.m;
          B.vx += (nx * f) / B.m; B.vy += (ny * f) / B.m;

          // damp only the closing speed, so they settle instead of pinging
          const rvn = (B.vx - A.vx) * nx + (B.vy - A.vy) * ny;
          if (rvn < 0) {
            const dmp = rvn * CONTACT_DAMP * dt;
            A.vx += nx * dmp / A.m; A.vy += ny * dmp / A.m;
            B.vx -= nx * dmp / B.m; B.vy -= ny * dmp / B.m;
          }

          /* Only intervene positionally if they sink past the squash band —
             otherwise the spring does the work and the overlap IS the squash. */
          const maxSink = min * CONTACT_BAND;
          if (overlap > maxSink) {
            const fix = (overlap - maxSink) / 2;
            A.x -= nx * fix; A.y -= ny * fix;
            B.x += nx * fix; B.y += ny * fix;
          }
        }
      }

      /* Re-normalise speed into a band. Perfectly elastic collisions plus
         floating point drift will slowly pump or drain energy; clamping keeps
         the motion calm and perpetual without damping it to death. */
      for (const b of bodies) {
        const sp = Math.hypot(b.vx, b.vy);
        if (sp < 1e-4) { b.vx = SPEED_MIN; continue; }
        const target = Math.min(SPEED_MAX, Math.max(SPEED_MIN, sp));
        if (target !== sp) {
          const k = target / sp;
          b.vx *= k; b.vy *= k;
        }
      }
    };

    const resize = () => {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;
      renderer.setSize(r.width, r.height, false);
      camera.aspect = r.width / r.height;
      camera.updateProjectionMatrix();

      // frustum size at z = 0, which is the plane every blob sits on
      halfH = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
      halfW = halfH * camera.aspect;
      if (!seeded) seedBodies();
      else {
        // keep everything inside after a window resize
        for (const b of bodies) {
          b.x = Math.max(-halfW + b.r, Math.min(halfW - b.r, b.x));
          b.y = Math.max(-halfH + b.r, Math.min(halfH - b.r, b.y));
        }
      }
    };

    const tick = () => {
      if (!running) return;
      const now = performance.now();
      const t = (now - start) / 1000;
      /* Clamped so a backgrounded tab returning after 10s doesn't advance the
         simulation in one enormous step and fling everything through a wall. */
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      if (seeded) step(dt);

      meshes.forEach(({ mesh, mat, spec }, i) => {
        mat.uniforms.uTime.value = t;
        const b = bodies[i];
        mesh.position.x = b.x;
        mesh.position.y = b.y;
        const s = spec.spin ?? 0.05;
        mesh.rotation.y = t * s;
        mesh.rotation.x = Math.sin(t * s * 0.6) * 0.25;

        /* Contacts are in world space but the mesh spins, so rotate each one
           into object space — otherwise the dent slides around the surface as
           the blob turns instead of staying where it is being touched. */
        const slots = mat.uniforms.uContacts.value as THREE.Vector4[];
        const list = contacts[i];
        // more contacts than slots: keep the deepest, drop the grazes
        if (list.length > CONTACT_SLOTS) list.sort((a, b) => b.s - a.s);
        scratchQ.copy(mesh.quaternion).invert();
        for (let k = 0; k < CONTACT_SLOTS; k++) {
          const c = list[k];
          if (!c) { slots[k].set(0, 0, 0, 0); continue; }
          scratchV.set(c.x, c.y, 0).applyQuaternion(scratchQ).normalize();
          // ease the strength so a graze barely marks and a press really dents
          slots[k].set(scratchV.x, scratchV.y, scratchV.z, Math.pow(c.s, 1.4));
        }
      });

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };

    resize();
    const onPointerMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
      const ny = -(((e.clientY - r.top) / r.height) * 2 - 1);
      pointer.x = nx * halfW;
      pointer.y = ny * halfH;
      pointer.active =
        e.clientX >= r.left && e.clientX <= r.right &&
        e.clientY >= r.top && e.clientY <= r.bottom;
    };
    const onPointerOut = () => { pointer.active = false; };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerOut);
    window.addEventListener("blur", onPointerOut);

    const ro = new ResizeObserver(resize);
    ro.observe(el);

    /* Pause when off-screen — 92k tris per blob is not something to run
       behind three screens of scroll. */
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && running && raf === 0) raf = requestAnimationFrame(tick);
      else if (!e.isIntersecting) { cancelAnimationFrame(raf); raf = 0; }
    });
    io.observe(el);

    raf = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerOut);
      window.removeEventListener("blur", onPointerOut);
      ro.disconnect();
      io.disconnect();
      meshes.forEach(({ mesh, mat }) => {
        mesh.geometry.dispose();
        mat.dispose();
      });
      envTex.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === el) el.removeChild(renderer.domElement);
    };
  }, [blobs, avoid]);

  return <div ref={host} className={className} aria-hidden="true" />;
}
