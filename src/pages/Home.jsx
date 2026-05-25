import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import Hero from '../sections/Hero';
import Testimonials from '../sections/Testimonials';
import Instagram from '../sections/Instagram';
import localCinematic from '../assets/YR400201.JPG';

export const Home = () => {
  return (
    <div className="w-full">
      <SEO 
        title="Luxury Wedding & Portrait Photographer"
        description="Explore the luxury cinematic photography portfolio of Yarlagadda Photography in Guntur. Specializing in high-end, fine-art wedding documentation, candid couple narratives, and editorial portraits."
        keywords="Yarlagadda Photography, Guntur wedding photographer, luxury wedding photography, cinematic couple shoot, Guntur fine art photographer, editorial portraits"
      />
      {/* 1. Fullscreen Visual Hero */}
      <Hero />

      {/* 2. Philosophy Summary Callout */}
      <section id="about" className="relative w-full py-20 bg-charcoal/30 border-b border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Image Preview */}
            <div className="lg:col-span-5 relative group rounded-lg overflow-hidden border border-white/5 shadow-2xl">
              <img 
                src={localCinematic} 
                alt="Bridesmaid candid" 
                className="w-full h-[320px] object-cover transition-transform duration-[1200ms] group-hover:scale-105 filter group-hover:brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-matte-black/50 to-transparent pointer-events-none" />
            </div>

            {/* Right Column: Mini Bio Narrative */}
            <div className="lg:col-span-7 flex flex-col gap-5 text-left md:pl-6">
              <span className="text-[10px] tracking-[0.4em] text-silver/60 uppercase font-light">
                Our Philosophy
              </span>
              <h2 className="text-3xl md:text-5xl text-soft-white font-serif tracking-wide leading-tight">
                Capturing the Poetry of Life
              </h2>
              <p className="text-xs md:text-sm text-silver/80 leading-relaxed font-light">
                We believe photography is not merely about recording details—it is about capturing a feeling, a fleeting heartbeat suspended in time forever. Specializing in high-end wedding documentation and editorial couples portraiture.
              </p>
              <div className="mt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-gold hover:bg-gold-hover text-matte-black text-[10px] tracking-widest uppercase font-semibold rounded-full shadow-lg transition-all duration-300"
                >
                  Discover Our Story
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Testimonials Carousel */}
      <Testimonials />

      {/* 4. Instagram Feed Crop Grid */}
      <Instagram />

      {/* 5. Elegant Pre-Footer CTA */}
      <section className="relative w-full py-20 bg-matte-black overflow-hidden">
        {/* Soft red ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-gold/5 blur-[100px] pointer-events-none z-0" />

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center flex flex-col items-center gap-6">
          <span className="text-[10px] tracking-[0.4em] text-silver/60 uppercase font-light">
            Securing Your Date
          </span>
          <h2 className="text-4xl md:text-6xl text-soft-white font-serif tracking-wide">
            Let's Create Something Timeless
          </h2>
          <p className="text-xs md:text-sm text-silver/70 font-light max-w-md mx-auto leading-relaxed">
            Our booking availability is limited and often fills up to 12 months in advance. Get in touch with us to schedule an alignment or secure your wedding calendar date.
          </p>
          <div className="mt-4">
            <Link
              to="/inquire"
              className="px-8 py-4 border border-gold hover:border-gold-hover text-gold hover:text-soft-white hover:bg-gold/10 rounded-full text-xs tracking-widest uppercase font-semibold transition-all duration-500 shadow-lg hover:shadow-[0_0_20px_rgba(237,27,36,0.15)] btn-luxury"
            >
              Inquire & Book Shoot
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
