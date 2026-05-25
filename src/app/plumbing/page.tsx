'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Barlow_Condensed } from 'next/font/google'

const barlow = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['700', '800', '900'],
  variable: '--font-barlow',
})

interface Ripple {
  x: number
  y: number
  r: number
  maxR: number
  alpha: number
  speed: number
}

const SERVICES = [
  { num: '01', title: 'Emergency Repairs', badge: '15 MIN', desc: 'Burst pipes, slab leaks, major flooding. We dispatch immediately — 24 hours a day, every day of the year.' },
  { num: '02', title: 'Blocked Drains', badge: null, desc: 'High-pressure jet blasting and CCTV drain inspection. We clear it, film it, and prove the fix on-screen.' },
  { num: '03', title: 'Hot Water Systems', badge: null, desc: 'Install, repair, or replace any hot water system — gas, electric, solar, or heat pump. Same-day availability.' },
  { num: '04', title: 'Gas Fitting', badge: null, desc: 'Certified gas plumbers for BBQs, stoves, heaters, and commercial fit-outs. Compliance certificates included.' },
  { num: '05', title: 'Bathroom Plumbing', badge: null, desc: 'New builds and full renovations. Tiled showers, freestanding baths, vanities — start to finish.' },
  { num: '06', title: 'Commercial', badge: null, desc: 'Retail, strata, hospitality. Maintenance contracts and 2-hour SLA emergency response for businesses.' },
]

const REVIEWS = [
  { name: 'Sarah M.', suburb: 'Newtown', text: "Called at 2am with a burst pipe. They were at my door in 11 minutes. I couldn't believe it — and the price was completely fair." },
  { name: 'James T.', suburb: 'Bondi Junction', text: "Showed up on time, explained everything before starting, no upselling. I've had so many bad experiences with tradies. These guys are genuinely different." },
  { name: 'Priya K.', suburb: 'Surry Hills', text: "Another company quoted $900 and wanted to dig up the yard. Flux fixed it in 18 minutes for $180. Honest and incredibly fast." },
]

const STATS = [
  { num: '500+', label: 'Jobs Done' },
  { num: '15', label: 'Min Avg Response' },
  { num: '4.9', label: 'Star Rating' },
  { num: '12', label: 'Yrs in Business' },
]

const STEPS = [
  { n: '01', title: 'Call or Book', desc: 'Phone us anytime or book online in 60 seconds. Tell us the problem — we plan the response immediately.' },
  { n: '02', title: 'We Show Up', desc: 'Nearest crew dispatched. GPS-tracked. Fully stocked van. Uniformed plumber at your door in 15 minutes.' },
  { n: '03', title: 'Fixed. Guaranteed.', desc: 'We quote before touching anything. Done right the first time. 12-month workmanship warranty on every job.' },
]

const UP = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
}

