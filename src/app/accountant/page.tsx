'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { DM_Sans, DM_Mono } from 'next/font/google'

const dmSans = DM_Sans({ subsets: ['latin'], weight: ['300', '400', '500', '700', '900'], variable: '--font-dm' })
const dmMono = DM_Mono({ subsets: ['latin'], weight: ['300', '400', '500'], variable: '--font-mono' })

// ─── Canvas particle system ───────────────────────────────────────────────────
const SYMBOLS = ['£', '$', '%', '∑', '∞', '÷', '×', '=', '€', '¥', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', ',']
const STRINGS = ['R.O.I', 'TAX', 'P&L', 'EBITDA', 'YoY', 'CAGR', 'VAT', 'IRR', 'NPV', 'FASB', 'IFRS']

interface Particle {
  x: number; y: number; vx: number; vy: number
  char: string; alpha: number; size: number
  life: number; maxLife: number; color: string
}

// ─── Counting number hook ─────────────────────────────────────────────────────
function useCounter(target: number, duration = 2500, start = false) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!start) return
    let raf: number
    const startTime = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - startTime) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 4)
      setVal(Math.round(ease * target))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration, start])
  return val
}

// ─── Typewriter ───────────────────────────────────────────────────────────────
function Typewriter({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(t)
  }, [delay])
  useEffect(() => {
    if (!started) return
    let i = 0
    const iv = setInterval(() => {
      setDisplayed(text.slice(0, i + 1))
      i++
      if (i >= text.length) clearInterval(iv)
    }, 55)
    return () => clearInterval(iv)
  }, [started, text])
  return (
    <span>
      {displayed}
      {displayed.length < text.length && started && (
        <span className="animate-pulse text-emerald-400">_</span>
      )}
    </span>
  )
}

// ─── SVG animated profit chart ────────────────────────────────────────────────
const CHART_POINTS = [
  { x: 0,   y: 90 }, { x: 60,  y: 75 }, { x: 120, y: 80 },
  { x: 180, y: 55 }, { x: 240, y: 45 }, { x: 300, y: 58 },
  { x: 360, y: 30 }, { x: 420, y: 18 }, { x: 480, y: 8  },
]

function toPath(pts: { x: number; y: number }[]) {
  return pts.reduce((acc, p, i) =>
    i === 0 ? `M${p.x},${p.y}` : `${acc} L${p.x},${p.y}`, '')
}

function ProfitLine({ animate }: { animate: boolean }) {
  const pathRef = useRef<SVGPathElement>(null)
  const [length, setLength] = useState(0)
  const d = toPath(CHART_POINTS)

  useEffect(() => {
    if (pathRef.current) setLength(pathRef.current.getTotalLength())
  }, [])

  return (
    <svg viewBox="0 0 480 100" className="w-full" style={{ height: 100 }} preserveAspectRatio="none">
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#00FF88" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#00FF88" stopOpacity="1" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      {/* area fill */}
      <path
        d={`${d} L480,100 L0,100 Z`}
        fill="url(#chartGrad)"
        opacity={animate ? 0.08 : 0}
        style={{ transition: 'opacity 1s 0.5s' }}
      />
      {/* line */}
      <path
        ref={pathRef}
        d={d}
        fill="none"
        stroke="url(#chartGrad)"
        strokeWidth="2.5"
        filter="url(#glow)"
        strokeDasharray={length}
        strokeDashoffset={animate ? 0 : length}
        style={{ transition: `stroke-dashoffset 2.4s cubic-bezier(0.22,1,0.36,1) 0.2s` }}
      />
      {/* dots at key points */}
      {CHART_POINTS.filter((_, i) => i % 2 === 0).map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={animate ? 3 : 0} fill="#00FF88"
          filter="url(#glow)"
          style={{ transition: `r 0.3s ${0.3 + i * 0.15}s, opacity 0.3s ${0.3 + i * 0.15}s` }}
          opacity={animate ? 1 : 0}
        />
      ))}
    </svg>
  )
}

