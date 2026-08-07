'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Manrope, Inter } from 'next/font/google'

const display = Manrope({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--hz-display', display: 'swap' })
const body = Inter({ subsets: ['latin'], weight: ['300', '400', '500'], variable: '--hz-body', display: 'swap' })

/* Photos are theirs from hazyviewcountrycottages.co.za. Every rate below comes
   from their own 2026rates.pdf — which is a scanned image, so the figures are
   not selectable, searchable or readable on a phone without pinch-zooming. */
const IMG = '/hazyview'
const WA = 'https://wa.me/27814779196'

const RATES = [
  { name: 'Rooms', detail: 'Sleeps 2, en-suite', price: 'R850' },
  { name: 'Studios', detail: 'Open plan, sleeps 3–4', price: 'R850' },
  { name: 'Cottage, two bedrooms', detail: 'Sleeps 5–6', price: 'R1 200' },
  { name: 'Cottage, three bedrooms', detail: 'Sleeps 8 — three doubles, two twins, shower and bath', price: 'R1 600' },
  { name: 'Tents', detail: 'Sleeps 2', price: 'R500' },
  { name: 'Tents', detail: 'Sleeps 3', price: 'R600' },
  { name: 'Dormitories — students', detail: 'Up to 50 across two dorms', price: 'R260 pp' },
  { name: 'Dormitories — adults', detail: 'Up to 50 across two dorms', price: 'R400 pp' },
]

const STAY = [
  {
    name: 'Cottages',
    photo: `${IMG}/cottage2_lounge.jpg`,
    tag: 'Sleeps 3 to 8',
    detail: 'Nine self-catering cottages, from an open-plan studio for three to a three-bedroom with its own private pool. Fitted kitchens, verandahs and covered braai areas.',
  },
  {
    name: 'En-suite rooms',
    photo: `${IMG}/indexpic_bedroom.jpg`,
    tag: 'Sleeps 2',
    detail: 'Three rooms with double or twin beds, TV, fridge and tea and coffee. One has its own entrance and security gate.',
  },
  {
    name: 'Tented camp',
    photo: `${IMG}/tented.jpg`,
    tag: 'Sleeps 2 or 3',
    detail: 'Basic and cheap, with a communal ablution block. The easiest way to put a big group under canvas near Kruger.',
  },
]

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  )
}

