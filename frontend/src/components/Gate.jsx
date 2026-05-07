import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const QUESTION = 'Dávid, koľko je 4 + 4?'
const ANSWER   = '9'
const STORAGE_KEY = 'usp-gate-passed'

export default function Gate({ onPass }) {
  const [value, setValue]   = useState('')
  const [wrong, setWrong]   = useState(false)
  const [shaking, setShake] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (value.trim() === ANSWER) {
      localStorage.setItem(STORAGE_KEY, '1')
      onPass()
    } else {
      setWrong(true)
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center px-6"
      style={{ backgroundColor: '#110a04' }}
    >
      {/* Wood grain texture (rovnaká ako Hero) */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              90deg,
              transparent 0px, transparent 2px,
              rgba(80,40,10,0.15) 2px, rgba(80,40,10,0.15) 3px,
              transparent 3px, transparent 18px
            )
          `,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(60,30,5,0.4) 0%, transparent 80%)' }}
      />

      <div className="relative z-10 text-center max-w-md w-full">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-body text-xs tracking-[0.35em] uppercase text-parchment/40 mb-6"
        >
          Občianske združenie · U skákavého poníka
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="font-display text-3xl md:text-4xl text-parchment leading-snug mb-10"
        >
          {QUESTION}
        </motion.h1>

        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-4"
        >
          <motion.input
            animate={shaking ? { x: [-8, 8, -6, 6, -3, 3, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
            type="text"
            value={value}
            onChange={(e) => { setValue(e.target.value); setWrong(false) }}
            placeholder="Tvoja odpoveď..."
            autoFocus
            className={`w-full max-w-xs text-center px-6 py-3 rounded-xl
              font-body text-parchment placeholder-parchment/25 bg-parchment/8
              border transition-colors duration-200 outline-none
              ${wrong
                ? 'border-red-500/60 bg-red-900/10'
                : 'border-parchment/15 focus:border-honey/50'
              }`}
            style={{ backgroundColor: wrong ? 'rgba(120,30,30,0.15)' : 'rgba(245,239,224,0.05)' }}
          />

          <AnimatePresence>
            {wrong && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="font-body text-xs text-red-400/80"
              >
                Skús znova, Dávid.
              </motion.p>
            )}
          </AnimatePresence>

          <button
            type="submit"
            className="btn-primary text-sm mt-2"
          >
            Vstúpiť
          </button>
        </motion.form>
      </div>
    </motion.div>
  )
}
