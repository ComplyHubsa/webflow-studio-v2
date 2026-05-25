'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useInView, AnimatePresence } from 'framer-motion'
import { Cormorant_Garamond, Jost } from 'next/font/google'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cor',
})
const jost = Jost({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500'],
  variable: '--font-jost',
})

// ── 8 petals only — GPU composited ──────────────────────────────────────────
const PETALS = [
  { id:0, left:'6%',  delay:'0s',    dur:'22s', size:12, rot:45,  drift:-25, hue:'#E5C5B5', op:0.50 },
  { id:1, left:'18%', delay:'3s',    dur:'26s', size:16, rot:120, drift: 20, hue:'#F4D9CA', op:0.40 },
  { id:2, left:'32%', delay:'6s',    dur:'20s', size:10, rot:200, drift:-15, hue:'#D9B9A6', op:0.55 },
  { id:3, left:'47%', delay:'9s',    dur:'24s', size:14, rot:310, drift: 30, hue:'#EDD3C4', op:0.45 },
  { id:4, left:'59%', delay:'1.5s',  dur:'28s', size:18, rot:80,  drift:-20, hue:'#C9A07F', op:0.50 },
  { id:5, left:'71%', delay:'4.5s',  dur:'21s', size:11, rot:160, drift: 25, hue:'#E5C5B5', op:0.40 },
  { id:6, left:'83%', delay:'7.5s',  dur:'25s', size:15, rot:240, drift:-30, hue:'#F4D9CA', op:0.55 },
  { id:7, left:'93%', delay:'11s',   dur:'23s', size:13, rot:30,  drift: 15, hue:'#D9B9A6', op:0.45 },
]

// ── Data ────────────────────────────────────────────────────────────────────
const TREATMENTS = [
  { n:'01', name:'Volcanic Stone Ritual', sub:'The Signature Experience', duration:'90 min', price:'R 680',
    desc:'Basalt stones heated to 52°C melt deep into the body. Twelve placements along the spine release tension you had forgotten you were holding.',
    tag:'Signature', img:'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1600&q=85' },
  { n:'02', name:'Aromatic Reverie', sub:'Botanical Restoration', duration:'75 min', price:'R 520',
    desc:'Pressed lavender, neroli, and Cape jasmine warmed in copper bowls. A slow, hypnotic massage that quiets the mind first, body second.',
    tag:'Bestseller', img:'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1600&q=85' },
  { n:'03', name:'Quartz Facial', sub:'Cellular Awakening', duration:'60 min', price:'R 480',
    desc:'Rose quartz gua-sha paired with botanical serums and gentle LED. Skin emerges visibly lifted, clarified, luminous.',
    tag:'New', img:'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1600&q=85' },
  { n:'04', name:'Couples Sanctuary', sub:'Shared Retreat', duration:'120 min', price:'R 1 200',
    desc:'Side by side in our garden suite. Champagne, citrus & verbena, synchronised hot-stone massage in complete seclusion.',
    tag:'Premium', img:'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=1600&q=85' },
]

const PILLARS = [
  { glyph:'◇', label:'Stillness', text:'Every ritual begins with silence. We create space for your nervous system to slow.' },
  { glyph:'○', label:'Purity',    text:'Certified organic botanicals. Hand-blended on-site. Nothing synthetic, ever.' },
  { glyph:'△', label:'Mastery',   text:'Our therapists train for three years before their first session. Precision is our promise.' },
]

const RITUAL_STEPS = [
  { n:'01', title:'Welcome & Foot Bath',   time:'10 min', text:'Warm milk, rose petals, and a moment to arrive.' },
  { n:'02', title:'Heating the Basalt',    time:'5 min',  text:'Twelve volcanic stones reach 52°C in mineral water.' },
  { n:'03', title:'Aromatic Preparation',  time:'8 min',  text:'A blend chosen for you — lavender, neroli, or Cape jasmine.' },
  { n:'04', title:'Stone Placement',       time:'12 min', text:'Stones rest along chakra points. The body begins to release.' },
  { n:'05', title:'Deep Tissue Release',   time:'40 min', text:'Therapists glide warm stones in slow, deliberate arcs.' },
  { n:'06', title:'Restoration',           time:'15 min', text:'Cool jade, herbal tea, and complete quiet to close.' },
]

const ROOMS = [
  { name:'The Garden Suite',  sub:'Private ritual room', img:'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1600&q=85', span:'col-span-2 row-span-2' },
  { name:'Mineral Pool',      sub:'Thermal waters',      img:'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=1200&q=85', span:'col-span-1 row-span-1' },
  { name:'Meditation Court',  sub:'Open-air sanctuary',  img:'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&q=85', span:'col-span-1 row-span-1' },
  { name:'The Steam Cave',    sub:'Eucalyptus vapour',   img:'https://images.unsplash.com/photo-1583416750470-965b2707b355?w=1600&q=85', span:'col-span-2 row-span-1' },
]

