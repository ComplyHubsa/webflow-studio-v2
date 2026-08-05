'use client'

import { motion } from 'framer-motion'
import { Outfit, Inter } from 'next/font/google'

const display = Outfit({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--bh-display', display: 'swap' })
const body = Inter({ subsets: ['latin'], weight: ['300', '400', '500'], variable: '--bh-body', display: 'swap' })

/* Photos and logo are Busa House's own, taken from busahouse.co.za. The family
   history, unit count and facilities come from their About and Facilities
   pages. They publish no rates, so none are invented here. */
const IMG = '/busahouse'

const STAY = [
  {
    name: 'Chalets 1 – 4',
    tag: 'Self-catering',
    photo: `${IMG}/lounge.jpg`,
    detail: 'Our largest units, each with its own lounge and kitchenette, so you can cook, spread out and stay a while.',
  },
  {
    name: 'Rooms 5 – 8',
    tag: 'Bed & breakfast style',
    photo: `${IMG}/2025_new_bedroom.jpg`,
    detail: 'Comfortable en-suite rooms, recently refurbished, for couples or anyone stopping over on the way to Kruger.',
  },
  {
    name: 'Caravan Park',
    tag: 'Powered sites',
    photo: `${IMG}/caravanpark.jpg`,
    detail: 'Shaded stands with a shared ablution block and kitchen, set in the same gardens as the rest of the property.',
  },
]

const FACILITIES = [
  ['Swimming pool', 'Set in the gardens, with seating and shade'],
  ['Playground', 'Jungle gym, climbing frame and grassed play areas'],
  ['Braai facilities', 'For guests to use, right by the units'],
  ['The gardens', 'Twenty-three years of planting, and the birdlife that came with it'],
]

const WA = 'https://wa.me/27645441301'

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

export default function BusaHouseConcept() {
  return (
    <div className={`${display.variable} ${body.variable} bh`}>
      <style>{`
        .bh {
          --gold: #F2C21A; --gold-dk: #C2960B;
          --ink: #221D14; --cream: #FAF6EC; --card: #FFFDF7;
          --green: #3D5B3A; --muted: #6B6152; --line: rgba(34,29,20,0.14);
          background: var(--cream); color: var(--ink);
          font-family: var(--bh-body); overflow-x: hidden;
        }
        .bh h1, .bh h2, .bh h3 { font-family: var(--bh-display); font-weight: 500; letter-spacing: -0.02em; }
        .bh-eyebrow { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; font-weight: 500; }
        .bh-wrap { max-width: 1160px; margin: 0 auto; padding: 0 40px; }
        .bh-sec { padding: 100px 0; }
        .bh-btn { display: inline-block; border-radius: 999px; font-size: 14.5px; font-weight: 500; padding: 15px 30px; transition: opacity .2s; text-align: center; }
        .bh-btn:hover { opacity: .85; }
        .bh-btn-primary { background: var(--gold); color: var(--ink); }
        .bh-btn-dark { background: var(--ink); color: var(--cream); }
        .bh-btn-ghost { border: 1px solid var(--line); color: var(--ink); }
        .bh-img { display: block; width: 100%; height: 100%; object-fit: cover; }
        .bh-hero { display: grid; grid-template-columns: 1fr 1.05fr; gap: 0; align-items: stretch; }
        .bh-hero-copy { padding: 96px 56px 88px 0; }
        .bh-hero-photo { min-height: 580px; overflow: hidden; border-radius: 3px; }
        .bh-g2 { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }
        .bh-g3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .bh-card { background: var(--card); border: 1px solid var(--line); border-radius: 4px; overflow: hidden; height: 100%; display: flex; flex-direction: column; }
        .bh-facts { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }

        @media (max-width: 980px) {
          .bh-nav { display: none !important; }
          .bh-hero { grid-template-columns: 1fr; }
          .bh-hero-photo { min-height: 320px; order: -1; margin: 0 -40px; border-radius: 0; }
          .bh-hero-copy { padding: 44px 0 60px; }
          .bh-g2, .bh-g3 { grid-template-columns: 1fr; gap: 28px; }
        }
        /* Their logo is a wide banner strip, so at full height it squeezes the
           header CTA onto two lines on a phone. */
        @media (max-width: 760px) {
          .bh-logo { height: 30px !important; }
          .bh-header-cta { font-size: 12px !important; padding: 9px 14px !important; }
        }
        @media (max-width: 640px) {
          .bh-wrap { padding: 0 20px; }
          .bh-sec { padding: 68px 0; }
          .bh-hero-photo { margin: 0 -20px; min-height: 260px; }
          .bh-facts { grid-template-columns: 1fr; gap: 16px; }
          .bh-btn { display: block; width: 100%; }
        }
      `}</style>

      {/* HEADER */}
      <header style={{ borderBottom: '1px solid var(--line)', background: 'var(--cream)', position: 'sticky', top: 0, zIndex: 30 }}>
        <div className="bh-wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, height: 72 }}>
          <img src={`${IMG}/2024_finaltop_logo.png`} alt="Busa House, White River" className="bh-logo" style={{ height: 40, width: 'auto' }} />
          <nav className="bh-nav" style={{ display: 'flex', gap: 28, fontSize: 14, color: 'var(--muted)' }}>
            {[['Stay', 'stay'], ['Facilities', 'facilities'], ['Our story', 'story'], ['Find us', 'findus']].map(([l, h]) => (
              <a key={h} href={`#${h}`}>{l}</a>
            ))}
          </nav>
          <a href={WA} className="bh-btn bh-btn-primary bh-header-cta" style={{ padding: '10px 20px', fontSize: 13.5, width: 'auto', whiteSpace: 'nowrap' }}>Check availability</a>
        </div>
      </header>

      {/* HERO */}
      <section className="bh-wrap">
        <div className="bh-hero">
          <div className="bh-hero-copy">
            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="bh-eyebrow" style={{ color: 'var(--gold-dk)', marginBottom: 20 }}>
              White River · Mpumalanga
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontSize: 'clamp(2.3rem, 5vw, 4.1rem)', lineHeight: 1.08, marginBottom: 22 }}>
              Self-catering in a garden that took sixty years to grow.
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.22 }}
              style={{ fontSize: 17, lineHeight: 1.75, color: 'var(--muted)', maxWidth: '44ch', marginBottom: 32, fontWeight: 300 }}>
              Eight units, a caravan park and a pool, tucked into the trees on
              Burger Street. Twenty minutes from Mbombela, an hour from the
              Kruger gate.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.34 }}
              style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 46 }}>
              <a href={WA} className="bh-btn bh-btn-primary">Check availability</a>
              <a href="#stay" className="bh-btn bh-btn-ghost">See the units</a>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.46 }}
              className="bh-facts" style={{ borderTop: '1px solid var(--line)', paddingTop: 24 }}>
              {[['8', 'units'], ['1960', 'since'], ['Self-catering', 'and caravan park']].map(([v, k]) => (
                <div key={k}>
                  <div style={{ fontFamily: 'var(--bh-display)', fontSize: 20, marginBottom: 3 }}>{v}</div>
                  <div className="bh-eyebrow" style={{ color: 'var(--muted)', fontSize: 10 }}>{k}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div className="bh-hero-photo" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9 }}>
            <img src={`${IMG}/pool.jpg`} alt="The pool and gardens at Busa House" className="bh-img" />
          </motion.div>
        </div>
      </section>

      {/* STORY */}
      <section id="story" className="bh-sec" style={{ background: 'var(--card)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="bh-wrap">
          <div className="bh-g2">
            <Reveal>
              <div>
                <p className="bh-eyebrow" style={{ color: 'var(--gold-dk)', marginBottom: 16 }}>Our story</p>
                <h2 style={{ fontSize: 'clamp(1.7rem, 3.1vw, 2.6rem)', lineHeight: 1.15, marginBottom: 20 }}>
                  In one family since 1960. In good hands since.
                </h2>
                <p style={{ fontSize: 16, lineHeight: 1.85, color: 'var(--muted)', marginBottom: 16, fontWeight: 300 }}>
                  Marthie and Berand van der Linde spent twenty-three years
                  turning this property into what it is — the gardens, the trees,
                  and the birdlife that arrived with them.
                </p>
                <p style={{ fontSize: 16, lineHeight: 1.85, color: 'var(--muted)', fontWeight: 300 }}>
                  Bongani and Pinky Lukhele have taken it on, with no plans to
                  change what already works. Same gardens, same quiet, and
                  someone on the property who knows hospitality.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div style={{ borderRadius: 4, overflow: 'hidden', border: '1px solid var(--line)', aspectRatio: '4 / 3' }}>
                <img src={`${IMG}/2025_new_patio.jpg`} alt="The patio at Busa House" className="bh-img" loading="lazy" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* STAY */}
      <section id="stay" className="bh-sec">
        <div className="bh-wrap">
          <Reveal>
            <div style={{ marginBottom: 40, maxWidth: 620 }}>
              <p className="bh-eyebrow" style={{ color: 'var(--gold-dk)', marginBottom: 16 }}>Where you&apos;ll stay</p>
              <h2 style={{ fontSize: 'clamp(1.7rem, 3.1vw, 2.6rem)', lineHeight: 1.15, marginBottom: 14 }}>
                Eight units and a caravan park.
              </h2>
              <p style={{ fontSize: 15.5, lineHeight: 1.8, color: 'var(--muted)', fontWeight: 300 }}>
                Message us for current rates and availability — we usually come
                straight back.
              </p>
            </div>
          </Reveal>

          <div className="bh-g3">
            {STAY.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.08}>
                <div className="bh-card">
                  <div style={{ aspectRatio: '16 / 11', overflow: 'hidden' }}>
                    <img src={s.photo} alt={s.name} className="bh-img" loading="lazy" />
                  </div>
                  <div style={{ padding: '24px 24px 26px', display: 'flex', flexDirection: 'column', gap: 9, flex: 1 }}>
                    <h3 style={{ fontSize: 20 }}>{s.name}</h3>
                    <span className="bh-eyebrow" style={{ color: 'var(--gold-dk)', fontSize: 9.5 }}>{s.tag}</span>
                    <p style={{ fontSize: 14.5, lineHeight: 1.75, color: 'var(--muted)', fontWeight: 300, marginTop: 2 }}>{s.detail}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div style={{ marginTop: 36 }}>
              <a href={WA} className="bh-btn bh-btn-primary" style={{ width: 'auto' }}>Check availability</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FACILITIES */}
      <section id="facilities" className="bh-sec" style={{ background: 'var(--green)', color: '#F3EFE3' }}>
        <div className="bh-wrap">
          <div className="bh-g2">
            <Reveal>
              <div>
                <p className="bh-eyebrow" style={{ color: 'var(--gold)', marginBottom: 16 }}>On the property</p>
                <h2 style={{ fontSize: 'clamp(1.7rem, 3.1vw, 2.6rem)', lineHeight: 1.15, marginBottom: 26, color: '#FFFDF7' }}>
                  Room for the children to disappear for an afternoon.
                </h2>
                <div style={{ borderTop: '1px solid rgba(243,239,227,0.22)' }}>
                  {FACILITIES.map(([k, v]) => (
                    <div key={k} style={{ padding: '15px 0', borderBottom: '1px solid rgba(243,239,227,0.22)' }}>
                      <div style={{ fontSize: 15.5, marginBottom: 3, color: '#FFFDF7' }}>{k}</div>
                      <div style={{ fontSize: 14, color: 'rgba(243,239,227,0.7)', fontWeight: 300 }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div style={{ display: 'grid', gap: 16 }}>
                <div style={{ borderRadius: 4, overflow: 'hidden', aspectRatio: '16 / 10' }}>
                  <img src={`${IMG}/kitchenette.jpg`} alt="Kitchenette in a chalet" className="bh-img" loading="lazy" />
                </div>
                <div style={{ borderRadius: 4, overflow: 'hidden', aspectRatio: '16 / 10' }}>
                  <img src={`${IMG}/a_room7entrance.jpg`} alt="Entrance to one of the rooms" className="bh-img" loading="lazy" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FIND US */}
      <section id="findus" className="bh-sec" style={{ background: 'var(--card)', borderTop: '1px solid var(--line)' }}>
        <div className="bh-wrap">
          <Reveal>
            <div style={{ maxWidth: 620, marginBottom: 38 }}>
              <p className="bh-eyebrow" style={{ color: 'var(--gold-dk)', marginBottom: 16 }}>Find us</p>
              <h2 style={{ fontSize: 'clamp(1.7rem, 3.1vw, 2.6rem)', lineHeight: 1.15, marginBottom: 14 }}>
                82 Burger Street, White River.
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--muted)', fontWeight: 300 }}>
                Twenty minutes from Mbombela, an hour from the Numbi gate, and a
                short drive from the Panorama Route. Message us and we&apos;ll
                come straight back to you.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="bh-g3" style={{ marginBottom: 36 }}>
              {[
                ['WhatsApp', '064 544 1301', WA],
                ['Email', 'busahouse82@gmail.com', 'mailto:busahouse82@gmail.com'],
                ['Address', '82 Burger Street, White River', null],
              ].map(([k, v, href]) => (
                <div key={k as string} style={{ borderTop: '2px solid var(--gold)', paddingTop: 16 }}>
                  <div className="bh-eyebrow" style={{ color: 'var(--muted)', fontSize: 10, marginBottom: 7 }}>{k}</div>
                  {href
                    ? <a href={href as string} style={{ fontSize: 16.5, color: 'var(--ink)' }}>{v}</a>
                    : <div style={{ fontSize: 16.5 }}>{v}</div>}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <a href={WA} className="bh-btn bh-btn-dark" style={{ width: 'auto' }}>Check availability</a>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid var(--line)', padding: '36px 0' }}>
        <div className="bh-wrap" style={{ display: 'flex', justifyContent: 'space-between', gap: 18, flexWrap: 'wrap', alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: 'var(--bh-display)', fontSize: 17 }}>Benmari Busa House</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 3 }}>Self-catering resort · White River, Mpumalanga</div>
          </div>
          <div style={{ fontSize: 12.5, color: 'var(--muted)' }}>Chalets · Rooms · Caravan park</div>
        </div>
      </footer>
    </div>
  )
}
