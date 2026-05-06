import { motion } from 'framer-motion'

/* ── SVG ikony ── */
const Mountain = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none"
       stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="2,36 16,8 30,36" />
    <polyline points="20,36 30,16 40,36" />
  </svg>
)
const Beer = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none"
       stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 14 H24 V34 Q24 36 22 36 H10 Q8 36 8 34 Z" />
    <path d="M24 18 L30 18 Q35 18 35 24 Q35 30 30 30 L24 30" />
    <path d="M10 14 Q10 8 16 8 Q22 8 22 14" />
    <line x1="10" y1="20" x2="22" y2="20" opacity="0.5" />
  </svg>
)
const Glass = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none"
       stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 6 L14 26 Q14 30 20 30 Q26 30 26 26 L30 6 Z" />
    <line x1="20" y1="30" x2="20" y2="36" />
    <line x1="13" y1="36" x2="27" y2="36" />
  </svg>
)
const Football = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none"
       stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="20" cy="20" r="16" />
    <polygon points="20,12 24,17 22,23 18,23 16,17" />
    <line x1="20" y1="4"  x2="20" y2="12" />
    <line x1="20" y1="28" x2="20" y2="36" />
    <line x1="4"  y1="20" x2="10" y2="20" />
    <line x1="30" y1="20" x2="36" y2="20" />
    <line x1="7"  y1="11" x2="16" y2="17" />
    <line x1="24" y1="17" x2="33" y2="11" />
    <line x1="7"  y1="29" x2="16" y2="23" />
    <line x1="24" y1="23" x2="33" y2="29" />
  </svg>
)
const Camera = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none"
       stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 14 V32 Q6 34 8 34 H32 Q34 34 34 32 V14 Q34 12 32 12 H27 L24 8 H16 L13 12 H8 Q6 12 6 14 Z" />
    <circle cx="20" cy="23" r="6" />
    <circle cx="29" cy="16" r="1.5" fill={color} stroke="none" />
  </svg>
)
const Tent = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none"
       stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="2,36 20,4 38,36" />
    <path d="M13 36 L20 22 L27 36" />
    <line x1="2" y1="36" x2="38" y2="36" />
  </svg>
)
const Compass = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none"
       stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="20" cy="20" r="16" />
    <polyline points="20,8 23,20 20,32 17,20 20,8" />
    <circle cx="20" cy="20" r="2" fill={color} stroke="none" />
  </svg>
)
const Tree = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none"
       stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20,2 4,26 36,26" />
    <polyline points="20,12 8,32 32,32" />
    <line x1="20" y1="32" x2="20" y2="38" />
  </svg>
)

const ICONS = { Mountain, Beer, Glass, Football, Camera, Tent, Compass, Tree }

