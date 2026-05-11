import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TARGET = new Date('2026-08-20T00:00:00')
const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)

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

function FullModal({ onClose }) {
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
      className="fixed inset-0 z-50 flex items-center justify-center px-6"
      style={{ backgroundColor: 'rgba(17,10,4,0.88)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 12 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
        className="text-center max-w-sm w-full"
      >
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="font-body text-[10px] tracking-[0.35em] uppercase text-honey/60 mb-6"
        >
          ━━ Najbližšia chata ━━
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-display text-5xl md:text-6xl text-parchment leading-tight mb-4"
        >
          Chata je full.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="font-body text-parchment/50 text-sm leading-relaxed mb-10"
        >
          Mal si sa prihlásiť skôr.<br />
          Alebo poznáš niekoho, kto ťa dostane dnu.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          onClick={onClose}
          className="font-body text-xs tracking-[0.25em] uppercase text-parchment/40 hover:text-parchment/70
                     border border-parchment/15 hover:border-parchment/30 px-8 py-3 rounded-full transition-colors duration-200"
        >
          Chápem, som outsider
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

export default function Countdown() {
  const [time, setTime]       = useState(() => getRemaining(TARGET))
  const [showModal, setModal] = useState(false)

  useEffect(() => {
    const id = setInterval(() => setTime(getRemaining(TARGET)), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <>
      <section
        id="podujatia"
        className="relative min-h-[70vh] flex flex-col items-center justify-center py-28"
        style={{
          backgroundImage: 'url(/chata.jpg)',
          backgroundAttachment: isTouch ? 'scroll' : 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#1a1008',
        }}
      >
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
            <button
              onClick={() => setModal(true)}
              className="font-body text-xs tracking-[0.25em] uppercase text-parchment/50 hover:text-honey
                         transition-colors border border-parchment/20 hover:border-honey/40 px-8 py-3 rounded-full"
            >
              Chcem sa zúčastniť
            </button>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {showModal && <FullModal onClose={() => setModal(false)} />}
      </AnimatePresence>
    </>
  )
}
