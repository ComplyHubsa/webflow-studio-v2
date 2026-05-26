'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion'
import { Barlow_Condensed, Inter } from 'next/font/google'

const barlow = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-barlow',
})
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-inter',
})

// ── Data ─────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    n: '01', tag: 'Core Service',
    title: 'Commercial Build',
    desc: 'Office towers, retail complexes, mixed-use developments. We deliver structure at scale, on time.',
  },
  {
    n: '02', tag: 'Heavy Works',
    title: 'Industrial',
    desc: 'Warehouses, manufacturing facilities, and heavy-duty infrastructure engineered for extreme loads.',
  },
  {
    n: '03', tag: 'Infrastructure',
    title: 'Civil Engineering',
    desc: 'Roads, bridges, retaining walls, and utility infrastructure that underpins communities.',
  },
  {
    n: '04', tag: 'Full Scope',
    title: 'Design & Build',
    desc: 'One contract. Full accountability. From blank site to final handover, we own the outcome.',
  },
]

const PROJECTS = [
  {
    n: '01', name: 'Sandton Apex Tower', type: 'Commercial · 42 Floors',
    value: 'R 1.2B', year: '2024',
    img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=85',
  },
  {
    n: '02', name: 'Cape Gateway Terminal', type: 'Industrial · Port Facility',
    value: 'R 680M', year: '2023',
    img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=85',
  },
  {
    n: '03', name: 'N1 Interchange Bridge', type: 'Civil · 860m Span',
    value: 'R 340M', year: '2022',
    img: 'https://images.unsplash.com/photo-1590517838740-f6d60ae44d4e?w=1600&q=85',
  },
]

const PROCESS = [
  { n: '01', title: 'Site Assessment', text: 'Geotech, survey, utilities mapping. We know the ground before we break it.' },
  { n: '02', title: 'Engineering', text: 'Structural calculations, sequencing plans, and clash detection via BIM.' },
  { n: '03', title: 'Mobilisation', text: 'Equipment, crews, and materials on-site within agreed timelines. No excuses.' },
  { n: '04', title: 'Delivery', text: 'Daily reporting, milestone tracking, quality assurance at every pour.' },
  { n: '05', title: 'Handover', text: 'As-built drawings, O&M manuals, defects liability. The full package.' },
]

const TESTIMONIALS = [
  {
    text: 'Ironclad delivered a 42-floor tower six weeks early. I have never seen a contractor perform like that in thirty years of property development.',
    who: 'Michael Dlamini', role: 'CEO, Apex Property Group',
  },
  {
    text: 'They found a critical structural issue in the design that three other engineers had missed. Their technical depth is extraordinary.',
    who: 'Priya Naidoo', role: 'Director, Cape Port Authority',
  },
  {
    text: 'Zero LTIs across the entire project. Their safety culture is embedded in every single worker on site.',
    who: 'James van der Merwe', role: 'COO, Forged Industrial',
  },
]

// ── Shared components ─────────────────────────────────────────────────────────

