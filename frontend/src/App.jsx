import Navbar      from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
import Hero       from './components/Hero'
import About      from './components/About'
import Activities      from './components/Activities'
import Countdown       from './components/Countdown'
import Gallery         from './components/Gallery'
import Contact         from './components/Contact'
import Footer          from './components/Footer'

export default function App() {
  return (
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
  )
}
