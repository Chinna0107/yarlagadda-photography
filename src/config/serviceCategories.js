export const SERVICE_CATEGORIES = [
  { id: 'wedding-photography', label: 'Wedding Photography' },
  { id: 'engagement-shoots', label: 'Engagement Shoots' },
  { id: 'candid-photography', label: 'Candid Photography' },
  { id: 'outdoor-shoots', label: 'Outdoor Shoots' },
  { id: 'half-saree-ceremony', label: 'Half Saree Ceremony' },
  { id: 'dhoti-ceremony', label: 'Dhoti Ceremony' },
  { id: 'house-warming-events', label: 'House Warming Events' },
  { id: 'maternity-shoots', label: 'Maternity Shoots' },
  { id: 'newborn-baby-shoots', label: 'Newborn Baby Shoots' },
];

export const LEGACY_CATEGORY_MAP = {
  wedding: 'wedding-photography',
  portrait: 'maternity-shoots',
  cinematic: 'outdoor-shoots',
  traditional: 'half-saree-ceremony',
  general: 'candid-photography',
};

export const normalizeCategory = (category) => LEGACY_CATEGORY_MAP[category] || category;

export const getCategoryLabel = (category) => {
  const normalized = normalizeCategory(category);
  return SERVICE_CATEGORIES.find(item => item.id === normalized)?.label || category || 'Uncategorized';
};