/* ── Rozmiestnenie ikon ── */
const ITEMS = [
  { icon: 'Mountain', x:  3, y: 10, size: 50, op: 0.18, anim: 1, dur:  7.0, delay: 0.0 },
  { icon: 'Beer',     x: 12, y: 65, size: 38, op: 0.15, anim: 2, dur:  9.5, delay: 1.2 },
  { icon: 'Tent',     x: 20, y: 25, size: 44, op: 0.14, anim: 3, dur:  8.0, delay: 2.0 },
  { icon: 'Camera',   x: 33, y: 75, size: 40, op: 0.16, anim: 1, dur:  6.5, delay: 0.5 },
  { icon: 'Football', x: 46, y: 15, size: 36, op: 0.14, anim: 2, dur: 10.0, delay: 3.0 },
  { icon: 'Glass',    x: 57, y: 70, size: 34, op: 0.15, anim: 3, dur:  7.5, delay: 1.5 },
  { icon: 'Mountain', x: 67, y: 30, size: 56, op: 0.18, anim: 1, dur:  8.5, delay: 2.5 },
  { icon: 'Compass',  x: 77, y: 78, size: 40, op: 0.15, anim: 2, dur:  9.0, delay: 0.8 },
  { icon: 'Tree',     x: 88, y: 20, size: 46, op: 0.16, anim: 3, dur:  6.0, delay: 1.8 },
  { icon: 'Beer',     x: 93, y: 58, size: 32, op: 0.13, anim: 1, dur: 11.0, delay: 3.5 },
  { icon: 'Camera',   x:  7, y: 82, size: 36, op: 0.13, anim: 2, dur:  8.0, delay: 4.0 },
  { icon: 'Football', x: 27, y: 52, size: 30, op: 0.12, anim: 3, dur:  7.0, delay: 2.8 },
  { icon: 'Tent',     x: 42, y: 44, size: 38, op: 0.13, anim: 1, dur:  9.5, delay: 0.3 },
  { icon: 'Tree',     x: 63, y: 55, size: 34, op: 0.12, anim: 2, dur:  6.5, delay: 2.2 },
  { icon: 'Compass',  x: 17, y: 44, size: 42, op: 0.14, anim: 3, dur: 10.5, delay: 1.0 },
  { icon: 'Glass',    x: 51, y: 87, size: 30, op: 0.11, anim: 1, dur:  7.5, delay: 3.8 },
  { icon: 'Mountain', x: 83, y: 50, size: 48, op: 0.16, anim: 2, dur:  8.0, delay: 1.5 },
]

export default function Hero() {
  return (
    <section
      id="domov"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#110a04' }}
    >
      {/* Wood grain texture */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              90deg,
              transparent 0px, transparent 2px,
              rgba(80,40,10,0.15) 2px, rgba(80,40,10,0.15) 3px,
              transparent 3px, transparent 18px
            ),
            repeating-linear-gradient(
              180deg,
              rgba(255,160,60,0.015) 0px, rgba(255,160,60,0.015) 1px,
              transparent 1px, transparent 80px
            )
          `,
        }}
      />

      {/* Subtle center glow */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(60,30,5,0.4) 0%, transparent 80%)' }}
      />

      {/* Plávajúce ikony */}
      {ITEMS.map((item, i) => {
        const Icon = ICONS[item.icon]
        return (
          <div
            key={i}
            className="absolute pointer-events-none select-none"
            style={{
              left:           `${item.x}%`,
              top:            `${item.y}%`,
              opacity:        item.op,
              animation:      `float${item.anim} ${item.dur}s ease-in-out infinite`,
              animationDelay: `${item.delay}s`,
            }}
          >
            {/* Na mobile ikony o 35% menšie */}
            <span className="block md:hidden">
              <Icon size={Math.round(item.size * 0.65)} color="#F5EFE0" />
            </span>
            <span className="hidden md:block">
              <Icon size={item.size} color="#F5EFE0" />
            </span>
          </div>
        )
      })}

      {/* Obsah */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-body text-xs tracking-[0.35em] uppercase text-parchment/40 mb-8"
        >
          Občianske združenie · od 2025
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="font-display text-5xl md:text-7xl text-parchment leading-tight tracking-wide mb-6"
        >
          OZ U Skákavého <em className="text-honey not-italic">poníka</em>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.65 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
        >
          <a href="#o-nas" className="btn-primary text-sm">Zisti viac</a>
          <a
            href="#galeria"
            className="font-body text-sm font-medium tracking-widest uppercase text-parchment/60 hover:text-parchment border border-parchment/20 hover:border-parchment/50 px-8 py-3 rounded-full transition-all duration-200"
          >
            Galéria
          </a>
        </motion.div>

        <motion.a
          href="#o-nas"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.85 }}
          className="inline-flex flex-col items-center gap-0.5 text-parchment/30 hover:text-parchment/60 transition-colors"
        >
          <span className="font-body text-[10px] tracking-[0.3em] uppercase mb-2">Tomuto sa venujeme</span>
          <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
          <svg className="w-5 h-5 animate-bounce" style={{ animationDelay: '0.2s' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.a>
      </div>
    </section>
  )
}
