import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const SEO = ({ title, description, keywords }) => {
  const location = useLocation();

  useEffect(() => {
    // Dynamic page-level title update
    document.title = `${title} | Yarlagadda Photography`;

    // Dynamic meta description tag update
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    // Dynamic meta keywords tag update
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute(
        'content', 
        keywords || 'Yarlagadda Photography, Guntur photography, Guntur wedding photographer, luxury couple shoot'
      );
    }
  }, [location.pathname, title, description, keywords]);

  return null;
};

export default SEO;
