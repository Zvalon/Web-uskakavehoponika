import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function InstagramIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2"/>
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  )
}

function OfflineModal({ onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: 'rgba(17,10,4,0.85)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
        className="bg-parchment rounded-2xl p-8 max-w-sm w-full shadow-2xl border border-ink/10 text-center"
      >
        <p className="font-display text-4xl mb-4">🚧</p>
        <h3 className="font-display text-2xl text-ink mb-2">Formulár mimo prevádzky</h3>
        <button
          onClick={onClose}
          className="mt-6 w-full btn-primary text-sm py-2.5"
        >
          Chápem
        </button>
      </motion.div>
    </motion.div>
  )
}

const initialForm = { name: '', email: '', message: '' }

export default function Contact() {
  const [form, setForm]       = useState(initialForm)
  const [showModal, setModal] = useState(false)

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setModal(true)
  }

  const inputClass = `
    w-full px-5 py-3 rounded-xl border border-ink/20 bg-parchment
    font-body text-ink placeholder-ink-soft/40
    focus:outline-none focus:border-ink transition-colors duration-200
  `

  return (
    <section id="kontakt" className="py-16 md:py-28 px-4 sm:px-6 bg-parchment-2 border-t border-ink/10">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="section-eyebrow">━━ Kontakt</p>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-ink leading-none mb-6">
              Napíš <em className="text-honey-deep not-italic">nám</em>
            </h2>
            <p className="font-body text-ink-soft leading-relaxed mb-10">
              Chceš sa pridať? Máš nápad na podujatie? Alebo len chceš povedať ahoj?
              Napíš nám — odpovieme.
            </p>

            <div className="space-y-6 border-t border-ink/10 pt-8">
              <div>
                <p className="font-body text-[10px] tracking-[0.25em] uppercase text-ink-soft mb-3">Sleduj nás</p>
                <div className="flex gap-3">
                  <a
                    href="https://www.instagram.com/uskakavehoponika"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-ink/20
                               font-body text-xs tracking-widest uppercase text-ink-soft
                               hover:border-ink hover:text-ink transition-all duration-200"
                  >
                    <InstagramIcon />
                    Instagram
                  </a>
                  <a
                    href="https://www.facebook.com/uskakavehoponika"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-ink/20
                               font-body text-xs tracking-widest uppercase text-ink-soft
                               hover:border-ink hover:text-ink transition-all duration-200"
                  >
                    <FacebookIcon />
                    Facebook
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div>
              <label className="block font-body text-[10px] tracking-[0.25em] uppercase text-ink-soft mb-2">Meno</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Tvoje meno"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block font-body text-[10px] tracking-[0.25em] uppercase text-ink-soft mb-2">E-mail</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="tvoj@email.sk"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block font-body text-[10px] tracking-[0.25em] uppercase text-ink-soft mb-2">Správa</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Čo ti leží na srdci..."
                className={`${inputClass} resize-none`}
              />
            </div>
            <button type="submit" className="btn-primary w-full text-sm">
              Odoslať správu
            </button>
          </motion.form>
        </div>
      </div>

      <AnimatePresence>
        {showModal && <OfflineModal onClose={() => setModal(false)} />}
      </AnimatePresence>
    </section>
  )
}
