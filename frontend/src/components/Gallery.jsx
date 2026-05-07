import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PRIVATE_PASSWORD = 'ponik'

const ALBUMS = [
  // ── Súkromné ──────────────────────────────────────────────────────────────
  { title: 'Hrušov',                              date: '15. 6. 2019',         sortDate: '2019-06', url: 'https://photos.app.goo.gl/bL2MUzt5WDtR3jeS6', image: '/titulne/hrusov.webp',                  private: true  },
  { title: 'Brodzany',                            date: '12. 5. 2019',         sortDate: '2019-05', url: 'https://photos.app.goo.gl/zBKSnoMYBCitUoVB8', image: '/titulne/brodzany.JPG',                 private: true  },
  { title: 'Bojnice & B. Bystrica',               date: '22. 6. 2019',         sortDate: '2019-06', url: 'https://photos.app.goo.gl/5Ls6NSdSsDwbPyut6', image: '/titulne/bojnice.webp',                 private: true  },
  { title: 'Hrušov (II)',                         date: '15. 6. 2019',         sortDate: '2019-06', url: 'https://photos.app.goo.gl/nMFTiS4dMRLeNCVq8', image: '/titulne/hrusov_2019.jpg',              private: true  },
  { title: 'Zobor',                               date: '29. 8. 2019',         sortDate: '2019-08', url: 'https://photos.app.goo.gl/vfamL2g2pP6zLG2g6', image: '/titulne/zobor.webp',                   private: true  },
  { title: 'Malajzia',                            date: '9. – 21. 9. 2019',    sortDate: '2019-09', url: 'https://photos.app.goo.gl/62BeHifS4o5ZVXfj9', image: '/titulne/malajzia.webp',                private: true  },
  { title: 'Singapúr',                            date: '14. – 18. 9. 2019',   sortDate: '2019-09', url: 'https://photos.app.goo.gl/wcdwv75F8fppY6GK8', image: '/titulne/singapur.webp',                private: true  },
  { title: 'Oponice hrad',                        date: '20. 10. 2019',        sortDate: '2019-10', url: 'https://photos.app.goo.gl/urWcnCEnmghamtRr7', image: '/titulne/oponice%20hrad.JPG',           private: true  },
  { title: 'Vapec',                               date: '27. 10. 2019',        sortDate: '2019-10', url: 'https://photos.app.goo.gl/URM7ek6YVyjwgFyY7', image: '/titulne/Vapec.JPG',                    private: true  },
  { title: 'Trenčín',                             date: '17. 11. 2019',        sortDate: '2019-11', url: 'https://photos.app.goo.gl/fasp7EaN8m6nbomJ6', image: '/titulne/trencin.JPG',                  private: true  },
  { title: 'Silvester 2019',                      date: '31. 12. 2019',        sortDate: '2019-12', url: 'https://photos.app.goo.gl/Qpcbr8UwosCdZs6d7', image: '/titulne/silveser_2019.JPG',            private: true  },
  { title: 'Mačacia skala',                       date: '5. 4. 2020',          sortDate: '2020-04', url: 'https://photos.app.goo.gl/1ssBRh7B3T3GQCfx8', image: '/titulne/macacia_skala.JPG',            private: true  },
  { title: 'Čachtice',                            date: '23. 5. 2020',         sortDate: '2020-05', url: 'https://photos.app.goo.gl/KE3c6QyYEYX9Nvoh7', image: '/titulne/cachtice.JPG',                 private: true  },
  { title: 'Beckov',                              date: '30. 5. 2020',         sortDate: '2020-05', url: 'https://photos.app.goo.gl/aUS3heaDvm4PCG2b9', image: '/titulne/beckov.JPG',                   private: true  },
  { title: 'Tematín',                             date: '6. 6. 2020',          sortDate: '2020-06', url: 'https://photos.app.goo.gl/mtfyWktRYxeGKov88', image: '/titulne/tematin.JPG',                  private: true  },
  { title: 'Uhrovec',                             date: '28. 6. 2020',         sortDate: '2020-06', url: 'https://photos.app.goo.gl/Qv5mBVDM4PSHsxcZ9', image: '/titulne/Uhrovec.JPG',                  private: true  },
  { title: 'Homola',                              date: '4. 7. 2020',          sortDate: '2020-07', url: 'https://photos.app.goo.gl/fwRmTEbsfVnTreh38', image: '',                                      private: true  },
  { title: 'Jahodná',                             date: '23. – 26. 7. 2020',   sortDate: '2020-07', url: 'https://photos.app.goo.gl/z2ByGpLF8TEe3p5Q6', image: '',                                      private: true  },
  { title: 'Lietava, Budatínsky hrad',            date: '1. 8. 2020',          sortDate: '2020-08', url: 'https://photos.app.goo.gl/vMXGgmGfnP9o6P8q6', image: '',                                      private: true  },
  { title: 'Považský hrad, Mariánska tiesňava',   date: '15. 8. 2020',         sortDate: '2020-08', url: 'https://photos.app.goo.gl/GEGmRT6mit8qfimW9', image: '',                                      private: true  },
  { title: 'Jánošikove diery, Rozsutec, Kriváň',  date: '29. – 31. 8. 2020',   sortDate: '2020-08', url: 'https://photos.app.goo.gl/tpJKCxNAnLfEzn8g8', image: '/titulne/velky_prielom.JPG',            private: true  },
  { title: 'Hrdovická skala',                     date: '5. 9. 2020',          sortDate: '2020-09', url: 'https://photos.app.goo.gl/BB41Zmz5dpfbMpHV9', image: '/titulne/Hrdovicka%20skala.JPG',        private: true  },
  { title: 'Kľak',                                date: '19. 9. 2020',         sortDate: '2020-09', url: 'https://photos.app.goo.gl/XECDRWeYuk4weYew9', image: '/titulne/klak.JPG',                     private: true  },
  { title: 'Arboretum Mlyňany',                   date: '27. 9. 2020',         sortDate: '2020-09', url: 'https://photos.app.goo.gl/P5cx14pZvPNeDbhk7', image: '/titulne/Arboretum%20Mlynany.JPG',      private: true  },
  { title: 'Vysoká',                              date: '3. 10. 2020',         sortDate: '2020-10', url: 'https://photos.app.goo.gl/LACq6tzqU43FGpPN6', image: '/titulne/Vysoká.JPG',                   private: true  },
  { title: 'Topoľčianky',                         date: '5. 11. 2020',         sortDate: '2020-11', url: 'https://photos.app.goo.gl/zLqk3MVJM5HdS61j7', image: '/titulne/topolčianky.JPG',              private: true  },
  { title: 'Nitra',                               date: '8. 11. 2020',         sortDate: '2020-11', url: 'https://photos.app.goo.gl/BvCGiAGBodd13AZGA', image: '/titulne/Nitra.JPG',                    private: true  },
  { title: 'Michalov vrch',                       date: '26. 12. 2020',        sortDate: '2020-12', url: 'https://photos.app.goo.gl/bfAaTHw8EBCbwNAi9', image: '/titulne/Michalov%20vrch.JPG',          private: true  },
  { title: 'Podhradie',                           date: '20. 3. 2021',         sortDate: '2021-03', url: 'https://photos.app.goo.gl/rsFTUGmVcs4M8Dtq9', image: '/titulne/podhradie.JPG',                private: true  },
  { title: 'Marhat',                              date: '10. 4. 2021',         sortDate: '2021-04', url: 'https://photos.app.goo.gl/QGFg9HoCv2EM7rwu6', image: '/titulne/marhat.JPG',                   private: true  },
  { title: 'Zibrica',                             date: '24. 4. 2021',         sortDate: '2021-04', url: 'https://photos.app.goo.gl/v2UAuCYUBqbooNQh7', image: '/titulne/zibnica.JPG',                  private: true  },
  { title: 'Revište',                             date: '20. 6. 2021',         sortDate: '2021-06', url: 'https://photos.app.goo.gl/8rKWRYAw1bte7B7e7', image: '/titulne/rebiste.JPG',                  private: true  },
  { title: 'Šášovský hrad',                       date: '20. 6. 2021',         sortDate: '2021-06', url: 'https://photos.app.goo.gl/tgG7P5WqQXfh4RxP8', image: '/titulne/sasovsky_hrad.JPG',            private: true  },
  { title: 'Pustý hrad',                          date: '14. 8. 2021',         sortDate: '2021-08', url: 'https://photos.app.goo.gl/NLFyPAfWBUbqAuHc9', image: '/titulne/pusty_hrad.JPG',               private: true  },
  { title: 'Rozhľadňa na Krahulci',               date: '14. 8. 2021',         sortDate: '2021-08', url: 'https://photos.app.goo.gl/f91TXNPRmtrDo8h37', image: '/titulne/rozhladna.JPG',                private: true  },
  { title: 'Úhrad',                               date: '21. 8. 2021',         sortDate: '2021-08', url: 'https://photos.app.goo.gl/fTW1KUZVmR8s6kKw8', image: '/titulne/Uhrad.JPG',                    private: true  },
  { title: 'Mohyla M.R. Štefánika',               date: '29. 8. 2021',         sortDate: '2021-08', url: 'https://photos.app.goo.gl/a8AXtPcDaa42daRf9', image: '/titulne/mohyla.JPG',                   private: true  },
  { title: 'Minčol',                              date: '4. 9. 2021',          sortDate: '2021-09', url: 'https://photos.app.goo.gl/bYusRNYy874mqn6u8', image: '/titulne/minčol.JPG',                   private: true  },
  { title: 'Veľká Rača',                          date: '11. 9. 2021',         sortDate: '2021-09', url: 'https://photos.app.goo.gl/iYzn7oqXHHJH9k9N8', image: '/titulne/velka_raca.JPG',               private: true  },
  { title: 'Trojmedzie',                          date: '12. 9. 2021',         sortDate: '2021-09', url: 'https://photos.app.goo.gl/ZgULXPBovVo6h2J67', image: '/titulne/Trojmedzie.JPG',               private: true  },
  { title: 'Veľký Polom',                         date: '13. 9. 2021',         sortDate: '2021-09', url: 'https://photos.app.goo.gl/j97FU1R1qA3HGKHM7', image: '',                                      private: true  },
  { title: 'Kamenné gule',                        date: '13. 9. 2021',         sortDate: '2021-09', url: 'https://photos.app.goo.gl/cDhRDyYLKBtAEWWT7', image: '/titulne/Kamenné%20gule.JPG',           private: true  },
  { title: 'Zobor (2021)',                         date: '19. 9. 2021',         sortDate: '2021-09', url: 'https://photos.app.goo.gl/kfz3Y49cX7CdBgcV6', image: '/titulne/zobor_2021.JPG',               private: true  },
  { title: 'Sitno',                               date: '25. 9. 2021',         sortDate: '2021-09', url: 'https://photos.app.goo.gl/qeCGCFUNLWMdpvZ16', image: '/titulne/sitno.JPG',                    private: true  },
  { title: 'Skalnatá',                            date: '3. 10. 2021',         sortDate: '2021-10', url: 'https://photos.app.goo.gl/N1RMiNf5MqGS2sxX9', image: '/titulne/skalnata.JPG',                 private: true  },
  { title: 'Veľký Grič',                          date: '24. 10. 2021',        sortDate: '2021-10', url: 'https://photos.app.goo.gl/i18MeA9FtSJ4CKg59', image: '/titulne/Veľký%20Grič.JPG',             private: true  },
  { title: 'Zniev',                               date: '23. 1. 2022',         sortDate: '2022-01', url: 'https://photos.app.goo.gl/K1xs83AtaHpqbDjr6', image: '/titulne/zniev.JPG',                    private: true  },
  { title: 'Špania Dolina',                       date: '13. 3. 2022',         sortDate: '2022-03', url: 'https://photos.app.goo.gl/u9dYaztGeJGVqrrVA', image: '/titulne/Špania%20Dolina.JPG',           private: true  },
  { title: 'Gubalówka',                           date: '17. 4. 2022',         sortDate: '2022-04', url: 'https://photos.app.goo.gl/SKkaYknf8ZyE1e8i9', image: '/titulne/Gubalowka.jpg',                private: true  },
  { title: 'Topoľčianky (2022)',                  date: '1. 5. 2022',          sortDate: '2022-05', url: 'https://photos.app.goo.gl/cEpm7vpaRHQUATgk9', image: '/titulne/Topolcianky_2022.jpg',         private: true  },
  { title: 'Chotenovec',                          date: '5. – 12. 6. 2022',    sortDate: '2022-06', url: 'https://photos.app.goo.gl/GACdiSin3WKXhpNp8', image: '/titulne/Chotenovec%202022.jpg',        private: true  },
  { title: 'Ostrihom',                            date: '17. 7. 2022',         sortDate: '2022-07', url: 'https://photos.app.goo.gl/og1fYH8hgTCG1LAb8', image: '/titulne/Ostrihom_2022.jpg',            private: true  },
  { title: 'Chopok, Ďumbier',                     date: '28. 7. 2022',         sortDate: '2022-07', url: 'https://photos.app.goo.gl/rReA81LMRNRAJhef8', image: '/titulne/Chopok.jpg',                   private: true  },
  { title: 'Alor Setar',                          date: '30. 8. – 11. 9. 2022', sortDate: '2022-08', url: 'https://photos.app.goo.gl/qYCmgu2NbwpBSdFh6', image: '/titulne/Alor_Setar.jpg',              private: true  },
  { title: 'Penang',                              date: '17. 9. 2022',         sortDate: '2022-09', url: 'https://photos.app.goo.gl/BFciKbRq2QdvbFWc9', image: '/titulne/Penang.jpg',                   private: true  },
  { title: 'Gunung Keriang',                      date: '24. 9. 2022',         sortDate: '2022-09', url: 'https://photos.app.goo.gl/SaWdxohwRpBdRyXU7', image: '/titulne/Gunung_Keriang.jpg',           private: true  },
  { title: 'Kľak (2022)',                          date: '6. 11. 2022',         sortDate: '2022-11', url: 'https://photos.app.goo.gl/pq8WrwfG3zRaD1268', image: '/titulne/Klak_2022.jpg',                private: true  },
  { title: 'Smolenice, Jaskyňa Driny',            date: '28. 5. 2023',         sortDate: '2023-05', url: 'https://photos.app.goo.gl/gZqnCLcvW4ZLcmnk8', image: '/titulne/Smolenice.jpg',                private: true  },
  { title: 'Súľovské vrchy',                      date: '22. 7. 2023',         sortDate: '2023-07', url: 'https://photos.app.goo.gl/xy1sj5kTPgHHRzm29', image: '/titulne/Súľovské_vrchy.jpg',           private: true  },
  { title: 'Plzeň',                               date: '19. 8. 2023',         sortDate: '2023-08', url: 'https://photos.app.goo.gl/dRrKA5HVkdkyTqAW8', image: '/titulne/Plzeň.jpg',                    private: true  },
  { title: 'Liptovský hrad, Veľký Choč',          date: '13. – 16. 9. 2023',   sortDate: '2023-09', url: 'https://photos.app.goo.gl/QVN68jkv7M248JRL9', image: '/titulne/Liptovský_hrad.jpg',           private: true  },
  { title: 'Neapol',                              date: '17. – 20. 8. 2024',   sortDate: '2024-08', url: 'https://photos.app.goo.gl/JHi4zBqvGiKZ4yNeA', image: '/titulne/Neapol_2024.jpg',              private: true  },
  { title: 'Tatry Jún 2025',                      date: '13. – 15. 6. 2025',   sortDate: '2025-06', url: 'https://photos.app.goo.gl/7WccHy8hUUqs7pTf7', image: '/tatry.jpg',                            private: true  },

  // ── Verejné ───────────────────────────────────────────────────────────────
  { title: 'Panská Javorina',                     date: '4. 8. 2019',          sortDate: '2019-08', url: 'https://photos.app.goo.gl/FtCAfKdUPee7oTLL8', image: '/titulne/javorina.webp',                private: false },
  { title: 'Sadok, Oponice',                      date: '18. 8. 2019',         sortDate: '2019-08', url: 'https://photos.app.goo.gl/oq3sJpMGs878wNAG7', image: '/titulne/sadok.webp',                   private: false },
  { title: 'Bojna',                               date: '13. 10. 2019',        sortDate: '2019-10', url: 'https://photos.app.goo.gl/q29fT99meEj7Y77k6', image: '/titulne/bojna.webp',                   private: false },
  { title: 'Žarnov',                              date: '3. 5. 2020',          sortDate: '2020-05', url: 'https://photos.app.goo.gl/bX5soLwARyeNPjry5', image: '/titulne/zarnov.webp',                  private: false },
  { title: 'Ružbachy',                            date: '19. – 20. 7. 2020',   sortDate: '2020-07', url: 'https://photos.app.goo.gl/k1m7PPb1mLkCNkwH9', image: '/titulne/ruzbachy.webp',                private: false },
]

