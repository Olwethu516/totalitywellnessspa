import { Shield, Heart, Leaf, Star } from 'lucide-react';

const pillars = [
  {
    icon: Shield,
    title: 'Safe & Professional',
    description: 'All treatments are performed by trained wellness practitioners in a clean, professional environment.',
  },
  {
    icon: Heart,
    title: 'Holistic Approach',
    description: 'We treat the whole person — body, mind, and spirit — using complementary therapies that work in harmony.',
  },
  {
    icon: Leaf,
    title: 'Natural Wellness',
    description: 'Our products and treatments are rooted in natural, plant-based, and science-backed wellness principles.',
  },
  {
    icon: Star,
    title: 'Premium Experience',
    description: 'From first contact to post-treatment follow-up, every touchpoint is designed to exceed your expectations.',
  },
];

export default function WhyUs() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl shadow-black/10">
              <img
                src="https://images.pexels.com/photos/3757954/pexels-photo-3757954.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Spa wellness treatment"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 sm:-right-6 gold-gradient rounded-2xl p-6 shadow-2xl shadow-gold-500/20">
              <p className="text-spa-dark font-display font-bold text-4xl leading-none">2</p>
              <p className="text-spa-dark/70 font-body text-[11px] font-medium mt-1 tracking-wider uppercase">Branches across</p>
              <p className="text-spa-dark font-display font-semibold text-base">South Africa</p>
            </div>
            {/* Decorative dot pattern */}
            <div className="absolute -top-4 -left-4 w-24 h-24 opacity-20" style={{
              backgroundImage: 'radial-gradient(circle, #C9A84C 1px, transparent 1px)',
              backgroundSize: '8px 8px',
            }} />
          </div>

          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-10 bg-gradient-to-r from-transparent to-gold-500" />
              <span className="text-gold-500 font-body text-[11px] tracking-[0.35em] uppercase font-medium">
                Why Choose Us
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-[#1a1a1a] mb-4 leading-tight">
              Your Wellness Is Our{' '}
              <span className="font-semibold gold-text">Purpose</span>
            </h2>
            <p className="font-body text-gray-400 text-base leading-relaxed mb-12">
              At Totality Wellness Spa, we believe that true health is a state of complete harmony. Our therapists, treatments, and products are all chosen with one goal — your total wellbeing.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {pillars.map((p) => (
                <div key={p.title} className="group flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-gold-50 border border-gold-200/60 flex items-center justify-center flex-shrink-0 group-hover:bg-gold-500 group-hover:border-gold-500 transition-all duration-300">
                    <p.icon size={18} className="text-gold-500 group-hover:text-spa-dark transition-colors duration-300" />
                  </div>
                  <div>
                    <h4 className="font-display text-[#1a1a1a] font-semibold text-sm mb-1.5">{p.title}</h4>
                    <p className="font-body text-gray-400 text-xs leading-relaxed">{p.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#booking"
              className="inline-block mt-12 gold-gradient text-spa-dark font-body font-semibold text-sm tracking-wider uppercase px-12 py-4 rounded-full hover:shadow-xl hover:shadow-gold-500/20 transition-all duration-300 hover:scale-105"
            >
              Start Your Journey
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
