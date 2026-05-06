import { motion } from 'framer-motion'

// Albumy — pridaj ďalšie podľa potreby
const ALBUMS = [
  {
    title: 'Tatry Jún 2025',
    date:  '13. – 15. 6. 2025',
    url:   'https://photos.google.com/share/AF1QipOr3vdKfLpNDi0jEpeDZ943Q6kBPAHYX5xV-Ly9a9TcjD_TsCKUHbB5ZsllyIaPrg?pli=1&key=SVQyRV9yUGVlM2pySUVkQThKMlBGdkF5UXh2ZU53',
  },
]

export default function Gallery() {
  return (
    <section id="galeria" className="py-16 md:py-28 px-4 sm:px-6 bg-parchment border-t border-ink/10">
      <div className="max-w-6xl mx-auto">

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="section-eyebrow">━━ Fotky</p>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-ink leading-none">
              Naša <em className="text-honey-deep not-italic">galéria</em>
            </h2>
          </div>
          <p className="max-w-xs font-body text-ink-soft text-sm">
            Fotky z našich spoločných stretnutí, výletov a chát.
          </p>
        </div>

        {/* Albumy */}
        <div className="flex flex-wrap gap-4">
          {ALBUMS.map((album, i) => (
            <motion.a
              key={i}
              href={album.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-4 border border-ink/20 hover:border-ink
                         rounded-2xl px-6 py-4 transition-all duration-200 group
                         shadow-[2px_2px_0_rgba(31,58,46,0.08)]
                         hover:shadow-[3px_3px_0_#1F3A2E]"
            >
              <div className="w-10 h-10 rounded-xl bg-parchment-2 border border-ink/15 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-ink-soft group-hover:text-honey-deep transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="font-body text-sm font-semibold text-ink group-hover:text-honey-deep transition-colors leading-none mb-1">
                  {album.title}
                </p>
                <p className="font-body text-[11px] text-ink-soft">{album.date}</p>
              </div>
              <svg className="w-4 h-4 text-ink/25 group-hover:text-honey-deep transition-colors ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  )
}
