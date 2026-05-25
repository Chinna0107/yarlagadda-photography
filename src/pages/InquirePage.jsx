import React from 'react';
import SEO from '../components/SEO';
import Booking from '../sections/Booking';

export const InquirePage = () => {
  return (
    <div className="w-full pt-16 bg-matte-black">
      <SEO 
        title="Inquire & Book Shoot Desk"
        description="Get in touch with Guntur's premier visual storytelling studio. Schedule a coffee alignment, inquire about date availability, or request custom packages."
        keywords="book photographer Guntur, Yarlagadda photography pricing, hire wedding photographer Guntur, contact Guntur studio"
      />
      {/* Renders the full optimized inquiry and booking board */}
      <Booking />
    </div>
  );
};

export default InquirePage;
