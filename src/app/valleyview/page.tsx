'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bricolage_Grotesque, Inter } from 'next/font/google'

const display = Bricolage_Grotesque({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--vv-display', display: 'swap' })
const body = Inter({ subsets: ['latin'], weight: ['300', '400', '500'], variable: '--vv-body', display: 'swap' })

/* Photos are Valley View's own gallery from valley-view.co.za. Every rate below
   is taken from their own /rates/ page — currently the only place they exist,
   since their home page sends people to Hostelworld to find them. */
const IMG = '/valleyview'
const WA = 'https://wa.me/27842990423'

/* Their own site cycles greetings in a dozen languages. It's a nice touch that
   says "we get international travellers", so it's kept here. */
const GREETINGS = ['Welcome', 'Welkom', 'Bem-vindo', 'Willkommen', 'Bienvenue', 'Benvenuti', 'Bienvenido', 'Siyalemukela', 'Välkommen', 'ようこそ']

/* Priced low to high. Backpackers pick on budget rather than party size — the
   biggest unit here only sleeps four — so the finder below filters on price. */
const RATES = [
  { name: 'Dorm bed', detail: 'Six-bed mixed dorm, ensuite bathroom', price: 200, unit: 'per person' },
  { name: 'Cabin 1', detail: 'Timber cabin, bunk bed, sleeps 2', price: 400, unit: 'R300 on your own' },
  { name: 'Cabin 2', detail: 'Timber cabin, double bed, sleeps 2', price: 400, unit: 'R300 on your own' },
  { name: 'Ndebele Room', detail: 'Sleeps up to 3', price: 410, unit: 'R615 for three' },
  { name: 'African Market Room', detail: 'Sleeps up to 3', price: 410, unit: 'R615 for three' },
  { name: 'Cabin 3', detail: 'Double bed, terrace looking at the mountains', price: 420, unit: 'R300 on your own' },
  { name: 'Cabin 4', detail: 'Double bed, set in the garden', price: 420, unit: 'R300 on your own' },
  { name: 'Pilgrim Rest Room', detail: 'Double bed and a bunk, sleeps up to 4', price: 420, unit: '+R200 per extra guest' },
  { name: 'Valley View Room', detail: 'Double and bunk, private shower and toilet', price: 460, unit: '+R200 per extra guest' },
  { name: 'The Rondavel', detail: 'Self-catering — kitchenette, lounge, shower', price: 550, unit: '+R200 per extra guest' },
]

const BUDGETS = [
  { label: 'Cheapest bed', v: 200 },
  { label: 'My own cabin', v: 400 },
  { label: 'A bit more space', v: 550 },
]

const NEARBY = [
  ['Graskop Gorge Lift', 'In the village'],
  ["God's Window", 'A short drive up the escarpment'],
  ['Lisbon and Berlin Falls', 'Both on the Panorama Route'],
  ["Bourke's Luck Potholes", 'On the way to the canyon'],
  ['Blyde River Canyon', 'Three Rondavels viewpoint'],
  ["Pilgrim's Rest", 'The old gold-rush town'],
]

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  )
}

