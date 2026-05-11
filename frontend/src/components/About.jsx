import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  {
    n: '∞',
    l: 'Rokov spolu',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M4.745 12a7.5 7.5 0 0 1 7.5-7.5 7.49 7.49 0 0 1 5.303 2.197m0 0 1.5 1.5m-1.5-1.5v3.75m0 0h-3.75M19.5 12a7.5 7.5 0 0 1-7.5 7.5 7.49 7.49 0 0 1-5.303-2.197m0 0-1.5-1.5m1.5 1.5v-3.75m0 0h3.75" />
      </svg>
    ),
  },
  {
    n: '5 000+',
    l: 'Akcií',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
  {
    n: '9 000L',
    l: 'Ginu',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15M14.25 3.104c.251.023.501.05.75.082M19.8 15a2.25 2.25 0 01.45 1.317c0 1.185-.4 2.277-1.07 3.148A5.25 5.25 0 0112 21a5.25 5.25 0 01-7.18-1.535 5.25 5.25 0 01-1.07-3.148c0-.48.15-.928.41-1.317M19.8 15H4.2" />
      </svg>
    ),
  },
  {
    n: '20+',
    l: 'Členov',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

export default function About() {
  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-80px' })

  return (
    <section id="o-nas" className="py-16 md:py-28 px-4 sm:px-6 bg-parchment">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div>
            <motion.p variants={itemVariants} className="section-eyebrow">━━ O združení</motion.p>
            <motion.h2 variants={itemVariants} className="font-display text-4xl sm:text-5xl md:text-6xl text-ink leading-none">
              Príroda povinná,<br />
              vážnosť <em className="text-honey-deep not-italic">zakázaná</em>
            </motion.h2>
          </div>
        </motion.div>

        {/* Body text */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={containerVariants}
          className="grid md:grid-cols-2 gap-6 mb-14"
        >
          <div className="space-y-4 font-body text-ink-soft leading-relaxed">
            <motion.p variants={itemVariants}>
              <strong className="text-ink font-semibold">U skákavého poníka</strong> je občianske združenie,
              ktoré vzniklo spontánne – niekde medzi západom slnka na horskom hrebeni a smiechom pri táborovom
              ohni. Sme partia nadšencov prírody, túr, Alana Murína, dobrej nálady a nefalšovaného gin tonicu
              pod holým nebom. Vychutnávame si život s humorom, nadhľadom a občas aj s cigárou v ruke –
              lebo prečo nie?
            </motion.p>
            <motion.p variants={itemVariants}>
              Organizujeme výlety, víkendové akcie, stanovačky a kreatívne šialenstvá, ktoré síce nemajú
              ISO certifikát, ale zato zanechajú úsmev na tvári a iskru v duši. Naše trasy vedú hlbokými
              lesmi, cez lúky plné motýľov, až na kopce, kde nie je signál – a práve tam sa to najlepšie žije.
            </motion.p>
          </div>
          <div className="space-y-4 font-body text-ink-soft leading-relaxed">
            <motion.p variants={itemVariants}>
              Veríme, že deti aj dospelí si zaslúžia oddych, voľnosť, trochu blata na topánkach a veľa smiechu.
            </motion.p>
            <motion.p variants={itemVariants}>
              Ak hľadáš miesto, kde sa berie život s ľahkosťou, kde sa spieva pri ohni, kde sa turistické paličky
              križia s barovým humorom a kde sa človek cíti prijatý taký, aký je – vitaj u nás.{' '}
              <strong className="text-ink font-semibold">U skákavého poníka nie je len názov. Je to stav mysle.</strong>
            </motion.p>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          ref={statsRef}
          variants={containerVariants}
          initial="hidden"
          animate={statsInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-ink rounded-2xl overflow-hidden mb-14"
        >
          {stats.map((s, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className={`py-6 sm:py-8 px-3 sm:px-6 text-center flex flex-col items-center gap-2 group cursor-default
                ${i < stats.length - 1 ? 'border-r border-ink' : ''}
                ${i === 2 ? 'border-t md:border-t-0 border-ink' : ''}
                ${i === 3 ? 'border-t md:border-t-0 border-ink' : ''}
              `}
            >
              <span className="text-ink-soft opacity-60 group-hover:opacity-100 group-hover:text-honey-deep transition-all duration-300">{s.icon}</span>
              <div className="font-display text-3xl sm:text-4xl text-ink leading-none group-hover:text-honey-deep transition-colors duration-300">{s.n}</div>
              <div className="font-body text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-ink-soft">{s.l}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center border-t border-ink/10 pt-12"
        >
          <blockquote className="font-display italic text-2xl md:text-3xl text-ink max-w-2xl mx-auto leading-snug">
            "Nebuď kokot."
          </blockquote>
          <p className="font-body text-xs tracking-[0.2em] uppercase text-ink-soft mt-4">
            — Mahátma Gándhí
          </p>
        </motion.div>

      </div>
    </section>
  )
}
