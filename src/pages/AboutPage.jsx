import React from 'react';
import SEO from '../components/SEO';
import About from '../sections/About';

export const AboutPage = () => {
  return (
    <div className="w-full pt-16 bg-matte-black">
      <SEO 
        title="The Artist & Storyteller"
        description="Meet Yarlagadda, the principal photographer behind the lens. Discover our philosophy of natural lighting, soft shadows, and silent candids capturing life's poetry."
        keywords="Yarlagadda, fine art photography philosophy, candid emotions, Guntur photography crew"
      />
      {/* Renders the full optimized About section */}
      <About />
    </div>
  );
};

export default AboutPage;
