import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { portfolioImages } from '../config/images';

export const Showcase = () => {
  const containerRef = useRef(null);
  const showcaseSlides = portfolioImages.showcase;
  const [isMobile, setIsMobile] = useState(false);

  // Track window resizing to dynamically toggle horizontal vs vertical layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    // Initial trigger and event binding
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Track scroll position of the entire scroll-docking container (Active only on Desktop)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Map the vertical scroll progression (0 to 1) to horizontal translation (0% to -50% for 2 massive slides)
  const xTranslation = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  
  // Parallax typography movement triggers
  const textParallaxX = useTransform(scrollYProgress, [0, 1], [0, 150]);

  // --- MOBILE RESPONSIVE LAYOUT (Fluid Stacked Editorial Strips at 60fps) ---
  if (isMobile) {
    return (
      <div id="showcase" className="w-full bg-matte-black py-20 flex flex-col gap-12 border-b border-white/5 select-none">
        <div className="px-6 md:px-12 mb-6">
          <span className="text-[10px] tracking-[0.4em] text-silver/60 uppercase font-light">
            Signature Highlights
          </span>
          <h2 className="text-3xl md:text-5xl text-soft-white font-serif tracking-wide mt-2">
            Featured Masterpieces
          </h2>
          <div className="w-12 h-[1px] bg-gold mt-4" />
        </div>

        <div className="flex flex-col w-full gap-8 px-6 md:px-12">
          {showcaseSlides.map((slide, index) => (
            <div 
              key={index} 
              className="relative w-full min-h-[75vh] rounded-2xl overflow-hidden flex items-end p-6 md:p-12 border border-white/5 group shadow-2xl"
            >
              {/* Background Fullscreen Image */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={slide.url} 
                  alt={slide.title} 
                  className="w-full h-full object-cover filter brightness-[0.75] contrast-[1.02] group-hover:scale-[1.02] transition-transform duration-[1500ms]"
                  draggable="false"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-matte-black/90 via-black/20 to-transparent z-10" />
              </div>

              {/* Lower Text Info overlay */}
              <div className="relative z-20 max-w-xl text-left">
                <span className="text-[10px] tracking-[0.3em] text-gold uppercase font-semibold">
                  {slide.subtitle} — 0{index + 1}
                </span>
                <h3 className="text-3xl md:text-5xl text-soft-white font-serif tracking-wide mt-2 mb-4 leading-tight text-cinematic-glow">
                  {slide.title}
                </h3>
                <p className="text-xs md:text-sm text-silver/85 font-light leading-relaxed">
                  {slide.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // --- DESKTOP PREMIUM LAYOUT (Apple horizontal Scroll locked) ---
  return (
    <div 
      ref={containerRef} 
      id="showcase" 
      className="relative h-[200vh] bg-matte-black"
    >
      {/* Sticky viewport container (Locks screen in place while horizontal sliding executes) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
        
        {/* Horizontal Slider Strip */}
        <motion.div 
          style={{ x: xTranslation }}
          className="flex h-full w-[200vw]"
        >
          {showcaseSlides.map((slide, index) => (
            <div 
              key={index} 
              className="relative w-screen h-full flex-shrink-0 flex items-center justify-center bg-matte-black overflow-hidden"
            >
              
              {/* Fullscreen Masterpiece Image Asset */}
              <div className="absolute inset-0 z-0 select-none">
                <img 
                  src={slide.url} 
                  alt={slide.title} 
                  className="w-full h-full object-cover filter brightness-[0.75] contrast-[1.02]"
                  draggable="false"
                />
                
                {/* Sleek, soft vignette shadows that keep the subject bright */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 z-10" />
                <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-matte-black/80 via-transparent to-transparent z-10" />
                <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-matte-black/40 via-transparent to-transparent z-10" />
              </div>

              {/* Asymmetrical Typography Overlay (Apple Aesthetic) */}
              <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-start text-left mt-12 md:mt-0">
                <motion.div 
                  style={{ x: index === 0 ? textParallaxX : 0 }}
                  className="max-w-2xl"
                >
                  {/* Subtle luxury sub-label */}
                  <span className="text-xs md:text-sm tracking-[0.4em] text-gold uppercase font-light">
                    {slide.subtitle}
                  </span>
                  
                  {/* High-impact serif headline */}
                  <h3 className="text-5xl md:text-8xl text-soft-white font-serif tracking-wide mt-3 mb-6 leading-[1.1] text-cinematic-glow">
                    {slide.title}
                  </h3>
                  
                  {/* Descriptive micro-paragraph */}
                  <p className="text-sm md:text-base text-silver/80 font-light leading-relaxed max-w-lg">
                    {slide.description}
                  </p>

                  {/* Aesthetic visual hint */}
                  <div className="flex items-center gap-3 mt-8">
                    <span className="w-8 h-[1px] bg-gold" />
                    <span className="text-[10px] tracking-[0.3em] text-gold uppercase font-semibold">
                      Featured Work 0{index + 1}
                    </span>
                  </div>
                </motion.div>
              </div>

            </div>
          ))}
        </motion.div>

        {/* Small Scroll Guide Indicator Floating on bottom */}
        <div className="absolute bottom-10 right-6 lg:right-12 z-20 flex items-center gap-4 bg-charcoal/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/5 pointer-events-none">
          <div className="flex flex-col text-right">
            <span className="text-[8px] tracking-[0.2em] uppercase text-silver/60">Cinematic Scroll</span>
            <span className="text-[9px] tracking-widest uppercase text-gold font-medium mt-0.5">Keep Scrolling Down</span>
          </div>
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping" />
        </div>

      </div>
    </div>
  );
};

export default Showcase;