function Reveal({
  children, delay = 0, className = '', y = 40,
}: {
  children: React.ReactNode; delay?: number; className?: string; y?: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ── Tower Crane SVG ───────────────────────────────────────────────────────────

function CraneSVG() {
  // Pivot: (296, 132) — top of mast at jib level
  // Mast rail centres at x=296, from y=132 to y=660
  return (
    <svg
      viewBox="0 0 480 680"
      width="100%"
      height="100%"
      preserveAspectRatio="xMaxYMax meet"
      style={{ overflow: 'visible' }}
      aria-hidden="true"
    >
      {/* ── City silhouette ── */}
      <g opacity="0.14">
        <rect x="20"  y="390" width="55"  height="270" fill="#546E7A" />
        <rect x="84"  y="320" width="72"  height="340" fill="#455A64" />
        <rect x="168" y="360" width="44"  height="300" fill="#546E7A" />
        <rect x="222" y="400" width="38"  height="260" fill="#37474F" />
        {/* windows */}
        {[0,1,2,3,4,5,6].map(r => [0,1,2].map(c => (
          <rect key={`bw${r}${c}`}
            x={28 + c * 17} y={400 + r * 30}
            width={9} height={14} rx={1}
            fill="#FF8A65" opacity={((r + c) % 3) === 0 ? 0.8 : 0.15} />
        )))}
        {[0,1,2,3,4,5].map(r => [0,1,2,3].map(c => (
          <rect key={`bw2${r}${c}`}
            x={90 + c * 16} y={330 + r * 34}
            width={9} height={16} rx={1}
            fill="#FF8A65" opacity={((r * 2 + c) % 3) === 0 ? 0.7 : 0.12} />
        )))}
      </g>

      {/* ── Ground line ── */}
      <rect x="0" y="656" width="480" height="24" fill="#0F0F0F" />

      {/* ── Mast foundation ── */}
      <rect x="248" y="630" width="96"  height="26" rx="3" fill="#161616" />
      <rect x="263" y="610" width="66"  height="22" rx="2" fill="#121212" />

      {/* ── Mast — two rails + cross-bracing ── */}
      <rect x="281" y="132" width="10" height="480" fill="#1A1A1A" />
      <rect x="302" y="132" width="10" height="480" fill="#1A1A1A" />
      {[0,1,2,3,4,5,6,7].map(i => (
        <g key={`brace${i}`}>
          <line x1="281" y1={132 + i * 60} x2="312" y2={132 + i * 60 + 60} stroke="#242424" strokeWidth="2.5" />
          <line x1="312" y1={132 + i * 60} x2="281" y2={132 + i * 60 + 60} stroke="#242424" strokeWidth="2.5" />
          <rect x="281" y={132 + i * 60} width="31" height="3" fill="#1E1E1E" />
        </g>
      ))}

      {/* ── Top assembly — ROTATES around pivot (296, 132) ── */}
      <g transform="translate(296, 132)">
        <g className="crane-sweep" style={{ transformOrigin: '0px 0px' }}>
          <g transform="translate(-296, -132)">

            {/* A-frame apex */}
            <polygon points="296,76 272,136 320,136" fill="#FF5722" />

            {/* Main jib — extends RIGHT */}
            <rect x="296" y="127" width="240" height="14" rx="2" fill="#FF5722" />
            <line x1="296" y1="141" x2="536" y2="141" stroke="#E64A19" strokeWidth="1.5" />

            {/* Tension cables — apex to jib */}
            <line x1="296" y1="76" x2="536" y2="141" stroke="#FF7043" strokeWidth="1.5" opacity="0.75" />
            <line x1="296" y1="76" x2="416" y2="141" stroke="#FF7043" strokeWidth="1.5" opacity="0.75" />

            {/* Counter-jib — extends LEFT */}
            <rect x="186" y="127" width="110" height="14" rx="2" fill="#E64A19" />
            <line x1="296" y1="76" x2="186" y2="141" stroke="#FF7043" strokeWidth="1.5" opacity="0.75" />

            {/* Counterweight */}
            <rect x="153" y="122" width="46" height="28" rx="3" fill="#1E1E1E" stroke="#2C2C2C" strokeWidth="1.5" />
            <line x1="163" y1="136" x2="190" y2="136" stroke="#2C2C2C" strokeWidth="1" />
            <line x1="176" y1="124" x2="176" y2="148" stroke="#2C2C2C" strokeWidth="1" />

            {/* Operator cabin */}
            <rect x="279" y="100" width="26" height="36" rx="2" fill="#111" stroke="#222" strokeWidth="1.5" />
            <rect x="282" y="104"  width="11" height="8"  rx="1" fill="#FF8A65" opacity="0.85" />
            <rect x="282" y="116" width="11" height="8"  rx="1" fill="#FF8A65" opacity="0.5" />

            {/* Warning light */}
            <circle cx="296" cy="73" r="5"  fill="#FF1744" className="warn-light" />
            <circle cx="296" cy="73" r="10" fill="rgba(255,23,68,0.2)" className="warn-light" />

            {/* ── Trolley + rope + hook ── */}
            {/* Trolley sits at x=400 on the jib */}
            <g>
              <rect x="393" y="141" width="18" height="11" rx="2" fill="#333" />

              {/* Rope (dashed vertical line) */}
              <line x1="402" y1="152" x2="402" y2="330" stroke="#546E7A" strokeWidth="1.5" strokeDasharray="5 3" />

              {/* Hook group — moves vertically */}
              <g className="hook-cycle">
                {/* Load block */}
                <rect x="386" y="310" width="32" height="24" rx="2" fill="#1A1A1A" stroke="#2A2A2A" strokeWidth="1.5" />
                <line x1="386" y1="322" x2="418" y2="322" stroke="#222" strokeWidth="1" />
                <line x1="402" y1="310" x2="402" y2="334" stroke="#222" strokeWidth="1" />
                {/* Hook u-shape */}
                <path
                  d="M396,334 L396,346 Q396,355 402,355 Q408,355 408,346 L408,339"
                  fill="none" stroke="#607D8B" strokeWidth="2.5" strokeLinecap="round"
                />
              </g>
            </g>

          </g>
        </g>
      </g>

      {/* ── Ground equipment — static ── */}
      {/* Small site container */}
      <rect x="60"  y="632" width="80"  height="24" rx="2" fill="#141414" />
      <rect x="68"  y="636" width="64"  height="16" rx="1" fill="#0A0A0A" />
      <rect x="72"  y="639" width="12"  height="10" rx="1" fill="#FF8A65" opacity="0.4" />
      {/* Guard hut */}
      <rect x="390" y="638" width="32"  height="18" rx="1" fill="#161616" />
      <rect x="395" y="641" width="9"   height="9"  rx="1" fill="#FF8A65" opacity="0.35" />
    </svg>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ConstructionPage() {
  const [mounted, setMounted]             = useState(false)
  const [navSolid, setNavSolid]           = useState(false)
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [hoveredService, setHoveredService] = useState<number | null>(null)

  // Custom cursor
  const mouseX = useMotionValue(-300)
  const mouseY = useMotionValue(-300)
  const dotX  = useSpring(mouseX, { stiffness: 900, damping: 50 })
  const dotY  = useSpring(mouseY, { stiffness: 900, damping: 50 })
  const ringX = useSpring(mouseX, { stiffness: 160, damping: 22 })
  const ringY = useSpring(mouseY, { stiffness: 160, damping: 22 })
  const dotL  = useTransform(dotX,  v => v - 4)
  const dotT  = useTransform(dotY,  v => v - 4)
  const ringL = useTransform(ringX, v => v - 24)
  const ringT = useTransform(ringY, v => v - 24)

  useEffect(() => {
    setMounted(true)
    const move   = (e: MouseEvent) => { mouseX.set(e.clientX); mouseY.set(e.clientY) }
    const scroll = () => setNavSolid(window.scrollY > 60)
    window.addEventListener('mousemove', move)
    window.addEventListener('scroll', scroll, { passive: true })
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('scroll', scroll)
    }
  }, [mouseX, mouseY])

  return (
    <div
      className={`${barlow.variable} ${inter.variable}`}
      style={{
        background: '#080808', color: '#ECEFF1',
        fontFamily: 'var(--font-inter), system-ui, sans-serif',
        cursor: 'none',
      }}
    >
      <style>{`
        /* ── Keyframes ────────────────────────────────── */
        @keyframes crane-sweep {
          0%,100% { transform: rotate(-22deg); }
          50%     { transform: rotate(18deg);  }
        }
        @keyframes hook-cycle {
          0%,100% { transform: translateY(0px);   }
          50%     { transform: translateY(90px);   }
        }
        @keyframes warn-blink {
          0%,44%,56%,100% { opacity: 1;   }
          48%,52%         { opacity: 0.1; }
        }
        @keyframes marquee {
          0%   { transform: translateX(0);    }
          100% { transform: translateX(-50%); }
        }
        @keyframes stripe-slide {
          0%   { background-position: 0 0;   }
          100% { background-position: 64px 0; }
        }
        @keyframes float-y {
          0%,100% { transform: translateY(0px);   }
          50%     { transform: translateY(-12px);  }
        }

        /* ── SVG animation classes ── */
        .crane-sweep {
          animation: crane-sweep 16s ease-in-out infinite;
        }
        .hook-cycle {
          animation: hook-cycle 9s ease-in-out infinite;
        }
        .warn-light {
          animation: warn-blink 3.2s ease-in-out infinite;
        }

        /* ── Typography helpers ── */
        .B  { font-family: var(--font-barlow), 'Barlow Condensed', condensed, sans-serif; }
        .BI { font-family: var(--font-barlow), 'Barlow Condensed', condensed, sans-serif; font-style: italic; }
        .MC { font-family: var(--font-inter), system-ui, sans-serif; letter-spacing: 0.22em; text-transform: uppercase; }

        /* ── Global ── */
        a, button { cursor: none; }
        ::selection { background: #FF5722; color: #080808; }

        /* ── Responsive: hide nav links and cursor on mobile ── */
        @media (max-width: 768px) {
          .desktop-nav  { display: none !important; }
          .hero-crane   { opacity: 0.25; transform: scale(0.75); transform-origin: right bottom; }
        }
        @media (hover: none) {
          a, button { cursor: auto; }
        }
      `}</style>

      {/* Custom cursor — desktop only */}
      {mounted && (
        <>
          <motion.div style={{
            left: dotL, top: dotT, position: 'fixed',
            width: 8, height: 8, borderRadius: '50%',
            background: '#FF5722', pointerEvents: 'none', zIndex: 9999,
          }} />
          <motion.div style={{
            left: ringL, top: ringT, position: 'fixed',
            width: 48, height: 48, borderRadius: '50%',
            border: '1.5px solid rgba(255,87,34,0.5)',
            pointerEvents: 'none', zIndex: 9999,
          }} />
        </>
      )}

      {/* ══════════════════════════════════════════════ NAV */}
      <motion.nav
        initial={{ y: -48, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          padding: '18px clamp(20px,6vw,64px)',
          background: navSolid ? 'rgba(8,8,8,0.94)' : 'transparent',
          backdropFilter: navSolid ? 'blur(24px)' : 'none',
          borderBottom: navSolid ? '1px solid rgba(255,87,34,0.12)' : '1px solid transparent',
          transition: 'background .45s, border-color .45s, backdrop-filter .45s',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 1440, margin: '0 auto' }}>

          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 34, height: 34, background: '#FF5722',
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              display: 'grid', placeItems: 'center', flexShrink: 0,
            }}>
              <span className="B" style={{ color: '#080808', fontSize: 15, fontWeight: 900, lineHeight: 1 }}>I</span>
            </div>
            <span className="B" style={{ fontSize: 22, fontWeight: 800, color: '#ECEFF1', letterSpacing: '0.06em' }}>IRONCLAD</span>
          </div>

          {/* Nav links */}
          <ul className="desktop-nav" style={{ display: 'flex', gap: 40, listStyle: 'none', margin: 0, padding: 0 }}>
            {['Services','Projects','Process','About'].map(item => (
              <li key={item} className="MC"
                style={{ fontSize: 11, color: 'rgba(236,239,241,0.55)', transition: 'color .25s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#FF5722'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(236,239,241,0.55)'}
              >
                {item}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <button
            className="MC"
            style={{
              padding: '12px 26px', background: '#FF5722',
              color: '#080808', border: 'none',
              fontSize: 11, fontWeight: 700, letterSpacing: '0.22em',
              transition: 'background .25s, transform .2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#E64A19' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#FF5722' }}
          >
            Get a Quote
          </button>
        </div>
      </motion.nav>

      {/* ══════════════════════════════════════════════ HERO */}
      <section style={{ position: 'relative', minHeight: '100svh', overflow: 'hidden', background: '#080808' }}>

        {/* Grid background */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(255,87,34,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,87,34,0.04) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }} />

        {/* Orange atmospheric glow */}
        <div style={{
          position: 'absolute', top: '25%', right: '22%',
          width: 640, height: 640, borderRadius: '50%', pointerEvents: 'none',
          background: 'radial-gradient(circle, rgba(255,87,34,0.10) 0%, transparent 65%)',
        }} />

        {/* Crane — right side */}
        <div
          className="hero-crane"
          style={{
            position: 'absolute', right: 0, bottom: 0,
            width: 'clamp(300px, 46vw, 600px)',
            height: 'clamp(420px, 72vh, 720px)',
          }}
        >
          <CraneSVG />
        </div>

        {/* Hero text */}
        <div style={{
          position: 'relative', zIndex: 5,
          minHeight: '100svh',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: 'clamp(110px,14vw,160px) clamp(20px,6vw,72px) clamp(60px,8vw,80px)',
          maxWidth: 960,
        }}>

          <motion.div
            initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="MC"
            style={{ fontSize: 11, color: '#FF5722', marginBottom: 32, display: 'flex', alignItems: 'center', gap: 12 }}
          >
            <span style={{ width: 28, height: 1, background: '#FF5722', display: 'inline-block' }} />
            Est. Johannesburg, 2008
          </motion.div>

          <h1 className="B" style={{ fontWeight: 900, fontSize: 'clamp(72px,12vw,180px)', lineHeight: 0.87, margin: 0 }}>
            <motion.span
              initial={{ opacity: 0, y: 64 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
              style={{ display: 'block', color: '#ECEFF1' }}
            >WE</motion.span>
            <motion.span
              initial={{ opacity: 0, y: 64 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.50 }}
              style={{ display: 'block', color: '#FF5722' }}
            >BUILD</motion.span>
            <motion.span
              initial={{ opacity: 0, y: 64 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.65 }}
              className="BI"
              style={{ display: 'block', color: 'transparent', WebkitTextStroke: '2px #ECEFF1' }}
            >DIFFERENT.</motion.span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            style={{ marginTop: 44 }}
          >
            <p style={{ fontSize: 16, lineHeight: 1.8, color: '#78909C', maxWidth: 480, fontWeight: 300, marginBottom: 32 }}>
              South Africa&apos;s most trusted heavy construction company. 450+ projects completed. Zero compromises.
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <button
                className="MC"
                style={{
                  padding: '16px 36px', background: '#FF5722',
                  color: '#080808', border: 'none',
                  fontSize: 11, fontWeight: 700, letterSpacing: '0.22em',
                  boxShadow: '0 12px 40px rgba(255,87,34,0.3)',
                  transition: 'background .25s, transform .2s',
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.background='#E64A19'; el.style.transform='translateY(-2px)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.background='#FF5722'; el.style.transform='translateY(0)' }}
              >
                View Our Work →
              </button>
              <button
                className="MC"
                style={{
                  padding: '16px 32px', background: 'transparent',
                  color: '#ECEFF1', border: '1.5px solid rgba(236,239,241,0.3)',
                  fontSize: 11, fontWeight: 500, letterSpacing: '0.22em',
                  transition: 'border-color .25s, color .25s',
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor='#FF5722'; el.style.color='#FF5722' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor='rgba(236,239,241,0.3)'; el.style.color='#ECEFF1' }}
              >
                Get a Quote
              </button>
            </div>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            style={{ marginTop: 72, display: 'flex', gap: 'clamp(24px,5vw,56px)', flexWrap: 'wrap' }}
          >
            {[['450+','Projects'],['18yr','Experience'],['R4.2B','Delivered'],['0','LTIs 2024']].map(([n, l]) => (
              <div key={l}>
                <div className="B" style={{ fontSize: 36, fontWeight: 900, color: '#ECEFF1', lineHeight: 1 }}>{n}</div>
                <div className="MC" style={{ fontSize: 10, color: '#37474F', marginTop: 7 }}>{l}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          style={{
            position: 'absolute', bottom: 36,
            left: 'clamp(20px,6vw,72px)', zIndex: 5,
            display: 'flex', alignItems: 'center', gap: 10,
          }}
        >
          <div style={{ width: 1, height: 44, background: 'rgba(255,87,34,0.45)' }} />
          <span className="MC" style={{ fontSize: 10, color: '#37474F' }}>Scroll</span>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════ TICKER */}
      <section style={{ background: '#FF5722', padding: '20px 0', overflow: 'hidden' }}>
        <div style={{ display: 'flex', width: 'max-content', animation: 'marquee 30s linear infinite' }}>
          {[0, 1].map(k => (
            <div key={k} style={{ display: 'flex', gap: 56, paddingRight: 56, alignItems: 'center' }}>
              {['Commercial Construction','◆','Industrial Builds','◆','Civil Engineering','◆','Design & Build','◆','Zero Compromise','◆','Built to Last','◆'].map((t, i) => (
                <span
                  key={`${k}-${i}`}
                  className={t === '◆' ? '' : 'B'}
                  style={{
                    fontSize: t === '◆' ? 18 : 28,
                    fontWeight: t === '◆' ? 400 : 800,
                    color: '#080808', whiteSpace: 'nowrap',
                    letterSpacing: t === '◆' ? 0 : '0.02em',
                  }}
                >{t}</span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════ ABOUT */}
      <section style={{ padding: 'clamp(80px,10vw,160px) clamp(20px,6vw,72px)' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(48px,7vw,96px)', alignItems: 'center' }}>

          <div>
            <Reveal>
              <div className="MC" style={{ fontSize: 11, color: '#FF5722', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 22, height: 1, background: '#FF5722', display: 'inline-block' }} />
                About Ironclad
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="B" style={{ fontSize: 'clamp(52px,8vw,100px)', fontWeight: 900, lineHeight: 0.9, color: '#ECEFF1', marginBottom: 36 }}>
                BUILT ON<br /><span style={{ color: '#FF5722' }}>STEEL</span><br />
                <span className="BI" style={{ color: 'transparent', WebkitTextStroke: '2px #ECEFF1' }}>& TRUTH.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p style={{ fontSize: 16, lineHeight: 1.9, color: '#78909C', fontWeight: 300, maxWidth: 540, marginBottom: 20 }}>
                Ironclad Construction was founded in 2008 by a team of civil engineers tired of watching quality take a back seat to cost-cutting. Eighteen years on, we have delivered over R4.2 billion of infrastructure across southern Africa.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.9, color: '#78909C', fontWeight: 300, maxWidth: 540 }}>
                Our name is our guarantee. Every structure we build carries the full weight of our reputation.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div style={{ marginTop: 52, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24, paddingTop: 40, borderTop: '1px solid rgba(236,239,241,0.07)' }}>
                {[['450+','Projects'],['18yr','Experience'],['99.2%','On-time']].map(([n, l]) => (
                  <div key={l}>
                    <div className="B" style={{ fontSize: 44, fontWeight: 900, color: '#ECEFF1', lineHeight: 1 }}>{n}</div>
                    <div className="MC" style={{ fontSize: 10, color: '#37474F', marginTop: 8 }}>{l}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div style={{ position: 'relative' }}>
              {/* Hazard stripe — top */}
              <div style={{
                height: 14,
                background: 'repeating-linear-gradient(45deg, #FF5722 0, #FF5722 14px, #111 14px, #111 28px)',
              }} />
              <div style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden', background: '#111' }}>
                <img
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=85"
                  alt="Construction site"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(25%) brightness(0.8)' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent 50%, rgba(8,8,8,0.9) 100%)' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '64px 32px 32px' }}>
                  <div className="B" style={{ fontSize: 52, fontWeight: 900, color: '#FF5722', lineHeight: 1 }}>R4.2B</div>
                  <div className="MC" style={{ fontSize: 10, color: '#78909C', marginTop: 8 }}>Total project value delivered</div>
                </div>
              </div>
              {/* Hazard stripe — bottom */}
              <div style={{
                height: 14,
                background: 'repeating-linear-gradient(45deg, #FF5722 0, #FF5722 14px, #111 14px, #111 28px)',
              }} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ SERVICES */}
      <section style={{ padding: 'clamp(80px,10vw,140px) clamp(20px,6vw,72px)', background: '#0D0D0D' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto' }}>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 72, flexWrap: 'wrap', gap: 24 }}>
            <div>
              <Reveal>
                <div className="MC" style={{ fontSize: 11, color: '#FF5722', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ width: 22, height: 1, background: '#FF5722', display: 'inline-block' }} />
                  What We Build
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="B" style={{ fontSize: 'clamp(52px,8vw,96px)', fontWeight: 900, lineHeight: 0.9, color: '#ECEFF1' }}>
                  OUR<br /><span style={{ color: '#FF5722' }}>SERVICES</span>
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <p style={{ fontSize: 15, color: '#546E7A', maxWidth: 360, lineHeight: 1.85, fontWeight: 300 }}>
                Four disciplines. One contractor. The same uncompromising standard across every scope.
              </p>
            </Reveal>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 2 }}>
            {SERVICES.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.07}>
                <motion.div
                  onHoverStart={() => setHoveredService(i)}
                  onHoverEnd={() => setHoveredService(null)}
                  animate={{ background: hoveredService === i ? '#FF5722' : '#111' }}
                  transition={{ duration: 0.35 }}
                  style={{ padding: 'clamp(36px,4vw,52px) clamp(24px,3vw,40px)', position: 'relative', overflow: 'hidden', minHeight: 280 }}
                >
                  <div className="MC" style={{ fontSize: 10, marginBottom: 28, transition: 'color .35s', color: hoveredService === i ? 'rgba(8,8,8,0.65)' : '#FF5722' }}>
                    {s.n} / {s.tag}
                  </div>
                  <h3 className="B" style={{ fontSize: 'clamp(28px,3vw,40px)', fontWeight: 800, lineHeight: 1, marginBottom: 18, transition: 'color .35s', color: hoveredService === i ? '#080808' : '#ECEFF1' }}>
                    {s.title.toUpperCase()}
                  </h3>
                  <p style={{ fontSize: 14, lineHeight: 1.8, fontWeight: 300, maxWidth: 340, transition: 'color .35s', color: hoveredService === i ? 'rgba(8,8,8,0.75)' : '#37474F' }}>
                    {s.desc}
                  </p>
                  <motion.div
                    animate={{ opacity: hoveredService === i ? 1 : 0, x: hoveredService === i ? 0 : -10 }}
                    transition={{ duration: 0.3 }}
                    className="MC"
                    style={{ marginTop: 32, fontSize: 11, color: '#080808' }}
                  >
                    Learn More →
                  </motion.div>
                  {/* Ghost number */}
                  <span className="B" style={{
                    position: 'absolute', bottom: 12, right: 24,
                    fontSize: 96, fontWeight: 900, lineHeight: 1,
                    color: hoveredService === i ? 'rgba(8,8,8,0.07)' : 'rgba(236,239,241,0.035)',
                    transition: 'color .35s', userSelect: 'none', pointerEvents: 'none',
                  }}>
                    {s.n}
                  </span>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ PROJECTS */}
      <section style={{ padding: 'clamp(80px,10vw,140px) clamp(20px,6vw,72px)' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto' }}>

          <div style={{ marginBottom: 64 }}>
            <Reveal>
              <div className="MC" style={{ fontSize: 11, color: '#FF5722', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 22, height: 1, background: '#FF5722', display: 'inline-block' }} />
                Selected Projects
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="B" style={{ fontSize: 'clamp(52px,8vw,96px)', fontWeight: 900, lineHeight: 0.9, color: '#ECEFF1' }}>
                THE <span style={{ color: '#FF5722' }}>WORK</span>
              </h2>
            </Reveal>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {PROJECTS.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.07}>
                <motion.div
                  onHoverStart={() => setHoveredProject(i)}
                  onHoverEnd={() => setHoveredProject(null)}
                  animate={{ height: hoveredProject === i ? 360 : 110 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    position: 'relative', overflow: 'hidden',
                    background: '#0D0D0D',
                    borderBottom: '1px solid rgba(255,87,34,0.1)',
                  }}
                >
                  {/* Background photo */}
                  <div style={{ position: 'absolute', inset: 0, opacity: hoveredProject === i ? 1 : 0, transition: 'opacity .55s' }}>
                    <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.35)' }} />
                  </div>

                  {/* Row */}
                  <div style={{
                    position: 'relative', zIndex: 2, height: 110,
                    display: 'grid',
                    gridTemplateColumns: 'clamp(60px,8vw,88px) 1fr auto auto',
                    alignItems: 'center', gap: 'clamp(16px,3vw,32px)',
                    padding: '0 clamp(8px,2vw,16px)',
                  }}>
                    <span className="B" style={{ fontSize: 'clamp(28px,5vw,44px)', fontWeight: 900, color: 'rgba(255,87,34,0.35)', paddingLeft: 4 }}>{p.n}</span>
                    <h3 className="B" style={{ fontSize: 'clamp(20px,3.5vw,44px)', fontWeight: 800, color: '#ECEFF1', lineHeight: 1 }}>{p.name.toUpperCase()}</h3>
                    <span className="MC desktop-nav" style={{ fontSize: 11, color: '#37474F', whiteSpace: 'nowrap' }}>{p.type}</span>
                    <div style={{ textAlign: 'right', paddingRight: 8, flexShrink: 0 }}>
                      <div className="B" style={{ fontSize: 'clamp(18px,2.5vw,28px)', fontWeight: 800, color: '#FF5722' }}>{p.value}</div>
                      <div className="MC" style={{ fontSize: 10, color: '#263238' }}>{p.year}</div>
                    </div>
                  </div>

                  {/* Expanded CTA */}
                  <motion.div
                    animate={{ opacity: hoveredProject === i ? 1 : 0, y: hoveredProject === i ? 0 : 18 }}
                    transition={{ duration: 0.35, delay: hoveredProject === i ? 0.2 : 0 }}
                    style={{ position: 'relative', zIndex: 2, padding: '8px clamp(8px,2vw,16px) 32px' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 24, paddingLeft: 'clamp(60px,8vw,88px)' }}>
                      <button
                        className="MC"
                        style={{
                          padding: '14px 30px', background: '#FF5722',
                          color: '#080808', border: 'none',
                          fontSize: 11, fontWeight: 700, letterSpacing: '0.22em',
                        }}
                      >
                        View Project →
                      </button>
                      <span style={{ fontSize: 14, color: '#546E7A', fontWeight: 300 }}>{p.type}</span>
                    </div>
                  </motion.div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ PROCESS */}
      <section style={{ padding: 'clamp(80px,10vw,140px) clamp(20px,6vw,72px)', background: '#0D0D0D' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto' }}>

          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 80 }}>
              <div className="MC" style={{ fontSize: 11, color: '#FF5722', marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
                <span style={{ width: 22, height: 1, background: '#FF5722', display: 'inline-block' }} />
                How We Work
                <span style={{ width: 22, height: 1, background: '#FF5722', display: 'inline-block' }} />
              </div>
              <h2 className="B" style={{ fontSize: 'clamp(52px,8vw,96px)', fontWeight: 900, lineHeight: 0.9, color: '#ECEFF1' }}>
                THE <span style={{ color: '#FF5722' }}>PROCESS</span>
              </h2>
            </div>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
            {PROCESS.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.09}>
                <div style={{ padding: 'clamp(32px,4vw,48px) clamp(20px,3vw,32px)', background: '#111', position: 'relative', height: '100%' }}>
                  <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: '#FF5722', opacity: 0.35 }} />
                  <div className="B" style={{ fontSize: 72, fontWeight: 900, color: 'rgba(255,87,34,0.12)', lineHeight: 1, marginBottom: 16 }}>{step.n}</div>
                  <h3 className="B" style={{ fontSize: 'clamp(22px,2.5vw,28px)', fontWeight: 800, color: '#ECEFF1', marginBottom: 14, lineHeight: 1.1 }}>{step.title.toUpperCase()}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.85, color: '#37474F', fontWeight: 300 }}>{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ TESTIMONIALS */}
      <section style={{ padding: 'clamp(80px,10vw,140px) clamp(20px,6vw,72px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Reveal>
            <div className="MC" style={{ fontSize: 11, color: '#FF5722', marginBottom: 72, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 22, height: 1, background: '#FF5722', display: 'inline-block' }} />
              Client Words
            </div>
          </Reveal>
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div style={{
                padding: 'clamp(36px,5vw,64px) 0',
                borderBottom: i < TESTIMONIALS.length - 1 ? '1px solid rgba(236,239,241,0.06)' : 'none',
              }}>
                <p className="B" style={{ fontSize: 'clamp(22px,3.2vw,40px)', fontWeight: 700, lineHeight: 1.28, color: '#ECEFF1', marginBottom: 32, maxWidth: 1000 }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ width: 40, height: 40, background: '#FF5722', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                    <span className="B" style={{ fontWeight: 900, fontSize: 18, color: '#080808' }}>{t.who[0]}</span>
                  </div>
                  <div>
                    <div className="B" style={{ fontWeight: 700, fontSize: 18, color: '#ECEFF1', lineHeight: 1.2 }}>{t.who}</div>
                    <div className="MC" style={{ fontSize: 10, color: '#37474F', marginTop: 4 }}>{t.role}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════ CTA */}
      <section style={{ position: 'relative', padding: 'clamp(80px,12vw,180px) clamp(20px,6vw,72px)', background: '#0D0D0D', overflow: 'hidden' }}>

        {/* Animated hazard stripes top & bottom */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 18,
          background: 'repeating-linear-gradient(45deg, #FF5722 0, #FF5722 18px, #080808 18px, #080808 36px)',
          animation: 'stripe-slide 2.5s linear infinite',
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 18,
          background: 'repeating-linear-gradient(-45deg, #FF5722 0, #FF5722 18px, #080808 18px, #080808 36px)',
          animation: 'stripe-slide 2.5s linear infinite',
        }} />

        {/* Ghost word */}
        <div className="B" style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 'clamp(100px,22vw,340px)', fontWeight: 900,
          color: 'rgba(255,87,34,0.04)', letterSpacing: '-0.02em',
          pointerEvents: 'none', userSelect: 'none', lineHeight: 1,
        }}>
          BUILD
        </div>

        <div style={{ maxWidth: 960, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <Reveal>
            <div className="MC" style={{ fontSize: 11, color: '#FF5722', marginBottom: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
              <span style={{ width: 22, height: 1, background: '#FF5722', display: 'inline-block' }} />
              Start Your Project
              <span style={{ width: 22, height: 1, background: '#FF5722', display: 'inline-block' }} />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="B" style={{ fontSize: 'clamp(60px,10vw,140px)', fontWeight: 900, lineHeight: 0.87, color: '#ECEFF1', marginBottom: 40 }}>
              LET&apos;S BUILD<br />
              <span style={{ color: '#FF5722' }}>SOMETHING</span><br />
              <span className="BI" style={{ color: 'transparent', WebkitTextStroke: '2px #ECEFF1' }}>LASTING.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{ fontSize: 16, color: '#546E7A', fontWeight: 300, maxWidth: 520, margin: '0 auto 52px', lineHeight: 1.85 }}>
              Tell us about your project. We respond within 24 hours with a preliminary scope and timeline — no obligation, no sales pitch.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                className="MC"
                style={{
                  padding: '20px 52px', background: '#FF5722',
                  color: '#080808', border: 'none',
                  fontSize: 12, fontWeight: 700, letterSpacing: '0.22em',
                  boxShadow: '0 20px 60px rgba(255,87,34,0.30)',
                  transition: 'background .25s, transform .2s',
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.background='#E64A19'; el.style.transform='translateY(-3px)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.background='#FF5722'; el.style.transform='translateY(0)' }}
              >
                Request a Quote
              </button>
              <button
                className="MC"
                style={{
                  padding: '20px 44px', background: 'transparent',
                  color: '#ECEFF1', border: '1.5px solid rgba(236,239,241,0.25)',
                  fontSize: 12, fontWeight: 500, letterSpacing: '0.22em',
                  transition: 'border-color .25s, color .25s',
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor='#FF5722'; el.style.color='#FF5722' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor='rgba(236,239,241,0.25)'; el.style.color='#ECEFF1' }}
              >
                011 234 5678
              </button>
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <div style={{ marginTop: 80, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 32, maxWidth: 800, margin: '80px auto 0', paddingTop: 52, borderTop: '1px solid rgba(236,239,241,0.07)' }}>
              {[
                { label: 'Head Office', value: '14 Commissioner St\nJohannesburg, 2001' },
                { label: 'Hours',       value: 'Monday — Friday\n07h00 — 17h00' },
                { label: 'Contact',     value: '011 234 5678\ninfo@ironclad.co.za' },
              ].map(c => (
                <div key={c.label}>
                  <div className="MC" style={{ fontSize: 10, color: '#FF5722', marginBottom: 14 }}>{c.label}</div>
                  <div style={{ fontSize: 14, color: '#546E7A', lineHeight: 1.85, fontWeight: 300, whiteSpace: 'pre-line' }}>{c.value}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ FOOTER */}
      <footer style={{ background: '#040404', padding: 'clamp(48px,6vw,72px) clamp(20px,6vw,72px) clamp(24px,4vw,36px)' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 40, marginBottom: 52, paddingBottom: 48, borderBottom: '1px solid rgba(236,239,241,0.06)' }}>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
                <div style={{
                  width: 34, height: 34, background: '#FF5722',
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  display: 'grid', placeItems: 'center',
                }}>
                  <span className="B" style={{ color: '#080808', fontSize: 15, fontWeight: 900 }}>I</span>
                </div>
                <span className="B" style={{ fontSize: 22, fontWeight: 800, color: '#ECEFF1', letterSpacing: '0.06em' }}>IRONCLAD</span>
              </div>
              <p style={{ fontSize: 13, color: '#263238', fontWeight: 300, maxWidth: 280, lineHeight: 1.75 }}>
                South Africa&apos;s most trusted construction company. Built on steel, trust, and 18 years of proven delivery.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 52px' }}>
              {['Services','Projects','Process','About','Careers','Contact'].map(item => (
                <span
                  key={item}
                  className="MC"
                  style={{ fontSize: 11, color: '#1C2B33', padding: '6px 0', display: 'block', transition: 'color .25s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#FF5722'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#1C2B33'}
                >
                  {item}
                </span>
              ))}
            </div>

            <div>
              <div className="MC" style={{ fontSize: 10, color: '#FF5722', marginBottom: 18 }}>Follow Us</div>
              <div style={{ display: 'flex', gap: 12 }}>
                {['LI','TW','IG'].map(s => (
                  <div
                    key={s}
                    style={{
                      width: 40, height: 40, border: '1px solid rgba(236,239,241,0.09)',
                      display: 'grid', placeItems: 'center', transition: 'border-color .25s, background .25s',
                    }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor='#FF5722'; el.style.background='rgba(255,87,34,0.08)' }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor='rgba(236,239,241,0.09)'; el.style.background='transparent' }}
                  >
                    <span className="B" style={{ fontSize: 12, fontWeight: 800, color: '#37474F' }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <span className="MC" style={{ fontSize: 10, color: '#0F1C21' }}>
              © 2026 Ironclad Construction · All rights reserved · CIDB Grade 9
            </span>
            <span className="MC" style={{ fontSize: 10, color: '#0F1C21' }}>
              Johannesburg · Cape Town · Durban
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}
