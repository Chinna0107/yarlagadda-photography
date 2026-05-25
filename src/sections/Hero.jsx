import React from 'react';
import { ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { portfolioImages } from '../config/images';

const InstagramIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);



export const Hero = () => {
  const { url, title, tagline, description } = portfolioImages.hero;

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      id="home" 
      className="relative w-full h-screen bg-matte-black flex items-center justify-center overflow-hidden"
    >
      {/* 1. CINEMATIC FULLSCREEN BG IMAGE CONTAINER WITH KEN BURNS */}
      <div className="absolute inset-0 z-0 select-none">
        <div className="w-full h-full overflow-hidden">
          <img 
            src={url} 
            alt="Cinematic Portrait Showcase" 
            className="w-full h-full object-cover ken-burns-active brightness-[0.75] contrast-[1.02]"
            draggable="false"
          />
        </div>
        
        {/* Soft, delicate dark gradients to enhance typography readability without blacking out the couple */}
        <div className="absolute inset-0 bg-gradient-to-t from-matte-black via-black/10 to-black/30 z-10" />
        <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_40%,rgba(10,10,10,0.6)_100%] z-10" />
      </div>

      {/* 2. LEFT FLOATING SOCIAL COLUMN */}
      <div className="absolute left-6 lg:left-12 bottom-24 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 z-20 flex flex-row lg:flex-col items-center gap-6">
        <span className="hidden lg:block w-[1px] h-12 bg-silver/20" />
        <a 
          href="https://instagram.com/yarlagaddaphotography" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-silver/60 hover:text-gold hover:-translate-y-1 transition-all duration-300"
          aria-label="Follow us on Instagram"
        >
          <InstagramIcon className="w-4 h-4" />
        </a>
        
        {/* WhatsApp Custom Editorial Icon */}
        <a 
          href="https://wa.me/919849819634" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-silver/60 hover:text-gold hover:-translate-y-1 transition-all duration-300 flex items-center justify-center font-bold text-xs"
          aria-label="Chat on WhatsApp"
        >
          WA
        </a>
        <span className="hidden lg:block w-[1px] h-12 bg-silver/20" />
      </div>

      {/* 3. CENTER BRAND TYPOGRAPHY BLOCK */}
      <div className="relative z-20 text-center px-6 max-w-4xl flex flex-col items-center">
        
        {/* Luxury Subtitle Label */}
        <motion.span 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
          className="text-xs lg:text-sm tracking-[0.35em] text-silver font-light uppercase mb-4"
        >
          {description}
        </motion.span>

        {/* Brand Name Headline */}
        <motion.h1 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
          className="text-5xl md:text-8xl font-serif text-soft-white tracking-widest uppercase mb-4 leading-none text-cinematic-glow"
        >
          {title}
        </motion.h1>

        {/* Tagline Statement */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
          className="text-sm md:text-lg tracking-[0.3em] font-serif text-gold font-light italic mb-10"
        >
          “{tagline}”
        </motion.p>

        {/* Call to Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.19, 1, 0.22, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            to="/gallery"
            className="px-8 py-3.5 bg-soft-white hover:bg-gold text-matte-black hover:text-soft-white rounded-full text-xs tracking-widest uppercase font-semibold transition-all duration-500 shadow-lg hover:shadow-[0_0_25px_rgba(237,27,36,0.3)] min-w-[180px] text-center cursor-pointer block"
          >
            View Portfolio
          </Link>
          <Link
            to="/inquire"
            className="px-8 py-3.5 border border-white/20 hover:border-gold rounded-full text-xs tracking-widest uppercase font-light text-soft-white hover:text-gold hover:bg-white/5 transition-all duration-500 min-w-[180px] text-center cursor-pointer block"
          >
            Book a Shoot
          </Link>
        </motion.div>
      </div>

      {/* 4. SCROLL DOWN INDICATION TRAIL */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer group"
        onClick={(e) => handleScrollTo(e, 'about')}
      >
        <span className="text-[9px] tracking-[0.4em] uppercase text-silver/40 group-hover:text-gold transition-colors duration-300 font-light pl-0.5">
          Scroll
        </span>
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="text-silver/40 group-hover:text-gold transition-colors duration-300"
        >
          <ArrowDown className="w-3.5 h-3.5" />
        </motion.div>
      </motion.div>

    </section>
  );
};

export default Hero;
