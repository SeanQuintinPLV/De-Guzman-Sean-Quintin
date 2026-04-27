type Page = 'home' | 'about' | 'projects' | 'contact'

interface TopNavProps {
  activePage: Page
  onNavigate: (page: Page) => void
}

const navLinks: Array<{ name: string; page: Page }> = [
  { name: 'Home', page: 'home' },
  { name: 'About', page: 'about' },
  { name: 'Projects', page: 'projects' },
  { name: 'Contact', page: 'contact' },
]

function TopNav({ activePage, onNavigate }: TopNavProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-center gap-8 text-sm uppercase tracking-[0.3em] text-text-secondary">
        {navLinks.map((link) => (
          <button
            key={link.page}
            type="button"
            onClick={() => onNavigate(link.page)}
            className={`transition-all duration-300 ${activePage === link.page ? 'text-white' : 'text-text-secondary hover:text-white'} relative px-3 py-2`}
          >
            {link.name}
            {activePage === link.page && <span className="absolute inset-x-4 bottom-0 h-px bg-primary" />}
          </button>
        ))}
      </div>
    </div>
  )
}

export default TopNav
