'use client'

import { motion } from 'framer-motion'
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

/* Photos and beer labels are Hops Hollow's own, pulled from hopshollow.co.za
   for this concept. Rates, room layout, beer styles and distances come from
   their site and OTA listings — nothing here is invented. */
const IMG = '/hopshollow'

const ROOMS = [
  {
    name: 'Upstairs Rooms',
    tag: 'Twin or double',
    photo: `${IMG}/room-one.jpg`,
    detail: 'Two rooms off the guest lounge, twin or double, each en suite with a bath and shower and a coffee station.',
    sharing: 620,
    single: 720,
  },
  {
    name: 'Honeymoon Suite',
    tag: 'Sleeps 2',
    photo: `${IMG}/Hops-15.jpg`,
    detail: 'Our quietest room, kept for honeymooners and anyone driving up here to disappear for a weekend.',
    sharing: 620,
    single: 720,
  },
  {
    name: 'The Veranda Suite',
    tag: 'Step-free access',
    photo: `${IMG}/room-two.jpg`,
    detail: 'Ground floor with its own veranda, and the one room on the property set up for wheelchair access.',
    sharing: 620,
    single: 720,
  },
  {
    name: 'Garden Rooms',
    tag: 'Families',
    photo: `${IMG}/outside-hopshollow.jpg`,
    detail: 'Three newer en-suite rooms that take couples or families, closest to the playground and the braai area.',
    sharing: 580,
    single: 680,
  },
]

const BEERS = [
  { name: "Digger's Draught", style: 'Kölsch-style ale', label: `${IMG}/Diggers-Draught.png`, note: 'Pale malt and German wheat. Light and crisp — the one most people start on.' },
  { name: "Blacksmith's Brew", style: 'Belgian white', label: `${IMG}/Blacksmiths-Brew.png`, note: 'Brewed with ginger and coriander. Cloudy and spiced, good in the afternoon sun.' },
  { name: "Mac's Porter", style: 'Dark porter', label: `${IMG}/Macs-Porter.png`, note: 'Chocolate and mocha coffee underneath. Made for a seat near the fire.' },
  { name: 'Old Bull Bitter', style: 'British bitter', label: `${IMG}/Old-bull-bitter.png`, note: 'Styrian Goldings hops, poured the traditional way. Bitter in the proper sense.' },
  { name: "Tapper's Brew", style: 'Bohemian pilsner', label: `${IMG}/Tappers-Brew.png`, note: 'Saaz hops and a long, cold conditioning. Clean the whole way through.' },
]

