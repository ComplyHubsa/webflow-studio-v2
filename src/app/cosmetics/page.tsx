'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Cormorant_Garamond, Inter } from 'next/font/google'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
})
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
})

// ─── Data ────────────────────────────────────────────────────────────────────

type Shade = {
  id: string
  name: string
  code: string
  deep: string
  mid: string
  bright: string
  highlight: string
}

const SHADES: Shade[] = [
  { id: 'rouge',  name: 'Rouge Noir',   code: '01', deep: '#2A050C', mid: '#7A1A28', bright: '#B83246', highlight: '#F8A8B0' },
  { id: 'velvet', name: 'Velours Plum', code: '02', deep: '#2C0E1C', mid: '#7A2848', bright: '#B44872', highlight: '#F4B4CC' },
  { id: 'rose',   name: 'Rose Sauvage', code: '03', deep: '#4A1020', mid: '#A8334C', bright: '#D85878', highlight: '#FFC4D0' },
  { id: 'coral',  name: 'Coral Brûlé',  code: '04', deep: '#5A1810', mid: '#C44A2E', bright: '#E87858', highlight: '#FFCCAC' },
  { id: 'nude',   name: 'Nude Soie',    code: '05', deep: '#522C18', mid: '#A56A4C', bright: '#D89878', highlight: '#F8D4B8' },
]

const PRODUCTS = [
  { name: 'Velours Mat',    tag: 'Liquid Matte',     price: '$48', desc: '12-hour wear, silk-pressed pigment, zero transfer.',     accent: '#7A1A28' },
  { name: 'Rouge à Lèvres', tag: 'Satin Bullet',     price: '$42', desc: 'Our signature lipstick in eighteen wearable shades.',    accent: '#A8334C' },
  { name: 'Gloss Pur',      tag: 'High-Shine Oil',   price: '$36', desc: 'Liquid mirror finish, infused with botanical squalane.', accent: '#D85878' },
  { name: 'Stain Éternel',  tag: 'Water-Wear Stain', price: '$52', desc: 'Stained-glass color that lasts through twelve hours.',   accent: '#C44A2E' },
]

const REVIEWS = [
  { text: 'I have never had a lipstick feel like this. Like water on the lips, like silk. I have ordered every shade.',  who: 'Camille Aubert',   role: 'Makeup Artist · Paris' },
  { text: 'Rouge Noir is the only red I trust on set. The pigment is unreal. Twelve hours minimum without retouch.',     who: 'Imani Okafor',     role: 'Editorial Director · Vogue' },
  { text: 'It changed my relationship with red lipstick. I never thought a shade could feel made for my face.',          who: 'Sofía Reyes',      role: 'Verified Buyer' },
]

const PETALS = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: `${(i * 17 + 3) % 96}%`,
  delay: `${((i * 1.7) % 14).toFixed(1)}s`,
  duration: `${(16 + ((i * 1.3) % 12)).toFixed(1)}s`,
  size: 7 + (i % 4) * 3,
  rotate: (i * 47) % 360,
  opacity: 0.18 + (i % 5) * 0.04,
}))

// ─── Helpers ─────────────────────────────────────────────────────────────────

