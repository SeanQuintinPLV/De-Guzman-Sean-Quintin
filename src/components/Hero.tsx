type Page = 'home' | 'about' | 'projects' | 'contact'

const navLinks: Array<{ name: string; page: Page }> = [
  { name: 'Home', page: 'home' },
  { name: 'About', page: 'about' },
  { name: 'Projects', page: 'projects' },
  { name: 'Contact', page: 'contact' },
]

interface HeroProps {
  onNavigate: (page: Page) => void
}

function Hero({ onNavigate }: HeroProps) {
  return (
    <section id="home" className="min-h-screen relative overflow-hidden flex items-center justify-center px-6 py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(191,165,106,0.12),transparent_22%),radial-gradient(circle_at_bottom,rgba(255,255,255,0.05),transparent_35%)]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent_20%),linear-gradient(90deg,rgba(255,255,255,0.02),transparent_20%)] bg-[size:120px_120px] opacity-30"></div>

      <div className="relative z-10 mx-auto w-full max-w-5xl text-center">
        <p className="mb-8 text-xs md:text-sm uppercase tracking-[0.35em] text-text-muted opacity-90">Cinematic digital experiences for modern brands</p>
        <h1 className="text-5xl md:text-6xl lg:text-[5.2rem] font-display uppercase tracking-[0.18em] leading-[0.95] text-white drop-shadow-[0_12px_40px_rgba(0,0,0,0.25)]">
          SEAN QUINTIN
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-sm md:text-base uppercase tracking-[0.28em] text-text-secondary">
          WEB DESIGNER | DEVELOPER | MUSICIAN
        </p>

        <nav className="mt-14 inline-flex flex-wrap items-center justify-center gap-10 uppercase tracking-[0.28em] text-text-secondary">
          {navLinks.map((link) => (
            <button
              key={link.page}
              type="button"
              onClick={() => onNavigate(link.page)}
              className="group relative text-sm transition-all duration-300 hover:text-primary"
            >
              {link.name}
              <span className="absolute left-1/2 bottom-[-0.35rem] h-[1px] w-0 -translate-x-1/2 bg-primary transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </nav>
      </div>
    </section>
  )
}

export default Hero
