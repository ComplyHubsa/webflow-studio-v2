'use client'

import { motion } from 'framer-motion'
import { Fraunces, Inter } from 'next/font/google'

/* Each concept gets its own type pairing so it reads as the client's brand,
   not the studio's. Swap these to suit the place. */
const display = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--c-display',
  display: 'swap',
})
const body = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--c-body',
  display: 'swap',
})

/* Photos live in public/tramontolodge/. Everything marked FILL IN must come from
   tramonto.co.za -- nothing on this page is invented. The pitch for this lead was:
   "No rates shown anywhere" */
const IMG = '/tramontolodge'

/* Keyed by index because the placeholders start out identical -- React
   warns on duplicate keys, and swapping to r.name once the real room
   names are in would be a needless edit. */
const ROOMS = [
  { name: 'FILL IN -- first room', detail: 'FILL IN -- what is in the room', rate: 'FILL IN' },
  { name: 'FILL IN -- second room', detail: 'FILL IN -- what is in the room', rate: 'FILL IN' },
]

export default function Page() {
  return (
    <main className={`${display.variable} ${body.variable}`}
          style={{ background: '#0d0b09', color: '#f5efe6',
                   fontFamily: 'var(--c-body), system-ui, sans-serif' }}>

      {/* Hero ------------------------------------------------------- */}
      <section style={{ minHeight: '88vh', display: 'flex', alignItems: 'flex-end',
                        padding: '0 6vw 8vh', position: 'relative',
                        backgroundImage: `linear-gradient(to top, rgba(13,11,9,.92), rgba(13,11,9,.25)), url(${IMG}/hero.jpg)`,
                        backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: .8 }}>
          <p style={{ letterSpacing: '.24em', textTransform: 'uppercase',
                      fontSize: 12, opacity: .75 }}>Keidebees</p>
          <h1 style={{ fontFamily: 'var(--c-display), serif', fontWeight: 500,
                       fontSize: 'clamp(2.6rem,6vw,5rem)', lineHeight: 1.04,
                       margin: '.3em 0 .4em' }}>Tramonto Lodge</h1>
          <p style={{ maxWidth: 540, fontSize: 17, lineHeight: 1.7, opacity: .85 }}>
            FILL IN -- one or two lines from tramonto.co.za. What the place is, who it suits.
          </p>
          <a href="#book" style={{ display: 'inline-block', marginTop: 28,
             background: '#f5efe6', color: '#0d0b09', fontWeight: 600,
             padding: '15px 34px', borderRadius: 999, textDecoration: 'none' }}>
            Check availability
          </a>
        </motion.div>
      </section>

      {/* Rooms ------------------------------------------------------ */}
      <section style={{ padding: '10vh 6vw' }}>
        <h2 style={{ fontFamily: 'var(--c-display), serif', fontWeight: 500,
                     fontSize: 'clamp(1.8rem,3.4vw,2.8rem)', marginBottom: '1.4em' }}>
          Where you'll stay
        </h2>
        <div style={{ display: 'grid', gap: 28,
                      gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))' }}>
          {ROOMS.map((r, i) => (
            <article key={i} style={{ border: '1px solid rgba(245,239,230,.14)',
                     borderRadius: 12, overflow: 'hidden' }}>
              <div style={{ aspectRatio: '4/3', background: '#1a1613' }} />
              <div style={{ padding: '20px 22px' }}>
                <h3 style={{ fontFamily: 'var(--c-display), serif', fontSize: 20 }}>{r.name}</h3>
                <p style={{ opacity: .78, fontSize: 14, lineHeight: 1.65, margin: '.5em 0 1em' }}>{r.detail}</p>
                <p style={{ fontSize: 14 }}>From <strong>{r.rate}</strong> per night</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Booking -- the whole reason for this concept ---------------- */}
      <section id="book" style={{ padding: '10vh 6vw', background: '#14100d' }}>
        <h2 style={{ fontFamily: 'var(--c-display), serif', fontWeight: 500,
                     fontSize: 'clamp(1.8rem,3.4vw,2.8rem)', marginBottom: '.5em' }}>
          Book direct
        </h2>
        <p style={{ opacity: .8, maxWidth: 520, lineHeight: 1.7, marginBottom: 30 }}>
          Enquiries come straight to Tramonto Lodge — no commission, no third party.
        </p>
        <form style={{ display: 'grid', gap: 14, maxWidth: 480 }}
              onSubmit={(e) => e.preventDefault()}>
          <input placeholder="Your name" style={FIELD} />
          <input placeholder="Email or phone" style={FIELD} />
          <input placeholder="Dates and number of guests" style={FIELD} />
          <button type="submit" style={{ background: '#f5efe6', color: '#0d0b09',
                  border: 0, borderRadius: 999, padding: '15px 0', fontWeight: 600,
                  cursor: 'pointer' }}>
            Send enquiry
          </button>
        </form>
        <p style={{ marginTop: 22, fontSize: 14, opacity: .8 }}>
          Or WhatsApp <a href="https://wa.me/27795870170" style={{ color: '#f5efe6' }}>0795870170</a>
        </p>
      </section>

      <footer style={{ padding: '6vh 6vw', opacity: .5, fontSize: 13 }}>
        Concept design for Tramonto Lodge by O'Gorman Studio. Not a live site.
      </footer>
    </main>
  )
}

const FIELD: React.CSSProperties = {
  background: 'transparent',
  border: '1px solid rgba(245,239,230,.22)',
  borderRadius: 8,
  padding: '14px 16px',
  color: '#f5efe6',
  font: 'inherit',
}