function Reveal({
  children, delay = 0, y = 30, className = '', as = 'div',
}: {
  children: React.ReactNode; delay?: number; y?: number; className?: string; as?: 'div' | 'span'
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const Tag = as === 'span' ? motion.span : motion.div
  return (
    <Tag
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </Tag>
  )
}

// ─── Kiss mark (on click) ────────────────────────────────────────────────────

type Kiss = { id: number; x: number; y: number; shade: Shade }

function KissMark({ x, y, shade }: { x: number; y: number; shade: Shade }) {
  return (
    <div
      style={{
        position: 'fixed',
        left: x, top: y,
        width: 64, height: 50,
        pointerEvents: 'none',
        zIndex: 5,
        animation: 'kiss-fade 3s ease-out forwards',
      }}
    >
      <svg viewBox="0 0 64 50" width="64" height="50">
        <defs>
          <radialGradient id={`kiss-${shade.id}`}>
            <stop offset="0%" stopColor={shade.bright} />
            <stop offset="60%" stopColor={shade.mid} />
            <stop offset="100%" stopColor={shade.deep} />
          </radialGradient>
        </defs>
        {/* Upper lip */}
        <path
          d="M 4 22 Q 10 8, 18 14 Q 24 8, 32 18 Q 40 8, 46 14 Q 54 8, 60 22 Q 50 24, 32 22 Q 14 24, 4 22 Z"
          fill={`url(#kiss-${shade.id})`}
          opacity="0.85"
        />
        {/* Lower lip */}
        <path
          d="M 6 24 Q 18 44, 32 42 Q 46 44, 58 24 Q 46 30, 32 30 Q 18 30, 6 24 Z"
          fill={`url(#kiss-${shade.id})`}
          opacity="0.78"
        />
        {/* Center highlight */}
        <ellipse cx="32" cy="36" rx="3" ry="1.5" fill={shade.highlight} opacity="0.4" />
      </svg>
    </div>
  )
}

// ─── The Lipstick (SVG, color-reactive) ──────────────────────────────────────

function Lipstick({ shade }: { shade: Shade }) {
  return (
    <div
      style={{
        position: 'relative',
        width: 'min(360px, 78vw)',
        aspectRatio: '0.62 / 1',
        perspective: 1200,
      }}
    >
      {/* Liquid swatch backdrop — pulses behind the lipstick */}
      <div
        style={{
          position: 'absolute',
          inset: '8% -8% 8% -8%',
          background: `radial-gradient(ellipse at 50% 55%, ${shade.bright}55 0%, ${shade.mid}33 35%, transparent 70%)`,
          filter: 'blur(28px)',
          animation: 'swatch-pulse 6s ease-in-out infinite',
          transition: 'background 1.2s ease',
          pointerEvents: 'none',
        }}
      />

      {/* Swatch stroke — a hand-painted brush mark */}
      <svg
        viewBox="0 0 360 580"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.55,
          mixBlendMode: 'multiply',
          pointerEvents: 'none',
        }}
      >
        <defs>
          <linearGradient id="swatch-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor={shade.mid}    stopOpacity="0" />
            <stop offset="30%"  stopColor={shade.bright} stopOpacity="0.85" />
            <stop offset="70%"  stopColor={shade.mid}    stopOpacity="0.85" />
            <stop offset="100%" stopColor={shade.deep}   stopOpacity="0" />
          </linearGradient>
          <filter id="rough">
            <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="2" seed="3" />
            <feDisplacementMap in="SourceGraphic" scale="14" />
          </filter>
        </defs>
        <path
          d="M 30 340 Q 110 260, 180 300 T 330 280"
          stroke="url(#swatch-grad)"
          strokeWidth="58"
          strokeLinecap="round"
          fill="none"
          filter="url(#rough)"
          style={{ transition: 'all 1.2s ease' }}
        />
      </svg>

      {/* Floor shadow */}
      <div
        style={{
          position: 'absolute',
          left: '50%', bottom: '4%',
          width: '60%', height: 28,
          background: 'radial-gradient(ellipse, rgba(80,20,30,.45) 0%, transparent 70%)',
          transform: 'translateX(-50%)',
          filter: 'blur(8px)',
          animation: 'shadow-pulse 6s ease-in-out infinite',
        }}
      />

      {/* ───── CAP (floats above with gap, tilted slightly) ───── */}
      <div
        style={{
          position: 'absolute',
          left: '20%', top: '0%',
          width: '60%', height: '28%',
          animation: 'cap-float 6s ease-in-out infinite',
          transformStyle: 'preserve-3d',
        }}
      >
        <div
          style={{
            position: 'absolute', inset: 0,
            background: `
              linear-gradient(90deg,
                #4A1820 0%,
                #8C4250 12%,
                #E8B4B8 26%,
                #C28890 45%,
                #8C4250 65%,
                #5C2530 82%,
                #2C0810 100%)
            `,
            borderRadius: '6px',
            boxShadow:
              'inset 0 -8px 18px rgba(40,8,16,.55), inset 0 6px 12px rgba(255,220,220,.35), 0 18px 36px rgba(40,8,16,.25)',
            transform: 'rotateZ(-4deg)',
          }}
        >
          {/* Top cap detail (the closed end of the cap) */}
          <div
            style={{
              position: 'absolute',
              top: -3, left: '8%', right: '8%',
              height: 8,
              background: 'linear-gradient(90deg, #2C0810, #6C2C38 50%, #2C0810)',
              borderRadius: '4px 4px 0 0',
            }}
          />
          {/* Brand engraving */}
          <div
            style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontStyle: 'italic',
              fontWeight: 500,
              fontSize: '1.35rem',
              color: 'rgba(255,225,220,.55)',
              letterSpacing: '.05em',
              textShadow: '0 1px 2px rgba(0,0,0,.4)',
              pointerEvents: 'none',
            }}
          >
            V
          </div>
          {/* Glossy reflection sweep */}
          <div
            style={{
              position: 'absolute',
              top: 4, bottom: 4,
              left: '18%', width: '8%',
              background: 'linear-gradient(180deg, rgba(255,235,235,.7), rgba(255,235,235,.1))',
              borderRadius: 4,
              filter: 'blur(.5px)',
            }}
          />
        </div>
      </div>

      {/* ───── CASE + BULLET assembly (swaying gently) ───── */}
      <div
        style={{
          position: 'absolute',
          left: '20%', top: '40%',
          width: '60%', height: '58%',
          animation: 'case-sway 8s ease-in-out infinite',
          transformOrigin: 'bottom center',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* The bullet (peeking from the case, with angled cut tip) */}
        <div
          style={{
            position: 'absolute',
            left: '14%', top: '-32%',
            width: '72%', height: '50%',
            background: `linear-gradient(95deg, ${shade.deep} 0%, ${shade.mid} 35%, ${shade.bright} 60%, ${shade.mid} 85%, ${shade.deep} 100%)`,
            clipPath: 'polygon(0 100%, 100% 100%, 100% 30%, 0 0)',
            transition: 'background 1.2s ease',
            boxShadow: `inset -6px 0 10px ${shade.deep}66`,
          }}
        >
          {/* Glossy highlight running down the left edge of the bullet */}
          <div
            style={{
              position: 'absolute',
              top: 6, bottom: 4, left: '12%', width: '14%',
              background: `linear-gradient(180deg, ${shade.highlight}cc, ${shade.bright}33)`,
              filter: 'blur(2px)',
              borderRadius: '50%',
              transition: 'background 1.2s ease',
            }}
          />
          {/* Slant face highlight (the cut surface catching light) */}
          <div
            style={{
              position: 'absolute',
              top: '8%', left: '20%',
              width: '50%', height: '14%',
              background: `linear-gradient(180deg, ${shade.highlight}aa, transparent)`,
              filter: 'blur(3px)',
              transform: 'rotate(-22deg)',
              borderRadius: '50%',
              transition: 'background 1.2s ease',
            }}
          />
        </div>

        {/* Rim where the cap meets the case */}
        <div
          style={{
            position: 'absolute',
            top: '6%', left: '-2%', right: '-2%',
            height: 10,
            background: 'linear-gradient(180deg, #1A0408, #4C1820 50%, #1A0408)',
            borderRadius: 3,
            boxShadow: '0 2px 4px rgba(0,0,0,.5)',
            zIndex: 3,
          }}
        />

        {/* Case body */}
        <div
          style={{
            position: 'absolute',
            top: '10%', left: 0, right: 0, bottom: 0,
            background: `
              linear-gradient(90deg,
                #4A1820 0%,
                #8C4250 12%,
                #E8B4B8 26%,
                #C28890 45%,
                #8C4250 65%,
                #5C2530 82%,
                #2C0810 100%)
            `,
            borderRadius: '6px',
            boxShadow:
              'inset 0 -10px 20px rgba(40,8,16,.55), inset 0 8px 14px rgba(255,220,220,.35), 0 24px 44px rgba(40,8,16,.3)',
            overflow: 'hidden',
          }}
        >
          {/* Glossy reflection sweep */}
          <div
            style={{
              position: 'absolute',
              top: 4, bottom: 4,
              left: '18%', width: '7%',
              background: 'linear-gradient(180deg, rgba(255,235,235,.7), rgba(255,235,235,.1))',
              borderRadius: 4,
              filter: 'blur(.5px)',
            }}
          />
          {/* Brand on the case */}
          <div
            style={{
              position: 'absolute',
              left: 0, right: 0, top: '40%',
              textAlign: 'center',
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(.9rem, 2vw, 1.1rem)',
              color: 'rgba(255,225,220,.55)',
              letterSpacing: '.18em',
              textShadow: '0 1px 2px rgba(0,0,0,.4)',
              pointerEvents: 'none',
            }}
          >
            VELOUR
          </div>
          {/* Bottom seam line */}
          <div
            style={{
              position: 'absolute',
              left: '5%', right: '5%', bottom: '24%',
              height: 1,
              background: 'rgba(20,4,8,.5)',
            }}
          />
          {/* Twist mechanism ring at the bottom */}
          <div
            style={{
              position: 'absolute',
              left: '-3%', right: '-3%', bottom: '8%',
              height: 14,
              background: 'linear-gradient(180deg, #1A0408, #6C2C38 50%, #1A0408)',
              borderRadius: 4,
              boxShadow: 'inset 0 2px 3px rgba(0,0,0,.5)',
            }}
          />
        </div>

        {/* Shimmer sweep across the whole assembly */}
        <div
          style={{
            position: 'absolute', inset: 0,
            overflow: 'hidden',
            borderRadius: 6,
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: -20, bottom: -20,
              left: '-30%', width: '20%',
              background: 'linear-gradient(90deg, transparent, rgba(255,240,235,.55), transparent)',
              animation: 'shimmer-sweep 7s ease-in-out infinite',
            }}
          />
        </div>
      </div>
    </div>
  )
}