export default function PlumbingPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef(0)
  const ripplesRef = useRef<Ripple[]>([])
  const frameRef = useRef(0)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let W = (canvas.width = canvas.offsetWidth)
    let H = (canvas.height = canvas.offsetHeight)

    function spawnRipple(x?: number, y?: number) {
      ripplesRef.current.push({
        x: x ?? 20 + Math.random() * (W - 40),
        y: y ?? 20 + Math.random() * (H - 40),
        r: 1,
        maxR: 60 + Math.random() * 80,
        alpha: 0.8 + Math.random() * 0.15,
        speed: 0.9 + Math.random() * 1.2,
      })
    }

    for (let i = 0; i < 8; i++) setTimeout(() => spawnRipple(), i * 380)

    function draw() {
      animRef.current = requestAnimationFrame(draw)
      frameRef.current++
      ctx.fillStyle = '#0B2335'
      ctx.fillRect(0, 0, W, H)

      const spotX = W * 0.5 + Math.sin(frameRef.current * 0.004) * W * 0.28
      const spotY = H * 0.45 + Math.cos(frameRef.current * 0.003) * H * 0.25
      const spot = ctx.createRadialGradient(spotX, spotY, 0, spotX, spotY, W * 0.55)
      spot.addColorStop(0, 'rgba(80, 150, 200, 0.07)')
      spot.addColorStop(1, 'rgba(80, 150, 200, 0)')
      ctx.fillStyle = spot
      ctx.fillRect(0, 0, W, H)

      const shimOffset = (frameRef.current * 0.2) % 50
      ctx.lineWidth = 0.5
      for (let y = -shimOffset; y < H + 50; y += 50) {
        const shimAlpha = 0.018 + 0.012 * Math.sin((y / H) * Math.PI * 2 + frameRef.current * 0.01)
        ctx.strokeStyle = `rgba(140, 210, 255, ${shimAlpha})`
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke()
      }

      const alive: Ripple[] = []
      for (const rip of ripplesRef.current) {
        rip.r += rip.speed
        const progress = rip.r / rip.maxR
        rip.alpha = Math.max(0, 0.85 * (1 - progress * progress))
        if (rip.alpha <= 0.005) continue
        alive.push(rip)
        for (let ring = 0; ring < 3; ring++) {
          const ringR = rip.r - ring * 15
          if (ringR < 0) continue
          const ringProgress = ringR / rip.maxR
          const ringFade = Math.max(0, 1 - ringProgress * 1.4)
          const ringAlpha = rip.alpha * ringFade * (1 - ring * 0.3)
          if (ringAlpha < 0.005) continue
          const r = ring === 0 ? 230 : 255
          const g = ring === 0 ? 88 : 155
          const b = ring === 0 ? 28 : 65
          ctx.beginPath()
          ctx.arc(rip.x, rip.y, ringR, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${ringAlpha})`
          ctx.lineWidth = ring === 0 ? 1.8 : 1.1
          ctx.stroke()
        }
        if (rip.r < 14) {
          ctx.beginPath()
          ctx.arc(rip.x, rip.y, 2.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 200, 120, ${(1 - rip.r / 14) * 0.9})`
          ctx.fill()
        }
      }
      ripplesRef.current = alive

      const vig = ctx.createRadialGradient(W / 2, H / 2, H * 0.2, W / 2, H / 2, H * 0.85)
      vig.addColorStop(0, 'rgba(0,0,0,0)')
      vig.addColorStop(1, 'rgba(0,0,0,0.45)')
      ctx.fillStyle = vig
      ctx.fillRect(0, 0, W, H)

      if (frameRef.current % 90 === 0) spawnRipple()
      if (frameRef.current % 155 === 0) spawnRipple()
    }

    draw()

    const onResize = () => { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight }
    const onMouseMove = (e: MouseEvent) => {
      if (Math.random() < 0.07) {
        const rect = canvas.getBoundingClientRect()
        spawnRipple(e.clientX - rect.left, e.clientY - rect.top)
      }
    }
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.75)

    window.addEventListener('resize', onResize)
    canvas.addEventListener('mousemove', onMouseMove)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', onResize)
      canvas.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div className={`${barlow.variable} bg-[#F7F3ED] text-[#0F0F0F]`}>
      {mounted && (
        <motion.a
          href="tel:0800359869"
          initial={{ y: 80, opacity: 0 }}
          animate={scrolled ? { y: 0, opacity: 1 } : { y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 380, damping: 38 }}
          className="fixed bottom-6 right-6 z-50 bg-[#E8481E] text-white rounded-full shadow-2xl"
          style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, fontSize: '13px', letterSpacing: '0.07em', textTransform: 'uppercase', padding: '14px 22px' }}
        >
          📞 Call Now
        </motion.a>
      )}

      {/* HERO */}
      <section className="flex flex-col md:flex-row min-h-screen overflow-hidden">
        <div className="flex-1 flex flex-col bg-[#F7F3ED] px-8 md:px-14 pt-8 pb-14">
          <nav className="flex items-center justify-between mb-auto">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-[#E8481E] rounded flex items-center justify-center">
                <span className="text-white" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 900, fontSize: '11px' }}>FX</span>
              </div>
              <span style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '16px' }}>Flux Plumbing</span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-[#0F0F0F]/40" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '13px' }}>
              {['Services', 'Process', 'Reviews'].map(l => (
                <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-[#E8481E] transition-colors">{l}</a>
              ))}
            </div>
          </nav>

          <div className="flex flex-col justify-center flex-1 pt-4 md:pt-0">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="flex items-center gap-2 mb-7">
              <span className="w-2 h-2 rounded-full bg-[#E8481E] animate-pulse" />
              <span className="text-[#E8481E]" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '11px' }}>Available Now · Sydney</span>
            </motion.div>

            {[
              { word: 'THE', color: '#0F0F0F' },
              { word: 'PLUMBERS', color: '#0F0F0F' },
              { word: 'WHO SHOW', color: '#E8481E' },
              { word: 'UP.', color: '#0F0F0F' },
            ].map(({ word, color }, i) => (
              <div key={word} className="overflow-hidden">
                <motion.h1
                  initial={{ y: '105%' }} animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.2 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
                  style={{ fontFamily: 'var(--font-barlow)', fontWeight: 900, fontSize: 'clamp(58px, 8vw, 132px)', lineHeight: 0.88, letterSpacing: '-0.01em', color, textTransform: 'uppercase' }}
                >
                  {word}
                </motion.h1>
              </div>
            ))}

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.68 }} className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <p className="text-[#0F0F0F]/45 max-w-[290px]" style={{ fontSize: '15px', lineHeight: 1.7 }}>
                Fixed price, no surprises. There in 15 minutes or your call-out fee is waived.
              </p>
              <div className="flex gap-3 shrink-0">
                <a href="#quote" className="bg-[#E8481E] text-white hover:bg-[#0F0F0F] transition-colors" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, fontSize: '14px', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '14px 26px', display: 'inline-block' }}>Book Now →</a>
                <a href="tel:0800359869" className="border-2 border-[#0F0F0F]/20 text-[#0F0F0F] hover:border-[#E8481E] hover:text-[#E8481E] transition-all" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, fontSize: '14px', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '14px 26px', display: 'inline-block' }}>Call Now</a>
              </div>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="flex flex-wrap gap-6 border-t border-[#0F0F0F]/10 pt-7 mt-6">
            {[{ icon: '🔒', label: 'Licensed' }, { icon: '🛡️', label: '$20M Insured' }, { icon: '⭐', label: '4.9 Rating' }, { icon: '📜', label: 'Fixed Price' }].map(t => (
              <div key={t.label} className="flex items-center gap-1.5">
                <span className="text-sm">{t.icon}</span>
                <span className="text-[#0F0F0F]/38" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '11px' }}>{t.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="hidden md:flex w-[42%] relative" style={{ minHeight: '100vh' }}
        >
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
          <div className="absolute inset-y-0 left-0 w-20 pointer-events-none z-10" style={{ background: 'linear-gradient(to right, #F7F3ED, transparent)' }} />
          <div className="relative z-20 flex flex-col items-center justify-center h-full w-full px-12 text-center">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.9 }}>
              <div className="text-white leading-none mb-2" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 900, fontSize: 'clamp(80px, 10vw, 140px)', letterSpacing: '-0.03em' }}>24/7</div>
              <div className="text-white/55 uppercase mb-8" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700, fontSize: '17px', letterSpacing: '0.22em', lineHeight: 1.4 }}>Emergency<br />Available</div>
              <div className="w-10 h-px bg-white/25 mx-auto mb-7" />
              <div className="text-white mb-2" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, fontSize: '28px', letterSpacing: '0.05em' }}>0800 359 869</div>
              <div className="text-white/38" style={{ fontSize: '13px' }}>We answer every call</div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* TICKER */}
      <div className="bg-[#0F0F0F] py-4 overflow-hidden">
        <motion.div animate={{ x: ['0%', '-50%'] }} transition={{ repeat: Infinity, duration: 32, ease: 'linear' }} className="flex whitespace-nowrap">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="text-white text-sm px-8" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              Emergency Repairs &nbsp;·&nbsp; Blocked Drains &nbsp;·&nbsp; Hot Water Systems &nbsp;·&nbsp; Gas Fitting &nbsp;·&nbsp; Bathroom Renos &nbsp;·&nbsp; Commercial &nbsp;·&nbsp;
            </span>
          ))}
        </motion.div>
      </div>

      {/* SERVICES */}
      <section id="services" className="py-24 px-8 md:px-14 max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="text-[#E8481E] block mb-3" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '11px' }}>— What We Fix</span>
            <h2 className="leading-none text-[#0F0F0F] uppercase" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 900, fontSize: 'clamp(52px, 7vw, 96px)', letterSpacing: '-0.01em' }}>Every Job.<br />Done Right.</h2>
          </div>
          <p className="hidden md:block text-[#0F0F0F]/42 max-w-xs" style={{ fontSize: '15px', lineHeight: 1.7 }}>From a dripping tap to a full commercial fit-out — we do it all, and we do it properly.</p>
        </div>
        <div className="divide-y divide-[#0F0F0F]/10">
          {SERVICES.map((s, i) => (
            <motion.div key={s.title} variants={UP} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} transition={{ delay: i * 0.05 }} className="group flex items-start gap-6 py-6 -mx-4 px-4 hover:bg-[#E8481E]/6 transition-colors cursor-default">
              <span className="text-[#0F0F0F]/15 w-10 shrink-0 mt-1" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 900, fontSize: '20px' }}>{s.num}</span>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1.5">
                  <h3 className="uppercase text-[#0F0F0F] group-hover:text-[#E8481E] transition-colors" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 900, fontSize: '24px', letterSpacing: '0.02em' }}>{s.title}</h3>
                  {s.badge && <span className="bg-[#E8481E] text-white text-[10px] px-2 py-0.5" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{s.badge}</span>}
                </div>
                <p className="text-[#0F0F0F]/45 text-sm max-w-xl" style={{ lineHeight: 1.7 }}>{s.desc}</p>
              </div>
              <span className="text-[#E8481E] font-bold text-lg opacity-0 group-hover:opacity-100 transition-opacity mt-1">→</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <div className="bg-[#E8481E] py-16 px-8 md:px-14">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
          {STATS.map((s, i) => (
            <motion.div key={s.num} variants={UP} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <div className="text-white leading-none mb-1.5" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 900, fontSize: 'clamp(52px, 6vw, 88px)' }}>{s.num}</div>
              <div className="text-white/60 uppercase" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700, fontSize: '13px', letterSpacing: '0.12em' }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* PROCESS */}
      <section id="process" className="py-24 px-8 md:px-14 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <span className="text-[#E8481E] block mb-3" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '11px' }}>— The Process</span>
          <h2 className="leading-none uppercase text-[#0F0F0F] mb-16" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 900, fontSize: 'clamp(52px, 7vw, 96px)', letterSpacing: '-0.01em' }}>Three Steps.<br />Fixed.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: 'rgba(15,15,15,0.08)' }}>
            {STEPS.map((step, i) => (
              <motion.div key={step.n} variants={UP} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ delay: i * 0.12 }} className="group bg-white p-10 hover:bg-[#E8481E] transition-colors duration-300">
                <div className="text-[#0F0F0F]/8 group-hover:text-white/20 leading-none mb-6 select-none transition-colors" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 900, fontSize: '80px' }}>{step.n}</div>
                <h3 className="uppercase text-[#0F0F0F] group-hover:text-white transition-colors mb-3" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 900, fontSize: '24px', letterSpacing: '0.02em' }}>{step.title}</h3>
                <p className="text-[#0F0F0F]/48 group-hover:text-white/70 transition-colors text-sm" style={{ lineHeight: 1.7 }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 px-8 md:px-14 bg-[#F7F3ED]">
        <div className="max-w-[1400px] mx-auto">
          <span className="text-[#E8481E] block mb-3" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '11px' }}>— What Customers Say</span>
          <h2 className="leading-none uppercase text-[#0F0F0F] mb-14" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 900, fontSize: 'clamp(52px, 7vw, 96px)', letterSpacing: '-0.01em' }}>Don&apos;t Take<br /><span style={{ color: 'rgba(15,15,15,0.2)' }}>Our Word.</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {REVIEWS.map((r, i) => (
              <motion.div key={r.name} variants={UP} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white p-8 flex flex-col gap-5">
                <div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, j) => <span key={j} className="text-[#E8481E] text-base">★</span>)}</div>
                <p className="text-[#0F0F0F]/62 text-sm flex-1" style={{ lineHeight: 1.75 }}>{r.text}</p>
                <div className="border-t border-[#0F0F0F]/8 pt-5">
                  <div className="text-[#0F0F0F] uppercase" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, fontSize: '14px', letterSpacing: '0.06em' }}>{r.name}</div>
                  <div className="text-[#0F0F0F]/32 text-xs mt-0.5">{r.suburb}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="quote" className="bg-[#0F0F0F] py-28 px-8 md:px-14">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start justify-between gap-14">
          <div>
            <span className="text-[#E8481E] block mb-4" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '11px' }}>— 24/7 Emergency</span>
            <h2 className="leading-none uppercase text-white" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 900, fontSize: 'clamp(56px, 9vw, 130px)', letterSpacing: '-0.02em' }}>Water<br />Won&apos;t<br /><span className="text-[#E8481E]">Wait.</span></h2>
          </div>
          <div className="md:pt-16">
            <p className="text-white/35 mb-10 max-w-sm" style={{ fontSize: '15px', lineHeight: 1.75 }}>Every minute a pipe leaks, the damage multiplies. We answer every call, every hour. No voicemail. No hold music.</p>
            <div className="flex flex-col gap-4 items-start">
              <a href="tel:0800359869" className="bg-[#E8481E] text-white hover:bg-white hover:text-[#0F0F0F] transition-colors" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 900, fontSize: '22px', letterSpacing: '0.06em', textTransform: 'uppercase', padding: '18px 40px', display: 'inline-block' }}>📞 0800 359 869</a>
              <a href="#" className="text-white/30 text-sm underline hover:text-white transition-colors">Or book online instead</a>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#0F0F0F] border-t border-white/8 px-8 md:px-14 py-8">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-white uppercase" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, fontSize: '14px', letterSpacing: '0.1em' }}>Flux Plumbing <span className="text-[#E8481E]">Co.</span></div>
          <div className="text-white/18 text-xs text-center">Licensed · Insured · ABN 00 000 000 000 · 12-Month Warranty on All Work</div>
          <div className="text-white/18 text-xs">© 2025 Flux Plumbing</div>
        </div>
      </footer>
    </div>
  )
}
