import React, { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Testimonials = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  const reviews = [
    {
      id: 1,
      quote: "Yarlagadda did not just photograph our wedding; they captured the soul of our day. Looking through our album is like re-living the laughter and the silent tears all over again. Every frame is a true artistic masterpiece.",
      names: "Aditya & Malvika",
      event: "Palace Wedding — Udaipur, India",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=300&auto=format&fit=crop"
    },
    {
      id: 2,
      quote: "Their mastery of light and shadows is out of this world. We wanted something editorial, minimal, and away from typical generic wedding photography. Yarlagadda gave us a cinematic magazine portfolio that we will cherish forever.",
      names: "Vikram & Ananya",
      event: "Beachside Couple Shoot — Goa, India",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop"
    },
    {
      id: 3,
      quote: "Yarlagadda has an incredible, calming presence. They capture candid, completely unposed emotions with absolute stealth. Half the time, we didn't even notice they were there, yet they caught our most intimate glances perfectly.",
      names: "Rahul & Shruti",
      event: "Traditional Heritage Sangeet — Hyderabad, India",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop"
    }
  ];

  // Configure auto-scroll loop
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx(prev => (prev === reviews.length - 1 ? 0 : prev + 1));
    }, 6000);

    return () => clearInterval(timer);
  }, [reviews.length]);

  return (
    <section 
      id="testimonials" 
      className="relative w-full py-24 lg:py-32 bg-charcoal/30 overflow-hidden border-b border-white/5"
    >
      {/* Background ambient gold aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gold/5 blur-[120px] pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 text-center">
          <span className="text-[10px] tracking-[0.4em] text-silver/60 uppercase font-light">
            Love Letters
          </span>
          <h2 className="text-4xl md:text-5xl text-soft-white font-serif tracking-wide mt-2">
            Stories from Our Clients
          </h2>
          <div className="w-12 h-[1px] bg-gold mt-4 mx-auto" />
        </div>

        {/* Carousel Deck Wrapper */}
        <div className="relative min-h-[340px] md:min-h-[260px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, cubicBezier: [0.19, 1, 0.22, 1] }}
              className="glassmorphism p-8 md:p-12 rounded-2xl border border-white/5 shadow-2xl relative w-full flex flex-col md:flex-row items-center gap-8"
            >
              {/* Gold Quote Mark Overlay */}
              <Quote className="absolute top-6 right-8 w-10 h-10 text-gold/10 pointer-events-none" />

              {/* Client Desaturated Portrait */}
              <div className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-gold/30 shrink-0 shadow-lg select-none">
                <img 
                  src={reviews[activeIdx].avatar} 
                  alt={reviews[activeIdx].names} 
                  className="w-full h-full object-cover filter grayscale contrast-[1.1] brightness-[0.9]"
                  draggable="false"
                />
              </div>

              {/* Review Content */}
              <div className="flex flex-col text-center md:text-left">
                <p className="text-base md:text-lg text-soft-white font-serif font-light leading-relaxed italic">
                  “ {reviews[activeIdx].quote} ”
                </p>
                
                {/* Client Profile Meta */}
                <div className="mt-6 flex flex-col">
                  <span className="text-sm font-semibold tracking-widest uppercase text-gold">
                    {reviews[activeIdx].names}
                  </span>
                  <span className="text-[10px] tracking-widest text-silver/60 uppercase font-light mt-1">
                    {reviews[activeIdx].event}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Manual Indicator Dots */}
        <div className="flex items-center justify-center gap-3 mt-8">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                activeIdx === idx 
                  ? 'bg-gold w-6 shadow-[0_0_8px_#ed1b24]' 
                  : 'bg-silver/20 hover:bg-silver/40'
              }`}
              aria-label={`Jump to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