const WA = 'https://wa.me/27714561161'

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function HopsHollowConcept() {
  return (
    <div className={`${display.variable} ${body.variable} hh`}>
      <style>{`
        .hh {
          --cream: #F8F3E7;
          --card: #FFFDF7;
          --ink: #221A12;
          --green: #3E6B3F;
          --green-dk: #2C4E2E;
          --rust: #A85E28;
          --muted: #6E6151;
          --line: rgba(34,26,18,0.14);
          background: var(--cream);
          color: var(--ink);
          font-family: var(--hh-body);
          overflow-x: hidden;
        }
        .hh h1, .hh h2, .hh h3 { font-family: var(--hh-display); font-weight: 400; letter-spacing: -0.015em; }
        .hh-eyebrow { font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; font-weight: 500; }
        .hh-wrap { max-width: 1180px; margin: 0 auto; padding: 0 40px; }
        .hh-sec { padding: 104px 0; }
        .hh-btn {
          display: inline-block; border-radius: 999px; font-size: 14.5px; font-weight: 500;
          padding: 15px 30px; transition: opacity .2s; text-align: center;
        }
        .hh-btn:hover { opacity: 0.85; }
        .hh-btn-primary { background: var(--green); color: #FFFDF7; }
        .hh-btn-ghost { border: 1px solid var(--line); color: var(--ink); }
        .hh-img { display: block; width: 100%; height: 100%; object-fit: cover; }
        .hh-hero { display: grid; grid-template-columns: 1.02fr 1fr; align-items: stretch; gap: 0; }
        .hh-hero-copy { padding: 108px 56px 96px 0; }
        .hh-hero-photo { position: relative; min-height: 620px; border-radius: 3px; overflow: hidden; }
        .hh-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 26px; }
        .hh-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }
        .hh-rooms { display: grid; grid-template-columns: repeat(2, 1fr); gap: 26px; }
        .hh-beers { display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 22px; }
        .hh-card { background: var(--card); border: 1px solid var(--line); border-radius: 4px; overflow: hidden; }
        .hh-facts { display: grid; grid-template-columns: repeat(4, 1fr); gap: 22px; }

        @media (max-width: 980px) {
          /* !important because the nav carries an inline display:flex, which
             would otherwise win over this rule and overflow the header. */
          .hh-nav { display: none !important; }
          .hh-hero { grid-template-columns: 1fr; }
          .hh-hero-photo { min-height: 340px; order: -1; margin: 0 -40px; border-radius: 0; }
          .hh-hero-copy { padding: 48px 0 64px; }
          .hh-grid-2 { grid-template-columns: 1fr; gap: 32px; }
          .hh-grid-3 { grid-template-columns: 1fr; }
          .hh-rooms { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .hh-wrap { padding: 0 20px; }
          .hh-sec { padding: 72px 0; }
          .hh-hero-photo { margin: 0 -20px; min-height: 280px; }
          .hh-facts { grid-template-columns: repeat(2, 1fr); gap: 20px; }
          .hh-btn { display: block; width: 100%; }
        }
      `}</style>

      {/* ── HEADER (static, never overlaps content) ── */}
      <header style={{ borderBottom: '1px solid var(--line)', background: 'var(--cream)', position: 'sticky', top: 0, zIndex: 30 }}>
        <div className="hh-wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, height: 68 }}>
          <img src={`${IMG}/hopslogo-1.png`} alt="Hops Hollow" style={{ height: 38, width: 'auto' }} />
          <nav style={{ display: 'flex', gap: 30, fontSize: 14, color: 'var(--muted)' }} className="hh-nav">
            {[['Rooms', 'rooms'], ['Brewery', 'brewery'], ['Weddings', 'weddings'], ['Find us', 'findus']].map(([l, h]) => (
              <a key={h} href={`#${h}`} style={{ transition: 'color .2s' }}>{l}</a>
            ))}
          </nav>
          <a href={WA} className="hh-btn hh-btn-primary" style={{ padding: '10px 20px', fontSize: 13.5, width: 'auto' }}>
            Check availability
          </a>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="hh-wrap">
        <div className="hh-hero">
          <div className="hh-hero-copy">
            <motion.p
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="hh-eyebrow" style={{ color: 'var(--rust)', marginBottom: 22 }}
            >
              Long Tom Pass · Mpumalanga
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontSize: 'clamp(2.4rem, 5.2vw, 4.4rem)', lineHeight: 1.06, marginBottom: 24 }}
            >
              A country house at the top of the pass.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.24 }}
              style={{ fontSize: 17, lineHeight: 1.78, color: 'var(--muted)', maxWidth: '46ch', marginBottom: 34, fontWeight: 300 }}
            >
              Seven rooms, a restaurant and a brew pub that has been running on
              this mountain since 2001. Twenty-two kilometres from Lydenburg,
              thirty-four from Sabie, and a long way from everything else.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.36 }}
              style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 52 }}
            >
              <a href={WA} className="hh-btn hh-btn-primary">Check availability</a>
              <a href="#rooms" className="hh-btn hh-btn-ghost">See the rooms</a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }}
              className="hh-facts"
              style={{ borderTop: '1px solid var(--line)', paddingTop: 26 }}
            >
              {[['Since', '2001'], ['Beers', 'Five on tap'], ['Rooms', 'Seven'], ['From', 'R580 pp']].map(([k, v]) => (
                <div key={k}>
                  <div style={{ fontFamily: 'var(--hh-display)', fontSize: 19, marginBottom: 4 }}>{v}</div>
                  <div className="hh-eyebrow" style={{ color: 'var(--muted)', fontSize: 10 }}>{k}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            className="hh-hero-photo"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
          >
            <img src={`${IMG}/Hops-14.jpg`} alt="The veranda at Hops Hollow, with beer barrels and the mountains beyond" className="hh-img" />
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="hh-sec" style={{ background: 'var(--card)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="hh-wrap">
          <div className="hh-grid-2">
            <Reveal>
              <div>
                <p className="hh-eyebrow" style={{ color: 'var(--rust)', marginBottom: 18 }}>Willie &amp; Magdaleen Botha</p>
                <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.7rem)', lineHeight: 1.14, marginBottom: 22 }}>
                  Run by the family that brews the beer.
                </h2>
                <p style={{ fontSize: 16, lineHeight: 1.85, color: 'var(--muted)', marginBottom: 18, fontWeight: 300 }}>
                  The planning started in 1993. The first beer went into a glass
                  in February 2001, and it has been poured here ever since — all
                  malt, no enhancers, nothing added to make it go further.
                </p>
                <p style={{ fontSize: 16, lineHeight: 1.85, color: 'var(--muted)', fontWeight: 300 }}>
                  There is a fireplace in the bar, breakfast is served all day,
                  and there is a playground for children who have been in the car
                  since Gauteng.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div style={{ borderRadius: 4, overflow: 'hidden', border: '1px solid var(--line)', aspectRatio: '16 / 10' }}>
                <img src={`${IMG}/bar.jpg`} alt="The bar at Hops Hollow with the beer taps" className="hh-img" loading="lazy" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── ROOMS ── */}
      <section id="rooms" className="hh-sec">
        <div className="hh-wrap">
          <Reveal>
            <div style={{ marginBottom: 42, maxWidth: 620 }}>
              <p className="hh-eyebrow" style={{ color: 'var(--rust)', marginBottom: 16 }}>Rooms</p>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.7rem)', lineHeight: 1.14, marginBottom: 16 }}>
                Seven rooms, all en suite.
              </h2>
              <p style={{ fontSize: 15.5, lineHeight: 1.8, color: 'var(--muted)', fontWeight: 300 }}>
                Rates are per person, per night. A 50% deposit confirms the
                booking, and cancellation is free up to ten days before arrival.
              </p>
            </div>
          </Reveal>

          <div className="hh-rooms">
            {ROOMS.map((r, i) => (
              <Reveal key={r.name} delay={i * 0.07}>
                <div className="hh-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ aspectRatio: '16 / 10', overflow: 'hidden' }}>
                    <img src={r.photo} alt={r.name} className="hh-img" loading="lazy" />
                  </div>
                  <div style={{ padding: '26px 26px 28px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 14, flexWrap: 'wrap' }}>
                      <h3 style={{ fontSize: 21 }}>{r.name}</h3>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontFamily: 'var(--hh-display)', fontSize: 21, color: 'var(--green)' }}>R{r.sharing}</span>
                        <span style={{ fontSize: 12, color: 'var(--muted)' }}> pp sharing</span>
                      </div>
                    </div>
                    <span className="hh-eyebrow" style={{ color: 'var(--rust)', fontSize: 9.5 }}>{r.tag}</span>
                    <p style={{ fontSize: 14.5, lineHeight: 1.75, color: 'var(--muted)', fontWeight: 300, marginTop: 2 }}>{r.detail}</p>
                    <div style={{ fontSize: 12.5, color: 'var(--muted)', marginTop: 'auto', paddingTop: 12, borderTop: '1px solid var(--line)' }}>
                      Single occupancy R{r.single}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div style={{ marginTop: 40 }}>
              <a href={WA} className="hh-btn hh-btn-primary" style={{ width: 'auto' }}>Check availability</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── BREWERY ── */}
      <section id="brewery" className="hh-sec" style={{ background: 'var(--green-dk)', color: '#F5F0E2' }}>
        <div className="hh-wrap">
          <Reveal>
            <div style={{ marginBottom: 48, maxWidth: 640 }}>
              <p className="hh-eyebrow" style={{ color: '#D9B87A', marginBottom: 16 }}>The brew pub</p>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.7rem)', lineHeight: 1.14, marginBottom: 16, color: '#FFFDF7' }}>
                Five beers, brewed where you drink them.
              </h2>
              <p style={{ fontSize: 15.5, lineHeight: 1.8, color: 'rgba(245,240,226,0.72)', fontWeight: 300 }}>
                All malt, no enhancers, no unnatural additives. The tanks are on
                the property, so what is on tap is whatever came right that week.
              </p>
            </div>
          </Reveal>

          <div className="hh-beers">
            {BEERS.map((b, i) => (
              <Reveal key={b.name} delay={i * 0.06}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, height: '100%' }}>
                  <img src={b.label} alt={`${b.name} label`} style={{ width: 116, height: 'auto' }} loading="lazy" />
                  <h3 style={{ fontSize: 18, color: '#FFFDF7' }}>{b.name}</h3>
                  <span className="hh-eyebrow" style={{ color: '#D9B87A', fontSize: 9.5 }}>{b.style}</span>
                  <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(245,240,226,0.68)', fontWeight: 300 }}>{b.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WEDDINGS ── */}
      <section id="weddings" className="hh-sec">
        <div className="hh-wrap">
          <div className="hh-grid-2">
            <Reveal>
              <div style={{ borderRadius: 4, overflow: 'hidden', border: '1px solid var(--line)', aspectRatio: '4 / 3' }}>
                <img src={`${IMG}/weddings1.jpg`} alt="A wedding set up at Hops Hollow" className="hh-img" loading="lazy" />
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div>
                <p className="hh-eyebrow" style={{ color: 'var(--rust)', marginBottom: 16 }}>Die Skuur</p>
                <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.7rem)', lineHeight: 1.14, marginBottom: 20 }}>
                  Weddings and conferences in the barn.
                </h2>
                <p style={{ fontSize: 16, lineHeight: 1.85, color: 'var(--muted)', marginBottom: 26, fontWeight: 300 }}>
                  Die Skuur takes functions, conferences and weddings, with a
                  braai area alongside and the whole house available for the
                  wedding party. Your guests wake up on the mountain instead of
                  driving home.
                </p>
                <div style={{ borderTop: '1px solid var(--line)', marginBottom: 26 }}>
                  {[
                    ['Venue', 'Die Skuur, with braai area'],
                    ['Sleeps', 'Seven en-suite rooms on site'],
                    ['Also for', 'Conferences and meetings'],
                  ].map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, padding: '13px 0', borderBottom: '1px solid var(--line)', flexWrap: 'wrap' }}>
                      <span className="hh-eyebrow" style={{ color: 'var(--muted)', fontSize: 10, paddingTop: 3 }}>{k}</span>
                      <span style={{ fontSize: 14.5 }}>{v}</span>
                    </div>
                  ))}
                </div>
                <a href={WA} className="hh-btn hh-btn-ghost" style={{ width: 'auto' }}>Enquire about a date</a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FIND US ── */}
      <section id="findus" className="hh-sec" style={{ background: 'var(--card)', borderTop: '1px solid var(--line)' }}>
        <div className="hh-wrap">
          <Reveal>
            <div style={{ maxWidth: 620, marginBottom: 44 }}>
              <p className="hh-eyebrow" style={{ color: 'var(--rust)', marginBottom: 16 }}>Find us</p>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.7rem)', lineHeight: 1.14, marginBottom: 16 }}>
                Come up the pass.
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--muted)', fontWeight: 300 }}>
                On the R37 at the summit of the Long Tom Pass, between Lydenburg
                and Sabie. Message us for availability and we will come straight back.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="hh-grid-3" style={{ marginBottom: 40 }}>
              {[
                ['WhatsApp', '071 456 1161', WA],
                ['Reception', '079 522 9001', 'tel:0795229001'],
                ['On the R37', 'Lydenburg 22 km · Sabie 34 km', null],
              ].map(([k, v, href]) => (
                <div key={k as string} style={{ borderTop: '2px solid var(--green)', paddingTop: 18 }}>
                  <div className="hh-eyebrow" style={{ color: 'var(--muted)', fontSize: 10, marginBottom: 8 }}>{k}</div>
                  {href ? (
                    <a href={href as string} style={{ fontSize: 17, color: 'var(--green)' }}>{v}</a>
                  ) : (
                    <div style={{ fontSize: 17 }}>{v}</div>
                  )}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <a href={WA} className="hh-btn hh-btn-primary" style={{ width: 'auto' }}>Check availability</a>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: '1px solid var(--line)', padding: '40px 0' }}>
        <div className="hh-wrap" style={{ display: 'flex', justifyContent: 'space-between', gap: 18, flexWrap: 'wrap', alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: 'var(--hh-display)', fontSize: 17 }}>Hops Hollow Country House</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>Long Tom Pass, Mpumalanga · Brewing since 2001</div>
          </div>
          <div style={{ fontSize: 12.5, color: 'var(--muted)' }}>Guest house · Restaurant · Brew pub</div>
        </div>
      </footer>
    </div>
  )
}