const QUOTES = [
  { text:'I have never felt my body unspool the way it did beneath those stones. I cried, gently, on the table.', who:'Amara N.', city:'Cape Town' },
  { text:'Two hours of total surrender. I rebooked from the lobby.', who:'Pieter H.', city:'Stellenbosch' },
  { text:'The most refined spa experience I have had outside of Kyoto. Maison Sérène is something rare.', who:'Yuki S.', city:'Johannesburg' },
]

// ── Shared components ────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, y = 36, className = '' }: {
  children: React.ReactNode; delay?: number; y?: number; className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function Magnetic({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18 })
  const sy = useSpring(y, { stiffness: 220, damping: 18 })
  return (
    <motion.button
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect()
        if (!r) return
        x.set((e.clientX - (r.left + r.width / 2)) * 0.35)
        y.set((e.clientY - (r.top + r.height / 2)) * 0.35)
      }}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.button>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function SpaPage() {
  const [mounted, setMounted] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const [hovered, setHovered] = useState<number | null>(null)
  const [navSolid, setNavSolid] = useState(false)

  // Cursor — two spring values only
  const mouseX = useMotionValue(-300)
  const mouseY = useMotionValue(-300)
  const dotX = useSpring(mouseX, { stiffness: 900, damping: 50 })
  const dotY = useSpring(mouseY, { stiffness: 900, damping: 50 })
  const ringX = useSpring(mouseX, { stiffness: 160, damping: 22 })
  const ringY = useSpring(mouseY, { stiffness: 160, damping: 22 })
  const dotL = useTransform(dotX, v => v - 4)
  const dotT = useTransform(dotY, v => v - 4)
  const ringL = useTransform(ringX, v => v - 22)
  const ringT = useTransform(ringY, v => v - 22)

  useEffect(() => {
    setMounted(true)
    const move = (e: MouseEvent) => { mouseX.set(e.clientX); mouseY.set(e.clientY) }
    const scroll = () => setNavSolid(window.scrollY > 80)
    window.addEventListener('mousemove', move)
    window.addEventListener('scroll', scroll, { passive: true })
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('scroll', scroll)
    }
  }, [mouseX, mouseY])

  return (
    <div
      className={`${cormorant.variable} ${jost.variable}`}
      style={{ background: '#FAF5EE', color: '#1F2A24', fontFamily: 'var(--font-jost), system-ui, sans-serif', cursor: 'none' }}
    >
      <style>{`
        /* ── CSS-only animations — zero JS overhead ── */
        @keyframes ken-burns {
          0%,100% { transform: scale(1.04); }
          50%     { transform: scale(1.13); }
        }
        @keyframes drift {
          0%   { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
          12%  { opacity: 1; }
          85%  { opacity: 1; }
          100% { transform: translateY(-110vh) translateX(var(--drift)) rotate(var(--rot)); opacity: 0; }
        }
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes float-y {
          0%,100% { transform: translateY(0); }
          50%     { transform: translateY(-10px); }
        }
        @keyframes spin-30 { to { transform: rotate(360deg); } }
        @keyframes spin-34 { to { transform: rotate(360deg); } }
        @keyframes spin-38 { to { transform: rotate(360deg); } }
        @keyframes bounce-down {
          0%,100% { transform: translateY(0); }
          50%     { transform: translateY(14px); }
        }
        @keyframes breathe-a {
          0%,100% { transform: scale(1);   opacity: 0.38; }
          50%     { transform: scale(1.1); opacity: 0.58; }
        }
        @keyframes breathe-b {
          0%,100% { transform: scale(1.1); opacity: 0.48; }
          50%     { transform: scale(1);   opacity: 0.28; }
        }

        /* ── Utility classes ── */
        .kb   { animation: ken-burns 32s ease-in-out infinite; will-change: transform; }
        .p    { position: absolute; bottom: -40px; border-radius: 60% 12% 60% 12%; filter: blur(0.4px);
                animation: drift linear infinite; will-change: transform, opacity; }
        .fc   { animation: float-y 5s ease-in-out infinite; }
        .s30  { animation: spin-30 30s linear infinite; }
        .s34  { animation: spin-34 34s linear infinite; }
        .s38  { animation: spin-38 38s linear infinite; }
        .sb   { animation: bounce-down 2s ease-in-out infinite; }
        .ba   { animation: breathe-a 8s ease-in-out infinite; }
        .bb   { animation: breathe-b 10s ease-in-out infinite; }

        /* ── Typography helpers ── */
        .D    { font-family: var(--font-cor), Georgia, serif; font-weight: 400; letter-spacing: -0.01em; }
        .DI   { font-family: var(--font-cor), Georgia, serif; font-weight: 400; font-style: italic; letter-spacing: -0.01em; }
        .MC   { font-family: var(--font-jost), system-ui, sans-serif; letter-spacing: 0.28em; text-transform: uppercase; font-weight: 300; }

        a, button { cursor: none; }
        ::selection { background: #C68F73; color: #FAF5EE; }
      `}</style>

      {/* Cursor */}
      {mounted && (
        <>
          <motion.div style={{ left: dotL, top: dotT, position: 'fixed', width: 8, height: 8,
            borderRadius: '50%', background: '#5A6B4F', pointerEvents: 'none', zIndex: 9999, mixBlendMode: 'multiply' }} />
          <motion.div style={{ left: ringL, top: ringT, position: 'fixed', width: 44, height: 44,
            borderRadius: '50%', border: '1px solid rgba(90,107,79,0.45)', pointerEvents: 'none', zIndex: 9999 }} />
        </>
      )}

      {/* ── NAV ─────────────────────────────────────────────────────────────── */}
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          padding: '22px 56px',
          background: navSolid ? 'rgba(250,245,238,0.88)' : 'transparent',
          backdropFilter: navSolid ? 'blur(20px)' : 'none',
          borderBottom: navSolid ? '1px solid rgba(31,42,36,0.07)' : '1px solid transparent',
          transition: 'background .5s, border-color .5s',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 1480, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg,#C68F73,#B89A6B)',
              display: 'grid', placeItems: 'center', boxShadow: '0 6px 24px rgba(198,143,115,0.35)' }}>
              <span className="DI" style={{ color: '#FAF5EE', fontSize: 22, lineHeight: 1, paddingTop: 2 }}>M</span>
            </div>
            <span className="DI" style={{ fontSize: 22, color: navSolid ? '#1F2A24' : '#FFFFFF' }}>Maison Sérène</span>
          </div>
          <ul style={{ display: 'flex', gap: 44, listStyle: 'none' }}>
            {['Rituals','Philosophy','Sanctuary','Journal'].map(item => (
              <li key={item} className="MC" style={{ fontSize: 11, color: navSolid ? '#3A4640' : 'rgba(255,255,255,0.8)' }}>{item}</li>
            ))}
          </ul>
          <Magnetic>
            <span className="MC" onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background='#1F2A24';(e.currentTarget as HTMLElement).style.color='#FAF5EE'}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background='transparent';(e.currentTarget as HTMLElement).style.color= navSolid?'#1F2A24':'#FFFFFF'}}
              style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'12px 28px',
                border: `1px solid ${navSolid ? '#1F2A24' : 'rgba(255,255,255,0.7)'}`,
                borderRadius:999, fontSize:11, color: navSolid?'#1F2A24':'#FFFFFF',
                background:'transparent', transition:'background .3s, color .3s' }}>
              Reserve · 073 127 5190
            </span>
          </Magnetic>
        </div>
      </motion.nav>

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section style={{ position:'relative', height:'100vh', overflow:'hidden', background:'#2A1E18' }}>

        {/* Backdrop — pure CSS Ken Burns */}
        <img
          className="kb"
          src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=2400&q=85"
          alt="Hot stones placed along a back during a spa ritual"
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover',
            objectPosition:'center 40%', willChange:'transform' }}
        />

        {/* Dark overlay — strong enough for legible white text */}
        <div style={{ position:'absolute', inset:0,
          background:'linear-gradient(180deg,rgba(10,14,12,0.55) 0%,rgba(10,14,12,0.20) 42%,rgba(10,14,12,0.65) 100%)' }} />
        <div style={{ position:'absolute', inset:0,
          background:'radial-gradient(ellipse 100% 70% at 50% 54%,rgba(10,14,12,0.20) 0%,rgba(10,14,12,0.55) 100%)' }} />

        {/* Petals — CSS only */}
        {mounted && PETALS.map(p => (
          <span key={p.id} className="p" style={{ left:p.left, width:p.size, height:p.size,
            background:p.hue, opacity:p.op, animationDelay:p.delay, animationDuration:p.dur,
            ['--drift' as string]:`${p.drift}px`, ['--rot' as string]:`${p.rot}deg` } as React.CSSProperties} />
        ))}

        {/* Hero text */}
        <div style={{ position:'relative', zIndex:5, height:'100%', display:'flex',
          flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'0 24px' }}>

          <motion.div
            initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:1.1, ease:[0.22,1,0.36,1], delay:0.25 }}
            className="MC"
            style={{ fontSize:12, color:'rgba(255,255,255,0.70)', marginBottom:36 }}
          >
            — Est. Franschhoek, 2014 —
          </motion.div>

          <h1 style={{ fontFamily:'var(--font-cor), Georgia, serif', fontWeight:400,
            fontSize:'clamp(76px,12vw,196px)', lineHeight:0.9, marginBottom:8,
            textShadow:'0 4px 40px rgba(0,0,0,0.6)' }}>
            <motion.span
              initial={{ opacity:0, y:48 }} animate={{ opacity:1, y:0 }}
              transition={{ duration:0.9, ease:[0.22,1,0.36,1], delay:0.38 }}
              style={{ display:'block', color:'#FFFFFF' }}
            >
              Maison
            </motion.span>
            <motion.span
              initial={{ opacity:0, y:48 }} animate={{ opacity:1, y:0 }}
              transition={{ duration:0.9, ease:[0.22,1,0.36,1], delay:0.60 }}
              style={{ display:'block', fontStyle:'italic', color:'#F0D5BF' }}
            >
              Sérène
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.9, delay:0.90 }}
            style={{ fontSize:18, color:'rgba(255,255,255,0.88)', fontWeight:300, maxWidth:520,
              lineHeight:1.65, marginTop:28, textShadow:'0 2px 14px rgba(0,0,0,0.35)' }}
          >
            A sanctuary of warm volcanic stone, hand-pressed botanicals, and a kind of quiet you can almost touch.
          </motion.p>

          <motion.div
            initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.9, delay:1.12 }}
            style={{ display:'flex', gap:18, marginTop:44 }}
          >
            <Magnetic>
              <span className="MC" style={{ display:'inline-flex', alignItems:'center', gap:12,
                padding:'18px 38px', background:'rgba(250,245,238,0.95)', color:'#1F2A24',
                borderRadius:999, fontSize:11, boxShadow:'0 12px 40px rgba(0,0,0,0.22)' }}>
                Reserve a Ritual <span style={{ fontSize:14 }}>→</span>
              </span>
            </Magnetic>
            <Magnetic>
              <span className="MC" style={{ display:'inline-flex', alignItems:'center', gap:12,
                padding:'18px 30px', border:'1px solid rgba(255,255,255,0.55)',
                color:'#FAF5EE', borderRadius:999, fontSize:11,
                background:'rgba(255,255,255,0.10)', backdropFilter:'blur(8px)' }}>
                Watch the Ritual
                <span style={{ width:26, height:26, borderRadius:'50%', background:'rgba(255,255,255,0.9)',
                  color:'#1F2A24', display:'grid', placeItems:'center', fontSize:9, paddingLeft:2 }}>▶</span>
              </span>
            </Magnetic>
          </motion.div>
        </div>

        {/* Bottom corners */}
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:1, delay:1.3 }}
          style={{ position:'absolute', left:56, bottom:36, zIndex:5, display:'flex', alignItems:'center', gap:14 }}>
          <span style={{ width:1, height:56, background:'rgba(255,255,255,0.55)', display:'inline-block' }} />
          <div>
            <div className="MC" style={{ fontSize:9, color:'rgba(255,255,255,0.60)' }}>Now welcoming</div>
            <div className="DI" style={{ fontSize:22, color:'#FAF5EE', lineHeight:1.2 }}>Winter Rituals · 2026</div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:1, delay:1.3 }}
          style={{ position:'absolute', right:56, bottom:36, zIndex:5,
            display:'flex', flexDirection:'column', alignItems:'flex-end', gap:8 }}>
          <div className="MC" style={{ fontSize:9, color:'rgba(255,255,255,0.60)' }}>Scroll to enter</div>
          <div className="sb" style={{ width:1, height:48, background:'rgba(255,255,255,0.55)' }} />
        </motion.div>
      </section>

      {/* ── MARQUEE ──────────────────────────────────────────────────────────── */}
      <section style={{ background:'#1F2A24', padding:'28px 0', overflow:'hidden' }}>
        <div style={{ display:'flex', width:'max-content', animation:'marquee 38s linear infinite' }}>
          {[0,1].map(k => (
            <div key={k} style={{ display:'flex', gap:56, paddingRight:56 }}>
              {['Hot Stone Rituals','◆','Healing Hands','◆','Pure Botanicals','◆','Sacred Silence','◆','Garden Sanctuary','◆','Mineral Waters','◆'].map((t,i) => (
                <span key={`${k}-${i}`} className={t==='◆' ? '' : 'DI'}
                  style={{ fontSize:t==='◆'?16:36, color:t==='◆'?'#C68F73':'#FAF5EE', whiteSpace:'nowrap' }}>{t}</span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── STORY ────────────────────────────────────────────────────────────── */}
      <section style={{ padding:'160px 56px', maxWidth:1480, margin:'0 auto' }}>
        <div style={{ display:'grid', gridTemplateColumns:'0.9fr 1.1fr', gap:96, alignItems:'center' }}>
          <Reveal>
            <div style={{ position:'relative' }}>
              <div style={{ position:'absolute', top:-28, left:-28, width:'calc(100% + 56px)', height:'calc(100% + 56px)',
                border:'1px solid #C68F73', borderRadius:6 }} />
              <div style={{ position:'relative', aspectRatio:'4/5', borderRadius:4, overflow:'hidden',
                boxShadow:'0 40px 100px rgba(31,42,36,0.18)' }}>
                <img src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1600&q=85"
                  alt="A therapist's hands working on a guest's back"
                  style={{ width:'100%', height:'100%', objectFit:'cover' }} />
              </div>
              <div className="fc" style={{ position:'absolute', bottom:-36, right:-36, background:'#FAF5EE',
                padding:'24px 32px', borderRadius:4, boxShadow:'0 20px 60px rgba(31,42,36,0.12)',
                border:'1px solid rgba(31,42,36,0.06)' }}>
                <div className="DI" style={{ fontSize:56, lineHeight:1, color:'#C68F73' }}>11</div>
                <div className="MC" style={{ fontSize:10, color:'#5A6B4F', marginTop:6 }}>Years of practice</div>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal><div className="MC" style={{ fontSize:11, color:'#C68F73', marginBottom:28 }}>— Our story —</div></Reveal>
            <Reveal delay={0.1}>
              <h2 className="D" style={{ fontSize:'clamp(40px,5vw,76px)', lineHeight:1.02, color:'#1F2A24', marginBottom:36 }}>
                A practice of <span className="DI" style={{ color:'#5A6B4F' }}>slow attention</span>, learnt over a decade.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p style={{ fontSize:17, lineHeight:1.85, color:'#3A4640', fontWeight:300, marginBottom:22, maxWidth:540 }}>
                Maison Sérène was founded in a stone farmhouse outside Franschhoek by Léa Toussaint, a former physiotherapist who left clinical work to study traditional stone therapy across Japan, Bali, and the Karoo.
              </p>
              <p style={{ fontSize:17, lineHeight:1.85, color:'#3A4640', fontWeight:300, maxWidth:540 }}>
                Eleven years on, every ritual still begins the same way — with warm milk, rose petals, and a single hour where nothing is asked of you.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:36, marginTop:56, paddingTop:36,
                borderTop:'1px solid rgba(31,42,36,0.12)' }}>
                {[['12K+','Rituals delivered'],['52°C','Stone temperature'],['4.97','Guest rating']].map(([n,l]) => (
                  <div key={l}>
                    <div className="D" style={{ fontSize:44, color:'#1F2A24', lineHeight:1 }}>{n}</div>
                    <div className="MC" style={{ fontSize:10, color:'#5A6B4F', marginTop:10 }}>{l}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── TREATMENTS ───────────────────────────────────────────────────────── */}
      <section style={{ padding:'140px 56px', background:'linear-gradient(180deg,#FAF5EE,#F0E4D2)' }}>
        <div style={{ maxWidth:1480, margin:'0 auto' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:80 }}>
            <div>
              <Reveal><div className="MC" style={{ fontSize:11, color:'#C68F73', marginBottom:24 }}>— The Rituals —</div></Reveal>
              <Reveal delay={0.1}>
                <h2 className="D" style={{ fontSize:'clamp(44px,6vw,90px)', lineHeight:0.98, color:'#1F2A24', maxWidth:800 }}>
                  Four ways to <span className="DI" style={{ color:'#5A6B4F' }}>let go</span>.
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <p style={{ fontSize:15, color:'#5A6B4F', maxWidth:360, lineHeight:1.75, fontWeight:300, paddingBottom:12 }}>
                Each ritual is shaped to the body before you arrive. Tell us how the week has treated you — we will do the rest.
              </p>
            </Reveal>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:4 }}>
            {TREATMENTS.map((t,i) => (
              <Reveal key={t.name} delay={i * 0.08}>
                <motion.div
                  onHoverStart={() => setHovered(i)}
                  onHoverEnd={() => setHovered(null)}
                  style={{ position:'relative', aspectRatio:'5/4', overflow:'hidden', borderRadius:4, background:'#1F2A24' }}
                >
                  <motion.img src={t.img} alt={t.name}
                    style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }}
                    animate={{ scale: hovered===i ? 1.07 : 1 }}
                    transition={{ duration:1.2, ease:[0.22,1,0.36,1] }} />
                  <motion.div style={{ position:'absolute', inset:0,
                    background:'linear-gradient(180deg,rgba(31,42,36,0) 30%,rgba(31,42,36,0.65) 100%)' }}
                    animate={{ opacity: hovered===i ? 1 : 0.75 }} />
                  <div style={{ position:'absolute', top:32, left:36, color:'#FAF5EE', display:'flex', alignItems:'center', gap:14 }}>
                    <span className="DI" style={{ fontSize:30, opacity:0.9 }}>{t.n}</span>
                    <span style={{ width:28, height:1, background:'#FAF5EE', opacity:0.6 }} />
                    <span className="MC" style={{ fontSize:9, opacity:0.9 }}>{t.tag}</span>
                  </div>
                  <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:36, color:'#FAF5EE' }}>
                    <div className="MC" style={{ fontSize:10, opacity:0.8, marginBottom:10 }}>{t.sub}</div>
                    <h3 className="D" style={{ fontSize:38, lineHeight:1, marginBottom:14 }}>{t.name}</h3>
                    <motion.div
                      animate={{ height:hovered===i ? 'auto' : 0, opacity:hovered===i ? 1 : 0, marginTop:hovered===i ? 12 : 0 }}
                      transition={{ duration:0.5, ease:[0.22,1,0.36,1] }}
                      style={{ overflow:'hidden' }}>
                      <p style={{ fontSize:14, lineHeight:1.7, fontWeight:300, opacity:0.9, maxWidth:460 }}>{t.desc}</p>
                    </motion.div>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center',
                      paddingTop:22, marginTop:22, borderTop:'1px solid rgba(250,245,238,0.25)' }}>
                      <span className="MC" style={{ fontSize:10, opacity:0.85 }}>{t.duration}</span>
                      <span className="DI" style={{ fontSize:26 }}>{t.price}</span>
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── RITUAL STEPS ─────────────────────────────────────────────────────── */}
      <section style={{ position:'relative', padding:'160px 56px', background:'#FAF5EE' }}>
        <div style={{ maxWidth:1480, margin:'0 auto' }}>
          <Reveal>
            <div style={{ textAlign:'center', marginBottom:84 }}>
              <div className="MC" style={{ fontSize:11, color:'#C68F73', marginBottom:24 }}>— The Hot Stone Process —</div>
              <h2 className="D" style={{ fontSize:'clamp(46px,6.5vw,100px)', lineHeight:0.98, color:'#1F2A24' }}>
                Six steps. <span className="DI" style={{ color:'#5A6B4F' }}>Ninety minutes.</span>
              </h2>
              <p style={{ fontSize:16, color:'#5A6B4F', fontWeight:300, maxWidth:580, margin:'24px auto 0', lineHeight:1.8 }}>
                Every Volcanic Stone Ritual follows the same arc — refined over a decade, performed in unhurried silence.
              </p>
            </div>
          </Reveal>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, alignItems:'flex-start' }}>
            <Reveal>
              <div style={{ position:'sticky', top:120, aspectRatio:'3/4', borderRadius:6, overflow:'hidden',
                boxShadow:'0 50px 120px rgba(31,42,36,0.20)', background:'#1F2A24' }}>
                <img
                  className="kb"
                  src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=1800&q=85"
                  alt="Volcanic stones placed along the spine"
                  style={{ width:'100%', height:'100%', objectFit:'cover', willChange:'transform' }}
                />
                <div style={{ position:'absolute', inset:0,
                  background:'radial-gradient(ellipse at 50% 100%,rgba(31,42,36,0.45),transparent 60%)', pointerEvents:'none' }} />
                <AnimatePresence mode="wait">
                  <motion.div key={activeStep}
                    initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-10 }}
                    transition={{ duration:0.5 }}
                    style={{ position:'absolute', bottom:36, left:36, right:36, color:'#FAF5EE' }}>
                    <div className="MC" style={{ fontSize:9, opacity:0.7, marginBottom:8 }}>
                      Step {RITUAL_STEPS[activeStep].n} · {RITUAL_STEPS[activeStep].time}
                    </div>
                    <div className="DI" style={{ fontSize:34, lineHeight:1.05 }}>{RITUAL_STEPS[activeStep].title}</div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </Reveal>

            <div>
              {RITUAL_STEPS.map((s,i) => (
                <Reveal key={s.n} delay={i * 0.06}>
                  <motion.div
                    onHoverStart={() => setActiveStep(i)}
                    style={{ padding:'32px 0', position:'relative',
                      borderBottom: i<RITUAL_STEPS.length-1 ? '1px solid rgba(31,42,36,0.10)' : 'none' }}
                  >
                    <motion.div
                      animate={{ opacity:activeStep===i ? 1 : 0, scaleX:activeStep===i ? 1 : 0 }}
                      transition={{ duration:0.5, ease:[0.22,1,0.36,1] }}
                      style={{ position:'absolute', left:0, top:0, bottom:0, width:3, background:'#C68F73', transformOrigin:'top' }} />
                    <div style={{ display:'grid', gridTemplateColumns:'60px 1fr auto', gap:24, alignItems:'center',
                      paddingLeft: activeStep===i ? 24 : 0, transition:'padding-left .45s ease' }}>
                      <span className="DI" style={{ fontSize:36, lineHeight:1, color:activeStep===i ? '#C68F73' : '#1F2A24', transition:'color .4s' }}>{s.n}</span>
                      <div>
                        <h4 className="D" style={{ fontSize:28, color:'#1F2A24', lineHeight:1.1, marginBottom:8 }}>{s.title}</h4>
                        <p style={{ fontSize:14, color:'#5A6B4F', fontWeight:300, lineHeight:1.6 }}>{s.text}</p>
                      </div>
                      <span className="MC" style={{ fontSize:10, color:'#8B7E72', whiteSpace:'nowrap' }}>{s.time}</span>
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY ───────────────────────────────────────────────────────── */}
      <section style={{ position:'relative', padding:'160px 56px', background:'#1F2A24', color:'#FAF5EE', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:'-20%', right:'-10%', width:600, height:600, borderRadius:'50%',
          background:'radial-gradient(circle,rgba(198,143,115,0.18) 0%,transparent 65%)' }} />
        <div style={{ position:'absolute', bottom:'-10%', left:'-8%', width:500, height:500, borderRadius:'50%',
          background:'radial-gradient(circle,rgba(157,174,150,0.12) 0%,transparent 65%)' }} />

        <div style={{ maxWidth:1480, margin:'0 auto', position:'relative' }}>
          <div style={{ textAlign:'center', marginBottom:96 }}>
            <Reveal><div className="MC" style={{ fontSize:11, color:'#C68F73', marginBottom:24 }}>— Philosophy —</div></Reveal>
            <Reveal delay={0.1}>
              <h2 className="D" style={{ fontSize:'clamp(40px,5.5vw,86px)', lineHeight:1.02, maxWidth:1000, margin:'0 auto' }}>
                Three principles guide every <span className="DI" style={{ color:'#C68F73' }}>moment</span> of every ritual.
              </h2>
            </Reveal>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:64 }}>
            {PILLARS.map((p,i) => (
              <Reveal key={p.label} delay={i * 0.12}>
                <div style={{ textAlign:'center' }}>
                  <div className={['s30','s34','s38'][i]}
                    style={{ width:110, height:110, margin:'0 auto 32px', borderRadius:'50%',
                      border:'1px solid rgba(198,143,115,0.35)', display:'grid', placeItems:'center' }}>
                    <span style={{ fontSize:44, color:'#C68F73' }}>{p.glyph}</span>
                  </div>
                  <div className="DI" style={{ fontSize:38, color:'#FAF5EE', marginBottom:18 }}>{p.label}</div>
                  <p style={{ fontSize:15, lineHeight:1.8, fontWeight:300, color:'rgba(250,245,238,0.70)',
                    maxWidth:320, margin:'0 auto' }}>{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ──────────────────────────────────────────────────────────── */}
      <section style={{ padding:'160px 56px', background:'#FAF5EE' }}>
        <div style={{ maxWidth:1480, margin:'0 auto' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:72 }}>
            <div>
              <Reveal><div className="MC" style={{ fontSize:11, color:'#C68F73', marginBottom:24 }}>— The Sanctuary —</div></Reveal>
              <Reveal delay={0.1}>
                <h2 className="D" style={{ fontSize:'clamp(40px,6vw,92px)', lineHeight:0.98, color:'#1F2A24' }}>
                  A <span className="DI" style={{ color:'#5A6B4F' }}>house</span> built for quiet.
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <span className="MC" style={{ fontSize:11, color:'#5A6B4F' }}>Franschhoek · Western Cape</span>
            </Reveal>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gridTemplateRows:'repeat(2,280px)', gap:12 }}>
            {ROOMS.map((r,i) => (
              <Reveal key={r.name} delay={i*0.08} className={r.span}>
                <motion.div whileHover={{ y:-5 }} transition={{ duration:0.5, ease:[0.22,1,0.36,1] }}
                  style={{ position:'relative', width:'100%', height:'100%', borderRadius:4, overflow:'hidden', background:'#1F2A24' }}>
                  <img src={r.img} alt={r.name}
                    style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 1.4s cubic-bezier(0.22,1,0.36,1)' }}
                    onMouseEnter={e => (e.currentTarget as HTMLImageElement).style.transform='scale(1.07)'}
                    onMouseLeave={e => (e.currentTarget as HTMLImageElement).style.transform='scale(1)'} />
                  <div style={{ position:'absolute', inset:0,
                    background:'linear-gradient(180deg,transparent 50%,rgba(31,42,36,0.70) 100%)' }} />
                  <div style={{ position:'absolute', bottom:24, left:28, right:28, color:'#FAF5EE' }}>
                    <div className="DI" style={{ fontSize:28, lineHeight:1.1 }}>{r.name}</div>
                    <div className="MC" style={{ fontSize:10, opacity:0.85, marginTop:6 }}>{r.sub}</div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────────── */}
      <section style={{ padding:'160px 56px', background:'linear-gradient(180deg,#F0E4D2,#E8DDC9)' }}>
        <div style={{ maxWidth:1100, margin:'0 auto', textAlign:'center' }}>
          <Reveal>
            <div className="MC" style={{ fontSize:11, color:'#C68F73', marginBottom:36 }}>— Whispered Praise —</div>
          </Reveal>
          {QUOTES.map((q,i) => (
            <Reveal key={i} delay={i*0.12}>
              <div style={{ marginBottom:i<QUOTES.length-1?84:0, paddingBottom:i<QUOTES.length-1?84:0,
                borderBottom:i<QUOTES.length-1?'1px solid rgba(31,42,36,0.10)':'none' }}>
                <p className="DI" style={{ fontSize:'clamp(28px,3.5vw,48px)', lineHeight:1.3, color:'#1F2A24', marginBottom:32 }}>
                  &ldquo;{q.text}&rdquo;
                </p>
                <div className="MC" style={{ fontSize:11, color:'#5A6B4F' }}>{q.who} · {q.city}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── BOOKING CTA ──────────────────────────────────────────────────────── */}
      <section style={{ position:'relative', padding:'180px 56px', background:'#FAF5EE', overflow:'hidden' }}>
        <div className="ba" style={{ position:'absolute', top:'10%', left:'8%', width:360, height:360,
          borderRadius:'50%', background:'radial-gradient(circle,rgba(198,143,115,0.4) 0%,transparent 70%)', pointerEvents:'none' }} />
        <div className="bb" style={{ position:'absolute', bottom:'5%', right:'6%', width:420, height:420,
          borderRadius:'50%', background:'radial-gradient(circle,rgba(157,174,150,0.40) 0%,transparent 70%)', pointerEvents:'none' }} />

        <div style={{ maxWidth:1100, margin:'0 auto', textAlign:'center', position:'relative' }}>
          <Reveal><div className="MC" style={{ fontSize:11, color:'#C68F73', marginBottom:36 }}>— Begin Your Ritual —</div></Reveal>
          <Reveal delay={0.1}>
            <h2 className="D" style={{ fontSize:'clamp(56px,8vw,140px)', lineHeight:0.92, color:'#1F2A24', marginBottom:36 }}>
              Reserve <br /><span className="DI" style={{ color:'#5A6B4F' }}>your stillness.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{ fontSize:18, color:'#3A4640', fontWeight:300, maxWidth:560, margin:'0 auto 56px', lineHeight:1.7 }}>
              We accept twelve guests per day. Reserve a ritual by phone, by message, or by walking through our garden gate.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div style={{ display:'flex', gap:18, justifyContent:'center', flexWrap:'wrap' }}>
              <Magnetic>
                <span className="MC" style={{ display:'inline-flex', alignItems:'center', gap:14,
                  padding:'22px 44px', background:'#1F2A24', color:'#FAF5EE', borderRadius:999, fontSize:11,
                  boxShadow:'0 16px 50px rgba(31,42,36,0.25)' }}>
                  Reserve by WhatsApp <span style={{ fontSize:14 }}>→</span>
                </span>
              </Magnetic>
              <Magnetic>
                <span className="MC" style={{ display:'inline-flex', alignItems:'center', gap:14,
                  padding:'22px 36px', border:'1px solid rgba(31,42,36,0.35)', color:'#1F2A24',
                  borderRadius:999, fontSize:11 }}>
                  Send an Enquiry
                </span>
              </Magnetic>
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <div style={{ marginTop:96, display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24,
              maxWidth:880, margin:'96px auto 0', paddingTop:56, borderTop:'1px solid rgba(31,42,36,0.12)' }}>
              {[
                { label:'Address', value:'14 Plein Street\nFranschhoek, 7690' },
                { label:'Hours',   value:'Tuesday — Sunday\n09h00 — 19h00' },
                { label:'Contact', value:'073 127 5190\nhello@maisonserene.co.za' },
              ].map(c => (
                <div key={c.label}>
                  <div className="MC" style={{ fontSize:10, color:'#C68F73', marginBottom:14 }}>{c.label}</div>
                  <div style={{ fontSize:15, color:'#1F2A24', lineHeight:1.7, fontWeight:300, whiteSpace:'pre-line' }}>{c.value}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────────── */}
      <footer style={{ background:'#1F2A24', padding:'60px 56px 36px' }}>
        <div style={{ maxWidth:1480, margin:'0 auto', display:'flex', justifyContent:'space-between',
          alignItems:'center', flexWrap:'wrap', gap:24 }}>
          <div className="DI" style={{ fontSize:22, color:'#FAF5EE' }}>Maison Sérène</div>
          <div className="MC" style={{ fontSize:10, color:'rgba(250,245,238,0.45)' }}>
            © 2026 · Crafted in Franschhoek · All rituals reserved
          </div>
          <div style={{ display:'flex', gap:28 }}>
            {['Instagram','Pinterest','Journal'].map(s => (
              <span key={s} className="MC" style={{ fontSize:10, color:'rgba(250,245,238,0.65)' }}>{s}</span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
