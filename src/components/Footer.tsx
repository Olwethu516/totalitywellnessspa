import { Leaf, Mail, MessageCircle, MapPin } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-spa-darker border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-full gold-gradient flex items-center justify-center">
                <Leaf size={15} className="text-spa-dark" />
              </div>
              <div className="flex flex-col">
                <span className="gold-text font-display font-semibold tracking-[0.15em] text-sm uppercase leading-none">
                  Totality
                </span>
                <span className="text-white/50 font-body font-light tracking-[0.2em] text-[10px] uppercase leading-none mt-1">
                  Wellness Spa
                </span>
              </div>
            </div>
            <p className="font-body text-white/30 text-sm leading-relaxed max-w-xs mb-6">
              Holistic healing. Natural wellness. Premium care. Two branches across South Africa dedicated to your total wellbeing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:info@oula.co.za"
                className="flex items-center gap-2 font-body text-xs text-white/40 hover:text-gold-400 transition-colors"
              >
                <Mail size={13} /> info@oula.co.za
              </a>
              <a
                href="https://wa.me/27722332665"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 font-body text-xs text-white/40 hover:text-spa-green-light transition-colors"
              >
                <MessageCircle size={13} /> +27 72 233 2665
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h5 className="font-body text-gold-500 text-[11px] tracking-[0.3em] uppercase font-medium mb-5">
              Services
            </h5>
            <ul className="space-y-3">
              {[
                'Colon Care Hydrotherapy',
                'Ionic Foot Detox',
                'Infrared Therapy',
                'Ozone Therapy',
                'Quantum Testing',
                'Vitamin D Drops',
              ].map((s) => (
                <li key={s}>
                  <a href="#treatments" className="font-body text-white/30 hover:text-white/60 text-xs transition-colors">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Branches */}
          <div>
            <h5 className="font-body text-gold-500 text-[11px] tracking-[0.3em] uppercase font-medium mb-5">
              Branches
            </h5>
            <div className="space-y-4 mb-6">
              {[
                { city: 'Durban', region: 'KwaZulu-Natal' },
                { city: 'Johannesburg', region: 'Gauteng' },
              ].map((b) => (
                <div key={b.city} className="flex items-start gap-2">
                  <MapPin size={13} className="text-gold-500/60 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-body text-white/60 text-xs font-medium">{b.city}</p>
                    <p className="font-body text-white/25 text-[11px]">{b.region}</p>
                  </div>
                </div>
              ))}
            </div>
            <a
              href="#booking"
              className="inline-block gold-gradient text-spa-dark font-body text-[11px] font-semibold tracking-wider uppercase px-5 py-2.5 rounded-full hover:shadow-lg hover:shadow-gold-500/20 transition-all duration-300"
            >
              Book Now
            </a>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-white/15 text-xs">
            &copy; {year} Totality Wellness Spa. All rights reserved.
          </p>
          <p className="font-body text-white/15 text-xs">
            Durban &middot; Johannesburg &middot; South Africa
          </p>
        </div>
      </div>
    </footer>
  );
}
