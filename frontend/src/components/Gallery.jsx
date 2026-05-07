import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Heslo pre súkromné albumy — zmeň podľa potreby
const PRIVATE_PASSWORD = 'ponik'

// ── Albumy ────────────────────────────────────────────────────────────────────
// private: false  → otvori sa priamo
// private: true   → vyskoci okno s heslom
const ALBUMS = [
  {
    title:   'Tatry Jún 2025',
    date:    'Jún 2025',
    url:     'https://photos.google.com/share/AF1QipOr3vdKfLpNDi0jEpeDZ943Q6kBPAHYX5xV-Ly9a9TcjD_TsCKUHbB5ZsllyIaPrg?pli=1&key=SVQyRV9yUGVlM2pySUVkQThKMlBGdkF5UXh2ZU53',
    image:   '/tatry.jpg',
    private: false,
  },
  // Pridaj ďalšie albumy sem:
  // {
  //   title:   'Chata August 2025',
  //   date:    'August 2025',
  //   url:     'https://photos.google.com/...',
  //   image:   '/chata-preview.jpg',
  //   private: true,
  // },
]

// ── Lock ikona ────────────────────────────────────────────────────────────────
function LockIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
  )
}

// ── Password modal ─────────────────────────────────────────────────────────────
function PasswordModal({ album, onClose }) {
  const [value, setValue]   = useState('')
  const [wrong, setWrong]   = useState(false)
  const [shaking, setShake] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (value.trim() === PRIVATE_PASSWORD) {
      window.open(album.url, '_blank', 'noopener,noreferrer')
      onClose()
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
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: 'rgba(17,10,4,0.85)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 8 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="bg-parchment rounded-2xl p-8 max-w-sm w-full shadow-2xl border border-ink/10"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-xl bg-ink flex items-center justify-center text-parchment flex-shrink-0">
            <LockIcon />
          </div>
          <div>
            <p className="font-body text-[10px] tracking-[0.2em] uppercase text-ink-soft mb-0.5">Súkromný album</p>
            <p className="font-display text-lg text-ink leading-none">{album.title}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <motion.input
            animate={shaking ? { x: [-8, 8, -6, 6, -3, 3, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
            type="password"
            value={value}
            onChange={(e) => { setValue(e.target.value); setWrong(false) }}
            placeholder="Zadaj heslo..."
            autoFocus
            className={`w-full px-4 py-3 rounded-xl border font-body text-ink text-sm
              placeholder-ink/30 bg-parchment outline-none transition-colors duration-200
              ${wrong ? 'border-red-400' : 'border-ink/20 focus:border-ink'}`}
          />

          <AnimatePresence>
            {wrong && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="font-body text-xs text-red-500"
              >
                Nesprávne heslo. Skús znova.
              </motion.p>
            )}
          </AnimatePresence>

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 font-body text-sm font-medium tracking-widest uppercase text-ink-soft
                         hover:text-ink border border-ink/20 hover:border-ink/40 px-4 py-2.5 rounded-xl transition-colors"
            >
              Zrušiť
            </button>
            <button type="submit" className="flex-1 btn-primary text-sm py-2.5">
              Otvoriť
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

// ── Album karta ───────────────────────────────────────────────────────────────
const cardVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

function AlbumCard({ album, onOpenPrivate }) {
  const handleClick = () => {
    if (album.private) {
      onOpenPrivate(album)
    } else {
      window.open(album.url, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <motion.button
      variants={cardVariants}
      onClick={handleClick}
      className="group relative overflow-hidden rounded-xl aspect-[4/3] w-full text-left
                 shadow-[2px_2px_0_rgba(31,58,46,0.08)] hover:shadow-[4px_4px_0_rgba(31,58,46,0.15)]
                 transition-shadow duration-300 cursor-pointer"
    >
      {/* Obrázok */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
        style={{ backgroundImage: `url(${album.image})`, backgroundColor: '#2a1f10' }}
      />

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-wood/85 via-dark-wood/20 to-transparent" />

      {/* Lock badge */}
      {album.private && (
        <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-dark-wood/70 backdrop-blur-sm
                        text-honey text-[10px] font-body tracking-widest uppercase px-2.5 py-1 rounded-full">
          <LockIcon />
          <span>Súkromné</span>
        </div>
      )}

      {/* Obsah dole */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="font-display text-base text-parchment leading-tight">{album.title}</p>
        <p className="font-body text-[11px] text-parchment/50 mt-0.5">{album.date}</p>
      </div>

      {/* Honey accent linka */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-honey scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </motion.button>
  )
}

// ── Hlavná sekcia ─────────────────────────────────────────────────────────────
export default function Gallery() {
  const [modalAlbum, setModalAlbum] = useState(null)

  return (
    <section id="galeria" className="py-16 md:py-28 px-4 sm:px-6 bg-parchment border-t border-ink/10">
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div>
            <motion.p variants={cardVariants} className="section-eyebrow">━━ Fotky</motion.p>
            <motion.h2 variants={cardVariants} className="font-display text-4xl sm:text-5xl md:text-6xl text-ink leading-none">
              Naša <em className="text-honey-deep not-italic">galéria</em>
            </motion.h2>
          </div>
          <motion.p variants={cardVariants} className="max-w-xs font-body text-ink-soft text-sm">
            Fotky z našich spoločných stretnutí, výletov a chát.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
        >
          {ALBUMS.map((album, i) => (
            <AlbumCard key={i} album={album} onOpenPrivate={setModalAlbum} />
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {modalAlbum && (
          <PasswordModal album={modalAlbum} onClose={() => setModalAlbum(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
