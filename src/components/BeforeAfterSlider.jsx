import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const BeforeAfterSlider = ({ imageUrl }) => {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 to 100)
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let position = (x / rect.width) * 100;
    if (position < 0) position = 0;
    if (position > 100) position = 100;
    setSliderPosition(position);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[300px] md:h-[450px] rounded-lg overflow-hidden select-none border border-white/5 cursor-ew-resize group"
      onMouseDown={() => setIsDragging(true)}
      onTouchStart={() => setIsDragging(true)}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {/* 100% Width: AFTER EDITING (Cinematic Color Graded - Base Layer) */}
      <div className="absolute inset-0 w-full h-full select-none">
        <img 
          src={imageUrl} 
          alt="Cinematic edit" 
          className="w-full h-full object-cover"
          draggable="false"
        />
        {/* Caption Tag */}
        <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded border border-white/5 text-[10px] tracking-widest uppercase text-gold font-medium">
          Color Graded Edit
        </div>
      </div>

      {/* Clipped Layer: BEFORE EDITING (RAW Camera Profile - Clipped Overlay) */}
      <div 
        className="absolute inset-0 h-full overflow-hidden select-none"
        style={{ width: `${sliderPosition}%` }}
      >
        {/* Force image to remain full-width inside the clipped parent container */}
        <div 
          className="absolute inset-0 h-full"
          style={{ width: containerRef.current ? containerRef.current.offsetWidth : '100%' }}
        >
          <img 
            src={imageUrl} 
            alt="RAW camera capture" 
            // Apply flat, desaturated desat-contrast RAW profile dynamically
            className="w-full h-full object-cover filter saturate-[0.65] contrast-[0.8] brightness-[0.95] sepia-[0.1]"
            style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100vw' }}
            draggable="false"
          />
          {/* Caption Tag */}
          <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded border border-white/5 text-[10px] tracking-widest uppercase text-silver font-medium">
            RAW Camera Shot
          </div>
        </div>
      </div>

      {/* Slider Separation Bar & Handle */}
      <div 
        className="absolute top-0 bottom-0 w-[2px] bg-white/30 backdrop-blur pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Floating circular gold handle */}
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-charcoal border-2 border-gold/70 text-gold flex items-center justify-center shadow-[0_0_15px_rgba(237,27,36,0.4)] transition-transform duration-300 group-hover:scale-110">
          <div className="flex items-center text-gold">
            <ChevronLeft className="w-3.5 h-3.5 -mr-0.5" />
            <ChevronRight className="w-3.5 h-3.5 -ml-0.5" />
          </div>
        </div>
      </div>

      {/* Subtle Drag Prompt Overlay */}
      <div className="absolute inset-x-0 top-4 text-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <span className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/5 text-[10px] tracking-widest uppercase text-soft-white font-light">
          Drag slider to view the transformation
        </span>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
