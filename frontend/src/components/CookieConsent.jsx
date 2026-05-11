import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const STORAGE_KEY = 'usp-cookies-ok'

export default function CookieConsent() {
  const [visible, setVisible] = useState(() => !localStorage.getItem(STORAGE_KEY))

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, 'declined')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 left-4 right-4 z-50 max-w-xl mx-auto"
        >
          <div className="bg-dark-wood border border-parchment/15 rounded-2xl px-5 py-4 shadow-2xl
                          flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="font-body text-sm text-parchment/60 leading-relaxed flex-1">
              Táto stránka používa cookies pre základnú funkčnosť a analýzu návštevnosti.
            </p>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={accept}
                className="btn-primary text-xs py-2 px-5 whitespace-nowrap"
              >
                Prijať
              </button>
              <button
                onClick={decline}
                className="font-body text-xs tracking-widest uppercase text-parchment/30
                           hover:text-parchment/60 transition-colors px-3 whitespace-nowrap"
              >
                Odmietnuť
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
