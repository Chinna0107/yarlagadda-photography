import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const MusicToggle = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const audioRef = useRef(null);

  const togglePlayback = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.log("Audio playback blocked by browser autocomplete/interactivity rules: ", err);
      });
    }
  };

  useEffect(() => {
    // Show a gentle prompt after 3 seconds to invite them to play the music
    const timer = setTimeout(() => {
      setShowTooltip(true);
      // Automatically dismiss the prompt after 6 seconds
      setTimeout(() => setShowTooltip(false), 6000);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed top-6 right-20 lg:right-8 z-50 flex items-center gap-3">
      {/* Cinematic Invitation Tooltip */}
      <AnimatePresence>
        {showTooltip && !isPlaying && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            className="hidden md:block glassmorphism px-4 py-2 rounded-full border border-silver/10 text-xs text-silver font-light tracking-widest uppercase"
          >
            Play Cinematic Experience
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <button
        onClick={togglePlayback}
        className="glassmorphism-light hover:glassmorphism-gold p-3 rounded-full text-soft-white border border-white/5 shadow-2xl hover:border-gold/30 transition-all duration-500 flex items-center justify-center gap-2 group relative overflow-hidden btn-luxury cursor-pointer"
        aria-label="Toggle cinematic background music"
      >
        {/* Subtle sliding gold overlay on hover */}
        <span className="absolute inset-0 bg-gold/5 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />

        {/* Audio Visualizer Bars (Ripples when playing) */}
        <div className="flex items-center gap-0.5 h-3.5 w-4 justify-center relative z-10">
          {isPlaying ? (
            <>
              <span className="w-0.5 bg-gold rounded-full h-full animate-[bounce_0.8s_infinite_ease-in-out_delay-100]" style={{ animationDelay: '0.1s' }} />
              <span className="w-0.5 bg-soft-white rounded-full h-2/3 animate-[bounce_0.8s_infinite_ease-in-out]" style={{ animationDelay: '0.3s' }} />
              <span className="w-0.5 bg-gold rounded-full h-full animate-[bounce_0.8s_infinite_ease-in-out]" style={{ animationDelay: '0.5s' }} />
            </>
          ) : (
            <Music className="w-3.5 h-3.5 text-silver/80 group-hover:text-gold transition-colors duration-300" />
          )}
        </div>

        {/* Action Icon */}
        <span className="relative z-10 pl-0.5">
          {isPlaying ? (
            <Volume2 className="w-3.5 h-3.5 text-gold" />
          ) : (
            <VolumeX className="w-3.5 h-3.5 text-silver/80 group-hover:text-gold transition-colors duration-300" />
          )}
        </span>
      </button>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src="https://assets.mixkit.co/music/preview/mixkit-timeless-113.mp3"
        loop
        preload="auto"
      />
    </div>
  );
};

export default MusicToggle;
