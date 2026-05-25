import React, { useEffect, useState, useRef } from 'react';
import { Award, Camera, Heart, ShieldCheck } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import localCinematic from '../assets/PRPG3458.jpg';

// Reusable animated counter component
const Counter = ({ targetValue, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered) {
          setHasTriggered(true);
          let start = 0;
          const end = parseInt(targetValue, 10);
          if (start === end) return;

          const totalMiliseconds = duration;
          const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 15);

          const timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start === end) clearInterval(timer);
          }, incrementTime);
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [targetValue, duration, hasTriggered]);

  return (
    <span ref={elementRef} className="font-serif text-3xl md:text-5xl text-gold font-light">
      {count}{suffix}
    </span>
  );
};

export const About = () => {
  const stats = [
    { value: "500", suffix: "+", label: "Weddings Covered" },
    { value: "650", suffix: "+", label: "Happy Clients" },
    { value: "25", suffix: "+", label: "Years Experience" },
    { value: "12", suffix: "+", label: "Awards / Features" }
  ];

  return (
    <section 
      id="about" 
      className="relative w-full py-24 lg:py-32 bg-charcoal/50 border-y border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-20 text-center md:text-left">
          <span className="text-[10px] tracking-[0.4em] text-silver/60 uppercase font-light">
            The Artist Behind the Lens
          </span>
          <h2 className="text-4xl md:text-6xl text-soft-white font-serif tracking-wide mt-2">
            Capturing the Poetry of Life
          </h2>
          <div className="w-12 h-[1px] bg-gold mt-4 mx-auto md:mx-0" />
        </div>

        {/* Asymmetrical Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Interactive Before/After Drag Showcase */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <BeforeAfterSlider imageUrl={localCinematic} />
            <p className="text-[10px] tracking-widest text-silver/40 text-center uppercase font-light">
              Interactive View: Drag slider to see RAW image color-grading transformation
            </p>
          </div>

          {/* Right Column: Narrative Biography */}
          <div className="lg:col-span-6 flex flex-col gap-6 md:pl-4">
            <span className="text-xs tracking-[0.25em] text-gold uppercase font-light">
              Meet Yarlagadda — Principal Photographer
            </span>
            
            <p className="text-base md:text-lg text-soft-white font-serif leading-relaxed font-light italic">
              “Photography is not about capturing a subject. It is about capturing a feeling, a brief moment of quiet truth that stands suspended in time forever.”
            </p>

            <p className="text-sm text-silver/80 leading-relaxed font-light">
              For nearly a decade, Yarlagadda Photography has stood at the crossroads of documentary realism and fine-art luxury portraiture. Based in Guntur and guided by a deep love for artistic storytelling, we specialize in high-end wedding documentation, cinematic couple narratives, and editorial portraits. 
            </p>

            <p className="text-sm text-silver/80 leading-relaxed font-light">
              Our promise is Capturing the Poetry of Life with honest emotion and careful craft. Couples and families who search for best photography in Guntur or best wedding photography in Guntur come to us for soft shadows, natural golden hour gradients, and candid human interactions that evoke exactly what they felt in that single, fleeting heartbeat.
            </p>

            {/* Core Values Rows */}
            <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-white/5">
              <div className="flex items-start gap-3">
                <Heart className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-xs text-soft-white font-medium uppercase tracking-wider">Candid Emotion</span>
                  <span className="text-[10px] text-silver/60 mt-0.5">Capturing raw smiles and quiet tears.</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Award className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-xs text-soft-white font-medium uppercase tracking-wider">Cinematic Light</span>
                  <span className="text-[10px] text-silver/60 mt-0.5">Crafting luxury dark contrast moods.</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 4. STATISTICS COUNTERS STRIP */}
        <div className="mt-20 md:mt-28 grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 bg-charcoal/80 glassmorphism p-8 md:p-12 rounded-xl border border-white/5 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <Counter targetValue={stat.value} suffix={stat.suffix} />
              <span className="text-xs md:text-sm tracking-widest text-silver/70 font-light uppercase mt-2.5">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default About;
