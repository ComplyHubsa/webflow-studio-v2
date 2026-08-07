'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Manrope, Inter } from 'next/font/google'

const display = Manrope({ subsets: ['latin'], weight: ['500', '600', '700', '800'], variable: '--hz-display', display: 'swap' })
const body = Inter({ subsets: ['latin'], weight: ['300', '400', '500'], variable: '--hz-body', display: 'swap' })

/* Photos are theirs. Unit layouts come from their accommodation page and every
   rate from 2026rates.pdf — which is a scan, so the figures aren't selectable,
   searchable, or legible on a phone without zooming into a picture. */
const IMG = '/hazyview'
const WA = 'https://wa.me/27814779196'

type Unit = {
  name: string
  kind: 'Cottage' | 'Room' | 'Tent' | 'Dorm'
  sleeps: number
  price: number
  per: 'night' | 'person'
  detail: string
}

const UNITS: Unit[] = [
  { name: 'Cottage 3', kind: 'Cottage', sleeps: 8, price: 1600, per: 'night', detail: 'Three bedrooms and its own private pool. Two bathrooms, big lounge, open-plan kitchen.' },
  { name: 'Cottages 1 & 2', kind: 'Cottage', sleeps: 6, price: 1200, per: 'night', detail: 'Two bedrooms, two en-suite bathrooms, outdoor shower, verandah with a covered braai.' },
  { name: 'Cottage 5', kind: 'Cottage', sleeps: 6, price: 1200, per: 'night', detail: 'Two double bedrooms plus a double in the lounge. Fully equipped kitchen.' },
  { name: 'Cottage 4', kind: 'Cottage', sleeps: 5, price: 1200, per: 'night', detail: 'Two bedrooms and a single in the lounge. Two bathrooms, open-plan living.' },
  { name: 'Cottage 8', kind: 'Cottage', sleeps: 5, price: 1200, per: 'night', detail: 'Two bedrooms, one double and three twins. Shower bathroom.' },
  { name: 'Cottage 7', kind: 'Cottage', sleeps: 4, price: 850, per: 'night', detail: 'Studio with a double and two singles, fitted kitchen.' },
  { name: 'Cottages 6 & 9', kind: 'Cottage', sleeps: 3, price: 850, per: 'night', detail: 'Open-plan studios with a double and a single, kitchen and shower.' },
  { name: 'Rooms JE1–JE3', kind: 'Room', sleeps: 2, price: 850, per: 'night', detail: 'En-suite with TV, fridge and tea and coffee. JE2 has its own entrance and gate.' },
  { name: 'Tent, 3 sleeper', kind: 'Tent', sleeps: 3, price: 600, per: 'night', detail: 'Tented camp with a communal ablution block.' },
  { name: 'Tent, 2 sleeper', kind: 'Tent', sleeps: 2, price: 500, per: 'night', detail: 'Tented camp with a communal ablution block.' },
  { name: 'Dormitory 2', kind: 'Dorm', sleeps: 32, price: 400, per: 'person', detail: 'Thirty-two beds, double shower, two toilets. R260 per student.' },
  { name: 'Dormitory 1', kind: 'Dorm', sleeps: 18, price: 400, per: 'person', detail: 'Eighteen beds with shower, toilet and basin. R260 per student.' },
]

const PRESETS = [
  { label: 'Just the two of us', n: 2 },
  { label: 'Family', n: 5 },
  { label: 'Big group', n: 12 },
  { label: 'A whole school', n: 50 },
]

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  )
}

