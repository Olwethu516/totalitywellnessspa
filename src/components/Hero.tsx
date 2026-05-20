import { ChevronDown, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{
          backgroundImage:
            'url(https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-spa-dark/80 via-spa-dark/50 to-spa-dark/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-spa-dark/30 via-transparent to-spa-dark/30" />

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-spa-green/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold-500" />
          <div className="flex items-center gap-2">
            <Sparkles size={12} className="text-gold-500" />
            <span className="text-gold-300 font-body text-[11px] tracking-[0.4em] uppercase font-medium">
              Durban &amp; Johannesburg
            </span>
            <Sparkles size={12} className="text-gold-500" />
          </div>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold-500" />
        </div>

        <h1 className="font-display text-5xl sm:text-6xl md:text-8xl font-light text-white leading-[0.95] mb-6">
          Totality
          <span className="block font-semibold gold-text mt-2">
            Wellness Spa
          </span>
        </h1>

        <p className="font-body text-white/60 text-base sm:text-lg md:text-xl font-light tracking-wide mb-4 max-w-2xl mx-auto leading-relaxed">
          Holistic healing therapies, advanced wellness treatments, and premium health products — crafted to restore your body, mind, and spirit.
        </p>

        <p className="font-body text-spa-green text-xs sm:text-sm tracking-[0.25em] uppercase font-medium mb-12">
          Nature &middot; Science &middot; Balance
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#booking"
            className="gold-gradient text-spa-dark font-body font-semibold text-sm tracking-widest uppercase px-12 py-4 rounded-full hover:shadow-2xl hover:shadow-gold-500/30 transition-all duration-300 hover:scale-105"
          >
            Book a Treatment
          </a>
          <a
            href="#treatments"
            className="border border-gold-500/40 text-gold-300 font-body font-medium text-sm tracking-widest uppercase px-12 py-4 rounded-full hover:bg-gold-500/10 hover:border-gold-500/60 transition-all duration-300"
          >
            Our Services
          </a>
        </div>
      </div>

      <a
        href="#treatments"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gold-500/40 hover:text-gold-500 transition-colors animate-bounce"
      >
        <ChevronDown size={24} />
      </a>
    </section>
  );
}