export default function HazyviewConcept() {
  const [arrive, setArrive] = useState('')
  const [depart, setDepart] = useState('')
  const [guests, setGuests] = useState('2')

  const enquiryLink = () => {
    const bits = ['Hi Hazyview Country Cottages, I would like to check availability.']
    if (arrive) bits.push(`Arriving ${arrive}`)
    if (depart) bits.push(`Leaving ${depart}`)
    bits.push(`${guests} ${guests === '1' ? 'guest' : 'guests'}`)
    return `${WA}?text=${encodeURIComponent(bits.join(' · '))}`
  }

  return (
    <div className={`${display.variable} ${body.variable} hz`}>
      <style>{`
        .hz {
          --navy: #1C3D5A; --navy-dk: #12293E; --paper: #F7F5F0; --card: #FFFFFF;
          --ink: #16202B; --green: #46644A; --muted: #6E6B63;
          --line: rgba(22,32,43,0.14);
          background: var(--paper); color: var(--ink);
          font-family: var(--hz-body); overflow-x: hidden;
        }
        .hz h1, .hz h2, .hz h3 { font-family: var(--hz-display); font-weight: 600; letter-spacing: -0.025em; }
        .hz-eyebrow { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; font-weight: 500; }
        .hz-wrap { max-width: 1160px; margin: 0 auto; padding: 0 40px; }
        .hz-sec { padding: 96px 0; }
        .hz-btn { display: inline-block; border-radius: 999px; font-size: 14.5px; font-weight: 500; padding: 15px 30px; transition: opacity .2s; text-align: center; }
        .hz-btn:hover { opacity: .85; }
        .hz-btn-primary { background: var(--navy); color: #fff; }
        .hz-btn-ghost { border: 1px solid var(--line); color: var(--ink); }
        .hz-img { display: block; width: 100%; height: 100%; object-fit: cover; }
        .hz-hero { display: grid; grid-template-columns: 1fr 1.1fr; gap: 50px; align-items: center; }
        .hz-hero-photo { aspect-ratio: 4 / 3; overflow: hidden; border-radius: 4px; }
        .hz-enquiry { background: var(--card); border: 1px solid var(--line); border-radius: 10px; padding: 18px; box-shadow: 0 10px 30px rgba(22,32,43,0.07); }
        .hz-enq-row { display: grid; grid-template-columns: 1fr 1fr 84px; gap: 10px; margin-bottom: 12px; }
        .hz-enquiry label { display: flex; flex-direction: column; gap: 5px; }
        .hz-enquiry label span { color: var(--muted); font-size: 10px; }
        .hz-enquiry input, .hz-enquiry select {
          font-family: var(--hz-body); font-size: 14.5px; color: var(--ink);
          border: 1px solid var(--line); border-radius: 7px; padding: 10px 11px;
          background: #fff; width: 100%; min-width: 0; appearance: none;
        }
        .hz-enquiry input:focus, .hz-enquiry select:focus { outline: 2px solid var(--navy); outline-offset: -1px; }
        .hz-rate { display: grid; grid-template-columns: 1fr auto; gap: 20px; padding: 15px 0; border-bottom: 1px solid var(--line); align-items: baseline; }
        .hz-g3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .hz-g2 { display: grid; grid-template-columns: 1fr 1fr; gap: 46px; align-items: center; }
        .hz-facts { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }

        @media (max-width: 980px) {
          .hz-nav { display: none !important; }
          .hz-hero { grid-template-columns: 1fr; gap: 28px; }
          .hz-hero-photo { order: -1; aspect-ratio: 16/10; margin: 0 -40px; border-radius: 0; }
          .hz-g3, .hz-g2 { grid-template-columns: 1fr; gap: 26px; }
        }
        @media (max-width: 640px) {
          .hz-wrap { padding: 0 20px; }
          .hz-sec { padding: 64px 0; }
          .hz-hero-photo { margin: 0 -20px; aspect-ratio: 3/2; }
          .hz-btn { display: block; width: 100%; }
          .hz-enq-row { grid-template-columns: 1fr 1fr; }
          .hz-enquiry label:last-child { grid-column: 1 / -1; }
          .hz-rate { grid-template-columns: 1fr; gap: 3px; }
          .hz-facts { grid-template-columns: 1fr; gap: 16px; }
        }
      `}</style>

      {/* HEADER */}
      <header style={{ borderBottom: '1px solid var(--line)', background: 'var(--paper)', position: 'sticky', top: 0, zIndex: 30 }}>
        <div className="hz-wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, height: 72 }}>
          <div>
            <div style={{ fontFamily: 'var(--hz-display)', fontWeight: 700, fontSize: 18, color: 'var(--navy)', letterSpacing: '-0.02em' }}>Hazyview</div>
            <div className="hz-eyebrow" style={{ color: 'var(--muted)', fontSize: 9 }}>Country Cottages</div>
          </div>
          <nav className="hz-nav" style={{ display: 'flex', gap: 26, fontSize: 14, color: 'var(--muted)' }}>
            {[['Rates', 'rates'], ['Stay', 'stay'], ['Groups', 'groups'], ['Find us', 'findus']].map(([l, h]) => (
              <a key={h} href={`#${h}`}>{l}</a>
            ))}
          </nav>
          <a href={WA} className="hz-btn hz-btn-primary" style={{ padding: '10px 18px', fontSize: 13, width: 'auto', whiteSpace: 'nowrap' }}>Check availability</a>
        </div>
      </header>

      {/* HERO */}
      <section className="hz-wrap" style={{ paddingTop: 58, paddingBottom: 58 }}>
        <div className="hz-hero">
          <div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
              className="hz-eyebrow" style={{ color: 'var(--green)', marginBottom: 18 }}>
              Hazyview · 13 km from Kruger
            </motion.p>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontSize: 'clamp(2.3rem, 5vw, 4rem)', lineHeight: 1.06, marginBottom: 20 }}>
              Sleeps two. Or fifty.
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
              style={{ fontSize: 17, lineHeight: 1.75, color: 'var(--muted)', maxWidth: '46ch', marginBottom: 28, fontWeight: 300 }}>
              Nine self-catering cottages, three en-suite rooms, a tented camp and
              two dormitories, in a leafy garden thirteen kilometres from the
              Kruger gate. Couples, families, school groups and weddings — all of
              it on one property.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="hz-enquiry">
              <div className="hz-enq-row">
                <label>
                  <span className="hz-eyebrow">Arrive</span>
                  <input type="date" value={arrive} onChange={e => setArrive(e.target.value)} />
                </label>
                <label>
                  <span className="hz-eyebrow">Leave</span>
                  <input type="date" value={depart} onChange={e => setDepart(e.target.value)} />
                </label>
                <label>
                  <span className="hz-eyebrow">Guests</span>
                  <select value={guests} onChange={e => setGuests(e.target.value)}>
                    {['1', '2', '3', '4', '5', '6', '8', '10', '20', '50'].map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </label>
              </div>
              <a href={enquiryLink()} target="_blank" rel="noopener noreferrer" className="hz-btn hz-btn-primary" style={{ width: '100%' }}>
                Check availability on WhatsApp
              </a>
              <p style={{ fontSize: 12.5, color: 'var(--muted)', marginTop: 10, textAlign: 'center' }}>
                Straight to us — we usually answer the same day.
              </p>
            </motion.div>
          </div>

          <motion.div className="hz-hero-photo" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9 }}>
            <img src={`${IMG}/pool-hero.jpg`} alt="The pools at Hazyview Country Cottages, seen through the trees" className="hz-img" />
          </motion.div>
        </div>
      </section>

      {/* RATES — currently locked inside a scanned PDF */}
      <section id="rates" className="hz-sec" style={{ background: 'var(--card)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="hz-wrap">
          <Reveal>
            <div style={{ marginBottom: 34, maxWidth: 620 }}>
              <p className="hz-eyebrow" style={{ color: 'var(--green)', marginBottom: 14 }}>Rates 2026</p>
              <h2 style={{ fontSize: 'clamp(1.7rem, 3.1vw, 2.5rem)', lineHeight: 1.15, marginBottom: 14 }}>
                Every price, on the page.
              </h2>
              <p style={{ fontSize: 15.5, lineHeight: 1.8, color: 'var(--muted)', fontWeight: 300 }}>
                Per night. Catering, wedding and conference packages are quoted
                separately — ask and we&apos;ll come back to you.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div style={{ borderTop: '1px solid var(--line)' }}>
              {RATES.map((r, i) => (
                <div key={r.name + i} className="hz-rate">
                  <div>
                    <div style={{ fontFamily: 'var(--hz-display)', fontWeight: 600, fontSize: 16.5, marginBottom: 2 }}>{r.name}</div>
                    <div style={{ fontSize: 14, color: 'var(--muted)', fontWeight: 300 }}>{r.detail}</div>
                  </div>
                  <div style={{ fontFamily: 'var(--hz-display)', fontWeight: 600, fontSize: 19, color: 'var(--navy)', whiteSpace: 'nowrap' }}>{r.price}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <div style={{ marginTop: 32 }}>
              <a href={WA} className="hz-btn hz-btn-primary" style={{ width: 'auto' }}>Check availability</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* STAY */}
      <section id="stay" className="hz-sec">
        <div className="hz-wrap">
          <Reveal>
            <div style={{ marginBottom: 36, maxWidth: 600 }}>
              <p className="hz-eyebrow" style={{ color: 'var(--green)', marginBottom: 14 }}>Where you&apos;ll stay</p>
              <h2 style={{ fontSize: 'clamp(1.7rem, 3.1vw, 2.5rem)', lineHeight: 1.15 }}>
                Fourteen ways to spend the night.
              </h2>
            </div>
          </Reveal>
          <div className="hz-g3">
            {STAY.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.08}>
                <div>
                  <div style={{ aspectRatio: '4 / 3', overflow: 'hidden', borderRadius: 4, marginBottom: 15 }}>
                    <img src={s.photo} alt={s.name} className="hz-img" loading="lazy" />
                  </div>
                  <h3 style={{ fontSize: 18, marginBottom: 5 }}>{s.name}</h3>
                  <span className="hz-eyebrow" style={{ color: 'var(--green)', fontSize: 9.5 }}>{s.tag}</span>
                  <p style={{ fontSize: 14.5, lineHeight: 1.7, color: 'var(--muted)', fontWeight: 300, marginTop: 8 }}>{s.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GROUPS */}
      <section id="groups" className="hz-sec" style={{ background: 'var(--navy)', color: '#EFF2F5' }}>
        <div className="hz-wrap">
          <div className="hz-g2">
            <Reveal>
              <div>
                <p className="hz-eyebrow" style={{ color: '#9DBBD4', marginBottom: 14 }}>Groups &amp; functions</p>
                <h2 style={{ fontSize: 'clamp(1.7rem, 3.1vw, 2.5rem)', lineHeight: 1.15, marginBottom: 18, color: '#fff' }}>
                  Bring the whole school. Or the whole wedding.
                </h2>
                <p style={{ fontSize: 15.5, lineHeight: 1.8, color: 'rgba(239,242,245,0.74)', fontWeight: 300, marginBottom: 26 }}>
                  Two dormitories take fifty between them, the hall and equipment
                  are here for conferences, and weddings work indoors or out.
                  Catering by arrangement.
                </p>
                <div style={{ borderTop: '1px solid rgba(239,242,245,0.22)' }}>
                  {[
                    ['Dormitories', 'Two dorms, 18 and 32 beds'],
                    ['Conferences', 'Hall and equipment available'],
                    ['Weddings', 'Indoors and outdoors'],
                    ['Catering', 'By request'],
                  ].map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, padding: '13px 0', borderBottom: '1px solid rgba(239,242,245,0.22)', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 15, color: '#fff' }}>{k}</span>
                      <span style={{ fontSize: 14, color: 'rgba(239,242,245,0.68)', fontWeight: 300 }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div style={{ display: 'grid', gap: 16 }}>
                <div style={{ aspectRatio: '16/10', overflow: 'hidden', borderRadius: 4 }}>
                  <img src={`${IMG}/restaurant.jpg`} alt="The restaurant at Hazyview Country Cottages" className="hz-img" loading="lazy" />
                </div>
                <div style={{ aspectRatio: '16/10', overflow: 'hidden', borderRadius: 4 }}>
                  <img src={`${IMG}/fire_pit.jpg`} alt="The fire pit" className="hz-img" loading="lazy" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FIND US */}
      <section id="findus" className="hz-sec">
        <div className="hz-wrap">
          <Reveal>
            <div style={{ maxWidth: 620, marginBottom: 34 }}>
              <p className="hz-eyebrow" style={{ color: 'var(--green)', marginBottom: 14 }}>Find us</p>
              <h2 style={{ fontSize: 'clamp(1.7rem, 3.1vw, 2.5rem)', lineHeight: 1.15, marginBottom: 14 }}>
                Thirteen kilometres from the Kruger gate.
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--muted)', fontWeight: 300 }}>
                Hazyview sits between the Panorama Route and the Park, so the
                falls, the canyon and the gate are all a short drive. Message us
                and we&apos;ll come straight back.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="hz-facts" style={{ marginBottom: 30 }}>
              {[
                ['WhatsApp', '081 477 9196', WA],
                ['Also on', '079 980 8542', 'tel:0799808542'],
                ['Email', 'info@hazyviewcountrycottages.co.za', 'mailto:info@hazyviewcountrycottages.co.za'],
              ].map(([k, v, href]) => (
                <div key={k as string} style={{ borderTop: '2px solid var(--navy)', paddingTop: 15 }}>
                  <div className="hz-eyebrow" style={{ color: 'var(--muted)', fontSize: 10, marginBottom: 7 }}>{k}</div>
                  <a href={href as string} style={{ fontSize: 15.5, color: 'var(--ink)', wordBreak: 'break-word' }}>{v}</a>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            {/* /maps/embed?pb= form — the ?q=...&output=embed variant 301s through
                a response carrying x-frame-options: SAMEORIGIN and renders blank. */}
            <div style={{ borderRadius: 6, overflow: 'hidden', border: '1px solid var(--line)', marginBottom: 30 }}>
              <iframe
                title="Hazyview Country Cottages on the map"
                src="https://www.google.com/maps/embed?origin=mfe&pb=!1m2!2m1!1sHazyview+Country+Cottages,+Hazyview,+Mpumalanga,+South+Africa"
                width="100%"
                height="380"
                style={{ border: 0, display: 'block' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <a href={WA} className="hz-btn hz-btn-primary" style={{ width: 'auto' }}>Check availability</a>
          </Reveal>
        </div>
      </section>

      <footer style={{ borderTop: '1px solid var(--line)', padding: '34px 0' }}>
        <div className="hz-wrap" style={{ display: 'flex', justifyContent: 'space-between', gap: 18, flexWrap: 'wrap', alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: 'var(--hz-display)', fontWeight: 600, fontSize: 16, color: 'var(--navy)' }}>Hazyview Country Cottages</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 3 }}>Hazyview, Mpumalanga · 13 km from Kruger</div>
          </div>
          <div style={{ fontSize: 12.5, color: 'var(--muted)' }}>Cottages · Rooms · Tents · Dormitories</div>
        </div>
      </footer>
    </div>
  )
}
