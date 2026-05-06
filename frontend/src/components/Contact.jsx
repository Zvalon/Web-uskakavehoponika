import { useState } from 'react'
import { motion } from 'framer-motion'

const initialForm = { name: '', email: '', message: '' }

function encode(data) {
  return Object.keys(data)
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
    .join('&')
}

export default function Contact() {
  const [form, setForm]     = useState(initialForm)
  const [status, setStatus] = useState(null)

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'contact', ...form }),
      })
      setStatus('ok')
      setForm(initialForm)
    } catch { setStatus('error') }
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

            <div className="space-y-5 border-t border-ink/10 pt-8">
              <div>
                <p className="font-body text-[10px] tracking-[0.25em] uppercase text-ink-soft mb-1">Email</p>
                <p className="font-body text-ink">info@uskakavehoponika.sk</p>
              </div>
              <div>
                <p className="font-body text-[10px] tracking-[0.25em] uppercase text-ink-soft mb-1">Sleduj nás</p>
                <div className="flex gap-5">
                  <a href="#" className="font-body text-xs tracking-widest uppercase text-ink-soft hover:text-honey-deep transition-colors">Instagram</a>
                  <a href="#" className="font-body text-xs tracking-widest uppercase text-ink-soft hover:text-honey-deep transition-colors">Facebook</a>
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
            name="contact"
            data-netlify="true"
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <input type="hidden" name="form-name" value="contact" />
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

            <button
              type="submit"
              disabled={status === 'sending'}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {status === 'sending' ? 'Odosielam...' : 'Odoslať správu'}
            </button>

            {status === 'ok' && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-body text-sm text-ink-soft text-center pt-2"
              >
                Správa odoslaná. Ozveme sa čoskoro.
              </motion.p>
            )}
            {status === 'error' && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-body text-sm text-red-600 text-center pt-2"
              >
                Niečo sa pokazilo. Skús znova.
              </motion.p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  )
}
