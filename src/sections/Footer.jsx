import React, { useState, useEffect } from 'react';
import { ArrowUp, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoImg from '../assets/logo.jpg';

const InstagramIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export const Footer = () => {
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  useEffect(() => {
    const handleScrollVisibility = () => {
      setShowScrollBtn(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScrollVisibility);
    return () => window.removeEventListener('scroll', handleScrollVisibility);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full pt-16 pb-12 bg-charcoal border-t border-white/5 z-20 select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Core Footer Deck */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-start text-left mb-16">
          
          {/* Column 1: Editorial Branding */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <Link 
              to="/" 
              className="flex items-center gap-2.5 group cursor-pointer"
            >
              <img 
                src={logoImg} 
                alt="Yarlagadda Photography Logo" 
                className="w-8 h-8 rounded-full object-cover border border-gold/40 group-hover:scale-105 transition-transform duration-500 shadow-md"
              />
              <div className="flex flex-col">
                <span className="text-base tracking-[0.25em] font-serif uppercase text-soft-white group-hover:text-gold transition-colors duration-300 font-medium">
                  Yarlagadda
                </span>
                <span className="text-[8px] tracking-[0.4em] font-sans uppercase text-silver/60 -mt-0.5">
                  Photography
                </span>
              </div>
            </Link>
            <p className="text-[11px] text-silver/60 font-light leading-relaxed max-w-xs">
              Luxury cinematic photography for couples who value poetry in images, raw emotional moments, and fine-art editorial craftsmanship.
            </p>
            
            {/* Direct Coordinates */}
            <div className="flex flex-col text-[11px] text-silver/50 tracking-wider gap-1.5 uppercase">
              <span>Studio: SVN Colony / Udyoga Nagar, Guntur</span>
              <span>Desk: +91 98498 19634</span>
            </div>
          </div>

          {/* Column 2: Elegant Sitemap */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <h4 className="text-xs tracking-widest text-gold uppercase font-semibold">
              Explore Portfolio
            </h4>
            <div className="grid grid-cols-2 gap-y-2.5 gap-x-4">
              <Link 
                to="/" 
                className="text-[11px] text-silver/80 hover:text-soft-white tracking-widest uppercase font-light transition-colors duration-300 cursor-pointer"
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="text-[11px] text-silver/80 hover:text-soft-white tracking-widest uppercase font-light transition-colors duration-300 cursor-pointer"
              >
                About
              </Link>
              <Link 
                to="/gallery" 
                className="text-[11px] text-silver/80 hover:text-soft-white tracking-widest uppercase font-light transition-colors duration-300 cursor-pointer"
              >
                Gallery
              </Link>

              <Link 
                to="/services" 
                className="text-[11px] text-silver/80 hover:text-soft-white tracking-widest uppercase font-light transition-colors duration-300 cursor-pointer"
              >
                Services
              </Link>
              <Link 
                to="/inquire" 
                className="text-[11px] text-silver/80 hover:text-soft-white tracking-widest uppercase font-light transition-colors duration-300 cursor-pointer"
              >
                Inquire
              </Link>
            </div>
          </div>

          {/* Column 3: Social Desk Links */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <h4 className="text-xs tracking-widest text-gold uppercase font-semibold">
              Social Presence
            </h4>
            <div className="flex items-center gap-4 mt-1">
              <a 
                href="https://instagram.com/yarlagaddaphotography" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-matte-black border border-white/5 text-silver/70 hover:text-gold hover:border-gold/30 flex items-center justify-center transition-all duration-300 cursor-pointer"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a 
                href="https://wa.me/919849819634" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-matte-black border border-white/5 text-silver/70 hover:text-gold hover:border-gold/30 flex items-center justify-center transition-all duration-300 cursor-pointer"
                aria-label="WhatsApp Chat"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
            <p className="text-[9px] text-silver/40 font-light mt-2 uppercase tracking-widest">
              Available Worldwide for Destination Assignments
            </p>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Archival */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left text-[10px] text-silver/40 tracking-widest uppercase font-light">
          <span>
            © {currentYear} Yarlagadda Photography. All Rights Reserved.
          </span>
          <span className="flex items-center gap-1.5 pl-0.5">
            Made with <i>passion</i> by <a href="https://zewo.in" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-soft-white transition-colors duration-300">Zewo</a>
          </span>
        </div>

      </div>

      {/* FLOATING ACTION SCROLL TO TOP CONTROL */}
      {showScrollBtn && (
        <button
          onClick={handleScrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 bg-charcoal/80 glassmorphism-gold text-gold rounded-full border border-gold/20 shadow-2xl hover:bg-gold hover:text-matte-black transition-all duration-500 cursor-pointer group"
          aria-label="Scroll to top of the page"
        >
          <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform duration-300" />
        </button>
      )}

    </footer>
  );
};

export default Footer;
