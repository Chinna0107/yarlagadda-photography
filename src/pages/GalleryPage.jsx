import React from 'react';
import SEO from '../components/SEO';
import Gallery from '../sections/Gallery';

export const GalleryPage = () => {
  return (
    <div className="w-full pt-16 bg-matte-black">
      <SEO 
        title="Selected Portfolios & Creative Works"
        description="Browse selected portfolios from Yarlagadda Photography. Featuring high-contrast fine art weddings, candid couple narratives, outdoor stories, and traditional events."
        keywords="Yarlagadda portfolio, Guntur visual gallery, candid wedding photo portfolio, fine-art outdoor shoots"
      />
      {/* Renders the full portfolio gallery grid with Lightbox */}
      <Gallery />
    </div>
  );
};

export default GalleryPage;
