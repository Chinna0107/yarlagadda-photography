import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import logoImg from '../assets/logo.jpg';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/services', label: 'Services' },
    { path: '/inquire', label: 'Inquire' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Toggle scrolled glassmorphic styling
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-700 ${
          isScrolled 
            ? 'py-4 glassmorphism border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.8)]' 
            : 'py-6 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* LUXURY EDITORIAL BRAND LOGO */}
          <Link 
            to="/" 
            className="flex items-center gap-2.5 group cursor-pointer"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <img 
              src={logoImg} 
              alt="Yarlagadda Photography Logo" 
              className="w-8 h-8 rounded-full object-cover border border-gold/40 group-hover:scale-105 transition-transform duration-500 shadow-md"
            />
            <div className="flex flex-col">
              <span className="text-base tracking-[0.25em] font-serif uppercase text-soft-white group-hover:text-gold transition-colors duration-500 font-medium">
                Yarlagadda
              </span>
              <span className="text-[8px] tracking-[0.4em] font-sans uppercase text-silver/60 -mt-0.5">
                Photography
              </span>
            </div>
          </Link>

          {/* DESKTOP MINIMAL EDITORIAL MENU */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative py-1 text-xs tracking-widest uppercase font-light transition-all duration-300 cursor-pointer ${
                    isActive 
                      ? 'text-gold font-medium' 
                      : 'text-silver/80 hover:text-soft-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavLine"
                      className="absolute bottom-0 left-0 right-0 h-[1px] bg-gold"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT SIDE DESKTOP BOOKING CTA */}
          <div className="hidden md:flex items-center">
            <Link
              to="/inquire"
              className="px-6 py-2 border border-gold/40 hover:border-gold rounded-full text-[10px] tracking-widest uppercase font-light text-gold hover:text-soft-white hover:bg-gold/10 transition-all duration-500 shadow-[0_0_15px_rgba(237,27,36,0.05)] hover:shadow-[0_0_20px_rgba(237,27,36,0.15)] btn-luxury cursor-pointer"
            >
              Book a Shoot
            </Link>
          </div>

          {/* MOBILE TOGGLE TRIGGER */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-silver hover:text-gold transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* FULLSCREEN RESPONSIVE MOBILE NAVIGATION DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, cubicBezier: [0.19, 1, 0.22, 1] }}
            className="fixed inset-0 z-30 md:hidden bg-black/95 backdrop-blur-xl flex flex-col justify-center px-8"
          >
            <div className="flex flex-col gap-6 text-center mt-12">
              {navLinks.map((link, idx) => {
                const isActive = currentPath === link.path;
                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`text-lg tracking-[0.2em] uppercase font-serif block ${
                        isActive 
                          ? 'text-gold font-medium' 
                          : 'text-silver hover:text-soft-white'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: navLinks.length * 0.08 }}
                className="mt-8 self-center"
              >
                <Link
                  to="/inquire"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-8 py-3 border border-gold text-gold rounded-full text-xs tracking-widest uppercase font-light hover:bg-gold/15 transition-all duration-300 block text-center"
                >
                  Book a Shoot
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
