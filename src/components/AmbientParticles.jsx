import React, { useEffect, useState } from 'react';

export const AmbientParticles = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate a fixed set of randomized particles to minimize DOM nodes and memory
    const generatedParticles = Array.from({ length: 25 }).map((_, index) => {
      const size = Math.random() * 3 + 1; // 1px to 4px
      const left = Math.random() * 100; // 0% to 100%
      const duration = Math.random() * 15 + 15; // 15s to 30s
      const delay = Math.random() * -20; // Pre-warm the animation loop so they don't all start from the bottom

      return {
        id: index,
        style: {
          width: `${size}px`,
          height: `${size}px`,
          left: `${left}%`,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
          opacity: Math.random() * 0.4 + 0.1,
        }
      };
    });

    setParticles(generatedParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={particle.style}
        />
      ))}
    </div>
  );
};

export default AmbientParticles;