// ─── Stats card ────────────────────────────────────────────────────────────────
function StatCard({ value, suffix, label, prefix = '', delay, animate }:
  { value: number; suffix: string; label: string; prefix?: string; delay: number; animate: boolean }
) {
  const count = useCounter(value, 2200, animate)
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={animate ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative group"
    >
      <div className="absolute inset-0 rounded-2xl bg-emerald-400/5 border border-emerald-400/10
                      group-hover:border-emerald-400/30 transition-colors duration-500" />
      <div className="relative px-8 py-6">
        <div className="flex items-end gap-1 mb-1">
          <span className="text-emerald-400 font-mono text-sm">{prefix}</span>
          <span className="text-white font-black text-4xl tracking-tight leading-none">
            {count.toLocaleString()}
          </span>
          <span className="text-emerald-400 font-bold text-2xl mb-0.5">{suffix}</span>
        </div>
        <p className="text-white/40 text-xs font-mono uppercase tracking-widest">{label}</p>
      </div>
    </motion.div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function AccountantHeroPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<Particle[]>([])
  const rafRef = useRef<number>(0)
  const [loaded, setLoaded] = useState(false)
  const [statsVisible, setStatsVisible] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 })
  const statsRef = useRef<HTMLDivElement>(null)

  // scroll-triggered stats
  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true) }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // mouse parallax
  const onMouse = useCallback((e: MouseEvent) => {
    mouseX.set((e.clientX / window.innerWidth - 0.5) * 40)
    mouseY.set((e.clientY / window.innerHeight - 0.5) * 40)
  }, [mouseX, mouseY])

  useEffect(() => {
    window.addEventListener('mousemove', onMouse)
    return () => window.removeEventListener('mousemove', onMouse)
  }, [onMouse])

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let W = 0, H = 0

    const resize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const colors = ['#00FF88', '#00CC6A', '#FFD700', '#ffffff']

    const spawn = () => {
      if (particles.current.length > 180) return
      const maxLife = 180 + Math.random() * 240
      particles.current.push({
        x: Math.random() * W,
        y: -20,
        vx: (Math.random() - 0.5) * 0.4,
        vy: 0.3 + Math.random() * 0.7,
        char: Math.random() > 0.7
          ? STRINGS[Math.floor(Math.random() * STRINGS.length)]
          : SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        alpha: 0,
        size: 9 + Math.random() * 14,
        life: 0,
        maxLife,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    let frame = 0
    const draw = () => {
      rafRef.current = requestAnimationFrame(draw)
      ctx.clearRect(0, 0, W, H)
      frame++

      if (frame % 4 === 0) spawn()

      particles.current = particles.current.filter(p => {
        p.life++
        p.x += p.vx
        p.y += p.vy
        const t = p.life / p.maxLife
        p.alpha = t < 0.2 ? t / 0.2 : t > 0.8 ? 1 - (t - 0.8) / 0.2 : 1
        const hex = Math.round(p.alpha * 0.35 * 255).toString(16).padStart(2, '0')
        ctx.fillStyle = p.color + hex
        ctx.font = `${p.size}px 'DM Mono', monospace`
        ctx.fillText(p.char, p.x, p.y)
        return p.life < p.maxLife && p.y < H + 40
      })
    }

    draw()
    const t = setTimeout(() => setLoaded(true), 300)
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      clearTimeout(t)
    }
  }, [])

  return (
    <div className={`${dmSans.variable} ${dmMono.variable} min-h-screen bg-[#060609] text-white overflow-x-hidden`}
      style={{ fontFamily: 'var(--font-dm)' }}>

      {/* ── Canvas background ── */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* ── Radial glow ── */}
      <div className="fixed inset-0 z-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0,255,136,0.04) 0%, transparent 70%)' }} />

      {/* ── Grid ── */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,255,136,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

      {/* ══════════ HERO SECTION ══════════ */}
      <section className="relative z-10 min-h-screen flex flex-col justify-center items-center px-6 text-center">

        {/* top label */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex items-center gap-3 mb-10"
        >
          <span className="h-px w-12 bg-emerald-400/40" />
          <span className="font-mono text-emerald-400 text-xs tracking-[0.3em] uppercase">
            Chartered Accountants · Est. 2009
          </span>
          <span className="h-px w-12 bg-emerald-400/40" />
        </motion.div>

        {/* main headline with parallax */}
        <motion.div style={{ x: springX, y: springY }}>
          <motion.h1
            initial={{ opacity: 0, scale: 0.92 }}
            animate={loaded ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="text-[clamp(3rem,10vw,9rem)] font-black leading-none tracking-tighter mb-2"
            style={{ fontFamily: 'var(--font-dm)' }}
          >
            <span className="text-white">YOUR MONEY.</span>
          </motion.h1>

          <motion.h1
            initial={{ opacity: 0, scale: 0.92 }}
            animate={loaded ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="text-[clamp(3rem,10vw,9rem)] font-black leading-none tracking-tighter mb-8"
          >
            <span style={{
              background: 'linear-gradient(135deg, #00FF88 0%, #00CC6A 40%, #FFD700 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              FINALLY WORKING.
            </span>
          </motion.h1>
        </motion.div>

        {/* typewriter sub */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="font-mono text-white/50 text-sm md:text-base tracking-wide max-w-lg mb-14"
        >
          <Typewriter
            text="We turn your financial chaos into compound clarity — tax strategy, growth accounting, and profit engineering for ambitious businesses."
            delay={800}
          />
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <button className="group relative px-8 py-4 rounded-full overflow-hidden font-bold text-sm tracking-wider">
            <span className="absolute inset-0 bg-emerald-400 group-hover:scale-110 transition-transform duration-300" />
            <span className="absolute inset-0 rounded-full"
              style={{ boxShadow: '0 0 40px rgba(0,255,136,0.5)', opacity: 0.6 }} />
            <span className="relative text-black uppercase tracking-widest">
              Book a Free Audit
            </span>
          </button>
          <button className="group flex items-center gap-3 px-8 py-4 rounded-full border border-white/10
                             hover:border-white/30 transition-colors duration-300 text-sm font-medium tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            See How It Works
          </button>
        </motion.div>

        {/* scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-white/20 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent"
          />
        </motion.div>
      </section>

      {/* ══════════ PROFIT CHART ══════════ */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-end justify-between mb-6">
              <div>
                <p className="font-mono text-emerald-400 text-xs tracking-widest uppercase mb-2">
                  Client Portfolio · Avg. Growth
                </p>
                <h2 className="text-4xl font-black text-white">
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    +340%
                  </motion.span>{' '}
                  <span className="text-white/30 font-light">over 4 years</span>
                </h2>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center gap-2 bg-emerald-400/10 border border-emerald-400/20
                                 rounded-full px-4 py-2 font-mono text-emerald-400 text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  LIVE TRACKING
                </span>
              </div>
            </div>

            <div className="relative rounded-3xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-sm">
              {/* Y-axis labels */}
              <div className="absolute left-4 top-8 bottom-4 flex flex-col justify-between">
                {['100%', '75%', '50%', '25%', '0%'].map(l => (
                  <span key={l} className="font-mono text-white/15 text-[9px]">{l}</span>
                ))}
              </div>

              <div className="ml-8">
                <ProfitLineWrapper />
              </div>

              {/* X-axis */}
              <div className="ml-8 flex justify-between mt-2">
                {['2021', 'Q2', 'Q3', 'Q4', '2022', 'Q2b', 'Q3b', 'Q4b', '2023'].map((l, i) => (
                  <span key={i} className="font-mono text-white/15 text-[9px]">{l.replace('b', '')}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════ STATS ══════════ */}
      <section ref={statsRef} className="relative z-10 py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard value={2400000} prefix="£" suffix="+" label="Tax Saved for Clients" delay={0} animate={statsVisible} />
          <StatCard value={340} suffix="%" label="Avg. Client Growth" delay={0.15} animate={statsVisible} />
          <StatCard value={98} suffix="%" label="Client Retention Rate" delay={0.3} animate={statsVisible} />
        </div>
      </section>

      {/* ══════════ SERVICES ══════════ */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <p className="font-mono text-emerald-400 text-xs tracking-widest uppercase mb-4">What We Do</p>
            <h2 className="text-5xl font-black text-white leading-none">
              Precision.<br />
              <span className="text-white/30">At Every Level.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                num: '01',
                title: 'Tax Strategy',
                desc: 'We don\'t just file — we engineer. Legal minimisation, R&D credits, capital allowances optimised before HMRC ever sees a figure.',
                tag: 'HMRC · PAYE · VAT',
              },
              {
                num: '02',
                title: 'Profit Engineering',
                desc: 'Margin analysis, cost architecture, and cash flow modelling that turns revenue into compounding wealth.',
                tag: 'P&L · Cash Flow · EBITDA',
              },
              {
                num: '03',
                title: 'Growth Accounting',
                desc: 'Real-time dashboards, KPI architecture, and board-ready reports. Know your numbers before your competitors know theirs.',
                tag: 'MIS · KPIs · Forecasting',
              },
              {
                num: '04',
                title: 'CFO on Demand',
                desc: 'Strategic financial leadership — fundraising, M&A due diligence, investor decks — without the £200k salary.',
                tag: 'M&A · Fundraising · Strategy',
              },
            ].map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group relative rounded-3xl border border-white/5 bg-white/[0.02]
                           hover:border-emerald-400/20 hover:bg-white/[0.04]
                           transition-all duration-500 p-8 cursor-pointer overflow-hidden"
              >
                {/* hover glow */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'radial-gradient(circle at 50% 0%, rgba(0,255,136,0.04), transparent 70%)' }} />

                <div className="relative">
                  <div className="flex items-start justify-between mb-6">
                    <span className="font-mono text-emerald-400/40 text-5xl font-bold leading-none">{s.num}</span>
                    <span className="font-mono text-white/20 text-[9px] tracking-widest border border-white/10
                                     rounded-full px-3 py-1 group-hover:border-emerald-400/20 group-hover:text-emerald-400/50
                                     transition-colors duration-300">
                      {s.tag}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-50 transition-colors">{s.title}</h3>
                  <p className="text-white/35 text-sm leading-relaxed group-hover:text-white/50 transition-colors">{s.desc}</p>

                  <div className="mt-6 flex items-center gap-2 text-emerald-400/0 group-hover:text-emerald-400/70
                                  transition-all duration-300 translate-x-0 group-hover:translate-x-1">
                    <span className="font-mono text-xs tracking-wider">EXPLORE</span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ TICKER ══════════ */}
      <section className="relative z-10 py-6 border-y border-white/5 overflow-hidden">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="flex gap-12 whitespace-nowrap"
        >
          {[...Array(2)].map((_, rep) => (
            <span key={rep} className="flex gap-12">
              {['TAX SAVINGS', 'PROFIT GROWTH', 'CASH FLOW', 'STRATEGIC CFO', 'HMRC COMPLIANCE',
                'ANNUAL RETURNS', 'VAT RETURNS', 'PAYROLL', 'R&D CREDITS', 'XERO PARTNER'].map((t, i) => (
                <span key={i} className="flex items-center gap-4">
                  <span className="font-mono text-white/15 text-xs tracking-[0.3em] uppercase">{t}</span>
                  <span className="text-emerald-400/30 text-xl font-mono">·</span>
                </span>
              ))}
            </span>
          ))}
        </motion.div>
      </section>

      {/* ══════════ FINAL CTA ══════════ */}
      <section className="relative z-10 py-40 px-6 text-center">
        {/* big glowing number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <span
            className="text-[clamp(12rem,35vw,30rem)] font-black leading-none select-none"
            style={{
              color: 'transparent',
              WebkitTextStroke: '1px rgba(0,255,136,0.04)',
            }}
          >
            £∞
          </span>
        </motion.div>

        <div className="relative">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-mono text-emerald-400 text-xs tracking-widest uppercase mb-6"
          >
            Ready to start?
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[clamp(2.5rem,7vw,6rem)] font-black leading-none tracking-tighter mb-8"
          >
            Stop leaving<br />
            <span style={{
              background: 'linear-gradient(135deg, #00FF88, #FFD700)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              money on the table.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/40 max-w-md mx-auto mb-12 leading-relaxed"
          >
            One conversation. We'll show you exactly where your money is leaking — and how to stop it.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <button className="group relative px-12 py-5 rounded-full overflow-hidden font-bold text-base tracking-wider">
              <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-yellow-400
                               group-hover:scale-105 transition-transform duration-300" />
              <span className="absolute inset-0 rounded-full"
                style={{ boxShadow: '0 0 80px rgba(0,255,136,0.3)', opacity: 0.8 }} />
              <span className="relative text-black uppercase tracking-widest font-black">
                Book Your Free Audit →
              </span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer className="relative z-10 border-t border-white/5 py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-mono text-white/20 text-xs tracking-widest">
            © 2026 MERIDIAN ACCOUNTING LLP
          </span>
          <div className="flex gap-8">
            {['Privacy', 'Terms', 'GDPR', 'Contact'].map(l => (
              <span key={l} className="font-mono text-white/20 text-xs tracking-wider hover:text-white/50
                                       transition-colors cursor-pointer">
                {l}
              </span>
            ))}
          </div>
          <span className="font-mono text-white/10 text-xs">FCA Registered · ICAEW Member</span>
        </div>
      </footer>
    </div>
  )
}

// ── Wrapper to trigger ProfitLine when in view ────────────────────────────────
function ProfitLineWrapper() {
  const [vis, setVis] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return <div ref={ref}><ProfitLine animate={vis} /></div>
}
