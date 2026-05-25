import React from 'react';
import { Heart, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

// Import your actual high-res photos for the feed mockup
import feedImg1 from '../assets/PRPG3458.jpg';
import feedImg2 from '../assets/PRPG3471.jpg';
import feedImg3 from '../assets/SMD_3041.jpg';
import feedImg4 from '../assets/PRPG3566.jpg';
import feedImg5 from '../assets/SMD_3082.jpg';
import feedImg6 from '../assets/SMD_3096.jpg';

const InstaIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export const Instagram = () => {
  const feedPosts = [
    {
      url: feedImg1,
      likes: "1,240",
      comments: "58"
    },
    {
      url: feedImg2,
      likes: "890",
      comments: "42"
    },
    {
      url: feedImg3,
      likes: "2,110",
      comments: "89"
    },
    {
      url: feedImg4,
      likes: "740",
      comments: "25"
    },
    {
      url: feedImg5,
      likes: "1,560",
      comments: "72"
    },
    {
      url: feedImg6,
      likes: "980",
      comments: "38"
    }
  ];

  return (
    <section id="instagram" className="relative w-full py-20 bg-charcoal/20 overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        
        {/* Section Header */}
        <div className="text-left">
          <span className="text-[10px] tracking-[0.4em] text-silver/60 uppercase font-light">
            Stay Connected
          </span>
          <h2 className="text-3xl md:text-5xl text-soft-white font-serif tracking-wide mt-2">
            Editorial Feed
          </h2>
          <div className="w-12 h-[1px] bg-gold mt-4" />
        </div>

        {/* Instagram Handle CTA */}
        <a 
          href="https://instagram.com/yarlagaddaphotography" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-2.5 glassmorphism hover:glassmorphism-gold rounded-full text-xs text-soft-white hover:text-gold border border-white/5 hover:border-gold/30 transition-all duration-500 self-start md:self-auto cursor-pointer"
        >
          <InstaIcon className="w-4 h-4 text-gold" />
          <span className="font-light tracking-widest uppercase text-[10px]">Follow @yarlagaddaphotography</span>
        </a>
      </div>

      {/* HORIZONTAL AUTO-FLOW SCROLL ROW */}
      <div className="w-full overflow-x-auto pb-4 scrollbar-none flex gap-4 px-6 md:px-12 select-none">
        {feedPosts.map((post, idx) => (
          <div 
            key={idx} 
            className="relative w-[240px] h-[240px] md:w-[280px] md:h-[280px] rounded-lg overflow-hidden shrink-0 border border-white/5 group shadow-lg cursor-pointer"
          >
            {/* Square crop Image */}
            <img 
              src={post.url} 
              alt="Instagram feed crop" 
              className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
              draggable="false"
            />

            {/* Hover Metric Overlay */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center gap-6 z-10">
              <div className="flex items-center gap-1.5 text-soft-white text-xs font-light tracking-wider">
                <Heart className="w-4 h-4 text-gold fill-gold" />
                <span>{post.likes}</span>
              </div>
              <div className="flex items-center gap-1.5 text-soft-white text-xs font-light tracking-wider">
                <MessageCircle className="w-4 h-4 text-gold" />
                <span>{post.comments}</span>
              </div>
            </div>
          </div>
        ))}

        {/* FINAL REDIRECT INSTAGRAM CARD */}
        <div className="w-[240px] h-[240px] md:w-[280px] md:h-[280px] rounded-lg shrink-0 glassmorphism border border-gold/15 flex flex-col items-center justify-center text-center p-6 gap-4 select-none hover:border-gold/40 transition-colors duration-500 shadow-2xl">
          <InstaIcon className="w-8 h-8 text-gold animate-pulse" />
          <div className="flex flex-col">
            <span className="text-base font-serif text-soft-white tracking-wide">Join The Narrative</span>
            <span className="text-[10px] text-silver/60 tracking-wider font-light mt-1">Get daily updates and behind-the-scenes editing.</span>
          </div>
          <a
            href="https://instagram.com/yarlagaddaphotography"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 bg-gold hover:bg-gold-hover text-matte-black text-[10px] font-semibold tracking-widest uppercase rounded-full transition-colors duration-300 cursor-pointer"
          >
            Follow
          </a>
        </div>
      </div>

    </section>
  );
};

export default Instagram;
