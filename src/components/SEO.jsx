import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://yarlagaddaphotography.in';
const SITE_NAME = 'Yarlagadda Photography';
const DEFAULT_KEYWORDS = 'Yarlagadda Photography, best photography in Guntur, best wedding photography in Guntur, Guntur wedding photographer, candid photography Guntur, pre wedding photography Guntur';

const upsertMeta = (selector, attributes) => {
  let element = document.querySelector(selector);

  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
};

const upsertCanonical = (href) => {
  let canonical = document.querySelector('link[rel="canonical"]');

  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }

  canonical.setAttribute('href', href);
};

const upsertStructuredData = (data) => {
  const scriptId = 'page-structured-data';
  const existing = document.getElementById(scriptId);

  if (!data) {
    existing?.remove();
    return;
  }

  const script = existing || document.createElement('script');
  script.id = scriptId;
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);

  if (!existing) document.head.appendChild(script);
};

export const SEO = ({ title, description, keywords, canonicalPath, image = '/logo.jpg', structuredData }) => {
  const location = useLocation();

  useEffect(() => {
    const fullTitle = `${title} | ${SITE_NAME}`;
    const path = canonicalPath || location.pathname;
    const canonicalUrl = `${SITE_URL}${path === '/' ? '/' : path}`;
    const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`;

    // Dynamic page-level title update
    document.title = fullTitle;

    // Dynamic meta description tag update
    upsertMeta('meta[name="description"]', { name: 'description', content: description });

    // Dynamic meta keywords tag update
    upsertMeta('meta[name="keywords"]', {
      name: 'keywords',
      content: keywords || DEFAULT_KEYWORDS
    });

    upsertCanonical(canonicalUrl);
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: fullTitle });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: imageUrl });
    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: fullTitle });
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: imageUrl });
    upsertStructuredData(structuredData);
  }, [location.pathname, title, description, keywords, canonicalPath, image, structuredData]);

  return null;
};

export default SEO;
