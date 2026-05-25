import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CursorGlow = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Use MotionValues for high-performance animate-on-frame cursor rendering
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Apply ultra-smooth physics springs for the ambient trail lag
  const springConfig = { damping: 40, stiffness: 350, mass: 0.5 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Enable custom cursor mode class on desktop viewports
    if (window.innerWidth >= 1024) {
      document.body.classList.add('custom-cursor-active');
    }

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Track mouse hover on links, buttons, and form controls
    const addHoverEvents = () => {
      const interactives = document.querySelectorAll('a, button, input, textarea, select, [role="button"]');
      interactives.forEach(element => {
        element.addEventListener('mouseenter', () => setIsHovered(true));
        element.addEventListener('mouseleave', () => setIsHovered(false));
      });
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    
    // Set up hover event listeners after mount & initial rendering
    const intervalId = setInterval(addHoverEvents, 1000);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.body.classList.remove('custom-cursor-active');
      clearInterval(intervalId);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible || window.innerWidth < 1024) return null;

  return (
    <>
      {/* Outer Ambient Glow Circle (Smooth Spring Follow) */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-50 mix-blend-screen"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          background: isHovered 
            ? 'radial-gradient(circle, rgba(237, 27, 36, 0.4) 0%, rgba(237, 27, 36, 0) 70%)' 
            : 'radial-gradient(circle, rgba(191, 197, 204, 0.3) 0%, rgba(191, 197, 204, 0) 70%)',
          width: isHovered ? '80px' : '40px',
          height: isHovered ? '80px' : '40px',
        }}
      />

      {/* Inner Precision Dot (Instant Frame Position) */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-50"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: isHovered ? '#ed1b24' : '#F5F5F5',
          scale: isHovered ? 1.8 : 1,
          boxShadow: isHovered 
            ? '0 0 10px #ed1b24, 0 0 20px #ed1b24' 
            : '0 0 5px rgba(255, 255, 255, 0.5)',
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.1 }}
      />
    </>
  );
};

export default CursorGlow;
