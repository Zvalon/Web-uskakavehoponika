import { motion } from 'framer-motion'

const ALBUMS = [
  {
    title: 'Tatry Jún 2025',
    date:  '13. – 15. 6. 2025',
    url:   'https://photos.google.com/share/AF1QipOr3vdKfLpNDi0jEpeDZ943Q6kBPAHYX5xV-Ly9a9TcjD_TsCKUHbB5ZsllyIaPrg?pli=1&key=SVQyRV9yUGVlM2pySUVkQThKMlBGdkF5UXh2ZU53',
    image: '/tatry.jpg',
    location: 'Priečne sedlo, Vysoké Tatry',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function Gallery() {
  return (
    <section id="galeria" className="py-16 md:py-28 px-4 sm:px-6 bg-parchment border-t border-ink/10">
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
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

        {/* Albumy */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={containerVariants}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {ALBUMS.map((album, i) => (
            <motion.a
              key={i}
              href={album.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={cardVariants}
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] block
                         shadow-[4px_4px_0_rgba(31,58,46,0.10)]
                         hover:shadow-[6px_6px_0_rgba(31,58,46,0.18)]
                         transition-shadow duration-300"
            >
              {/* Background image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ backgroundImage: `url(${album.image})`, backgroundColor: '#2a1f10' }}
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark-wood/90 via-dark-wood/30 to-transparent group-hover:opacity-80 transition-opacity duration-400" />

              {/* Top-right external link icon */}
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-parchment/10 backdrop-blur-sm
                              flex items-center justify-center opacity-0 group-hover:opacity-100
                              transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                <svg className="w-3.5 h-3.5 text-parchment" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>

              {/* Bottom content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                <p className="font-body text-[9px] tracking-[0.25em] uppercase text-honey/70 mb-1">
                  {album.location}
                </p>
                <p className="font-display text-xl text-parchment leading-tight mb-1">
                  {album.title}
                </p>
                <p className="font-body text-[11px] text-parchment/50">{album.date}</p>
              </div>

              {/* Bottom accent line on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-honey scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </motion.a>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
