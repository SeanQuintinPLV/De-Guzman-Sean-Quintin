import { useState } from 'react'

interface NavbarProps {
  scrolled: boolean
}

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Projects', href: '#projects' },
  { name: 'Partnership', href: '#partnership' },
  { name: 'Contact', href: '#contact' },
]

function Navbar({ scrolled }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => setMenuOpen(!menuOpen)
  const closeMenu = () => setMenuOpen(false)

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/95 backdrop-blur-xl border-b border-border py-3' : 'py-5'}`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-1 font-display text-2xl font-bold tracking-widest text-text hover:text-primary transition-colors">
          <span className="text-text">SEAN QUINTIN</span>
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse-slow"></span>
        </a>

        <ul className={`flex items-center gap-8 ${menuOpen ? 'fixed inset-0 bg-background flex-col justify-center gap-10' : 'hidden md:flex'}`}>
          {navLinks.map((link) => (
            <li key={link.name}>
              <a 
                href={link.href} 
                onClick={closeMenu}
                className="text-sm font-medium text-text-secondary hover:text-text transition-colors relative group"
              >
                {link.name}
                <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </a>
            </li>
          ))}
        </ul>

        <button 
          className={`md:hidden flex flex-col gap-1.5 p-2 ${menuOpen ? 'fixed top-5 right-6 z-50' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-0.5 bg-text transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-text transition-all ${menuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-text transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar