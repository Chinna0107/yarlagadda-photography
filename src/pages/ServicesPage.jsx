import React from 'react';
import SEO from '../components/SEO';
import Services from '../sections/Services';

export const ServicesPage = () => {
  return (
    <div className="w-full pt-16 bg-matte-black">
      <SEO 
        title="Editorial Services & Custom Packages"
        description="Explore our tailored photographic packages in Guntur. High-end offerings for Weddings, Videography, Corporate Events, Housewarmings, Maternity, and Fashion portfolios."
        keywords="Guntur photography packages, wedding photo packages, event photo shoots Guntur, baby shower shooting"
      />
      {/* Renders the full 13 service categories tab deck */}
      <Services />
    </div>
  );
};

export default ServicesPage;