export default function ValleyViewConcept() {
  const [arrive, setArrive] = useState('')
  const [depart, setDepart] = useState('')
  const [guests, setGuests] = useState('2')
  const [greet, setGreet] = useState(0)
  /* Starts at the top of the range so the full list shows by default — sliding
     down narrows it rather than making them hunt for everything. */
  const [budget, setBudget] = useState(550)

  const affordable = useMemo(() => RATES.filter(r => r.price <= budget), [budget])

  useEffect(() => {
    const t = setInterval(() => setGreet(g => (g + 1) % GREETINGS.length), 2600)
    return () => clearInterval(t)
  }, [])

  const enquiryLink = () => {
    const bits = ['Hi Valley View, I would like to check availability.']
    if (arrive) bits.push(`Arriving ${arrive}`)
    if (depart) bits.push(`Leaving ${depart}`)
    bits.push(`${guests} ${guests === '1' ? 'guest' : 'guests'}`)
    return `${WA}?text=${encodeURIComponent(bits.join(' · '))}`
  }

  return (
    <div className={`${display.variable} ${body.variable} vv`}>
      <style>{`
        .vv {
          --paper: #F7F4EE; --card: #FFFDF8; --ink: #23201A;
          --timber: #B5762E; --forest: #2F4A38; --muted: #6E6759;
          --line: rgba(35,32,26,0.14);
          background: var(--paper); color: var(--ink);
          font-family: var(--vv-body); overflow-x: hidden;
        }
        .vv h1, .vv h2, .vv h3 { font-family: var(--vv-display); font-weight: 600; letter-spacing: -0.02em; }
        .vv-eyebrow { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; font-weight: 500; }
        .vv-wrap { max-width: 1160px; margin: 0 auto; padding: 0 40px; }
        .vv-sec { padding: 96px 0; }
        .vv-btn { display: inline-block; border-radius: 999px; font-size: 14.5px; font-weight: 500; padding: 15px 30px; transition: opacity .2s; text-align: center; }
        .vv-btn:hover { opacity: .85; }
        .vv-btn-primary { background: var(--timber); color: #FFFDF8; }
        .vv-btn-dark { background: var(--ink); color: var(--paper); }
        .vv-btn-ghost { border: 1px solid var(--line); color: var(--ink); }
        .vv-img { display: block; width: 100%; height: 100%; object-fit: cover; }
        .vv-hero { display: grid; grid-template-columns: 1fr 0.92fr; gap: 52px; align-items: center; }
        .vv-hero-photo { aspect-ratio: 4 / 5; overflow: hidden; border-radius: 4px; }
        .vv-enquiry { background: var(--card); border: 1px solid var(--line); border-radius: 10px; padding: 18px; box-shadow: 0 10px 30px rgba(35,32,26,0.06); }
        .vv-enq-row { display: grid; grid-template-columns: 1fr 1fr 84px; gap: 10px; margin-bottom: 12px; }
        .vv-enquiry label { display: flex; flex-direction: column; gap: 5px; }
        .vv-enquiry label span { color: var(--muted); font-size: 10px; }
        .vv-enquiry input, .vv-enquiry select {
          font-family: var(--vv-body); font-size: 14.5px; color: var(--ink);
          border: 1px solid var(--line); border-radius: 7px; padding: 10px 11px;
          background: #fff; width: 100%; min-width: 0; appearance: none;
        }
        .vv-enquiry input:focus, .vv-enquiry select:focus { outline: 2px solid var(--timber); outline-offset: -1px; }
        .vv-rate { display: grid; grid-template-columns: 1fr auto; gap: 20px; padding: 15px 0; border-bottom: 1px solid var(--line); align-items: baseline; }
        .vv-budget { background: var(--paper); border: 1px solid var(--line); border-radius: 12px; padding: 22px; }
        .vv-chips { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px; }
        .vv-chip {
          border: 1px solid var(--line); background: transparent; color: var(--ink);
          border-radius: 999px; padding: 9px 16px; font-size: 13.5px; cursor: pointer;
          font-family: var(--vv-body); transition: all .18s;
        }
        .vv-chip:hover { border-color: var(--timber); }
        .vv-chip[data-on="true"] { background: var(--timber); color: #FFFDF8; border-color: var(--timber); }
        .vv-slider { width: 100%; accent-color: var(--timber); height: 4px; }
        .vv-g3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
        .vv-g2 { display: grid; grid-template-columns: 1fr 1fr; gap: 44px; align-items: center; }
        .vv-near { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0 40px; }

        @media (max-width: 980px) {
          .vv-nav { display: none !important; }
          .vv-hero { grid-template-columns: 1fr; gap: 30px; }
          .vv-hero-photo { order: -1; aspect-ratio: 16/10; margin: 0 -40px; border-radius: 0; }
          .vv-g3, .vv-g2, .vv-near { grid-template-columns: 1fr; gap: 24px; }
        }
        @media (max-width: 640px) {
          .vv-wrap { padding: 0 20px; }
          .vv-sec { padding: 64px 0; }
          .vv-hero-photo { margin: 0 -20px; aspect-ratio: 3/2; }
          .vv-btn { display: block; width: 100%; }
          .vv-enq-row { grid-template-columns: 1fr 1fr; }
          .vv-enquiry label:last-child { grid-column: 1 / -1; }
          .vv-rate { grid-template-columns: 1fr; gap: 3px; }
        }
      `}</style>

      {/* HEADER */}
      <header style={{ borderBottom: '1px solid var(--line)', background: 'var(--paper)', position: 'sticky', top: 0, zIndex: 30 }}>
        <div className="vv-wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, height: 70 }}>
          <div>
            <div style={{ fontFamily: 'var(--vv-display)', fontWeight: 700, fontSize: 19, letterSpacing: '-0.02em' }}>Valley View</div>
            <div className="vv-eyebrow" style={{ color: 'var(--muted)', fontSize: 9 }}>Backpackers · Graskop</div>
          </div>
          <nav className="vv-nav" style={{ display: 'flex', gap: 26, fontSize: 14, color: 'var(--muted)' }}>
            {[['Rates', 'rates'], ['Rooms', 'rooms'], ['Around us', 'around'], ['Find us', 'findus']].map(([l, h]) => (
              <a key={h} href={`#${h}`}>{l}</a>
            ))}
          </nav>
          <a href={WA} className="vv-btn vv-btn-primary" style={{ padding: '10px 18px', fontSize: 13, width: 'auto', whiteSpace: 'nowrap' }}>Check availability</a>
        </div>
      </header>

      {/* HERO */}
      <section className="vv-wrap" style={{ paddingTop: 60, paddingBottom: 60 }}>
        <div className="vv-hero">
          <div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
              className="vv-eyebrow" style={{ color: 'var(--timber)', marginBottom: 18, height: 14 }}>
              <motion.span key={greet} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} style={{ display: 'inline-block' }}>
                {GREETINGS[greet]}
              </motion.span>
              <span style={{ color: 'var(--muted)' }}> · Graskop, Mpumalanga</span>
            </motion.p>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontSize: 'clamp(2.3rem, 5vw, 4rem)', lineHeight: 1.06, marginBottom: 20 }}>
              A bed on the Panorama Route from R200.
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
              style={{ fontSize: 17, lineHeight: 1.75, color: 'var(--muted)', maxWidth: '46ch', marginBottom: 28, fontWeight: 300 }}>
              Timber cabins, private rooms and a six-bed dorm, fifteen minutes&apos;
              walk from the middle of Graskop. Secure parking, and every rate on
              this page — no digging required.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="vv-enquiry">
              <div className="vv-enq-row">
                <label>
                  <span className="vv-eyebrow">Arrive</span>
                  <input type="date" value={arrive} onChange={e => setArrive(e.target.value)} />
                </label>
                <label>
                  <span className="vv-eyebrow">Leave</span>
                  <input type="date" value={depart} onChange={e => setDepart(e.target.value)} />
                </label>
                <label>
                  <span className="vv-eyebrow">Guests</span>
                  <select value={guests} onChange={e => setGuests(e.target.value)}>
                    {['1', '2', '3', '4', '5', '6+'].map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </label>
              </div>
              <a href={enquiryLink()} target="_blank" rel="noopener noreferrer" className="vv-btn vv-btn-primary" style={{ width: '100%' }}>
                Book direct on WhatsApp
              </a>
              <p style={{ fontSize: 12.5, color: 'var(--muted)', marginTop: 10, textAlign: 'center' }}>
                Straight to us — no booking fee, no commission.
              </p>
            </motion.div>
          </div>

          <motion.div className="vv-hero-photo" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9 }}>
            <img src={`${IMG}/p16.jpg`} alt="A timber cabin at Valley View Backpackers in the evening light" className="vv-img" />
          </motion.div>
        </div>
      </section>

      {/* RATES — the whole point: these currently live behind a Hostelworld link */}
      <section id="rates" className="vv-sec" style={{ background: 'var(--card)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="vv-wrap">
          <Reveal>
            <div style={{ marginBottom: 30, maxWidth: 640 }}>
              <p className="vv-eyebrow" style={{ color: 'var(--timber)', marginBottom: 14 }}>Rates</p>
              <h2 style={{ fontSize: 'clamp(1.7rem, 3.1vw, 2.5rem)', lineHeight: 1.15, marginBottom: 14 }}>
                What does R{budget} get you?
              </h2>
              <p style={{ fontSize: 15.5, lineHeight: 1.8, color: 'var(--muted)', fontWeight: 300 }}>
                Slide it down to your budget. Per night, and booking with us
                directly means you pay us, not a booking site.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="vv-budget">
              <div className="vv-chips">
                {BUDGETS.map(b => (
                  <button key={b.label} className="vv-chip" data-on={budget === b.v} onClick={() => setBudget(b.v)}>
                    {b.label}
                  </button>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 8 }}>
                <span style={{ fontFamily: 'var(--vv-display)', fontWeight: 700, fontSize: 40, lineHeight: 1, color: 'var(--timber)' }}>R{budget}</span>
                <span style={{ fontSize: 14.5, color: 'var(--muted)' }}>a night or under</span>
              </div>
              <input className="vv-slider" type="range" min={200} max={550} step={10} value={budget}
                onChange={e => setBudget(Number(e.target.value))} aria-label="Budget per night" />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11.5, color: 'var(--muted)', marginTop: 6 }}>
                <span>R200</span><span>R550</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div style={{ borderTop: '1px solid var(--line)', marginTop: 28 }}>
              <AnimatePresence initial={false}>
                {affordable.map(r => (
                  <motion.div key={r.name} layout
                    initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.22 }} style={{ overflow: 'hidden' }}>
                    <div className="vv-rate">
                      <div>
                        <div style={{ fontFamily: 'var(--vv-display)', fontWeight: 600, fontSize: 16.5, marginBottom: 2 }}>{r.name}</div>
                        <div style={{ fontSize: 14, color: 'var(--muted)', fontWeight: 300 }}>{r.detail}</div>
                      </div>
                      <div style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                        <div style={{ fontFamily: 'var(--vv-display)', fontWeight: 600, fontSize: 19, color: 'var(--timber)' }}>R{r.price}</div>
                        <div style={{ fontSize: 12, color: 'var(--muted)' }}>{r.unit}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <p style={{ fontSize: 13.5, color: 'var(--muted)', marginTop: 14 }}>
              {affordable.length} of {RATES.length} options under R{budget}.
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <div style={{ marginTop: 32 }}>
              <a href={WA} className="vv-btn vv-btn-primary" style={{ width: 'auto' }}>Check availability</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ROOMS */}
      <section id="rooms" className="vv-sec">
        <div className="vv-wrap">
          <Reveal>
            <div style={{ marginBottom: 34, maxWidth: 600 }}>
              <p className="vv-eyebrow" style={{ color: 'var(--timber)', marginBottom: 14 }}>The place</p>
              <h2 style={{ fontSize: 'clamp(1.7rem, 3.1vw, 2.5rem)', lineHeight: 1.15 }}>
                Built by hand, not by a chain.
              </h2>
            </div>
          </Reveal>
          <div className="vv-g3">
            {[
              [`${IMG}/p13.jpg`, 'Cabin 1', 'Bunk bed, timber walls, door open to the grass.'],
              [`${IMG}/p16.jpg`, 'Cabin 2', 'Double bed and evening light through the window.'],
              [`${IMG}/p09.jpg`, 'Inside', 'Themed rooms — Ndebele, African Market, Pilgrim Rest.'],
            ].map(([src, name, cap], i) => (
              <Reveal key={name} delay={i * 0.08}>
                <div>
                  <div style={{ aspectRatio: '3 / 4', overflow: 'hidden', borderRadius: 4, marginBottom: 14 }}>
                    <img src={src} alt={name} className="vv-img" loading="lazy" />
                  </div>
                  <h3 style={{ fontSize: 17, marginBottom: 5 }}>{name}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--muted)', fontWeight: 300 }}>{cap}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* AROUND US */}
      <section id="around" className="vv-sec" style={{ background: 'var(--forest)', color: '#F1EDE3' }}>
        <div className="vv-wrap">
          <div className="vv-g2">
            <Reveal>
              <div>
                <p className="vv-eyebrow" style={{ color: '#D8A863', marginBottom: 14 }}>Around us</p>
                <h2 style={{ fontSize: 'clamp(1.7rem, 3.1vw, 2.5rem)', lineHeight: 1.15, marginBottom: 18, color: '#FFFDF8' }}>
                  You came for the canyon. Sleep next to it.
                </h2>
                <p style={{ fontSize: 15.5, lineHeight: 1.8, color: 'rgba(241,237,227,0.72)', fontWeight: 300, marginBottom: 26 }}>
                  Graskop sits in the middle of the Panorama Route. Most of it is
                  a morning&apos;s drive or less, and we&apos;ll tell you which
                  order to do it in.
                </p>
                <div className="vv-near">
                  {NEARBY.map(([k, v]) => (
                    <div key={k} style={{ padding: '11px 0', borderBottom: '1px solid rgba(241,237,227,0.2)' }}>
                      <div style={{ fontSize: 15, color: '#FFFDF8' }}>{k}</div>
                      <div style={{ fontSize: 13, color: 'rgba(241,237,227,0.62)', fontWeight: 300 }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div style={{ aspectRatio: '4 / 5', overflow: 'hidden', borderRadius: 4 }}>
                <img src={`${IMG}/p11.jpg`} alt="Valley View Backpackers" className="vv-img" loading="lazy" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FIND US */}
      <section id="findus" className="vv-sec">
        <div className="vv-wrap">
          <Reveal>
            <div style={{ maxWidth: 620, marginBottom: 34 }}>
              <p className="vv-eyebrow" style={{ color: 'var(--timber)', marginBottom: 14 }}>Find us</p>
              <h2 style={{ fontSize: 'clamp(1.7rem, 3.1vw, 2.5rem)', lineHeight: 1.15, marginBottom: 14 }}>
                47 De Lange Street, Graskop.
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--muted)', fontWeight: 300 }}>
                On the western side of the village, looking over the valley.
                Fifteen minutes&apos; walk into town, and secure parking if
                you&apos;ve driven.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="vv-g3" style={{ marginBottom: 32 }}>
              {[
                ['WhatsApp', '084 299 0423', WA],
                ['Email', 'valleyviewbackpackers@gmail.com', 'mailto:valleyviewbackpackers@gmail.com'],
                ['Address', '47 De Lange Street, Graskop', null],
              ].map(([k, v, href]) => (
                <div key={k as string} style={{ borderTop: '2px solid var(--timber)', paddingTop: 15 }}>
                  <div className="vv-eyebrow" style={{ color: 'var(--muted)', fontSize: 10, marginBottom: 7 }}>{k}</div>
                  {href ? <a href={href as string} style={{ fontSize: 16, color: 'var(--ink)' }}>{v}</a> : <div style={{ fontSize: 16 }}>{v}</div>}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            {/* Their own embed URL, lifted from valley-view.co.za/contact. The
                simpler ?q=...&output=embed form 301s to a response carrying
                x-frame-options: SAMEORIGIN and renders blank; this /maps/embed?pb=
                form returns 200 with no framing restriction. */}
            <div style={{ borderRadius: 6, overflow: 'hidden', border: '1px solid var(--line)', marginBottom: 32 }}>
              <iframe
                title="Valley View Backpackers on the map"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14471.83184399443!2d30.834439!3d-24.933502!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xfc69ce63780ca197!2sValley%20View%20Backpackers%20Graskop!5e0!3m2!1sen!2sza!4v1630939541335!5m2!1sen!2sza"
                width="100%"
                height="380"
                style={{ border: 0, display: 'block' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <a href={WA} className="vv-btn vv-btn-dark" style={{ width: 'auto' }}>Book direct on WhatsApp</a>
          </Reveal>
        </div>
      </section>

      <footer style={{ borderTop: '1px solid var(--line)', padding: '34px 0' }}>
        <div className="vv-wrap" style={{ display: 'flex', justifyContent: 'space-between', gap: 18, flexWrap: 'wrap', alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: 'var(--vv-display)', fontWeight: 600, fontSize: 16 }}>Valley View Backpackers</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 3 }}>Graskop, Mpumalanga · On the Panorama Route</div>
          </div>
          <div style={{ fontSize: 12.5, color: 'var(--muted)' }}>Dorm · Cabins · Private rooms</div>
        </div>
      </footer>
    </div>
  )
}
