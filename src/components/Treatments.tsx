import { Clock, Sparkles } from 'lucide-react';
import { treatments } from '../data/services';
import SectionHeading from './SectionHeading';

export default function Treatments() {
  return (
    <section id="treatments" className="py-24 bg-spa-cream">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          eyebrow="Wellness Treatments"
          title="Healing From Within"
          subtitle="Our signature therapies are designed to detoxify, restore, and rejuvenate your body using time-honoured and cutting-edge holistic techniques."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {treatments.map((t) => (
            <div
              key={t.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-gold-500/5 transition-all duration-500 border border-gold-100/60 hover:border-gold-300/60 hover:-translate-y-1.5"
            >
              <div className="h-0.5 gold-gradient" />
              <div className="p-8">
                <div className="flex items-start justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl bg-gold-50 border border-gold-200/60 flex items-center justify-center group-hover:bg-gold-500 group-hover:border-gold-500 transition-all duration-300">
                    <Sparkles size={17} className="text-gold-500 group-hover:text-spa-dark transition-colors duration-300" />
                  </div>
                  {t.duration && (
                    <span className="flex items-center gap-1.5 font-body text-[11px] text-gray-400 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                      <Clock size={11} />
                      {t.duration}
                    </span>
                  )}
                </div>
                <h3 className="font-display text-[#1a1a1a] font-semibold text-lg mb-3 leading-snug group-hover:text-gold-600 transition-colors duration-300">
                  {t.name}
                </h3>
                <p className="font-body text-gray-400 text-sm leading-relaxed mb-7">{t.description}</p>
                <div className="flex items-center justify-between pt-5 border-t border-gray-100">
                  <span className="font-display text-2xl font-light text-gold-500">
                    R{t.price}
                  </span>
                  <a
                    href="#booking"
                    className="font-body text-[11px] tracking-widest uppercase font-semibold text-gold-500 border border-gold-300/50 px-5 py-2.5 rounded-full hover:bg-gold-500 hover:text-spa-dark hover:border-gold-500 transition-all duration-300"
                  >
                    Book
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
