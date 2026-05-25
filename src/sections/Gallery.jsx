import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioImages } from '../config/images';
import Lightbox from '../components/Lightbox';
import { API } from '../config/api';

export const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxState, setLightboxState] = useState({
    isOpen: false,
    activeIdx: 0
  });

  const categories = [
    { id: 'all', label: 'All Work' },
    { id: 'wedding', label: 'Weddings' },
    { id: 'portrait', label: 'Portraits' },
    { id: 'cinematic', label: 'Outdoor & Cinematic' },
    { id: 'traditional', label: 'Traditional' }
  ];

  const [dbImages, setDbImages] = useState([]);

  useEffect(() => {
    fetch(`${API}/images`)
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          const mapped = data.map(img => ({
            id: `db-${img.id}`,
            category: img.category,
            url: img.url,
            title: img.title || 'Untitled',
            caption: img.caption || '',
          }));
          setDbImages(mapped);
        }
      })
      .catch(() => {});
  }, []);

  // Merge static + db images (db images first)
  const allImages = [...dbImages, ...portfolioImages.gallery];

  // Filter images based on state selection
  const filteredImages = activeFilter === 'all' 
    ? allImages 
    : allImages.filter(img => img.category === activeFilter);

  // Lightbox handlers
  const openLightbox = (image) => {
    // Find index of clicked image within the currently FILTERED list
    const index = filteredImages.findIndex(img => img.id === image.id);
    setLightboxState({
      isOpen: true,
      activeIdx: index >= 0 ? index : 0
    });
  };

  const closeLightbox = () => {
    setLightboxState(prev => ({ ...prev, isOpen: false }));
  };

  const navigatePrev = () => {
    setLightboxState(prev => {
      const nextIdx = prev.activeIdx === 0 ? filteredImages.length - 1 : prev.activeIdx - 1;
      return { ...prev, activeIdx: nextIdx };
    });
  };

  const navigateNext = () => {
    setLightboxState(prev => {
      const nextIdx = prev.activeIdx === filteredImages.length - 1 ? 0 : prev.activeIdx + 1;
      return { ...prev, activeIdx: nextIdx };
    });
  };

  const currentLightboxImage = lightboxState.isOpen ? filteredImages[lightboxState.activeIdx] : null;

  return (
    <section id="gallery" className="relative w-full py-24 lg:py-32 bg-matte-black">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="mb-12 md:mb-16 text-center">
          <span className="text-[10px] tracking-[0.4em] text-silver/60 uppercase font-light">
            Visual Storytelling
          </span>
          <h2 className="text-4xl md:text-6xl text-soft-white font-serif tracking-wide mt-2">
            Selected Portfolios
          </h2>
          <p className="text-xs md:text-sm text-silver/70 font-light max-w-xl mx-auto mt-4 leading-relaxed">
            Browse through our editorial captures. We treat every single frame as a work of fine art, preserving candidate gestures and dramatic, luxury color-graded light.
          </p>
          <div className="w-12 h-[1px] bg-gold mt-6 mx-auto" />
        </div>

        {/* 1. FILTER CONTROLS DECK */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-16 max-w-2xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-5 py-2.5 rounded-full text-[10px] md:text-xs tracking-widest uppercase transition-all duration-500 relative overflow-hidden cursor-pointer ${
                activeFilter === cat.id
                  ? 'text-matte-black font-semibold'
                  : 'text-silver/80 hover:text-soft-white border border-white/5 bg-charcoal/30'
              }`}
            >
              <span className="relative z-10">{cat.label}</span>
              {activeFilter === cat.id && (
                <motion.span
                  layoutId="activeFilterPill"
                  className="absolute inset-0 bg-gold rounded-full"
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* 2. ASYMMETRICAL EDITORIAL MASONRY GRID */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, index) => {
              // Create dynamic editorial spans to mimic an asymmetric masonry layout
              // For example: indexes 0, 5, 8 span larger areas for visual rhythm
              let gridClasses = "lg:col-span-4"; // Default
              if (index % 5 === 0) {
                gridClasses = "lg:col-span-8 lg:row-span-2 h-[350px] md:h-[620px]";
              } else {
                gridClasses = "lg:col-span-4 h-[250px] md:h-[295px]";
              }

              return (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  onClick={() => openLightbox(image)}
                  className={`${gridClasses} relative overflow-hidden rounded-lg border border-white/5 cursor-pointer group shadow-lg`}
                >
                  {/* Photo Asset with Zoom Hover */}
                  <img
                    src={image.url}
                    alt={image.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[1200ms] cubic-bezier(0.19, 1, 0.22, 1) group-hover:scale-105 filter group-hover:brightness-[0.85] contrast-[1.05]"
                  />

                  {/* Soft Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                  {/* Minimal Caption Overlay on Hover */}
                  <div className="absolute inset-x-0 bottom-0 p-6 z-20 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end text-left">
                    <span className="text-[9px] tracking-widest text-gold uppercase font-medium">
                      {image.category}
                    </span>
                    <h3 className="text-xl text-soft-white font-serif mt-1 font-light tracking-wide">
                      {image.title}
                    </h3>
                    <p className="text-[10px] text-silver/70 font-light mt-1.5 line-clamp-1">
                      {image.caption}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* 3. LIGHTBOX SYSTEM */}
        <Lightbox
          isOpen={lightboxState.isOpen}
          activeImage={currentLightboxImage}
          images={filteredImages}
          onClose={closeLightbox}
          onPrev={navigatePrev}
          onNext={navigateNext}
        />

      </div>
    </section>
  );
};

export default Gallery;
