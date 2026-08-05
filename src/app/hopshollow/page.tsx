'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Fraunces, Inter } from 'next/font/google'

const display = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--hh-display',
  display: 'swap',
})
const body = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--hh-body',
  display: 'swap',
})

/* Every fact below is from hopshollow.co.za or their OTA listings — rates,
   room layout, beer names and styles, distances, and the 2001 first brew. */
const ROOMS = [
  {
    n: '01',
    name: 'Upstairs Doubles',
    detail: 'Two double rooms off the guest lounge, each en suite with bath and shower, and a coffee station.',
    sharing: 620,
    single: 720,
    tag: 'Sleeps 2',
  },
  {
    n: '02',
    name: 'The Veranda Suite',
    detail: 'Ground floor with its own veranda, and the one room on the property set up for wheelchair access.',
    sharing: 620,
    single: 720,
    tag: 'Step-free',
  },
  {
    n: '03',
    name: 'Honeymoon Suite',
    detail: 'Our quietest room, kept for honeymooners and anyone driving up here to disappear for a weekend.',
    sharing: 620,
    single: 720,
    tag: 'Sleeps 2',
  },
  {
    n: '04',
    name: 'Garden Rooms',
    detail: 'Three newer en-suite rooms that take couples or families, closest to the playground and the braai area.',
    sharing: 580,
    single: 680,
    tag: 'Families',
  },
]

const BEERS = [
  { name: "Digger's Draught", style: 'Kölsch-style ale', note: 'Pale malt and German wheat. Light, crisp, the one most people start on.' },
  { name: "Blacksmith's Brew", style: 'Belgian white', note: 'Brewed with ginger and coriander. Cloudy, spiced, good in the afternoon sun.' },
  { name: "Mac's Porter", style: 'Dark porter', note: 'Chocolate and mocha coffee running underneath. Made for the fireplace.' },
  { name: 'Old Bull Bitter', style: 'British bitter', note: 'Styrian Goldings hops, poured the traditional way. Bitter, in the proper sense.' },
  { name: "Tapper's Brew", style: 'Bohemian pilsner', note: 'Saaz hops and a long cold conditioning. Clean the whole way through.' },
]

const FACTS = [
  { k: 'Summit', v: 'Long Tom Pass' },
  { k: 'Brewing since', v: '2001' },
  { k: 'Beers on tap', v: 'Five' },
  { k: 'Rooms', v: 'Seven' },
]

const WA = 'https://wa.me/27714561161'

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

/* Layered escarpment. Back ridges are paler and bluer so the range recedes
   the way it actually does from the top of the pass at first light. */
