/* Dekoratívna sekcia — mountain background + plávajúce SVG ikony */

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
    <path d="M10 20 H22" opacity="0.5" />
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
    <circle cx="29" cy="16" r="1.5" fill={color} />
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
    <text x="20" y="6"  textAnchor="middle" fontSize="5" fill={color} stroke="none" fontFamily="sans-serif">N</text>
    <text x="20" y="38" textAnchor="middle" fontSize="5" fill={color} stroke="none" fontFamily="sans-serif">S</text>
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

/* Pozície + vlastnosti každej plávajúcej ikony */
const ITEMS = [
  { icon: 'Mountain', x:  4, y: 12, size: 48, op: 0.55, anim: 1, dur:  7.0, delay: 0.0 },
  { icon: 'Beer',     x: 14, y: 62, size: 38, op: 0.45, anim: 2, dur:  9.5, delay: 1.2 },
  { icon: 'Tent',     x: 22, y: 28, size: 42, op: 0.40, anim: 3, dur:  8.0, delay: 2.0 },
  { icon: 'Camera',   x: 35, y: 72, size: 40, op: 0.45, anim: 1, dur:  6.5, delay: 0.5 },
  { icon: 'Football', x: 48, y: 18, size: 36, op: 0.40, anim: 2, dur: 10.0, delay: 3.0 },
  { icon: 'Glass',    x: 58, y: 68, size: 34, op: 0.40, anim: 3, dur:  7.5, delay: 1.5 },
  { icon: 'Mountain', x: 68, y: 32, size: 54, op: 0.50, anim: 1, dur:  8.5, delay: 2.5 },
  { icon: 'Compass',  x: 78, y: 74, size: 40, op: 0.45, anim: 2, dur:  9.0, delay: 0.8 },
  { icon: 'Tree',     x: 88, y: 22, size: 44, op: 0.45, anim: 3, dur:  6.0, delay: 1.8 },
  { icon: 'Beer',     x: 92, y: 60, size: 32, op: 0.35, anim: 1, dur: 11.0, delay: 3.5 },
  { icon: 'Camera',   x:  8, y: 80, size: 36, op: 0.35, anim: 2, dur:  8.0, delay: 4.0 },
  { icon: 'Football', x: 28, y: 50, size: 30, op: 0.30, anim: 3, dur:  7.0, delay: 2.8 },
  { icon: 'Tent',     x: 44, y: 42, size: 38, op: 0.35, anim: 1, dur:  9.5, delay: 0.3 },
  { icon: 'Tree',     x: 62, y: 52, size: 34, op: 0.30, anim: 2, dur:  6.5, delay: 2.2 },
  { icon: 'Compass',  x: 18, y: 42, size: 42, op: 0.40, anim: 3, dur: 10.5, delay: 1.0 },
  { icon: 'Glass',    x: 52, y: 85, size: 30, op: 0.30, anim: 1, dur:  7.5, delay: 3.8 },
  { icon: 'Mountain', x: 82, y: 48, size: 46, op: 0.45, anim: 2, dur:  8.0, delay: 1.5 },
]

export default function FloatingSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ height: '55vh', minHeight: 360 }}
    >
      {/* Fotka hôr — vlož /hory.jpg do frontend/public/ */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/hory.jpg)',
          backgroundColor: '#1a2a18',
        }}
      />

      {/* Tmavý overlay */}
      <div className="absolute inset-0 bg-ink/65" />

      {/* Plávajúce ikony */}
      {ITEMS.map((item, i) => {
        const Icon = ICONS[item.icon]
        return (
          <div
            key={i}
            className="absolute pointer-events-none select-none"
            style={{
              left:            `${item.x}%`,
              top:             `${item.y}%`,
              opacity:         item.op,
              animation:       `float${item.anim} ${item.dur}s ease-in-out infinite`,
              animationDelay:  `${item.delay}s`,
            }}
          >
            <Icon size={item.size} color="#F5EFE0" />
          </div>
        )
      })}

      {/* Voliteľný stred text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <p className="font-body text-[10px] tracking-[0.4em] uppercase text-parchment/25 select-none">
          U skákavého poníka · od 2019
        </p>
      </div>
    </section>
  )
}
