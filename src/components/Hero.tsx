import { heroAssets } from '../data/visualAssets'

function Hero() {
  return (
    <section id="home" className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(191,165,106,0.16),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(241,228,200,0.12),transparent_25%)]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent_25%),linear-gradient(90deg,rgba(255,255,255,0.03),transparent_25%)] bg-[size:80px_80px] opacity-40"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 grid gap-16 lg:grid-cols-[1.05fr_0.95fr] items-center">
        <div className="space-y-10">
          <div className="inline-flex items-center gap-3 rounded-full border border-[rgba(255,255,255,0.08)] bg-white/5 px-4 py-2 text-sm text-text-secondary">
            <span className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse"></span>
            Available for premium collaborations
          </div>

          <div className="space-y-6">
            <span className="text-sm uppercase tracking-[0.35em] text-text-muted">Creative digital craftsmanship</span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight">
              Building elegant digital <span className="text-primary">experiences</span> with modern precision.
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl leading-relaxed">
              I'm <strong className="text-text">Sean Quintin</strong>, a designer + developer blending visual storytelling and polished execution to create digital experiences that feel premium, refined, and built to stand out.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[2rem] border border-border bg-surface/90 p-6">
              <span className="block text-4xl font-bold text-text">5+</span>
              <span className="mt-2 block text-sm text-text-muted">Years of digital craft</span>
            </div>
            <div className="rounded-[2rem] border border-border bg-surface/90 p-6">
              <span className="block text-4xl font-bold text-text">50+</span>
              <span className="mt-2 block text-sm text-text-muted">Projects completed</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#projects" className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-black font-semibold shadow-[0_18px_50px_rgba(191,165,106,0.16)] transition-all hover:bg-primary-hover">
              Explore Portfolio
            </a>
            <a href="#contact" className="inline-flex items-center justify-center rounded-full border border-border px-8 py-4 text-text transition-all hover:border-primary hover:text-primary">
              Contact Me
            </a>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="absolute -top-12 -right-12 h-52 w-52 rounded-3xl bg-primary/10 blur-3xl"></div>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-[#0f0f0f] shadow-[0_35px_90px_rgba(0,0,0,0.55)]">
            <img src={heroAssets.profile} alt="Sean Quintin profile" className="h-[520px] w-full object-cover" />
          </div>
          <div className="absolute -left-10 top-24 h-44 w-44 overflow-hidden rounded-3xl border border-border bg-surface shadow-[0_25px_55px_rgba(0,0,0,0.35)]">
            <img src={heroAssets.highlight1} alt="Creative accent" className="h-full w-full object-cover" />
          </div>
          <div className="absolute -bottom-10 right-0 h-56 w-44 overflow-hidden rounded-3xl border border-border bg-surface shadow-[0_25px_55px_rgba(0,0,0,0.35)]">
            <img src={heroAssets.highlight2} alt="Design detail" className="h-full w-full object-cover" />
          </div>
          <div className="absolute bottom-8 left-8 h-36 w-36 overflow-hidden rounded-3xl border border-border bg-surface">
            <img src={heroAssets.highlight3} alt="Brand accent" className="h-full w-full object-cover" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 text-center">
        <span className="text-xs uppercase tracking-[0.35em] text-text-muted">Scroll to explore</span>
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-border py-2">
          <span className="h-2 w-1 rounded-full bg-primary animate-bounce"></span>
        </div>
      </div>
    </section>
  )
}

export default Hero