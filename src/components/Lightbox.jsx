import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Lightbox = ({ isOpen, activeImage, images, onClose, onPrev, onNext }) => {
  
  // Bind standard keyboard keys for accessibility and desktop navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    // Lock scroll under the lightbox overlay
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || !activeImage) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex flex-col justify-between bg-black/95 backdrop-blur-md select-none">
        
        {/* LIGHTBOX HEADER CAPSLOCK PANEL */}
        <div className="w-full flex items-center justify-between p-6 bg-gradient-to-b from-black/80 to-transparent relative z-20">
          <div className="flex flex-col">
            <span className="text-[10px] tracking-widest text-gold uppercase font-semibold">
              Yarlagadda Photography
            </span>
            <span className="text-xs text-silver/80 tracking-wider capitalize font-light mt-0.5">
              Category: {activeImage.category}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-3 bg-white/5 hover:bg-gold/20 hover:text-gold text-soft-white rounded-full border border-white/5 transition-all duration-300 cursor-pointer"
            aria-label="Close Lightbox"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CENTER VIEWPORT GALLERY CONTAINER */}
        <div className="relative flex-1 flex items-center justify-center px-4 md:px-12">
          
          {/* Navigation Controls: Previous Button */}
          <button
            onClick={onPrev}
            className="absolute left-4 md:left-8 p-3 bg-white/5 hover:bg-gold/20 hover:text-gold text-soft-white rounded-full border border-white/5 transition-all duration-300 z-20 cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Core Image Display Area with Zoom Animations */}
          <motion.div
            key={activeImage.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="max-w-full max-h-[70vh] md:max-h-[75vh] flex items-center justify-center overflow-hidden"
          >
            <img
              src={activeImage.url}
              alt={activeImage.title}
              className="max-w-full max-h-[70vh] md:max-h-[75vh] object-contain rounded border border-white/5 shadow-2xl"
              draggable="false"
            />
          </motion.div>

          {/* Navigation Controls: Next Button */}
          <button
            onClick={onNext}
            className="absolute right-4 md:right-8 p-3 bg-white/5 hover:bg-gold/20 hover:text-gold text-soft-white rounded-full border border-white/5 transition-all duration-300 z-20 cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* BOTTOM CAPTION DECK */}
        <div className="w-full p-6 text-center bg-gradient-to-t from-black/80 to-transparent relative z-20">
          <div className="max-w-xl mx-auto glassmorphism px-6 py-4 rounded-lg border border-white/5">
            <h3 className="text-xl md:text-2xl text-soft-white font-serif tracking-wide">
              {activeImage.title}
            </h3>
            {activeImage.caption && (
              <p className="text-xs md:text-sm text-silver/80 font-light mt-1.5 leading-relaxed">
                {activeImage.caption}
              </p>
            )}
          </div>
        </div>

      </div>
    </AnimatePresence>
  );
};

export default Lightbox;
