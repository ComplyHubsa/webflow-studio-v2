'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Cormorant_Garamond } from 'next/font/google'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
})

const LETTERS = 'LUMIÈRE'.split('')

const PARTICLES = Array.from({ length: 45 }, (_, i) => ({
  id: i,
  left: `${4 + ((i * 47) % 88)}%`,
  delay: `${((i * 1.3) % 9).toFixed(1)}s`,
  duration: `${(7 + ((i * 1.7) % 9)).toFixed(1)}s`,
  size: [3, 2, 2, 1.5, 1.5][i % 5],
  color: ['#D4A553', '#C97B9C', '#E8C4D0', '#D4A553', '#F5E6D3'][i % 5],
}))

const SPARKLES = [
  { top: '8%', left: '93%', delay: '0s', dur: 3 },
  { top: '78%', left: '95%', delay: '1.2s', dur: 2.5 },
  { top: '-3%', left: '65%', delay: '2.1s', dur: 3.5 },
  { top: '52%', left: '-2%', delay: '0.7s', dur: 2.8 },
  { top: '92%', left: '35%', delay: '1.8s', dur: 3.2 },
  { top: '25%', left: '-4%', delay: '0.3s', dur: 2.2 },
]

export default function BeautyHeroPage() {
  const [mounted, setMounted] = useState(false)

  const mouseX = useMotionValue(-200)
  const mouseY = useMotionValue(-200)

  const fastX = useSpring(mouseX, { stiffness: 900, damping: 50 })
  const fastY = useSpring(mouseY, { stiffness: 900, damping: 50 })
  const slowX = useSpring(mouseX, { stiffness: 160, damping: 22 })
  const slowY = useSpring(mouseY, { stiffness: 160, damping: 22 })

  const dotLeft = useTransform(fastX, v => v - 5)
  const dotTop = useTransform(fastY, v => v - 5)
  const ringLeft = useTransform(slowX, v => v - 22)
  const ringTop = useTransform(slowY, v => v - 22)

  useEffect(() => {
    setMounted(true)
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [mouseX, mouseY])

  return (
    <div
      className={cormorant.variable}
      style={{
        position: 'fixed', inset: 0,
        background: '#080310',
        overflow: 'hidden',
        cursor: 'none',
      }}
    >
      <style>{`
        @keyframes float-up {
          0%   { transform: translateY(0) scale(1); opacity: 0; }
          12%  { opacity: 0.45; }
          88%  { opacity: 0.45; }
          100% { transform: translateY(-105vh) scale(0.3); opacity: 0; }
        }
        @keyframes aurora {
          0%,100% { transform: translate(0px, 0px) scale(1); }
          33%     { transform: translate(-50px, 40px) scale(1.07); }
          66%     { transform: translate(35px, -25px) scale(0.94); }
        }
        @keyframes orb-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes orb-spin-r {
          from { transform: rotate(360deg); }
          to   { transform: rotate(0deg); }
        }
        @keyframes orb-pulse {
          0%,100% { box-shadow: 0 0 80px rgba(212,165,83,.55), 0 0 160px rgba(201,123,156,.3), 0 0 50px rgba(212,165,83,.55) inset; }
          50%     { box-shadow: 0 0 110px rgba(212,165,83,.75), 0 0 220px rgba(201,123,156,.45), 0 0 70px rgba(212,165,83,.65) inset; }
        }
        @keyframes twinkle {
          0%,100% { opacity: 0; transform: scale(0) rotate(0deg); }
          50%     { opacity: 1; transform: scale(1) rotate(180deg); }
        }
        @keyframes shimmer-sweep {
          0%   { transform: translateX(-220%) skewX(-20deg); }
          100% { transform: translateX(380%) skewX(-20deg); }
        }
        @keyframes line-grow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        .cta-primary:hover .sweep { animation: shimmer-sweep .65s ease forwards; }
        .cta-secondary:hover { border-color: rgba(212,165,83,.75) !important; color: #F5E6D3 !important; }
        .social-link:hover { color: rgba(245,230,211,.7) !important; }
      `}</style>

      {/* — Cursor — */}
      <motion.div
        style={{
          position: 'fixed',
          width: 10, height: 10,
          borderRadius: '50%',
          background: '#D4A553',
          pointerEvents: 'none',
          zIndex: 9999,
          left: dotLeft,
          top: dotTop,
        } as any}
      />
      <motion.div
        style={{
          position: 'fixed',
          width: 44, height: 44,
          borderRadius: '50%',
          border: '1px solid rgba(212,165,83,.45)',
          pointerEvents: 'none',
          zIndex: 9998,
          left: ringLeft,
          top: ringTop,
        } as any}
      />

      {/* — Aurora background blobs — */}
      {[
        { w: 1000, h: 750, x: '-18%', y: '-35%', dur: '20s', g: 'radial-gradient(ellipse, rgba(185,75,125,.22) 0%, transparent 68%)' },
        { w: 850,  h: 850, x: '55%',  y: '-12%', dur: '26s', g: 'radial-gradient(ellipse, rgba(212,165,83,.18) 0%, transparent 68%)' },
        { w: 650,  h: 600, x: '28%',  y: '55%',  dur: '18s', g: 'radial-gradient(ellipse, rgba(130,50,190,.15) 0%, transparent 68%)' },
        { w: 520,  h: 420, x: '-8%',  y: '62%',  dur: '23s', g: 'radial-gradient(ellipse, rgba(201,123,156,.14) 0%, transparent 68%)' },
      ].map((b, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: b.w, height: b.h,
            left: b.x, top: b.y,
            background: b.g,
            filter: 'blur(70px)',
            animation: `aurora ${b.dur} ease-in-out infinite`,
            animationDelay: `${i * -5}s`,
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* — Subtle grid — */}
      <div
        style={{
          position: 'absolute', inset: 0,
          backgroundImage:
            'linear-gradient(rgba(212,165,83,.028) 1px, transparent 1px), linear-gradient(90deg, rgba(212,165,83,.028) 1px, transparent 1px)',
          backgroundSize: '90px 90px',
          pointerEvents: 'none',
        }}
      />

      {/* — Floating particles — */}
      {mounted && PARTICLES.map(p => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            bottom: '-8px',
            left: p.left,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: p.color,
            animation: `float-up ${p.duration} ${p.delay} ease-in-out infinite`,
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* ─────────────────────────── MAIN LAYOUT ─────────────────────────── */}
      <div
        style={{
          position: 'relative', zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          padding: '0 5vw',
          gap: '2vw',
        }}
      >

        {/* ── LEFT: Editorial copy ── */}
        <div style={{ flex: '0 0 54%', maxWidth: 660 }}>

          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .8, delay: .15 }}
            style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 36 }}
          >
            <div style={{ width: 36, height: 1, background: '#D4A553' }} />
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '.68rem',
              color: '#D4A553',
              letterSpacing: '.28em',
              fontWeight: 600,
              textTransform: 'uppercase',
            }}>
              La Collection — Printemps 2026
            </span>
          </motion.div>

          {/* Brand name — staggered letter reveal */}
          <div style={{ overflow: 'hidden', marginBottom: 6 }}>
            <div style={{ display: 'flex' }}>
              {LETTERS.map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ y: '105%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: .95, delay: .35 + i * .075, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    display: 'inline-block',
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontSize: 'clamp(5.5rem, 9.5vw, 9.5rem)',
                    fontWeight: 300,
                    fontStyle: 'italic',
                    color: '#F5EDD9',
                    lineHeight: .88,
                    letterSpacing: '-.02em',
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .8, delay: 1.15 }}
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(1.15rem, 2.4vw, 1.75rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'rgba(245,237,217,.65)',
              marginBottom: 30,
              letterSpacing: '.03em',
            }}
          >
            Where light becomes skin.
          </motion.p>

          {/* Gold rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, delay: 1.35, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: 130,
              height: 1,
              background: 'linear-gradient(90deg, #D4A553, transparent)',
              marginBottom: 30,
              transformOrigin: 'left',
            }}
          />

          {/* Body copy */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .8, delay: 1.5 }}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '.92rem',
              color: 'rgba(245,237,217,.44)',
              lineHeight: 1.85,
              maxWidth: 430,
              marginBottom: 52,
              fontWeight: 300,
              letterSpacing: '.02em',
            }}
          >
            Distilled from 24-karat botanicals and rare jasmine absolutes,
            Lumière Sérum d&apos;Or rewrites what radiance means — one ritual at a time.
          </motion.p>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .8, delay: 1.7 }}
            style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 52 }}
          >
            <button
              className="cta-primary"
              style={{
                position: 'relative', overflow: 'hidden',
                padding: '15px 40px',
                background: 'linear-gradient(135deg, #D4A553 0%, #B8843C 100%)',
                border: 'none',
                color: '#08030F',
                fontFamily: 'Inter, sans-serif',
                fontSize: '.72rem',
                fontWeight: 700,
                letterSpacing: '.22em',
                textTransform: 'uppercase',
                cursor: 'none',
              }}
            >
              <span
                className="sweep"
                style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,.38), transparent)',
                  transform: 'translateX(-220%) skewX(-20deg)',
                  pointerEvents: 'none',
                }}
              />
              Shop Now
            </button>

            <button
              className="cta-secondary"
              style={{
                padding: '15px 40px',
                background: 'transparent',
                border: '1px solid rgba(212,165,83,.3)',
                color: '#D4A553',
                fontFamily: 'Inter, sans-serif',
                fontSize: '.72rem',
                fontWeight: 600,
                letterSpacing: '.22em',
                textTransform: 'uppercase',
                cursor: 'none',
                transition: 'all .3s',
              }}
            >
              Discover
            </button>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: .9, delay: 2 }}
            style={{ display: 'flex', alignItems: 'center', gap: 18 }}
          >
            <div style={{ display: 'flex' }}>
              {['#C97B9C', '#D4A553', '#9B6B9C', '#E8B4C8', '#A87C50'].map((c, i) => (
                <div
                  key={i}
                  style={{
                    width: 30, height: 30,
                    borderRadius: '50%',
                    background: c,
                    border: '2px solid #080310',
                    marginLeft: i > 0 ? -9 : 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '.58rem', color: '#08030F',
                    fontFamily: 'Inter, sans-serif', fontWeight: 700,
                  }}
                >
                  {['A','M','S','R','L'][i]}
                </div>
              ))}
            </div>
            <div>
              <div style={{ color: '#D4A553', fontSize: '.7rem', fontFamily: 'Inter, sans-serif', fontWeight: 600, letterSpacing: '.05em' }}>
                ★★★★★ 4.9 / 5
              </div>
              <div style={{ color: 'rgba(245,237,217,.38)', fontSize: '.62rem', fontFamily: 'Inter, sans-serif', marginTop: 2, letterSpacing: '.04em' }}>
                14,200 verified reviews
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── RIGHT: Glowing orb ── */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: .55 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, delay: .4, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'relative', width: 380, height: 380 }}
          >
            {/* Outer dashed orbit ring */}
            <div
              style={{
                position: 'absolute',
                inset: -70,
                borderRadius: '50%',
                border: '1px dashed rgba(212,165,83,.1)',
                animation: 'orb-spin 36s linear infinite',
              }}
            >
              <div style={{
                position: 'absolute',
                top: 0, left: '50%',
                width: 7, height: 7,
                borderRadius: '50%',
                background: 'radial-gradient(#D4A553, #B8843C)',
                boxShadow: '0 0 8px #D4A553',
                transform: 'translateX(-50%) translateY(-3.5px)',
              }} />
            </div>

            {/* Inner orbit ring */}
            <div
              style={{
                position: 'absolute',
                inset: -28,
                borderRadius: '50%',
                border: '1px solid rgba(201,123,156,.12)',
                animation: 'orb-spin-r 22s linear infinite',
              }}
            >
              <div style={{
                position: 'absolute',
                top: 0, left: '50%',
                width: 6, height: 6,
                borderRadius: '50%',
                background: '#C97B9C',
                boxShadow: '0 0 6px #C97B9C',
                transform: 'translateX(-50%) translateY(-3px)',
              }} />
              <div style={{
                position: 'absolute',
                bottom: 0, left: '50%',
                width: 4, height: 4,
                borderRadius: '50%',
                background: 'rgba(201,123,156,.6)',
                transform: 'translateX(-50%) translateY(2px)',
              }} />
            </div>

            {/* The orb */}
            <div
              style={{
                position: 'absolute', inset: 0,
                borderRadius: '50%',
                background: 'radial-gradient(circle at 32% 30%, #F8E8D0 0%, #D4A553 22%, #C07890 50%, #6B2070 74%, #180818 100%)',
                animation: 'orb-pulse 5s ease-in-out infinite',
                overflow: 'hidden',
              }}
            >
              {/* Rotating conic overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: -60,
                  background: 'conic-gradient(from 0deg, transparent 0%, rgba(212,165,83,.28) 18%, transparent 35%, rgba(255,210,195,.18) 62%, transparent 82%)',
                  animation: 'orb-spin 9s linear infinite',
                  mixBlendMode: 'screen',
                }}
              />

              {/* Specular highlight */}
              <div
                style={{
                  position: 'absolute',
                  top: '12%', left: '20%',
                  width: '40%', height: '32%',
                  borderRadius: '50%',
                  background: 'radial-gradient(ellipse, rgba(255,255,255,.65) 0%, transparent 70%)',
                  filter: 'blur(9px)',
                }}
              />

              {/* Depth shadow at base */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0, left: 0, right: 0,
                  height: '38%',
                  background: 'radial-gradient(ellipse at 50% 110%, rgba(8,3,16,.65) 0%, transparent 70%)',
                }}
              />

              {/* Inner shimmer stripe */}
              <div
                style={{
                  position: 'absolute',
                  top: '30%', left: '45%',
                  width: '12%', height: '40%',
                  background: 'linear-gradient(180deg, transparent, rgba(255,255,255,.12), transparent)',
                  filter: 'blur(4px)',
                  borderRadius: '50%',
                  transform: 'rotate(-20deg)',
                }}
              />
            </div>

            {/* Sparkles */}
            {SPARKLES.map((s, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  top: s.top, left: s.left,
                  width: 7, height: 7,
                  background: '#D4A553',
                  clipPath: 'polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)',
                  animation: `twinkle ${s.dur}s ${s.delay} ease-in-out infinite`,
                }}
              />
            ))}

            {/* Product label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .9, delay: 2.1 }}
              style={{
                position: 'absolute',
                bottom: -72,
                left: '50%',
                transform: 'translateX(-50%)',
                textAlign: 'center',
                whiteSpace: 'nowrap',
              }}
            >
              <div style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: '1.05rem',
                fontWeight: 600,
                color: '#D4A553',
                letterSpacing: '.22em',
                textTransform: 'uppercase',
              }}>
                Sérum d&apos;Or
              </div>
              <div style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '.6rem',
                color: 'rgba(245,237,217,.38)',
                letterSpacing: '.18em',
                textTransform: 'uppercase',
                marginTop: 4,
              }}>
                24K Liquid Gold Formula · 30ml
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ─── Bottom bar ─── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.3 }}
        style={{
          position: 'absolute',
          bottom: 28,
          left: '5vw', right: '5vw',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid rgba(212,165,83,.08)',
          paddingTop: 18,
          zIndex: 10,
        }}
      >
        <div style={{
          fontFamily: 'var(--font-cormorant), Georgia, serif',
          fontSize: '1rem',
          fontStyle: 'italic',
          color: 'rgba(245,237,217,.25)',
          letterSpacing: '.06em',
        }}>
          Lumière Beauty
        </div>

        <div style={{ display: 'flex', gap: 30, alignItems: 'center' }}>
          {['Instagram', 'Pinterest', 'TikTok'].map(s => (
            <span
              key={s}
              className="social-link"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '.62rem',
                color: 'rgba(245,237,217,.25)',
                letterSpacing: '.14em',
                textTransform: 'uppercase',
                cursor: 'none',
                transition: 'color .25s',
              }}
            >
              {s}
            </span>
          ))}
        </div>

        <div style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '.6rem',
          color: 'rgba(245,237,217,.18)',
          letterSpacing: '.12em',
          textTransform: 'uppercase',
        }}>
          © 2026
        </div>
      </motion.div>
    </div>
  )
}
