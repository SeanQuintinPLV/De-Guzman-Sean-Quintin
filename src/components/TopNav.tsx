type Page = 'home' | 'about' | 'projects' | 'contact'

interface TopNavProps {
  activePage: Page
  onNavigate: (page: Page) => void
  audioMuted: boolean
  onToggleMute: () => void
}

const navLinks: Array<{ name: string; page: Page }> = [
  { name: 'Home', page: 'home' },
  { name: 'About', page: 'about' },
  { name: 'Projects', page: 'projects' },
  { name: 'Contact', page: 'contact' },
]

function TopNav({ activePage, onNavigate, audioMuted, onToggleMute }: TopNavProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-8 text-sm uppercase tracking-[0.3em] text-text-secondary">
        <div className="flex items-center gap-8">
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

        <button
          type="button"
          onClick={onToggleMute}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white transition hover:bg-white/10"
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
      </div>
    </div>
  )
}

export default TopNav
