import { aboutGallery, resumeAsset } from '../data/visualAssets'

interface AboutProps {
  onNavigate?: (page: 'home' | 'about' | 'projects' | 'contact') => void
}

function About({ onNavigate }: AboutProps) {
  return (
    <section id="about" className="py-24 bg-background-secondary relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
      <div className="absolute inset-x-0 bottom-0 h-56 bg-[radial-gradient(circle_at_top,rgba(191,165,106,0.12),transparent_55%)]"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-16 items-center">
          <div className="grid grid-cols-2 gap-4">
            {aboutGallery.map((item, index) => (
              <div key={item.label} className={`overflow-hidden rounded-[2rem] border border-border bg-surface ${index === 0 ? 'col-span-2 row-span-2 h-[430px]' : 'h-56'}`}>
                <img src={item.src} alt={item.label} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>

          <div>
            <span className="inline-block text-sm font-semibold uppercase tracking-widest text-primary mb-4">About Me</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">
              Transforming Ideas Into <span className="text-primary">Digital Reality</span>
            </h2>

            <div className="space-y-6 mb-10 text-text-secondary leading-relaxed">
              <p>
                Hello! I'm <strong className="text-text">Sean Quintin</strong>, a passionate designer and developer who builds immersive digital experiences for ambitious brands. My work brings thoughtful visuals, polished interaction, and strong technical foundations together in a refined package.
              </p>
              <p>
                With over 5 years of experience across creative direction, strategic branding, and bespoke web development, I help clients communicate confidently online and create products that feel premium from first glance.
              </p>
            </div>

            <div className="grid gap-4 mb-10 sm:grid-cols-2">
              <div className="rounded-[2rem] border border-border bg-surface p-6">
                <h4 className="text-sm uppercase tracking-[0.28em] text-text-muted mb-3">Focus</h4>
                <p className="text-text">High-end digital experiences with strategic polish.</p>
              </div>
              <div className="rounded-[2rem] border border-border bg-surface p-6">
                <h4 className="text-sm uppercase tracking-[0.28em] text-text-muted mb-3">Approach</h4>
                <p className="text-text">Tailored visuals, intentional structure, and premium digital storytelling.</p>
              </div>
            </div>

            {onNavigate ? (
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="inline-block rounded-full bg-primary px-8 py-4 text-black font-semibold hover:bg-primary-hover transition-all"
              >
                Let's Work Together
              </button>
            ) : (
              <a href="#contact" className="inline-block rounded-full bg-primary px-8 py-4 text-black font-semibold hover:bg-primary-hover transition-all">
                Let's Work Together
              </a>
            )}

            <div className="mt-10 overflow-hidden rounded-[2rem] border border-border bg-background p-0 shadow-[0_25px_65px_rgba(0,0,0,0.35)]">
              <img src={resumeAsset.preview} alt="Resume preview" className="h-64 w-full object-cover" />
              <div className="space-y-4 p-6">
                <p className="text-sm uppercase tracking-[0.28em] text-text-muted">Professional Resume</p>
                <p className="text-text-secondary leading-relaxed">
                  Download the full resume to review notable projects, skills, and career milestones in detail.
                </p>
                <a href={resumeAsset.pdf} target="_blank" rel="noreferrer" className="inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-black hover:bg-primary-hover transition-all">
                  Download Resume
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About