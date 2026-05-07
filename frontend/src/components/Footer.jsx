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
  { href: '#o-nas',     label: 'O nás'     },
  { href: '#aktivity',  label: 'Aktivity'  },
  { href: '#galeria',   label: 'Galéria'   },
  { href: '#podujatia', label: 'Podujatia' },
  { href: '#kontakt',   label: 'Kontakt'   },
]

const recentAlbums = [
  { title: 'Tatry Jún 2025',         image: '/tatry.jpg'                    },
  { title: 'Neapol 2024',            image: '/titulne/neapol_2024.webp'     },
  { title: 'Liptovský hrad 2023',    image: '/titulne/liptovsky_hrad.webp'  },
  { title: 'Plzeň 2023',             image: '/titulne/plzen.webp'           },
  { title: 'Alor Setar 2022',        image: '/titulne/alor_setar.webp'      },
  { title: 'Chotenovec 2022',        image: '/titulne/chotenovec_2022.webp' },
]

export default function Footer() {
  return (
    <footer className="bg-dark-wood text-parchment pt-16 pb-8 px-6 border-t border-parchment/10">
      <div className="max-w-6xl mx-auto">

        {/* Top — logo + nav */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-12 mb-14 pb-14 border-b border-parchment/10">

          {/* Logo blok */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="w-16 h-16 rounded-2xl bg-parchment/10 border border-parchment/15 flex items-center justify-center p-2">
              <img src={logoSrc} alt="U skákavého poníka" className="w-full h-full object-contain brightness-0 invert opacity-90" />
            </div>
            <div>
              <p className="font-display text-xl text-parchment leading-tight">U skákavého poníka</p>
              <p className="font-body text-[10px] tracking-[0.25em] uppercase text-parchment/35 mt-0.5">
                Občianske združenie
              </p>
            </div>
          </div>

          {/* Mini galéria */}
          <div className="flex-1">
            <p className="font-body text-[10px] tracking-[0.25em] uppercase text-parchment/35 mb-4">
              Posledné albumy
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {recentAlbums.map(album => (
                <a
                  key={album.title}
                  href="#galeria"
                  title={album.title}
                  className="block aspect-square rounded-lg overflow-hidden bg-parchment/5 hover:opacity-80 transition-opacity duration-200"
                >
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${album.image})` }}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Navigácia */}
        <div className="flex flex-wrap gap-x-8 gap-y-3 mb-14 pb-14 border-b border-parchment/10">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="font-body text-xs tracking-[0.2em] uppercase text-parchment/40 hover:text-parchment transition-colors"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Bottom — copyright + socials */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-body text-[11px] tracking-widest uppercase text-parchment/25">
            © {new Date().getFullYear()} U skákavého poníka · Žiadne poníky neboli poškodené.
          </p>
          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/uskakavehoponika"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-body text-[11px] tracking-widest uppercase text-parchment/30 hover:text-parchment/70 transition-colors"
            >
              <InstagramIcon />
              Instagram
            </a>
            <a
              href="https://www.facebook.com/uskakavehoponika"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-body text-[11px] tracking-widest uppercase text-parchment/30 hover:text-parchment/70 transition-colors"
            >
              <FacebookIcon />
              Facebook
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}
