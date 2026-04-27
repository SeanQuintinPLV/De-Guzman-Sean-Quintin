import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Projects from './components/Projects'
import Partnership from './components/Partnership'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Loader from './components/Loader'

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLoading(false)
    }, 5000)

    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <Loader active={loading} />
      <div className="app" aria-hidden={loading}>
        <Navbar scrolled={scrolled} />
        <Hero />
        <About />
        <Services />
        <Projects />
        <Partnership />
        <Contact />
        <Footer />
      </div>
    </>
  )
}

export default App