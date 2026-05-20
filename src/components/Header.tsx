import { useState, useEffect } from 'react';
import { Menu, X, Leaf } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Treatments', href: '#treatments' },
  { label: 'Vitamin D', href: '#vitamin-d' },
  { label: 'Products', href: '#products' },
  { label: 'Branches', href: '#branches' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-spa-dark/95 backdrop-blur-lg shadow-lg shadow-black/20 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-full gold-gradient flex items-center justify-center shadow-lg shadow-gold-500/20 group-hover:shadow-gold-500/40 transition-shadow">
            <Leaf size={16} className="text-spa-dark" />
          </div>
          <div className="flex flex-col">
            <span className="gold-text font-display font-semibold tracking-[0.15em] text-sm uppercase leading-none">
              Totality
            </span>
            <span className="text-white/60 font-body font-light tracking-[0.2em] text-[10px] uppercase leading-none mt-1">
              Wellness Spa
            </span>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-white/70 hover:text-gold-300 font-body text-[13px] tracking-wider uppercase transition-colors duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-px after:bg-gold-500 after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#booking"
            className="gold-gradient text-spa-dark font-body font-semibold text-[13px] tracking-wider uppercase px-6 py-2.5 rounded-full hover:shadow-lg hover:shadow-gold-500/30 transition-all duration-300 hover:scale-105"
          >
            Book Now
          </a>
        </nav>

        <button
          className="lg:hidden text-white/80 hover:text-gold-300 p-1 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div
        className={`lg:hidden overflow-hidden transition-all duration-400 bg-spa-dark/98 backdrop-blur-lg ${
          menuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="px-6 py-6 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-white/70 hover:text-gold-300 font-body text-sm tracking-wider uppercase py-3 border-b border-white/5 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#booking"
            onClick={() => setMenuOpen(false)}
            className="gold-gradient text-spa-dark font-body font-semibold text-sm tracking-wider uppercase py-3 rounded-full text-center mt-3"
          >
            Book Now
          </a>
        </nav>
      </div>
    </header>
  );
}
