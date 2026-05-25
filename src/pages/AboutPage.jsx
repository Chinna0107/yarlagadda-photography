import React from 'react';
import SEO from '../components/SEO';
import About from '../sections/About';

export const AboutPage = () => {
  return (
    <div className="w-full pt-16 bg-matte-black">
      <SEO 
        title="About Yarlagadda Photography"
        description="Capturing the Poetry of Life at Yarlagadda Photography, a Guntur photography studio for weddings, candid stories, portraits, events, and timeless family celebrations."
        keywords="Yarlagadda Photography, about Yarlagadda Photography, Capturing the Poetry of Life, best photography in Guntur, best wedding photography in Guntur, Guntur photography studio, candid wedding photographer Guntur"
        canonicalPath="/about"
      />
      {/* Renders the full optimized About section */}
      <About />
    </div>
  );
};

export default AboutPage;
