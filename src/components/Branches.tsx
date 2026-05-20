import { MapPin, Mail, MessageCircle, Clock } from 'lucide-react';
import SectionHeading from './SectionHeading';

const branches = [
  {
    city: 'Durban',
    region: 'KwaZulu-Natal',
    description: 'Serving the heart of KwaZulu-Natal with premium wellness treatments and holistic health solutions.',
    image:
      'https://images.pexels.com/photos/3560044/pexels-photo-3560044.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    city: 'Johannesburg',
    region: 'Gauteng',
    description: 'Bringing holistic wellness to Gauteng — your sanctuary in the city of gold.',
    image:
      'https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

export default function Branches() {
  return (
    <section id="branches" className="py-24 bg-spa-cream">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          eyebrow="Our Locations"
          title="Find Your Branch"
          subtitle="Two convenient locations across South Africa, each offering the full Totality Wellness Spa experience."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {branches.map((branch) => (
            <div
              key={branch.city}
              className="group rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-gold-500/5 transition-all duration-500 bg-white border border-gold-100/40 hover:border-gold-300/40"
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={branch.image}
                  alt={`${branch.city} branch`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-spa-dark/70 via-spa-dark/20 to-transparent" />
                <div className="absolute bottom-5 left-6">
                  <span className="flex items-center gap-2 text-white font-display font-semibold text-xl">
                    <MapPin size={18} className="text-gold-400" />
                    {branch.city}
                  </span>
                  <span className="text-white/50 font-body text-xs ml-7">{branch.region}</span>
                </div>
              </div>
              <div className="p-7">
                <p className="font-body text-gray-400 text-sm leading-relaxed mb-6">{branch.description}</p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 font-body text-sm text-gray-500">
                    <Mail size={14} className="text-gold-500 flex-shrink-0" />
                    <a href="mailto:info@oula.co.za" className="hover:text-gold-500 transition-colors">
                      info@oula.co.za
                    </a>
                  </div>
                  <div className="flex items-center gap-3 font-body text-sm text-gray-500">
                    <MessageCircle size={14} className="text-spa-green flex-shrink-0" />
                    <a
                      href="https://wa.me/27722332665"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-spa-green transition-colors"
                    >
                      +27 72 233 2665
                    </a>
                  </div>
                  <div className="flex items-center gap-3 font-body text-sm text-gray-500">
                    <Clock size={14} className="text-gold-500 flex-shrink-0" />
                    Mon – Sat, 8am – 6pm
                  </div>
                </div>
                <a
                  href="#booking"
                  className="block text-center gold-gradient text-spa-dark font-body text-sm font-semibold tracking-wider uppercase py-3.5 rounded-full hover:shadow-lg hover:shadow-gold-500/20 transition-all duration-300"
                >
                  Book at {branch.city}
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-spa-dark rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'radial-gradient(circle, #C9A84C 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }} />
          <div className="relative">
            <h4 className="font-display text-white font-semibold text-xl mb-1">Get In Touch</h4>
            <p className="font-body text-white/40 text-sm">We're available Monday to Saturday, 8am – 6pm</p>
          </div>
          <div className="relative flex flex-col sm:flex-row gap-3">
            <a
              href="mailto:info@oula.co.za"
              className="flex items-center gap-2 text-gold-400 border border-gold-500/25 font-body px-6 py-3 rounded-full text-sm hover:bg-gold-500/10 transition-colors"
            >
              <Mail size={14} />
              info@oula.co.za
            </a>
            <a
              href="https://wa.me/27722332665"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-spa-green text-white font-body px-6 py-3 rounded-full text-sm font-medium hover:bg-spa-green-dark transition-all duration-300 hover:shadow-lg hover:shadow-spa-green/20"
            >
              <MessageCircle size={14} />
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