export default function HazyviewConcept() {
  const [party, setParty] = useState(5)

  /* Anything that fits the party in one unit, smallest first. Past 32 nothing
     single is big enough — the two dorms only reach fifty combined — so fall
     back to that rather than showing an empty result on the preset that proves
     their whole pitch. */
  const matches = useMemo(() => {
    const fits = UNITS.filter(u => u.sleeps >= party).sort((a, b) => a.sleeps - b.sleeps)
    if (fits.length) return fits.slice(0, 4)
    return [{
      name: 'Both dormitories',
      kind: 'Dorm' as const,
      sleeps: 50,
      price: 400,
      per: 'person' as const,
      detail: 'Eighteen beds in one and thirty-two in the other — fifty in total. R260 per student.',
    }]
  }, [party])

  const enquire = (unit?: Unit) => {
    const bits = ['Hi Hazyview Country Cottages, I would like to check availability.']
    bits.push(`${party} ${party === 1 ? 'guest' : 'guests'}`)
    if (unit) bits.push(`Interested in ${unit.name}`)
    return `${WA}?text=${encodeURIComponent(bits.join(' · '))}`
  }

  return (
    <div className={`${display.variable} ${body.variable} hz`}>
      <style>{`
        .hz {
          --navy: #1C3D5A; --paper: #F4F1EA; --card: #FFFFFF; --ink: #121A22;
          --green: #46644A; --clay: #B4653A; --muted: #6E6B63;
          --line: rgba(18,26,34,0.13);
          background: var(--paper); color: var(--ink);
          font-family: var(--hz-body); overflow-x: hidden;
        }
        .hz h1, .hz h2, .hz h3 { font-family: var(--hz-display); font-weight: 700; letter-spacing: -0.035em; }
        .hz-eyebrow { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; font-weight: 500; }
        .hz-wrap { max-width: 1180px; margin: 0 auto; padding: 0 40px; }
        .hz-sec { padding: 92px 0; }
        .hz-btn { display: inline-block; border-radius: 999px; font-size: 14.5px; font-weight: 500; padding: 15px 30px; transition: opacity .2s; text-align: center; }
        .hz-btn:hover { opacity: .85; }
        .hz-btn-primary { background: var(--navy); color: #fff; }
        .hz-btn-clay { background: var(--clay); color: #fff; }
        .hz-img { display: block; width: 100%; height: 100%; object-fit: cover; }

        /* Hero: oversized type, then the photo runs the full width of the screen */
        .hz-hero-type { font-size: clamp(3.2rem, 11vw, 9rem); line-height: 0.88; letter-spacing: -0.05em; }
        .hz-bleed { width: 100vw; margin-left: 50%; transform: translateX(-50%); }
        .hz-bleed-img { height: clamp(300px, 52vh, 560px); }

        /* Finder */
        .hz-finder { background: var(--navy); color: #EFF2F5; border-radius: 14px; padding: 34px; }
        .hz-chips { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px; }
        .hz-chip {
          border: 1px solid rgba(239,242,245,0.3); background: transparent; color: #EFF2F5;
          border-radius: 999px; padding: 9px 16px; font-size: 13.5px; cursor: pointer;
          font-family: var(--hz-body); transition: all .18s;
        }
        .hz-chip:hover { border-color: rgba(239,242,245,0.6); }
        .hz-chip[data-on="true"] { background: #EFF2F5; color: var(--navy); border-color: #EFF2F5; }
        .hz-slider { width: 100%; accent-color: var(--clay); height: 4px; }
        .hz-results { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
        .hz-result { background: rgba(255,255,255,0.07); border: 1px solid rgba(239,242,245,0.16); border-radius: 9px; padding: 17px 18px; display: flex; flex-direction: column; gap: 7px; }

        .hz-rate { display: grid; grid-template-columns: 1fr auto; gap: 20px; padding: 15px 0; border-bottom: 1px solid var(--line); align-items: baseline; }
        .hz-g3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .hz-g2 { display: grid; grid-template-columns: 1fr 1fr; gap: 46px; align-items: center; }
        .hz-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .hz-stat-n { font-family: var(--hz-display); font-weight: 800; font-size: clamp(2rem, 4.4vw, 3.4rem); line-height: 1; letter-spacing: -0.045em; color: var(--navy); }

        @media (max-width: 980px) {
          .hz-nav { display: none !important; }
          .hz-g3, .hz-g2 { grid-template-columns: 1fr; gap: 26px; }
          .hz-stats { grid-template-columns: repeat(2, 1fr); gap: 24px; }
        }
        @media (max-width: 640px) {
          .hz-wrap { padding: 0 20px; }
          .hz-sec { padding: 62px 0; }
          .hz-btn { display: block; width: 100%; }
          .hz-finder { padding: 22px 18px; border-radius: 12px; }
          .hz-results { grid-template-columns: 1fr; }
          .hz-rate { grid-template-columns: 1fr; gap: 3px; }
        }
      `}</style>

      {/* HEADER */}
      <header style={{ borderBottom: '1px solid var(--line)', background: 'var(--paper)', position: 'sticky', top: 0, zIndex: 30 }}>
        <div className="hz-wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, height: 70 }}>
          <div>
            <div style={{ fontFamily: 'var(--hz-display)', fontWeight: 800, fontSize: 18, color: 'var(--navy)', letterSpacing: '-0.03em' }}>Hazyview</div>
            <div className="hz-eyebrow" style={{ color: 'var(--muted)', fontSize: 9 }}>Country Cottages</div>
          </div>
          <nav className="hz-nav" style={{ display: 'flex', gap: 26, fontSize: 14, color: 'var(--muted)' }}>
            {[['Find a bed', 'finder'], ['Rates', 'rates'], ['Groups', 'groups'], ['Find us', 'findus']].map(([l, h]) => (
              <a key={h} href={`#${h}`}>{l}</a>
            ))}
          </nav>
          <a href={enquire()} className="hz-btn hz-btn-primary" style={{ padding: '10px 18px', fontSize: 13, width: 'auto', whiteSpace: 'nowrap' }}>Check availability</a>
        </div>
      </header>

      {/* HERO — type first, then a full-bleed photo */}
      <section style={{ paddingTop: 66 }}>
        <div className="hz-wrap">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
            className="hz-eyebrow" style={{ color: 'var(--clay)', marginBottom: 22 }}>
            Hazyview · 13 km from the Kruger gate
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="hz-hero-type" style={{ marginBottom: 26, maxWidth: '14ch' }}>
            Sleeps two.<br />Or fifty.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.22 }}
            style={{ fontSize: 18, lineHeight: 1.7, color: 'var(--muted)', maxWidth: '52ch', marginBottom: 44, fontWeight: 300 }}>
            Nine cottages, three en-suite rooms, a tented camp and two dormitories,
            in one leafy garden. Couples, families, school groups and weddings —
            all on the same property.
          </motion.p>
        </div>

        <motion.div className="hz-bleed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <div className="hz-bleed-img">
            <img src={`${IMG}/pool-hero.jpg`} alt="The pools at Hazyview Country Cottages, seen through the trees" className="hz-img" />
          </div>
        </motion.div>
      </section>

      {/* STATS */}
      <section className="hz-wrap" style={{ paddingTop: 56, paddingBottom: 10 }}>
        <Reveal>
          <div className="hz-stats" style={{ borderTop: '1px solid var(--line)', paddingTop: 26 }}>
            {[['14', 'ways to stay'], ['50', 'beds in the dorms'], ['R260', 'cheapest bed'], ['13 km', 'to Kruger']].map(([n, l]) => (
              <div key={l}>
                <div className="hz-stat-n">{n}</div>
                <div className="hz-eyebrow" style={{ color: 'var(--muted)', fontSize: 10, marginTop: 6 }}>{l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* THE FINDER — the thing their current site can't do at all */}
      <section id="finder" className="hz-sec">
        <div className="hz-wrap">
          <Reveal>
            <div style={{ marginBottom: 28, maxWidth: 640 }}>
              <p className="hz-eyebrow" style={{ color: 'var(--clay)', marginBottom: 14 }}>Find a bed</p>
              <h2 style={{ fontSize: 'clamp(1.9rem, 3.6vw, 2.9rem)', lineHeight: 1.1, marginBottom: 14 }}>
                Tell us how many, we&apos;ll tell you what fits.
              </h2>
              <p style={{ fontSize: 15.5, lineHeight: 1.75, color: 'var(--muted)', fontWeight: 300 }}>
                Slide it or pick one. Prices are per night unless it says otherwise.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="hz-finder">
              <div className="hz-chips">
                {PRESETS.map(p => (
                  <button key={p.label} className="hz-chip" data-on={party === p.n} onClick={() => setParty(p.n)}>
                    {p.label}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 10 }}>
                <span style={{ fontFamily: 'var(--hz-display)', fontWeight: 800, fontSize: 42, lineHeight: 1, letterSpacing: '-0.04em' }}>{party}</span>
                <span style={{ fontSize: 15, color: 'rgba(239,242,245,0.7)' }}>{party === 1 ? 'guest' : 'guests'}</span>
              </div>
              <input className="hz-slider" type="range" min={1} max={50} step={1} value={party}
                onChange={e => setParty(Number(e.target.value))} aria-label="Number of guests" />

              <div style={{ height: 1, background: 'rgba(239,242,245,0.2)', margin: '24px 0 20px' }} />

              <div className="hz-results">
                <AnimatePresence mode="popLayout">
                  {matches.map(u => (
                    <motion.a key={u.name} href={enquire(u)} target="_blank" rel="noopener noreferrer"
                      layout
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                      className="hz-result">
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'baseline' }}>
                        <span style={{ fontFamily: 'var(--hz-display)', fontWeight: 700, fontSize: 16 }}>{u.name}</span>
                        <span style={{ fontFamily: 'var(--hz-display)', fontWeight: 700, fontSize: 16, color: '#F2C89B', whiteSpace: 'nowrap' }}>
                          R{u.price}{u.per === 'person' ? ' pp' : ''}
                        </span>
                      </div>
                      <span className="hz-eyebrow" style={{ color: 'rgba(239,242,245,0.6)', fontSize: 9.5 }}>{u.kind} · sleeps {u.sleeps}</span>
                      <span style={{ fontSize: 13.5, lineHeight: 1.6, color: 'rgba(239,242,245,0.72)', fontWeight: 300 }}>{u.detail}</span>
                    </motion.a>
                  ))}
                </AnimatePresence>
              </div>

              {party > 8 && (
                <p style={{ fontSize: 13.5, color: 'rgba(239,242,245,0.66)', marginTop: 18, lineHeight: 1.6 }}>
                  Over eight in one unit means the dormitories — or we put you across
                  a few cottages. Message us and we&apos;ll work it out.
                </p>
              )}

              <a href={enquire()} className="hz-btn hz-btn-clay" style={{ marginTop: 22, width: '100%' }}>
                Ask about {party} {party === 1 ? 'guest' : 'guests'} on WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* RATES */}
      <section id="rates" className="hz-sec" style={{ background: 'var(--card)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="hz-wrap">
          <Reveal>
            <div style={{ marginBottom: 32, maxWidth: 620 }}>
              <p className="hz-eyebrow" style={{ color: 'var(--clay)', marginBottom: 14 }}>Rates 2026</p>
              <h2 style={{ fontSize: 'clamp(1.9rem, 3.6vw, 2.9rem)', lineHeight: 1.1, marginBottom: 14 }}>
                The whole list, on the page.
              </h2>
              <p style={{ fontSize: 15.5, lineHeight: 1.8, color: 'var(--muted)', fontWeight: 300 }}>
                Catering, weddings and conferences are quoted on request.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <div style={{ borderTop: '1px solid var(--line)' }}>
              {[
                ['Rooms', 'Sleeps 2, en-suite', 'R850'],
                ['Studios', 'Open plan, sleeps 3–4', 'R850'],
                ['Cottage, two bedrooms', 'Sleeps 5–6', 'R1 200'],
                ['Cottage, three bedrooms', 'Sleeps 8, private pool', 'R1 600'],
                ['Tents', 'Sleeps 2 / sleeps 3', 'R500 / R600'],
                ['Dormitories, students', 'Up to 50 across two dorms', 'R260 pp'],
                ['Dormitories, adults', 'Up to 50 across two dorms', 'R400 pp'],
              ].map(([n, d, p]) => (
                <div key={n} className="hz-rate">
                  <div>
                    <div style={{ fontFamily: 'var(--hz-display)', fontWeight: 700, fontSize: 16.5, marginBottom: 2 }}>{n}</div>
                    <div style={{ fontSize: 14, color: 'var(--muted)', fontWeight: 300 }}>{d}</div>
                  </div>
                  <div style={{ fontFamily: 'var(--hz-display)', fontWeight: 700, fontSize: 18, color: 'var(--navy)', whiteSpace: 'nowrap' }}>{p}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* GROUPS */}
      <section id="groups" className="hz-sec">
        <div className="hz-wrap">
          <div className="hz-g2">
            <Reveal>
              <div>
                <p className="hz-eyebrow" style={{ color: 'var(--clay)', marginBottom: 14 }}>Groups &amp; functions</p>
                <h2 style={{ fontSize: 'clamp(1.9rem, 3.6vw, 2.9rem)', lineHeight: 1.1, marginBottom: 18 }}>
                  Bring the whole school.<br />Or the whole wedding.
                </h2>
                <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--muted)', fontWeight: 300, marginBottom: 26 }}>
                  Two dormitories take fifty between them, the hall and equipment are
                  here for conferences, and weddings work indoors or out. Catering by
                  arrangement.
                </p>
                <div style={{ borderTop: '1px solid var(--line)' }}>
                  {[
                    ['Dormitories', '18 and 32 beds'],
                    ['Conferences', 'Hall and equipment'],
                    ['Weddings', 'Indoors and outdoors'],
                    ['Catering', 'By request'],
                  ].map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, padding: '13px 0', borderBottom: '1px solid var(--line)', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 15 }}>{k}</span>
                      <span style={{ fontSize: 14, color: 'var(--muted)', fontWeight: 300 }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div style={{ display: 'grid', gap: 14 }}>
                <div style={{ aspectRatio: '16/10', overflow: 'hidden', borderRadius: 4 }}>
                  <img src={`${IMG}/restaurant.jpg`} alt="The restaurant" className="hz-img" loading="lazy" />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div style={{ aspectRatio: '1/1', overflow: 'hidden', borderRadius: 4 }}>
                    <img src={`${IMG}/fire_pit.jpg`} alt="The fire pit" className="hz-img" loading="lazy" />
                  </div>
                  <div style={{ aspectRatio: '1/1', overflow: 'hidden', borderRadius: 4 }}>
                    <img src={`${IMG}/tented.jpg`} alt="The tented camp" className="hz-img" loading="lazy" />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FIND US */}
      <section id="findus" className="hz-sec" style={{ background: 'var(--card)', borderTop: '1px solid var(--line)' }}>
        <div className="hz-wrap">
          <Reveal>
            <div style={{ maxWidth: 620, marginBottom: 32 }}>
              <p className="hz-eyebrow" style={{ color: 'var(--clay)', marginBottom: 14 }}>Find us</p>
              <h2 style={{ fontSize: 'clamp(1.9rem, 3.6vw, 2.9rem)', lineHeight: 1.1, marginBottom: 14 }}>
                Between the Panorama Route and the Park.
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--muted)', fontWeight: 300 }}>
                Thirteen kilometres from the Kruger gate, with the falls and the
                canyon a short drive the other way.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="hz-g3" style={{ marginBottom: 28 }}>
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

          <Reveal delay={0.12}>
            {/* /maps/embed?pb= form — the ?q=...&output=embed variant 301s through
                a response carrying x-frame-options: SAMEORIGIN and renders blank. */}
            <div style={{ borderRadius: 6, overflow: 'hidden', border: '1px solid var(--line)', marginBottom: 28 }}>
              <iframe
                title="Hazyview Country Cottages on the map"
                src="https://www.google.com/maps/embed?origin=mfe&pb=!1m2!2m1!1sHazyview+Country+Cottages,+Hazyview,+Mpumalanga,+South+Africa"
                width="100%" height="380" style={{ border: 0, display: 'block' }}
                loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <a href={enquire()} className="hz-btn hz-btn-primary" style={{ width: 'auto' }}>Check availability</a>
          </Reveal>
        </div>
      </section>

      <footer style={{ borderTop: '1px solid var(--line)', padding: '34px 0' }}>
        <div className="hz-wrap" style={{ display: 'flex', justifyContent: 'space-between', gap: 18, flexWrap: 'wrap', alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: 'var(--hz-display)', fontWeight: 700, fontSize: 16, color: 'var(--navy)' }}>Hazyview Country Cottages</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 3 }}>Hazyview, Mpumalanga · 13 km from Kruger</div>
          </div>
          <div style={{ fontSize: 12.5, color: 'var(--muted)' }}>Cottages · Rooms · Tents · Dormitories</div>
        </div>
      </footer>
    </div>
  )
}
