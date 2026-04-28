import { useState, useEffect, useRef } from 'react'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import HexagonalBackground from './components/HexagonalBackground'
import TopNav from './components/TopNav'

function App() {
  const [introComplete, setIntroComplete] = useState(false)
  const [activePage, setActivePage] = useState<'home' | 'about' | 'projects' | 'contact'>('home')
  const [pageReady, setPageReady] = useState(false)
  const [transitionStage, setTransitionStage] = useState<'idle' | 'closing' | 'opening'>('opening')
  const [transitionVariant, setTransitionVariant] = useState<'about' | 'projects' | 'contact' | 'home-return'>('about')
  const [audioMuted, setAudioMuted] = useState(true)
  const transitionTimer = useRef<number | undefined>()
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audioSrc = new URL('../assets/bgsound.mp3', import.meta.url).href

  useEffect(() => {
    if (!audioRef.current) return

    audioRef.current.muted = audioMuted
    if (!audioMuted) {
      audioRef.current.play().catch(() => {})
    }
  }, [audioMuted])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIntroComplete(true)
      setPageReady(true)
      setTransitionStage('idle')
    }, 1400)

    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (transitionStage === 'idle') return
    return () => window.clearTimeout(transitionTimer.current)
  }, [transitionStage])

  const scrollToHome = () => {
    if (typeof document === 'undefined') return
    document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })
  }

  const navigateTo = (page: 'home' | 'about' | 'projects' | 'contact') => {
    if (transitionStage === 'closing') return
    if (page === activePage) {
      if (page === 'home') {
        scrollToHome()
      }
      return
    }

    const goingHome = page === 'home'

    if (goingHome) {
      setTransitionVariant('home-return')
      setTransitionStage('closing')
      setIntroComplete(false)
      setPageReady(false)

      window.clearTimeout(transitionTimer.current)
      transitionTimer.current = window.setTimeout(() => {
        setActivePage(page)
        setTransitionStage('opening')
        setIntroComplete(true)
        setPageReady(true)
        window.clearTimeout(transitionTimer.current)
        transitionTimer.current = window.setTimeout(() => setTransitionStage('idle'), 450)
      }, 450)
      return
    }

    setTransitionVariant(page === 'about' ? 'about' : page === 'projects' ? 'projects' : 'contact')
    setTransitionStage('idle')
    setActivePage(page)
    setIntroComplete(true)
    setPageReady(true)
  }

  const renderPage = () => {
    switch (activePage) {
      case 'about':
        return <About onNavigate={navigateTo} />
      case 'projects':
        return <Projects onNavigate={navigateTo} />
      case 'contact':
        return <Contact />
      case 'home':
      default:
        return <Hero onNavigate={navigateTo} />
    }
  }

  const showIntroOverlay = transitionStage !== 'idle' && (activePage === 'home' || transitionVariant === 'home-return')
  const isSideVariant = transitionVariant === 'projects' || transitionVariant === 'contact'
  const barOneDirection = isSideVariant ? 'intro-left' : 'intro-top'
  const barTwoDirection = isSideVariant ? 'intro-right' : 'intro-bottom'
  const barExtraClass = transitionVariant === 'contact' ? 'contact-mode' : ''
  const modeClass = transitionStage === 'closing' ? 'close-mode' : transitionStage === 'opening' && transitionVariant === 'home-return' ? 'return-mode' : ''
  const barOneClasses = `intro-bar ${barOneDirection} ${barExtraClass} ${modeClass}`.trim()
  const barTwoClasses = `intro-bar ${barTwoDirection} ${barExtraClass} ${modeClass}`.trim()
  const showTopNav = activePage !== 'home' && transitionStage === 'idle'

  return (
    <>
      <HexagonalBackground />
      <button
        type="button"
        onClick={() => setAudioMuted((current) => !current)}
        className="fixed top-5 right-5 z-70 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white transition hover:bg-white/10"
        aria-label={audioMuted ? 'Unmute background music' : 'Mute background music'}
      >
        {audioMuted ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
            <path d="M16.5 12a4.5 4.5 0 0 0-2.67-4.13v8.26A4.5 4.5 0 0 0 16.5 12Zm-2.57-6.15A8 8 0 0 1 18 12a8 8 0 0 1-4.07 6.83M5 9.5v5h4l5 5V4.5L9 9.5H5Z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
            <path d="M16.5 12a4.5 4.5 0 0 0-2.67-4.13v8.26A4.5 4.5 0 0 0 16.5 12Zm-2.57-6.15A8 8 0 0 1 18 12a8 8 0 0 1-4.07 6.83M5 9.5v5h4l5 5V4.5L9 9.5H5Z" />
            <path d="M19 5 5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M5 5 19 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
      </button>
      <audio ref={audioRef} src={audioSrc} preload="auto" loop playsInline />
      {showIntroOverlay && (
        <div className="intro-overlay">
          <div className={barOneClasses} />
          <div className={barTwoClasses} />
        </div>
      )}
      {showTopNav && <TopNav activePage={activePage} onNavigate={navigateTo} />}
      <div className={`app transition-all duration-700 ${introComplete ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <main className={`app-page min-h-screen ${pageReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'} transition-all duration-500`}>
          {renderPage()}
        </main>
        {activePage === 'home' ? null : <Footer onNavigate={navigateTo} />}
      </div>
    </>
  )
}

export default App