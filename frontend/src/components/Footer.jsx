import logoSrc from '../../logo.png'

export default function Footer() {
  return (
    <footer className="bg-dark-wood text-parchment py-16 px-6 border-t border-parchment/10">
      <div className="max-w-6xl mx-auto">

        {/* Logo centered */}
        <div className="flex flex-col items-center mb-12 pb-12 border-b border-parchment/10">
          <img src={logoSrc} alt="U skákavého poníka" className="h-24 object-contain opacity-90" />
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
