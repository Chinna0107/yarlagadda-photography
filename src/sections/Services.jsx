import React, { useState } from 'react';
import { 
  Camera, Sparkles, Flame, User, Radio, Film, Heart, 
  Home, Baby, UserCheck, Compass, Sun, Layers,
  Award, ChevronRight 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export const Services = () => {
  const [activeTab, setActiveTab] = useState('all');

  const serviceCategories = [
    {
      id: 'wedding',
      label: 'Wedding Category',
      icon: <Heart className="w-4 h-4" />,
      packages: [
        {
          icon: <Camera className="w-6 h-6 text-gold" />,
          title: "Wedding Photography",
          description: "Complete luxury documentation from pre-ritual preparations to the grand departure, emphasizing candids, cinematic light, and premium portraits."
        },
        {
          icon: <Sparkles className="w-6 h-6 text-gold" />,
          title: "Engagement Shoots",
          description: "Preserving the beautiful milestone of your ring ceremony, candid emotions, and initial traditional vows in luxury editorial frames."
        },
        {
          icon: <Film className="w-6 h-6 text-gold" />,
          title: "Candid Photography",
          description: "Stealthy, completely unposed visual capture of raw family emotions, laughter, and silent heartbeats captured with absolute precision."
        },
        {
          icon: <Compass className="w-6 h-6 text-gold" />,
          title: "Outdoor Shoots",
          description: "Scenic romantic couple narratives and pre-wedding stories set in breathtaking natural landscapes or luxury destinations."
        }
      ]
    },
    {
      id: 'events',
      label: 'Event Category',
      icon: <Award className="w-4 h-4" />,
      packages: [
        {
          icon: <Layers className="w-6 h-6 text-gold" />,
          title: "Half Saree Ceremony",
          description: "Preserving the vibrant cultural colors, elegant attire, and joyful milestones of this beautiful South Indian traditional ceremony."
        },
        {
          icon: <UserCheck className="w-6 h-6 text-gold" />,
          title: "Dhoti Ceremony",
          description: "Documenting the proud, elegant traditional coming-of-age dhoti rituals and familial celebrations with documentary realism."
        },
        {
          icon: <Home className="w-6 h-6 text-gold" />,
          title: "House Warming Events",
          description: "Candid and warm storytelling framing the sacred grihapravesham pooja rituals and celebratory gatherings in Guntur."
        }
      ]
    },
    {
      id: 'portrait',
      label: 'Portrait/Commercial',
      icon: <User className="w-4 h-4" />,
      packages: [
        {
          icon: <Sun className="w-6 h-6 text-gold" />,
          title: "Maternity Shoots",
          description: "Artistic maternal portraiture capturing your maternal glow, elegant silhouettes, and organic forms under soft studio lighting."
        },
        {
          icon: <Baby className="w-6 h-6 text-gold" />,
          title: "Newborn Baby Shoots",
          description: "Delicate and adorable fine-art baby portraiture capturing pure innocence, soft textures, and initial raw expressions."
        }
      ]
    }
  ];

  // Define All Tab category
  const tabsList = [
    { id: 'all', label: 'All Categories', icon: <Layers className="w-4 h-4" /> },
    ...serviceCategories
  ];

  // Dynamically filter packages
  const activeCategory = serviceCategories.find(cat => cat.id === activeTab);
  const displayedPackages = activeTab === 'all'
    ? serviceCategories.flatMap(cat => cat.packages)
    : activeCategory.packages;

  return (
    <section id="services" className="relative w-full py-24 lg:py-32 bg-matte-black">
      {/* Background soft red ambient glow */}
      <div className="absolute top-1/3 left-10 w-[300px] h-[300px] rounded-full bg-gold/5 blur-[100px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 text-center">
          <span className="text-[10px] tracking-[0.4em] text-silver/60 uppercase font-light">
            Luxury Offerings
          </span>
          <h2 className="text-4xl md:text-6xl text-soft-white font-serif tracking-wide mt-2">
            Services & Categories
          </h2>
          <p className="text-xs md:text-sm text-silver/70 font-light max-w-xl mx-auto mt-4 leading-relaxed">
            Invest in timeless memories. We provide premium visual storytelling tailored with elite attention to detail, cinematic color grading, and archival presentation.
          </p>
          <div className="w-12 h-[1px] bg-gold mt-6 mx-auto" />
        </div>

        {/* 1. INTERACTIVE CATEGORY TABS CONTROLLER */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16 max-w-3xl mx-auto">
          {tabsList.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-[10px] md:text-xs tracking-widest uppercase transition-all duration-500 relative overflow-hidden cursor-pointer ${
                activeTab === cat.id
                  ? 'text-matte-black font-semibold'
                  : 'text-silver/80 hover:text-soft-white border border-white/5 bg-charcoal/30'
              }`}
            >
              <span className="relative z-10 flex items-center gap-2">
                {cat.icon}
                {cat.label}
              </span>
              {activeTab === cat.id && (
                <motion.span
                  layoutId="activeServicePill"
                  className="absolute inset-0 bg-gold rounded-full"
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* 2. SERVICES GRID DISPLAY WITH SMOOTH TRANSITION */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 justify-center"
            >
              {displayedPackages.map((pkg, idx) => (
                <motion.div
                  key={pkg.title}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="glassmorphism p-8 rounded-xl border border-white/5 flex flex-col justify-between group hover:border-gold/30 hover:-translate-y-1.5 transition-all duration-500 shadow-xl relative overflow-hidden"
                >
                  {/* Subtle sliding brand red backdrop on hover */}
                  <span className="absolute inset-0 bg-gold/5 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 pointer-events-none" />

                  <div className="relative z-10">
                    {/* Custom Icon Wrapper */}
                    <div className="w-12 h-12 bg-charcoal/80 rounded-full border border-white/10 flex items-center justify-center mb-6 group-hover:border-gold/30 group-hover:bg-matte-black transition-all duration-500">
                      {pkg.icon}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl text-soft-white font-serif tracking-wide group-hover:text-gold transition-colors duration-300">
                      {pkg.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-silver/70 font-light mt-4 leading-relaxed">
                      {pkg.description}
                    </p>
                  </div>

                  {/* Booking Link CTA */}
                  <div className="relative z-10 mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                    <Link 
                      to="/inquire"
                      className="inline-flex items-center gap-1 text-[10px] tracking-widest text-gold hover:text-soft-white uppercase font-medium transition-colors duration-300 group/btn cursor-pointer"
                    >
                      Request Quote 
                      <ChevronRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform duration-300" />
                    </Link>
                  </div>

                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default Services;
