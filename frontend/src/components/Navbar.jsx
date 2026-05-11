import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import logoSrc from '../../logo.png'

const linksLeft  = [
  { href: '#domov',   label: 'Domov' },
  { href: '#o-nas',   label: 'O nás' },
  { href: '#aktivity',label: 'Aktivity' },
]
const linksRight = [
  { href: '#galeria',   label: 'Galéria' },
  { href: '#podujatia', label: 'Podujatia' },
  { href: '#kontakt',   label: 'Kontakt' },
]
const allLinks = [...linksLeft, ...linksRight]
const sectionIds = ['kontakt', 'podujatia', 'galeria', 'aktivity', 'o-nas', 'domov']

export default function Navbar() {
  const [scrolled, setScrolled]         = useState(false)
  const [menuOpen, setMenuOpen]         = useState(false)
  const [activeSection, setActiveSection] = useState('domov')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      const mid = window.innerHeight / 2
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top < mid) {
          setActiveSection(id)
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const linkClass = (id) => {
    const base = scrolled ? 'nav-link' : 'nav-link-light'
    const isActive = activeSection === id
    if (!isActive) return base
    return scrolled
      ? 'nav-link !text-honey-deep'
      : 'nav-link-light !text-honey'
  }

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-parchment/95 backdrop-blur-sm border-b border-ink/10 py-2 shadow-sm'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between md:justify-center md:gap-10">
        {/* Left */}
        <ul className="hidden md:flex gap-7">
          {linksLeft.map(({ href, label }) => (
            <li key={href}>
              <a href={href} className={linkClass(href.slice(1))}>{label}</a>
            </li>
          ))}
        </ul>

        {/* Center logo */}
        <a href="#domov" className="flex-shrink-0 md:mx-4">
          <img
            src={logoSrc}
            alt="U skákavého poníka"
            className={`object-contain transition-all duration-300 ${
              scrolled ? 'h-12' : 'h-16'
            }`}
          />
        </a>

        {/* Right */}
        <ul className="hidden md:flex gap-7">
          {linksRight.map(({ href, label }) => (
            <li key={href}>
              <a href={href} className={linkClass(href.slice(1))}>{label}</a>
            </li>
          ))}
        </ul>

        {/* Mobile burger */}
        <button
          className={`md:hidden transition-colors ${scrolled ? 'text-ink' : 'text-parchment'}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-parchment border-t border-ink/10 px-6 py-4"
        >
          {allLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className={`block font-body tracking-widest uppercase text-xs py-3 border-b border-ink/10 last:border-0 transition-colors
                ${activeSection === href.slice(1) ? 'text-honey-deep' : 'text-ink/70 hover:text-honey-deep'}`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
        </motion.div>
      )}
    </motion.nav>
  )
}
