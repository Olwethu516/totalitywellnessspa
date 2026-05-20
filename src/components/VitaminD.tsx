import { Droplets } from 'lucide-react';
import { vitaminD } from '../data/services';
import SectionHeading from './SectionHeading';

const accents = [
  { color: 'gold', iconBg: 'bg-gold-500/10', iconBorder: 'border-gold-500/20', iconColor: 'text-gold-400' },
  { color: 'energy', iconBg: 'bg-gold-500/10', iconBorder: 'border-gold-500/20', iconColor: 'text-gold-400' },
  { color: 'immune', iconBg: 'bg-spa-green/10', iconBorder: 'border-spa-green/20', iconColor: 'text-spa-green-light' },
  { color: 'jet', iconBg: 'bg-gold-500/10', iconBorder: 'border-gold-500/20', iconColor: 'text-gold-400' },
];

const labels = ['Radiance', 'Vitality', 'Defence', 'Ultimate'];

export default function VitaminD() {
  return (
    <section id="vitamin-d" className="py-24 bg-spa-dark relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle, #C9A84C 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }} />
      <div className="absolute top-0 left-0 right-0 section-divider" />

      <div className="relative max-w-7xl mx-auto px-6">
        <SectionHeading
          eyebrow="Vitamin D Drops"
          title="Liquid Sunshine"
          subtitle="Our premium vitamin D drop formulations are scientifically crafted to address specific wellness goals — from radiant skin to unstoppable energy."
          light
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {vitaminD.map((item, idx) => (
            <div
              key={item.id}
              className="group relative glass-card rounded-2xl p-7 hover:border-gold-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-gold-500/5 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-28 h-28 bg-gold-500/5 rounded-full blur-3xl group-hover:bg-gold-500/10 transition-colors duration-500" />

              <div className="relative">
                <div className={`w-11 h-11 rounded-xl ${accents[idx].iconBg} border ${accents[idx].iconBorder} flex items-center justify-center mb-5`}>
                  <Droplets size={17} className={accents[idx].iconColor} />
                </div>

                <span className="font-body text-[10px] tracking-[0.3em] uppercase font-medium text-gold-500/60">
                  {labels[idx]}
                </span>
                <h3 className="font-display text-white font-semibold text-lg mt-1 mb-3 leading-snug">
                  {item.name}
                </h3>
                <p className="font-body text-white/40 text-sm leading-relaxed mb-7">{item.description}</p>
                <div className="flex items-center justify-between pt-5 border-t border-white/5">
                  <span className="font-display text-2xl font-light text-gold-400">R{item.price}</span>
                  <a
                    href="#booking"
                    className="font-body text-[11px] tracking-widest uppercase font-semibold text-gold-400 border border-gold-500/25 px-5 py-2.5 rounded-full hover:bg-gold-500 hover:text-spa-dark hover:border-gold-500 transition-all duration-300"
                  >
                    Order
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
