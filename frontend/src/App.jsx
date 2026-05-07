import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Gate          from './components/Gate'
import Navbar        from './components/Navbar'
import ScrollToTop   from './components/ScrollToTop'
import Hero          from './components/Hero'
import About         from './components/About'
import Activities    from './components/Activities'
import Countdown     from './components/Countdown'
import Gallery       from './components/Gallery'
import Contact       from './components/Contact'
import Footer        from './components/Footer'

const STORAGE_KEY = 'usp-gate-passed'

export default function App() {
  const [passed, setPassed] = useState(() => !!localStorage.getItem(STORAGE_KEY))

  return (
    <>
      <AnimatePresence>
        {!passed && <Gate onPass={() => setPassed(true)} />}
      </AnimatePresence>

      {passed && (
        <div className="min-h-screen">
          <Navbar />
          <main>
            <Hero />
            <About />
            <Activities />
            <Countdown />
            <Gallery />
            <Contact />
          </main>
          <Footer />
          <ScrollToTop />
        </div>
      )}
    </>
  )
}
