import logoSrc from '../../logo.png'

function InstagramIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2"/>
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  )
}

const navLinks = [
  { href: '#domov',     label: 'Domov'     },
  { href: '#o-nas',     label: 'O nás'     },
  { href: '#aktivity',  label: 'Aktivity'  },
  { href: '#galeria',   label: 'Galéria'   },
  { href: '#podujatia', label: 'Podujatia' },
  { href: '#kontakt',   label: 'Kontakt'   },
]

export default function Footer() {
  return (
    <footer className="bg-dark-wood text-parchment pt-16 pb-8 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Main row */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-20 pb-12 border-b border-parchment/10">

          {/* Brand */}
          <div className="flex-shrink-0">
            <div className="flex items-center gap-4 mb-5">
              <img
                src={logoSrc}
                alt="U skákavého poníka"
                className="h-14 object-contain"
              />
              <div>
                <p className="font-display text-xl text-parchment leading-tight">U skákavého poníka</p>
                <p className="font-body text-[10px] tracking-[0.25em] uppercase text-parchment/35 mt-0.5">
                  Občianske združenie
                </p>
              </div>
            </div>
            <p className="font-body text-sm text-parchment/40 max-w-xs leading-relaxed">
              Partia priateľov, ktorí berú výlety vážne a vážnosť nie.
            </p>
          </div>

          {/* Nav + socials */}
          <div className="flex flex-col sm:flex-row gap-12 flex-1 md:justify-end">

            {/* Navigácia */}
            <div>
              <p className="font-body text-[10px] tracking-[0.25em] uppercase text-parchment/30 mb-4">
                Navigácia
              </p>
              <ul className="space-y-2.5">
                {navLinks.map(({ href, label }) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="font-body text-sm text-parchment/50 hover:text-parchment transition-colors duration-200"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Kontakt + sociálne */}
            <div>
              <p className="font-body text-[10px] tracking-[0.25em] uppercase text-parchment/30 mb-4">
                Sociálne siete
              </p>
              <div className="space-y-3">
                <a
                  href="https://www.instagram.com/uskakavehoponika"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-body text-sm text-parchment/50 hover:text-parchment transition-colors duration-200"
                >
                  <InstagramIcon /> Instagram
                </a>
                <a
                  href="https://www.facebook.com/uskakavehoponika"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-body text-sm text-parchment/50 hover:text-parchment transition-colors duration-200"
                >
                  <FacebookIcon /> Facebook
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="font-body text-[11px] tracking-widest uppercase text-parchment/25">
            © {new Date().getFullYear()} U skákavého poníka · Žiadne poníky neboli poškodené.
          </p>
          <p className="font-body text-[11px] text-parchment/20">
            Slovenská republika
          </p>
        </div>

      </div>
    </footer>
  )
}