// ─── Nav ─────────────────────────────────────────────────────────────────────

function Nav() {
  return (
    <nav
      style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 'clamp(20px, 3vw, 32px) clamp(20px, 5vw, 56px)',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-cormorant), Georgia, serif',
          fontStyle: 'italic',
          fontSize: 'clamp(1.4rem, 2.4vw, 1.75rem)',
          fontWeight: 500,
          color: '#2A0C16',
          letterSpacing: '.04em',
        }}
      >
        Velour<span style={{ color: '#A8334C' }}>.</span>
      </div>

      <div
        style={{
          display: 'flex',
          gap: 'clamp(16px, 3vw, 32px)',
          alignItems: 'center',
        }}
        className="velour-nav-links"
      >
        {['Shop', 'Shades', 'Story', 'Journal'].map(l => (
          <a
            key={l}
            href="#"
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: '.7rem',
              fontWeight: 600,
              color: '#2A0C16',
              letterSpacing: '.22em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              opacity: 0.7,
              transition: 'opacity .25s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '0.7')}
          >
            {l}
          </a>
        ))}
        <button
          style={{
            padding: '10px 22px',
            background: '#2A0C16',
            border: 'none',
            color: '#F5E8DC',
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: '.66rem',
            fontWeight: 600,
            letterSpacing: '.22em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            borderRadius: 0,
          }}
        >
          Bag · 0
        </button>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .velour-nav-links > a { display: none; }
        }
      `}</style>
    </nav>
  )
}

// ─── Hero ────────────────────────────────────────────────────────────────────

function Hero({ shade, setShade }: { shade: Shade; setShade: (s: Shade) => void }) {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: 'clamp(100px, 14vh, 140px) clamp(20px, 5vw, 56px) 60px',
        zIndex: 10,
      }}
    >
      <div
        className="velour-hero-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(40px, 5vw, 80px)',
          alignItems: 'center',
          width: '100%',
          maxWidth: 1320,
          margin: '0 auto',
        }}
      >
        {/* LEFT — Editorial copy */}
        <div className="velour-hero-copy" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 36 }}
          >
            <div style={{ width: 32, height: 1, background: '#A8334C' }} />
            <span
              style={{
                fontSize: '.66rem',
                color: '#A8334C',
                letterSpacing: '.28em',
                fontWeight: 600,
                textTransform: 'uppercase',
              }}
            >
              La Collection · Spring 2026
            </span>
          </motion.div>

          {/* Brand name — staggered letter reveal */}
          <div style={{ overflow: 'hidden', marginBottom: 12 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {'VELOUR'.split('').map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ y: '110%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.95, delay: 0.3 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    display: 'inline-block',
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontSize: 'clamp(4rem, 11vw, 9rem)',
                    fontWeight: 400,
                    fontStyle: 'italic',
                    color: '#2A0C16',
                    lineHeight: 0.88,
                    letterSpacing: '-.02em',
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0 }}
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(1.1rem, 2.2vw, 1.6rem)',
              fontStyle: 'italic',
              fontWeight: 300,
              color: 'rgba(42,12,22,.65)',
              marginBottom: 28,
              letterSpacing: '.02em',
            }}
          >
            The lipstick, reimagined as ritual.
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: 110,
              height: 1,
              background: 'linear-gradient(90deg, #A8334C, transparent)',
              marginBottom: 26,
              transformOrigin: 'left',
            }}
          />

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.35 }}
            style={{
              fontSize: 'clamp(.88rem, 1.2vw, .96rem)',
              color: 'rgba(42,12,22,.62)',
              lineHeight: 1.85,
              maxWidth: 440,
              marginBottom: 38,
              fontWeight: 300,
              letterSpacing: '.01em',
            }}
          >
            Twelve hours of color. Silk-pressed pigment milled in Grasse,
            poured into a brass case engraved by hand. One shade. One life.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.55 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginBottom: 44 }}
          >
            <button
              data-no-kiss
              style={{
                position: 'relative',
                overflow: 'hidden',
                padding: '16px 38px',
                background: '#2A0C16',
                border: 'none',
                color: '#F5E8DC',
                fontSize: '.7rem',
                fontWeight: 700,
                letterSpacing: '.22em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                minHeight: 48,
              }}
            >
              Shop {shade.name}
            </button>
            <button
              data-no-kiss
              style={{
                padding: '16px 38px',
                background: 'transparent',
                border: '1px solid rgba(42,12,22,.3)',
                color: '#2A0C16',
                fontSize: '.7rem',
                fontWeight: 600,
                letterSpacing: '.22em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                minHeight: 48,
                transition: 'all .25s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#2A0C16'
                e.currentTarget.style.color = '#F5E8DC'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = '#2A0C16'
              }}
            >
              Find Your Shade
            </button>
          </motion.div>

          {/* SHADE SELECTOR */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.75 }}
          >
            <div
              style={{
                fontSize: '.62rem',
                color: 'rgba(42,12,22,.5)',
                letterSpacing: '.24em',
                textTransform: 'uppercase',
                fontWeight: 600,
                marginBottom: 18,
              }}
            >
              {shade.code} · {shade.name}
            </div>

            <div
              data-no-kiss
              style={{
                display: 'flex',
                gap: 'clamp(10px, 1.8vw, 16px)',
                alignItems: 'center',
              }}
            >
              {SHADES.map(s => {
                const active = s.id === shade.id
                return (
                  <button
                    key={s.id}
                    data-no-kiss
                    onClick={() => setShade(s)}
                    aria-label={`Select ${s.name}`}
                    style={{
                      position: 'relative',
                      width: 'clamp(40px, 6vw, 52px)',
                      height: 'clamp(40px, 6vw, 52px)',
                      padding: 0,
                      borderRadius: '50%',
                      background: `radial-gradient(circle at 35% 30%, ${s.highlight} 0%, ${s.bright} 30%, ${s.mid} 60%, ${s.deep} 100%)`,
                      border: active ? '2px solid #2A0C16' : '2px solid transparent',
                      boxShadow: active
                        ? `0 6px 18px ${s.mid}66, inset 0 0 0 2px #F5E8DC`
                        : `0 4px 12px ${s.mid}44`,
                      cursor: 'pointer',
                      transition: 'all .35s ease',
                      transform: active ? 'translateY(-3px)' : 'translateY(0)',
                    }}
                  >
                    {active && (
                      <span
                        style={{
                          position: 'absolute',
                          left: '50%', bottom: -22,
                          transform: 'translateX(-50%)',
                          fontSize: '.55rem',
                          color: '#2A0C16',
                          letterSpacing: '.16em',
                          fontWeight: 700,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {s.code}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* RIGHT — The Lipstick */}
        <motion.div
          className="velour-hero-product"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <Lipstick shade={shade} />

          {/* Floating product callout */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 2 }}
            className="velour-product-callout"
            style={{
              position: 'absolute',
              right: '-4%',
              bottom: '12%',
              maxWidth: 200,
              padding: '14px 18px',
              background: 'rgba(245,232,220,.85)',
              backdropFilter: 'blur(6px)',
              border: '1px solid rgba(42,12,22,.12)',
              zIndex: 4,
            }}
          >
            <div
              style={{
                fontSize: '.58rem',
                color: '#A8334C',
                letterSpacing: '.22em',
                textTransform: 'uppercase',
                fontWeight: 700,
                marginBottom: 6,
              }}
            >
              Rouge à Lèvres
            </div>
            <div
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontStyle: 'italic',
                fontSize: '1.1rem',
                color: '#2A0C16',
                marginBottom: 4,
              }}
            >
              {shade.name}
            </div>
            <div
              style={{
                fontSize: '.65rem',
                color: 'rgba(42,12,22,.55)',
                letterSpacing: '.06em',
              }}
            >
              Satin Bullet · 3.5g · $42
            </div>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .velour-hero-grid {
            grid-template-columns: 1fr !important;
            gap: 56px !important;
          }
          .velour-hero-product {
            order: -1;
            flex-direction: column !important;
            justify-content: center !important;
            align-items: center !important;
          }
          .velour-product-callout {
            right: 0 !important;
            bottom: -8% !important;
          }
        }
        @media (max-width: 520px) {
          .velour-product-callout {
            position: relative !important;
            right: auto !important;
            bottom: auto !important;
            margin-top: 28px;
            max-width: 280px !important;
            text-align: center;
          }
        }
      `}</style>
    </section>
  )
}

// ─── Story Section ───────────────────────────────────────────────────────────

function Story() {
  return (
    <section
      style={{
        position: 'relative',
        padding: 'clamp(80px, 12vw, 140px) clamp(20px, 5vw, 56px)',
        background: 'linear-gradient(180deg, transparent 0%, rgba(232,180,184,.3) 100%)',
        zIndex: 10,
      }}
    >
      <div
        className="velour-story-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          gap: 'clamp(40px, 6vw, 100px)',
          alignItems: 'center',
          maxWidth: 1320,
          margin: '0 auto',
        }}
      >
        <div>
          <Reveal>
            <div
              style={{
                fontSize: '.66rem',
                color: '#A8334C',
                letterSpacing: '.28em',
                fontWeight: 600,
                textTransform: 'uppercase',
                marginBottom: 22,
              }}
            >
              The House of Velour
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)',
                fontStyle: 'italic',
                fontWeight: 400,
                lineHeight: 1,
                color: '#2A0C16',
                letterSpacing: '-.01em',
                marginBottom: 36,
              }}
            >
              Color, as it was<br />meant to be worn.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p
              style={{
                fontSize: 'clamp(.9rem, 1.2vw, 1rem)',
                color: 'rgba(42,12,22,.65)',
                lineHeight: 1.85,
                fontWeight: 300,
                maxWidth: 480,
                marginBottom: 22,
              }}
            >
              We started Velour because we couldn't find a lipstick we actually
              wanted to wear. Most lipsticks dry, crack, or vanish by lunch.
              Ours doesn't. Our pigments are silk-pressed in Grasse,
              hand-poured into solid brass cases, and tested on real lips —
              never animals.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p
              style={{
                fontSize: 'clamp(.9rem, 1.2vw, 1rem)',
                color: 'rgba(42,12,22,.65)',
                lineHeight: 1.85,
                fontWeight: 300,
                maxWidth: 480,
                marginBottom: 36,
              }}
            >
              The result is a lipstick that wears like skin, feels like silk,
              and lasts twelve hours without a single touch-up.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32 }}>
              {[
                { n: '12h', l: 'Wear time' },
                { n: '0%',  l: 'Drying' },
                { n: '47',  l: 'Shades' },
              ].map(m => (
                <div key={m.l}>
                  <div
                    style={{
                      fontFamily: 'var(--font-cormorant), Georgia, serif',
                      fontStyle: 'italic',
                      fontSize: 'clamp(2.2rem, 4vw, 3rem)',
                      fontWeight: 500,
                      color: '#A8334C',
                      lineHeight: 1,
                      marginBottom: 4,
                    }}
                  >
                    {m.n}
                  </div>
                  <div
                    style={{
                      fontSize: '.6rem',
                      color: 'rgba(42,12,22,.5)',
                      letterSpacing: '.22em',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                    }}
                  >
                    {m.l}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Right — animated swatch panel */}
        <Reveal delay={0.15} y={50}>
          <div
            style={{
              position: 'relative',
              aspectRatio: '4 / 5',
              borderRadius: 4,
              overflow: 'hidden',
              background: 'linear-gradient(135deg, #F5E8DC 0%, #E8B4B8 50%, #B83246 100%)',
              boxShadow: '0 30px 70px rgba(122,26,40,.25)',
            }}
          >
            {/* Animated brush strokes */}
            <svg
              viewBox="0 0 400 500"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                <filter id="story-rough">
                  <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" seed="7" />
                  <feDisplacementMap in="SourceGraphic" scale="22" />
                </filter>
              </defs>
              {[
                { d: 'M 40 120 Q 200 80, 360 130', c: '#7A1A28', w: 38, delay: 0 },
                { d: 'M 30 220 Q 200 200, 370 230', c: '#A8334C', w: 30, delay: 0.4 },
                { d: 'M 50 320 Q 180 290, 360 320', c: '#D85878', w: 26, delay: 0.8 },
                { d: 'M 40 410 Q 200 380, 350 405', c: '#C44A2E', w: 22, delay: 1.2 },
              ].map((s, i) => (
                <motion.path
                  key={i}
                  d={s.d}
                  stroke={s.c}
                  strokeWidth={s.w}
                  strokeLinecap="round"
                  fill="none"
                  filter="url(#story-rough)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.85 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.6, delay: s.delay, ease: 'easeOut' }}
                />
              ))}
            </svg>

            {/* Overlay text */}
            <div
              style={{
                position: 'absolute',
                left: 24, right: 24, bottom: 24,
                color: '#F5E8DC',
                zIndex: 2,
              }}
            >
              <div
                style={{
                  fontSize: '.6rem',
                  letterSpacing: '.24em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  opacity: 0.85,
                  marginBottom: 6,
                }}
              >
                Swatch Test · No Filter
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-cormorant), Georgia, serif',
                  fontStyle: 'italic',
                  fontSize: 'clamp(1.2rem, 2.4vw, 1.6rem)',
                  lineHeight: 1.2,
                }}
              >
                Color you can feel.
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .velour-story-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}

// ─── Collection ──────────────────────────────────────────────────────────────

function Collection() {
  return (
    <section
      style={{
        position: 'relative',
        padding: 'clamp(80px, 12vw, 140px) clamp(20px, 5vw, 56px)',
        zIndex: 10,
      }}
    >
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <Reveal>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: 24,
              flexWrap: 'wrap',
              marginBottom: 56,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: '.66rem',
                  color: '#A8334C',
                  letterSpacing: '.28em',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  marginBottom: 14,
                }}
              >
                The Collection
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-cormorant), Georgia, serif',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
                  lineHeight: 1,
                  color: '#2A0C16',
                  margin: 0,
                  letterSpacing: '-.01em',
                }}
              >
                Four formulas. One obsession.
              </h2>
            </div>
            <a
              href="#"
              style={{
                fontSize: '.66rem',
                color: '#2A0C16',
                letterSpacing: '.22em',
                fontWeight: 600,
                textTransform: 'uppercase',
                textDecoration: 'none',
                paddingBottom: 6,
                borderBottom: '1px solid #A8334C',
              }}
            >
              View All →
            </a>
          </div>
        </Reveal>

        <div
          className="velour-collection-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 'clamp(16px, 2vw, 28px)',
          }}
        >
          {PRODUCTS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08} y={50}>
              <ProductCard {...p} />
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .velour-collection-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .velour-collection-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}

function ProductCard({
  name, tag, price, desc, accent,
}: { name: string; tag: string; price: string; desc: string; accent: string }) {
  const [hover, setHover] = useState(false)
  return (
    <div
      data-no-kiss
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        background: '#FAF1E5',
        padding: 'clamp(20px, 2.4vw, 28px)',
        border: '1px solid rgba(42,12,22,.08)',
        cursor: 'pointer',
        transition: 'all .4s ease',
        transform: hover ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hover ? `0 24px 50px rgba(42,12,22,.18)` : '0 4px 12px rgba(42,12,22,.04)',
        minHeight: '100%',
      }}
    >
      {/* Visual — a swatch puck */}
      <div
        style={{
          position: 'relative',
          aspectRatio: '1 / 1',
          borderRadius: '50%',
          background: `radial-gradient(circle at 32% 28%, ${accent}ee 0%, ${accent} 40%, ${accent}88 80%)`,
          marginBottom: 22,
          boxShadow: `inset -8px -10px 18px rgba(0,0,0,.25), 0 14px 30px ${accent}55`,
          overflow: 'hidden',
        }}
      >
        {/* Glossy highlight */}
        <div
          style={{
            position: 'absolute',
            top: '12%', left: '20%',
            width: '38%', height: '24%',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(255,255,255,.6) 0%, transparent 70%)',
            filter: 'blur(4px)',
            transition: 'transform .4s ease',
            transform: hover ? 'scale(1.1) translateY(-2px)' : 'scale(1)',
          }}
        />
        {/* Brush stroke swatch */}
        <div
          style={{
            position: 'absolute',
            left: '-10%', right: '-10%', bottom: '-6%',
            height: '40%',
            background: `linear-gradient(90deg, transparent, ${accent} 30%, ${accent}cc 70%, transparent)`,
            transform: `rotate(-8deg) translateY(${hover ? '0px' : '4px'})`,
            opacity: hover ? 0.8 : 0,
            transition: 'all .4s ease',
            filter: 'blur(1px)',
          }}
        />
      </div>

      <div
        style={{
          fontSize: '.6rem',
          color: '#A8334C',
          letterSpacing: '.22em',
          fontWeight: 700,
          textTransform: 'uppercase',
          marginBottom: 8,
        }}
      >
        {tag}
      </div>
      <h3
        style={{
          fontFamily: 'var(--font-cormorant), Georgia, serif',
          fontStyle: 'italic',
          fontSize: 'clamp(1.2rem, 1.8vw, 1.5rem)',
          fontWeight: 500,
          color: '#2A0C16',
          margin: '0 0 10px',
          lineHeight: 1.1,
        }}
      >
        {name}
      </h3>
      <p
        style={{
          fontSize: '.78rem',
          color: 'rgba(42,12,22,.55)',
          lineHeight: 1.6,
          fontWeight: 300,
          marginBottom: 18,
          minHeight: '2.5em',
        }}
      >
        {desc}
      </p>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 14,
          borderTop: '1px solid rgba(42,12,22,.1)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontStyle: 'italic',
            fontSize: '1.15rem',
            fontWeight: 600,
            color: '#2A0C16',
          }}
        >
          {price}
        </span>
        <span
          style={{
            fontSize: '.6rem',
            color: hover ? '#A8334C' : 'rgba(42,12,22,.5)',
            letterSpacing: '.22em',
            fontWeight: 700,
            textTransform: 'uppercase',
            transition: 'color .3s',
          }}
        >
          Add to Bag →
        </span>
      </div>
    </div>
  )
}

// ─── Reviews ─────────────────────────────────────────────────────────────────

function Reviews() {
  return (
    <section
      style={{
        position: 'relative',
        padding: 'clamp(80px, 12vw, 140px) clamp(20px, 5vw, 56px)',
        background: 'rgba(42,12,22,.96)',
        color: '#F5E8DC',
        zIndex: 10,
      }}
    >
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div
              style={{
                fontSize: '.66rem',
                color: '#E8B4B8',
                letterSpacing: '.28em',
                fontWeight: 600,
                textTransform: 'uppercase',
                marginBottom: 14,
              }}
            >
              4.9 / 5 · 14,287 reviews
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
                lineHeight: 1.1,
                color: '#F5E8DC',
                margin: 0,
                letterSpacing: '-.01em',
              }}
            >
              The lipstick of record.
            </h2>
          </div>
        </Reveal>

        <div
          className="velour-reviews-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'clamp(20px, 3vw, 40px)',
          }}
        >
          {REVIEWS.map((r, i) => (
            <Reveal key={r.who} delay={i * 0.1} y={40}>
              <div
                style={{
                  padding: 'clamp(28px, 3vw, 40px)',
                  background: 'rgba(245,232,220,.05)',
                  border: '1px solid rgba(245,232,220,.1)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div
                  style={{
                    color: '#E8B4B8',
                    fontSize: '1rem',
                    letterSpacing: '.18em',
                    marginBottom: 22,
                  }}
                >
                  ★★★★★
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontStyle: 'italic',
                    fontSize: 'clamp(1.05rem, 1.4vw, 1.25rem)',
                    fontWeight: 400,
                    lineHeight: 1.5,
                    color: '#F5E8DC',
                    flex: 1,
                    marginBottom: 26,
                  }}
                >
                  "{r.text}"
                </p>
                <div
                  style={{
                    paddingTop: 22,
                    borderTop: '1px solid rgba(245,232,220,.15)',
                  }}
                >
                  <div
                    style={{
                      fontSize: '.82rem',
                      fontWeight: 600,
                      color: '#F5E8DC',
                      marginBottom: 4,
                      letterSpacing: '.03em',
                    }}
                  >
                    {r.who}
                  </div>
                  <div
                    style={{
                      fontSize: '.62rem',
                      color: 'rgba(245,232,220,.5)',
                      letterSpacing: '.16em',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                    }}
                  >
                    {r.role}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .velour-reviews-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}

// ─── Newsletter ──────────────────────────────────────────────────────────────

function Newsletter() {
  return (
    <section
      style={{
        position: 'relative',
        padding: 'clamp(80px, 12vw, 130px) clamp(20px, 5vw, 56px)',
        background: 'linear-gradient(180deg, rgba(232,180,184,.35) 0%, rgba(245,232,220,1) 100%)',
        zIndex: 10,
      }}
    >
      <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
        <Reveal>
          <div
            style={{
              fontSize: '.66rem',
              color: '#A8334C',
              letterSpacing: '.28em',
              fontWeight: 600,
              textTransform: 'uppercase',
              marginBottom: 18,
            }}
          >
            Join the House
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(2rem, 4.6vw, 3.4rem)',
              lineHeight: 1.05,
              color: '#2A0C16',
              margin: '0 0 22px',
              letterSpacing: '-.01em',
            }}
          >
            First on every shade. Always.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p
            style={{
              fontSize: 'clamp(.9rem, 1.2vw, 1rem)',
              color: 'rgba(42,12,22,.6)',
              lineHeight: 1.7,
              fontWeight: 300,
              marginBottom: 36,
            }}
          >
            New collections, sample drops, and the occasional letter from the founder.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <form
            data-no-kiss
            onSubmit={e => e.preventDefault()}
            style={{
              display: 'flex',
              gap: 0,
              maxWidth: 520,
              margin: '0 auto',
              border: '1px solid rgba(42,12,22,.2)',
              background: '#FAF1E5',
            }}
            className="velour-newsletter-form"
          >
            <input
              type="email"
              placeholder="your@email.com"
              required
              style={{
                flex: 1,
                padding: '16px 20px',
                border: 'none',
                outline: 'none',
                background: 'transparent',
                fontSize: '.88rem',
                color: '#2A0C16',
                fontFamily: 'var(--font-inter), sans-serif',
                minHeight: 48,
              }}
            />
            <button
              type="submit"
              data-no-kiss
              style={{
                padding: '16px 28px',
                background: '#2A0C16',
                border: 'none',
                color: '#F5E8DC',
                fontSize: '.66rem',
                fontWeight: 700,
                letterSpacing: '.22em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                minHeight: 48,
              }}
            >
              Join →
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  )
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer
      style={{
        position: 'relative',
        padding: 'clamp(48px, 6vw, 72px) clamp(20px, 5vw, 56px) 36px',
        background: '#2A0C16',
        color: 'rgba(245,232,220,.75)',
        zIndex: 10,
      }}
    >
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <div
          className="velour-footer-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
            gap: 'clamp(28px, 4vw, 56px)',
            marginBottom: 56,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontStyle: 'italic',
                fontSize: '1.8rem',
                color: '#F5E8DC',
                marginBottom: 18,
                letterSpacing: '.04em',
              }}
            >
              Velour<span style={{ color: '#E8B4B8' }}>.</span>
            </div>
            <p
              style={{
                fontSize: '.82rem',
                lineHeight: 1.7,
                fontWeight: 300,
                maxWidth: 320,
                opacity: 0.7,
              }}
            >
              Silk-pressed pigment. Solid brass cases. Lipstick made the way it
              was meant to be — slowly, in small batches, in Paris.
            </p>
          </div>

          {[
            { title: 'Shop',     links: ['New Arrivals', 'Lipstick', 'Gloss', 'Lip Care', 'Sets'] },
            { title: 'About',    links: ['Our Story', 'The Atelier', 'Sustainability', 'Press'] },
            { title: 'Help',     links: ['Shipping', 'Returns', 'Find Your Shade', 'Contact'] },
          ].map(col => (
            <div key={col.title}>
              <div
                style={{
                  fontSize: '.62rem',
                  color: '#E8B4B8',
                  letterSpacing: '.24em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  marginBottom: 22,
                }}
              >
                {col.title}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {col.links.map(l => (
                  <a
                    key={l}
                    href="#"
                    style={{
                      color: 'rgba(245,232,220,.65)',
                      fontSize: '.82rem',
                      textDecoration: 'none',
                      fontWeight: 300,
                      transition: 'color .2s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#F5E8DC')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,232,220,.65)')}
                  >
                    {l}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            paddingTop: 32,
            borderTop: '1px solid rgba(245,232,220,.12)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 18,
          }}
        >
          <div
            style={{
              fontSize: '.62rem',
              opacity: 0.5,
              letterSpacing: '.16em',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            © 2026 Maison Velour · Paris
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Instagram', 'TikTok', 'Pinterest'].map(s => (
              <a
                key={s}
                href="#"
                style={{
                  fontSize: '.62rem',
                  color: 'rgba(245,232,220,.5)',
                  letterSpacing: '.18em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .velour-footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </footer>
  )
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function VelourCosmeticsPage() {
  const [shade, setShade] = useState<Shade>(SHADES[0])
  const [mounted, setMounted] = useState(false)
  const [kisses, setKisses] = useState<Kiss[]>([])

  useEffect(() => { setMounted(true) }, [])

  const addKiss = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement
    if (target.closest('button, a, input, form, [data-no-kiss]')) return
    const id = Date.now() + Math.random()
    setKisses(prev => [...prev.slice(-6), { id, x: e.clientX, y: e.clientY, shade }])
    setTimeout(() => setKisses(prev => prev.filter(k => k.id !== id)), 3000)
  }

  return (
    <div
      className={`${cormorant.variable} ${inter.variable}`}
      onClick={addKiss}
      style={{
        position: 'relative',
        minHeight: '100vh',
        background:
          'linear-gradient(180deg, #F5E8DC 0%, #F8E0CE 40%, #F0D8C8 100%)',
        fontFamily: 'var(--font-inter), sans-serif',
        color: '#2A0C16',
        overflow: 'hidden',
        colorScheme: 'only light',
      }}
    >
      <style>{`
        @keyframes petal-drift {
          0%   { transform: translateY(0) translateX(0) rotate(var(--petal-rot, 0deg)); opacity: 0; }
          12%  { opacity: var(--petal-opacity, .25); }
          88%  { opacity: var(--petal-opacity, .25); }
          100% { transform: translateY(-120vh) translateX(80px) rotate(calc(var(--petal-rot, 0deg) + 720deg)); opacity: 0; }
        }
        @keyframes cap-float {
          0%,100% { transform: translateY(-10px) rotateZ(-2deg); }
          50%     { transform: translateY(4px) rotateZ(2deg); }
        }
        @keyframes case-sway {
          0%,100% { transform: rotateZ(-3deg); }
          50%     { transform: rotateZ(3deg); }
        }
        @keyframes shimmer-sweep {
          0%   { transform: translateX(-200%) skewX(-25deg); opacity: 0; }
          15%  { opacity: 1; }
          85%  { opacity: 1; }
          100% { transform: translateX(800%) skewX(-25deg); opacity: 0; }
        }
        @keyframes shadow-pulse {
          0%,100% { transform: translateX(-50%) scaleX(1); opacity: .4; }
          50%     { transform: translateX(-50%) scaleX(.88); opacity: .55; }
        }
        @keyframes swatch-pulse {
          0%,100% { transform: scale(1) rotate(-2deg); opacity: 1; }
          50%     { transform: scale(1.04) rotate(2deg); opacity: .85; }
        }
        @keyframes kiss-fade {
          0%   { transform: translate(-50%, -50%) scale(.2) rotate(0deg); opacity: 0; }
          15%  { transform: translate(-50%, -50%) scale(1.15) rotate(-14deg); opacity: 1; }
          30%  { transform: translate(-50%, -50%) scale(1) rotate(-12deg); opacity: .92; }
          100% { transform: translate(-50%, -50%) scale(1) rotate(-12deg); opacity: 0; }
        }
        html, body { overflow-x: hidden; }
      `}</style>

      {/* Petals */}
      {mounted && PETALS.map(p => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            bottom: -20,
            left: p.left,
            width: p.size,
            height: p.size * 1.6,
            background: 'radial-gradient(ellipse at 30% 30%, rgba(212,120,140,.7) 0%, rgba(168,51,76,.4) 55%, rgba(122,26,40,.15) 100%)',
            borderRadius: '50% 0 50% 0',
            transform: `rotate(${p.rotate}deg)`,
            animation: `petal-drift ${p.duration} ${p.delay} linear infinite`,
            pointerEvents: 'none',
            zIndex: 1,
            '--petal-rot': `${p.rotate}deg`,
            '--petal-opacity': p.opacity,
          } as React.CSSProperties}
        />
      ))}

      {/* Kiss marks */}
      {kisses.map(k => (
        <KissMark key={k.id} x={k.x} y={k.y} shade={k.shade} />
      ))}

      <Nav />
      <Hero shade={shade} setShade={setShade} />
      <Story />
      <Collection />
      <Reviews />
      <Newsletter />
      <Footer />
    </div>
  )
}
