import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const items = [
  { num: '01', tag: 'Pravidelne', title: 'Spoločné výlety', desc: 'Turistika, chaty a výlety do prírody. Stretávame sa, spoznávame nové miesta a tvoríme spomienky.' },
  { num: '02', tag: 'Sezónne',   title: 'Chata víkendy',   desc: 'Niekoľkokrát do roka prenajmeme chatu a jednoducho si spolu oddýchneme od bežného života.' },
  { num: '03', tag: 'Mesačne',   title: 'Spoločenské hry', desc: 'Večery plné deskoviek, kartičiek a zdravého súťaženia. Nikto neodchádza s prázdnymi rukami.' },
  { num: '04', tag: 'Priebežne', title: 'Neformálne stretnutia', desc: 'Obyčajné posedenie s priateľmi — grilovačky, oslavy, filmové večery, a chuť byť spolu.' },
]

function Card({ item, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card-offset p-8 flex flex-col gap-4"
    >
      <div className="flex items-start justify-between">
        <span className="font-display italic text-5xl text-honey-deep/60 leading-none">{item.num}</span>
        <span className="font-body text-[9px] tracking-[0.25em] uppercase text-parchment bg-ink px-3 py-1 rounded-full">
          {item.tag}
        </span>
      </div>
      <div>
        <h3 className="font-display text-2xl text-ink mb-2">{item.title}</h3>
        <p className="font-body text-ink-soft leading-relaxed text-sm">{item.desc}</p>
      </div>
    </motion.div>
  )
}

export default function Activities() {
  return (
    <section id="aktivity" className="py-16 md:py-28 px-4 sm:px-6 bg-parchment-2 border-t border-ink/10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <p className="section-eyebrow">━━ Čo robíme</p>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-ink leading-none">
              Naše <em className="text-honey-deep not-italic">aktivity</em>
            </h2>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {items.map((item, i) => (
            <Card key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
