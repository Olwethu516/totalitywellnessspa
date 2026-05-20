import { ShoppingBag, ExternalLink } from 'lucide-react';
import { products } from '../data/services';
import SectionHeading from './SectionHeading';

export default function Products() {
  return (
    <section id="products" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          eyebrow="Health Products"
          title="Premium Wellness Range"
          subtitle="We stock a curated selection of high-quality Edmark health products and supplements to support your wellness journey beyond the spa."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => {
            const isEdmark = p.id === 'edmark-products';
            return (
              <div
                key={p.id}
                className={`group rounded-2xl overflow-hidden border transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl ${
                  isEdmark
                    ? 'border-spa-green/30 bg-gradient-to-b from-green-50/50 to-white hover:border-spa-green/60 hover:shadow-spa-green/5'
                    : 'border-gold-100/60 bg-gold-50/30 hover:border-gold-300/60 hover:shadow-gold-500/5'
                }`}
              >
                <div className={`h-0.5 ${isEdmark ? 'bg-spa-green' : 'gold-gradient'}`} />
                <div className="p-7">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 ${
                      isEdmark
                        ? 'bg-spa-green/10 border border-spa-green/20 group-hover:bg-spa-green group-hover:border-spa-green'
                        : 'bg-gold-500/10 border border-gold-200/60 group-hover:bg-gold-500 group-hover:border-gold-500'
                    }`}
                  >
                    <ShoppingBag
                      size={17}
                      className={`transition-colors duration-300 ${
                        isEdmark
                          ? 'text-spa-green group-hover:text-white'
                          : 'text-gold-500 group-hover:text-spa-dark'
                      }`}
                    />
                  </div>
                  <h3 className="font-display text-[#1a1a1a] font-semibold text-base mb-3 leading-snug group-hover:text-gold-600 transition-colors duration-300">
                    {p.name}
                  </h3>
                  <p className="font-body text-gray-400 text-sm leading-relaxed mb-7">{p.description}</p>
                  <div className="flex items-center justify-between pt-5 border-t border-gray-100">
                    {p.price > 0 ? (
                      <span className="font-display text-xl font-light text-gold-500">R{p.price}</span>
                    ) : (
                      <span className="font-body text-sm text-spa-green font-medium">Enquire In-Store</span>
                    )}
                    {!isEdmark ? (
                      <a
                        href="#booking"
                        className="font-body text-[11px] tracking-widest uppercase font-semibold text-gold-500 border border-gold-300/50 px-5 py-2.5 rounded-full hover:bg-gold-500 hover:text-spa-dark hover:border-gold-500 transition-all duration-300"
                      >
                        Order
                      </a>
                    ) : (
                      <a
                        href="#branches"
                        className="flex items-center gap-1 font-body text-[11px] tracking-widest uppercase font-semibold text-spa-green border border-spa-green/40 px-5 py-2.5 rounded-full hover:bg-spa-green hover:text-white hover:border-spa-green transition-all duration-300"
                      >
                        Find Us <ExternalLink size={10} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 rounded-2xl bg-gradient-to-r from-green-50/80 via-gold-50/50 to-gold-50/80 border border-gold-200/40 p-8 flex flex-col md:flex-row items-center gap-6 justify-between">
          <div>
            <h4 className="font-display text-[#1a1a1a] font-semibold text-lg mb-1">Full Edmark Product Range</h4>
            <p className="font-body text-gray-400 text-sm">
              We are authorised Edmark distributors. Visit any of our branches or WhatsApp us for the complete product listing and pricing.
            </p>
          </div>
          <a
            href="https://wa.me/27722332665"
            target="_blank"
            rel="noreferrer"
            className="whitespace-nowrap bg-spa-green text-white font-body text-sm font-semibold tracking-wider uppercase px-8 py-3.5 rounded-full hover:bg-spa-green-dark transition-all duration-300 hover:shadow-lg hover:shadow-spa-green/20"
          >
            WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}
