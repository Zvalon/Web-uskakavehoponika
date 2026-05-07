import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const TARGET = new Date('2026-08-20T00:00:00')

function getRemaining(target) {
  const diff = Math.max(0, target - Date.now())
  return {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  }
}

function Digit({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-display text-4xl sm:text-6xl md:text-8xl text-parchment tabular-nums min-w-[2ch] text-center leading-none">
        {String(value).padStart(2, '0')}
      </span>
      <span className="font-body text-[9px] tracking-[0.3em] uppercase text-parchment/40 mt-3">
        {label}
      </span>
    </div>
  )
}

export default function Countdown() {
  const [time, setTime] = useState(() => getRemaining(TARGET))

  useEffect(() => {
    const id = setInterval(() => setTime(getRemaining(TARGET)), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section
      id="podujatia"
      className="relative min-h-[70vh] flex flex-col items-center justify-center py-28"
      style={{
        /* Nahraď /chata.jpg vlastnou fotkou chaty */
        backgroundImage: 'url(/chata.jpg)',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#1a1008',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-dark-wood/80" />

      <div className="relative z-10 text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-body text-[10px] tracking-[0.35em] uppercase text-honey/70 mb-3"
        >
          ━━ Najbližšia chata ━━
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-4xl md:text-6xl text-parchment mb-16 leading-tight"
        >
          20. – 23. augusta <em className="text-honey not-italic">2026</em>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex items-start gap-3 sm:gap-6 md:gap-12 justify-center"
        >
          <Digit value={time.days}    label="dní" />
          <span className="font-display text-2xl sm:text-4xl text-parchment/20 mt-3 sm:mt-4">:</span>
          <Digit value={time.hours}   label="hodín" />
          <span className="font-display text-2xl sm:text-4xl text-parchment/20 mt-3 sm:mt-4">:</span>
          <Digit value={time.minutes} label="minút" />
          <span className="font-display text-2xl sm:text-4xl text-parchment/20 mt-3 sm:mt-4">:</span>
          <Digit value={time.seconds} label="sekúnd" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16"
        >
          <a href="#kontakt" className="font-body text-xs tracking-[0.25em] uppercase text-parchment/50 hover:text-honey transition-colors border border-parchment/20 hover:border-honey/40 px-8 py-3 rounded-full">
            Chcem sa zúčastniť
          </a>
        </motion.div>
      </div>
    </section>
  )
}
