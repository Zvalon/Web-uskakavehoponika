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
    <footer className="bg-ink text-parchment py-16 px-6 border-t border-parchment/10">
      <div className="max-w-6xl mx-auto">

        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 mb-12 pb-12 border-b border-parchment/10">
          <div className="flex items-center gap-5">
            <img src={logoSrc} alt="U skákavého poníka" className="h-16 object-contain opacity-90" />
            <div>
              <p className="font-display text-2xl text-parchment leading-none">U skákavého poníka</p>
              <p className="font-body text-[10px] tracking-[0.25em] uppercase text-parchment/40 mt-1">
                Občianske združenie
              </p>
            </div>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
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
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="font-body text-[11px] tracking-widest uppercase text-parchment/30">
            © {new Date().getFullYear()} U skákavého poníka · Žiadne poníky neboli poškodené.
          </p>
          <div className="flex gap-6">
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
          </div>
        </div>

      </div>
    </footer>
  )
}