function Ridges() {
  return (
    <svg
      viewBox="0 0 1440 620"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    >
      <defs>
        <linearGradient id="hh-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16242D" />
          <stop offset="38%" stopColor="#3D5153" />
          <stop offset="68%" stopColor="#9A7B4C" />
          <stop offset="100%" stopColor="#DBA050" />
        </linearGradient>
        <linearGradient id="hh-r1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6E7F80" />
          <stop offset="100%" stopColor="#55676A" />
        </linearGradient>
        <linearGradient id="hh-r2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#44575459" />
          <stop offset="100%" stopColor="#33463F" />
        </linearGradient>
        <linearGradient id="hh-r3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#23322C" />
          <stop offset="100%" stopColor="#161F1B" />
        </linearGradient>
        <radialGradient id="hh-sun" cx="0.74" cy="0.86" r="0.42">
          <stop offset="0%" stopColor="#FFDCA0" stopOpacity="0.95" />
          <stop offset="45%" stopColor="#F2B968" stopOpacity="0.42" />
          <stop offset="100%" stopColor="#F0C071" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1440" height="620" fill="url(#hh-sky)" />
      <ellipse cx="1066" cy="533" rx="520" ry="300" fill="url(#hh-sun)" />

      <path d="M0 452 L150 402 L286 436 L430 372 L566 424 L712 356 L858 412 L1006 366 L1150 420 L1292 380 L1440 428 L1440 620 L0 620 Z" fill="url(#hh-r1)" opacity="0.55" />
      <path d="M0 500 L128 462 L268 496 L410 440 L552 486 L700 432 L846 482 L992 438 L1140 490 L1288 448 L1440 492 L1440 620 L0 620 Z" fill="url(#hh-r2)" opacity="0.85" />
      <path d="M0 548 L146 516 L300 552 L452 508 L604 550 L760 504 L916 548 L1070 506 L1226 550 L1360 518 L1440 544 L1440 620 L0 620 Z" fill="url(#hh-r3)" />

      <g opacity="0.5">
        <rect x="0" y="470" width="1440" height="26" fill="#C9D3CE" opacity="0.14" />
        <rect x="0" y="512" width="1440" height="18" fill="#C9D3CE" opacity="0.1" />
      </g>
    </svg>
  )
}

export default function HopsHollowConcept() {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const ridgeY = useTransform(scrollYProgress, [0, 1], [0, 90])
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 60])

  return (
    <div
      className={`${display.variable} ${body.variable}`}
      style={{
        background: '#0D1210',
        color: '#F4EFE4',
        fontFamily: 'var(--hh-body)',
        overflowX: 'hidden',
      }}
    >
      <style>{`
        .hh-h { font-family: var(--hh-display); font-weight: 400; letter-spacing: -0.015em; }
        .hh-eyebrow { font-size: 11px; letter-spacing: 0.26em; text-transform: uppercase; }
        .hh-link:hover { opacity: 0.72; }
        .hh-rule { height: 1px; background: rgba(244,239,228,0.13); }
        .hh-room {
          display: grid;
          grid-template-columns: minmax(0,44px) minmax(0,1.35fr) minmax(0,1.6fr) minmax(0,auto);
          gap: 26px; align-items: start; padding: 30px 0;
          border-bottom: 1px solid rgba(244,239,228,0.1);
        }
        /* Four columns get cramped well before phone width, so collapse to
           name + price on one row with the description beneath. */
        @media (max-width: 900px) {
          .hh-room { grid-template-columns: minmax(0,1fr) auto; gap: 12px 18px; }
          .hh-room-num { display: none; }
          .hh-room-detail { grid-column: 1 / -1; }
        }
        .hh-brand { white-space: nowrap; }
        @media (max-width: 720px) {
          .hh-nav-links { display: none !important; }
          .hh-pad { padding-left: 22px !important; padding-right: 22px !important; }
          /* At 375px the brand, the est. tag and the button can't share a row,
             and the hero copy rides up under the absolutely-positioned header. */
          .hh-est { display: none; }
          .hh-header { padding-top: 16px !important; padding-bottom: 16px !important; }
          .hh-header-cta { font-size: 12px !important; padding: 9px 16px !important; }
          .hh-hero-inner { padding-top: 108px !important; }
        }
      `}</style>

      {/* ── NAV ── */}
      <header
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, zIndex: 20,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '26px 44px',
        }}
        className="hh-pad hh-header"
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <span className="hh-h hh-brand" style={{ fontSize: 21, letterSpacing: '0.01em' }}>Hops Hollow</span>
          <span className="hh-eyebrow hh-est" style={{ color: '#D9A85E', fontSize: 9 }}>Est. 2001</span>
        </div>
        <nav className="hh-nav-links" style={{ display: 'flex', gap: 34, fontSize: 13, color: 'rgba(244,239,228,0.72)' }}>
          {['Rooms', 'Brewery', 'Weddings', 'Find us'].map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(' ', '')}`} className="hh-link" style={{ transition: 'opacity .2s' }}>{l}</a>
          ))}
        </nav>
        <a
          href={WA}
          className="hh-link hh-header-cta"
          style={{
            background: '#C8862B', color: '#12100C', fontSize: 13, fontWeight: 500,
            padding: '11px 20px', borderRadius: 999, transition: 'opacity .2s', whiteSpace: 'nowrap',
          }}
        >
          Check availability
        </a>
      </header>

      {/* ── HERO ── */}
      <section ref={heroRef} style={{ position: 'relative', minHeight: '100svh', display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
        <motion.div style={{ position: 'absolute', inset: 0, y: ridgeY }}>
          <Ridges />
        </motion.div>
        {/* Scrim runs left-to-right rather than top-to-bottom: the copy sits on
            the left, so the dawn light on the right stays visible instead of
            being flattened by a full-width wash. */}
        <div
          style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to right, rgba(13,18,16,0.92) 0%, rgba(13,18,16,0.72) 38%, rgba(13,18,16,0.28) 72%, rgba(13,18,16,0.06) 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(13,18,16,0.5) 0%, rgba(13,18,16,0) 26%, rgba(13,18,16,0) 88%, #0D1210 100%)',
          }}
        />

        <motion.div style={{ position: 'relative', zIndex: 10, width: '100%', padding: '0 44px 68px', y: copyY }} className="hh-pad hh-hero-inner">
          <div style={{ maxWidth: 1240, margin: '0 auto' }}>
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="hh-eyebrow"
              style={{ color: '#E5BE7C', marginBottom: 22 }}
            >
              Long Tom Pass · Mpumalanga
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.95, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="hh-h"
              style={{ fontSize: 'clamp(2.7rem, 7.4vw, 6.1rem)', lineHeight: 1.02, maxWidth: 15 + 'ch', marginBottom: 26 }}
            >
              A country house at the top of the pass.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.46 }}
              style={{ fontSize: 17, lineHeight: 1.75, color: 'rgba(244,239,228,0.74)', maxWidth: '52ch', marginBottom: 40, fontWeight: 300 }}
            >
              Seven rooms, a restaurant, and a brewery that has been running on
              this mountain since 2001. Twenty-two kilometres from Lydenburg,
              thirty-four from Sabie, and a long way from everything else.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 58 }}
            >
              <a href={WA} className="hh-link" style={{ background: '#C8862B', color: '#12100C', fontSize: 14, fontWeight: 500, padding: '15px 30px', borderRadius: 999, transition: 'opacity .2s' }}>
                Check availability
              </a>
              <a href="#rooms" className="hh-link" style={{ border: '1px solid rgba(244,239,228,0.3)', color: '#F4EFE4', fontSize: 14, padding: '15px 30px', borderRadius: 999, transition: 'opacity .2s' }}>
                See the rooms
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.78 }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(118px, 1fr))', gap: 20, maxWidth: 660, borderTop: '1px solid rgba(244,239,228,0.15)', paddingTop: 24 }}
            >
              {FACTS.map(f => (
                <div key={f.k}>
                  <div className="hh-h" style={{ fontSize: 21, marginBottom: 4 }}>{f.v}</div>
                  <div className="hh-eyebrow" style={{ color: 'rgba(244,239,228,0.45)', fontSize: 10 }}>{f.k}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── INTRO ── */}
      <section style={{ padding: '116px 44px', maxWidth: 1240, margin: '0 auto' }} className="hh-pad">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: 60 }}>
          <Reveal>
            <p className="hh-eyebrow" style={{ color: '#C8862B', marginBottom: 20 }}>Willie &amp; Magdaleen Botha</p>
            <h2 className="hh-h" style={{ fontSize: 'clamp(1.9rem, 3.4vw, 3rem)', lineHeight: 1.14, maxWidth: '17ch' }}>
              Run by the family that brews the beer.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontSize: 16, lineHeight: 1.85, color: 'rgba(244,239,228,0.7)', fontWeight: 300, maxWidth: '58ch' }}>
              <p>
                The planning started in 1993. The first beer went into a glass in
                February 2001, and it has been poured here ever since — all malt,
                no enhancers, nothing added to make it go further.
              </p>
              <p>
                The house sits at the highest point of the Long Tom Pass, looking
                out over the Drakensberg escarpment. There is a fireplace in the
                bar, breakfast is served all day, and there is a playground for
                children who have been in the car since Gauteng.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── ROOMS ── */}
      <section id="rooms" style={{ padding: '20px 44px 116px', maxWidth: 1240, margin: '0 auto' }} className="hh-pad">
        <Reveal>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20, marginBottom: 16 }}>
            <div>
              <p className="hh-eyebrow" style={{ color: '#C8862B', marginBottom: 18 }}>Rooms</p>
              <h2 className="hh-h" style={{ fontSize: 'clamp(1.9rem, 3.4vw, 3rem)', lineHeight: 1.14 }}>Seven rooms, all en suite.</h2>
            </div>
            <p style={{ fontSize: 14, color: 'rgba(244,239,228,0.5)', maxWidth: '34ch', lineHeight: 1.7 }}>
              Rates are per person, per night. A 50% deposit confirms the booking.
            </p>
          </div>
          <div className="hh-rule" style={{ marginBottom: 4 }} />
        </Reveal>

        {ROOMS.map((r, i) => (
          <Reveal key={r.name} delay={i * 0.07}>
            <div className="hh-room">
              <span className="hh-eyebrow hh-room-num" style={{ color: 'rgba(244,239,228,0.32)', paddingTop: 6, fontSize: 10 }}>{r.n}</span>
              <div>
                <h3 className="hh-h" style={{ fontSize: 22, marginBottom: 7 }}>{r.name}</h3>
                <span className="hh-eyebrow" style={{ color: '#C8862B', fontSize: 9 }}>{r.tag}</span>
              </div>
              <p className="hh-room-detail" style={{ fontSize: 15, lineHeight: 1.78, color: 'rgba(244,239,228,0.62)', fontWeight: 300 }}>{r.detail}</p>
              <div style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                <div className="hh-h" style={{ fontSize: 25, color: '#E5BE7C' }}>R{r.sharing}</div>
                <div style={{ fontSize: 11, color: 'rgba(244,239,228,0.42)', marginTop: 3 }}>sharing · R{r.single} single</div>
              </div>
            </div>
          </Reveal>
        ))}

        <Reveal>
          <div style={{ marginTop: 40, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <a href={WA} className="hh-link" style={{ background: '#C8862B', color: '#12100C', fontSize: 14, fontWeight: 500, padding: '15px 30px', borderRadius: 999, transition: 'opacity .2s' }}>
              Check availability
            </a>
            <span style={{ fontSize: 13, color: 'rgba(244,239,228,0.45)' }}>
              Free cancellation up to 10 days before arrival.
            </span>
          </div>
        </Reveal>
      </section>

      {/* ── BREWERY ── */}
      <section id="brewery" style={{ background: '#111714', padding: '116px 44px', borderTop: '1px solid rgba(244,239,228,0.08)' }} className="hh-pad">
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <Reveal>
            <p className="hh-eyebrow" style={{ color: '#C8862B', marginBottom: 18 }}>The brewery</p>
            <h2 className="hh-h" style={{ fontSize: 'clamp(1.9rem, 3.4vw, 3rem)', lineHeight: 1.14, marginBottom: 22, maxWidth: '19ch' }}>
              Five beers, brewed where you drink them.
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: 'rgba(244,239,228,0.62)', maxWidth: '60ch', marginBottom: 62, fontWeight: 300 }}>
              All malt, no enhancers, no unnatural additives. The tanks are on the
              property, so what is on tap is whatever came right that week.
            </p>
          </Reveal>

          {/* 1px gap + a 1px ring on each card: adjacent rings meet inside the
              gap and read as a single rule, and an odd item count leaves no
              stray coloured cell the way a background-bleed grid would. */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(238px, 1fr))', gap: 1 }}>
            {BEERS.map((b, i) => (
              <Reveal key={b.name} delay={i * 0.06}>
                <div style={{ background: '#111714', boxShadow: '0 0 0 1px rgba(244,239,228,0.1)', padding: '34px 28px', height: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div
                    style={{
                      width: 30, height: 30, borderRadius: 999,
                      background: ['#D8A552', '#E3C98A', '#3A2A20', '#B87333', '#EBD79A'][i],
                      marginBottom: 6,
                    }}
                  />
                  <h3 className="hh-h" style={{ fontSize: 19 }}>{b.name}</h3>
                  <span className="hh-eyebrow" style={{ color: '#C8862B', fontSize: 9 }}>{b.style}</span>
                  <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(244,239,228,0.58)', fontWeight: 300, marginTop: 2 }}>{b.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WEDDINGS ── */}
      <section id="weddings" style={{ padding: '116px 44px', maxWidth: 1240, margin: '0 auto' }} className="hh-pad">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 60, alignItems: 'center' }}>
          <Reveal>
            <p className="hh-eyebrow" style={{ color: '#C8862B', marginBottom: 18 }}>Die Skuur</p>
            <h2 className="hh-h" style={{ fontSize: 'clamp(1.9rem, 3.4vw, 3rem)', lineHeight: 1.14, marginBottom: 24, maxWidth: '16ch' }}>
              Weddings and conferences in the barn.
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: 'rgba(244,239,228,0.68)', maxWidth: '52ch', marginBottom: 32, fontWeight: 300 }}>
              Die Skuur takes functions, conferences and weddings, with a braai
              area alongside and the whole house available for the wedding party.
              Guests wake up on the mountain instead of driving home.
            </p>
            <a href={WA} className="hh-link" style={{ border: '1px solid rgba(244,239,228,0.32)', color: '#F4EFE4', fontSize: 14, padding: '15px 30px', borderRadius: 999, display: 'inline-block', transition: 'opacity .2s' }}>
              Enquire about a date
            </a>
          </Reveal>

          <Reveal delay={0.12}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: 'rgba(244,239,228,0.1)' }}>
              {[
                ['Venue', 'Die Skuur, with braai area'],
                ['Sleeps', 'Seven en-suite rooms on site'],
                ['Also for', 'Conferences and meetings'],
                ['Nearest towns', 'Lydenburg 22 km · Sabie 34 km'],
              ].map(([k, v]) => (
                <div key={k} style={{ background: '#0D1210', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', gap: 18, flexWrap: 'wrap' }}>
                  <span className="hh-eyebrow" style={{ color: 'rgba(244,239,228,0.42)', fontSize: 10, paddingTop: 3 }}>{k}</span>
                  <span style={{ fontSize: 14.5, color: 'rgba(244,239,228,0.86)', textAlign: 'right' }}>{v}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FIND US / BOOK ── */}
      <section id="findus" style={{ background: '#111714', padding: '116px 44px', borderTop: '1px solid rgba(244,239,228,0.08)' }} className="hh-pad">
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 56px' }}>
              <p className="hh-eyebrow" style={{ color: '#C8862B', marginBottom: 20 }}>Find us</p>
              <h2 className="hh-h" style={{ fontSize: 'clamp(2rem, 4vw, 3.4rem)', lineHeight: 1.1, marginBottom: 22 }}>
                Come up the pass.
              </h2>
              <p style={{ fontSize: 16.5, lineHeight: 1.8, color: 'rgba(244,239,228,0.66)', fontWeight: 300 }}>
                On the R37 at the summit of the Long Tom Pass, between Lydenburg
                and Sabie. Message us for availability and we will come straight back.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 1, marginBottom: 44 }}>
              {[
                ['WhatsApp', '071 456 1161', WA],
                ['Reception', '079 522 9001', 'tel:0795229001'],
                ['From Lydenburg', '22 km on the R37', null],
                ['From Sabie', '34 km on the R37', null],
              ].map(([k, v, href]) => (
                <div key={k as string} style={{ background: '#111714', boxShadow: '0 0 0 1px rgba(244,239,228,0.1)', padding: '26px 24px' }}>
                  <div className="hh-eyebrow" style={{ color: 'rgba(244,239,228,0.42)', fontSize: 10, marginBottom: 10 }}>{k}</div>
                  {href ? (
                    <a href={href as string} className="hh-link" style={{ fontSize: 16.5, color: '#E5BE7C', transition: 'opacity .2s' }}>{v}</a>
                  ) : (
                    <div style={{ fontSize: 16.5, color: 'rgba(244,239,228,0.86)' }}>{v}</div>
                  )}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div style={{ textAlign: 'center' }}>
              <a href={WA} className="hh-link" style={{ background: '#C8862B', color: '#12100C', fontSize: 15, fontWeight: 500, padding: '17px 40px', borderRadius: 999, display: 'inline-block', transition: 'opacity .2s' }}>
                Check availability
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ padding: '52px 44px', borderTop: '1px solid rgba(244,239,228,0.08)' }} className="hh-pad">
        <div style={{ maxWidth: 1240, margin: '0 auto', display: 'flex', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap', alignItems: 'center' }}>
          <div>
            <div className="hh-h" style={{ fontSize: 19, marginBottom: 5 }}>Hops Hollow Country House</div>
            <div style={{ fontSize: 13, color: 'rgba(244,239,228,0.42)' }}>Long Tom Pass, Mpumalanga · Brewing since 2001</div>
          </div>
          <div style={{ fontSize: 12.5, color: 'rgba(244,239,228,0.34)' }}>
            Guest house · Restaurant · Craft brewery
          </div>
        </div>
      </footer>
    </div>
  )
}