const SORT_OPTIONS = [
  { key: 'newest', label: 'Najnovšie' },
  { key: 'oldest', label: 'Najstaršie' },
]

function LockIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
  )
}

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
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
        style={{ backgroundImage: album.image ? `url(${album.image})` : 'none', backgroundColor: '#2a1f10' }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-dark-wood/85 via-dark-wood/20 to-transparent" />

      {album.private && (
        <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-dark-wood/70 backdrop-blur-sm
                        text-honey text-[10px] font-body tracking-widest uppercase px-2.5 py-1 rounded-full">
          <LockIcon />
          <span>Súkromné</span>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="font-display text-base text-parchment leading-tight">{album.title}</p>
        <p className="font-body text-[11px] text-parchment/50 mt-0.5">{album.date}</p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-honey scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </motion.button>
  )
}

function FilterBtn({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`font-body text-xs tracking-widest uppercase px-4 py-2 rounded-full border transition-all duration-200 whitespace-nowrap
        ${active
          ? 'bg-ink text-parchment border-ink'
          : 'text-ink-soft border-ink/20 hover:border-ink/50 hover:text-ink'
        }`}
    >
      {children}
    </button>
  )
}

export default function Gallery() {
  const [modalAlbum, setModalAlbum] = useState(null)
  const [sort, setSort]             = useState('newest')
  const [year, setYear]             = useState('all')

  const years = useMemo(() => {
    const unique = [...new Set(ALBUMS.map(a => a.sortDate.slice(0, 4)))]
    return unique.sort((a, b) => b.localeCompare(a))
  }, [])

  const filtered = useMemo(() => {
    return [...ALBUMS]
      .filter(a => year === 'all' || a.sortDate.startsWith(year))
      .sort((a, b) => {
        const cmp = a.sortDate.localeCompare(b.sortDate)
        return sort === 'newest' ? -cmp : cmp
      })
  }, [sort, year])

  return (
    <section id="galeria" className="py-16 md:py-28 px-4 sm:px-6 bg-parchment border-t border-ink/10">
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10"
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
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center gap-2 mb-8"
        >
          {SORT_OPTIONS.map(opt => (
            <FilterBtn key={opt.key} active={sort === opt.key} onClick={() => setSort(opt.key)}>
              {opt.label}
            </FilterBtn>
          ))}

          <div className="w-px h-5 bg-ink/15 mx-1" />

          <select
            value={year}
            onChange={e => setYear(e.target.value)}
            className="font-body text-xs tracking-widest uppercase px-4 py-2 rounded-full border border-ink/20
                       bg-parchment text-ink-soft hover:border-ink/50 hover:text-ink
                       transition-all duration-200 outline-none cursor-pointer appearance-none pr-8
                       bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20stroke%3D%22%236b7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22M19%209l-7%207-7-7%22%2F%3E%3C%2Fsvg%3E')]
                       bg-no-repeat bg-[right_0.6rem_center] bg-[length:1rem]"
          >
            <option value="all">Všetky roky</option>
            {years.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>

          <span className="font-body text-[10px] text-ink-soft/50 ml-auto">
            {filtered.length} {filtered.length === 1 ? 'album' : filtered.length < 5 ? 'albumy' : 'albumov'}
          </span>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.04 } } }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
        >
          {filtered.map((album) => (
            <AlbumCard key={album.url} album={album} onOpenPrivate={setModalAlbum} />
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <p className="font-body text-ink-soft text-sm text-center py-16">
            Žiadne albumy pre vybraný rok.
          </p>
        )}
      </div>

      <AnimatePresence>
        {modalAlbum && (
          <PasswordModal album={modalAlbum} onClose={() => setModalAlbum(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
