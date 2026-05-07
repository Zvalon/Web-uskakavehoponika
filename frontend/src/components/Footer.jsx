import logoSrc from '../../logo.png'

const links = [
  { href: '#domov',    label: 'Domov' },
  { href: '#o-nas',    label: 'O nás' },
  { href: '#aktivity', label: 'Aktivity' },
  { href: '#galeria',  label: 'Galéria' },
  { href: '#podujatia',label: 'Podujatia' },
  { href: '#kontakt',  label: 'Kontakt' },
]

export default function Footer() {
  return (
    <footer className="bg-dark-wood text-parchment py-16 px-6 border-t border-parchment/10">
      <div className="max-w-6xl mx-auto">

        {/* Logo centered */}
        <div className="flex flex-col items-center mb-12 pb-12 border-b border-parchment/10">
          <img src={logoSrc} alt="U skákavého poníka" className="h-24 object-contain opacity-90 mb-6" />
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {links.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="font-body text-xs tracking-[0.2em] uppercase text-parchment/50 hover:text-parchment transition-colors"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-[11px] tracking-widest uppercase text-parchment/30">
            © {new Date().getFullYear()} U skákavého poníka · Žiadne poníky neboli poškodené.
          </p>
          <div className="flex gap-6 items-center">
            <a
              href="https://www.instagram.com/uskakavehoponika"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-[11px] tracking-widest uppercase text-parchment/30 hover:text-parchment/70 transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://www.facebook.com/uskakavehoponika"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-[11px] tracking-widest uppercase text-parchment/30 hover:text-parchment/70 transition-colors"
            >
              Facebook
            </a>
            <span className="text-parchment/15">·</span>
            <button
              onClick={() => localStorage.removeItem('usp-cookies-ok') || window.location.reload()}
              className="font-body text-[11px] tracking-widest uppercase text-parchment/30 hover:text-parchment/70 transition-colors"
            >
              Nastavenia cookies
            </button>
          </div>
        </div>

      </div>
    </footer>
  )
}
