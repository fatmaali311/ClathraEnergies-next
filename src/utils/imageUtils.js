/**
 * Ensures an image URL points to the correct API domain
 * @param {string} url - The image URL or path
 * @returns {string} - The complete image URL with the correct domain
 */
export const getImageUrl = (url) => {
  if (!url) return '';

  // If it's already an absolute URL pointing to our API, return as is
  if (url.startsWith('https://api.clathraenergies.fr')) {
    return url;
  }

  // Get the API base URL from env, fallback to production URL
  const apiBase = process.env.API_BASE_URL || 'https://api.clathraenergies.fr';

  // Remove any existing domain
  const path = url.replace(/^https?:\/\/[^\/]+/, '');

  // Ensure path starts with '/'
  const normalized = path.startsWith('/') ? path : `/${path}`;

  return `${apiBase}${normalized}`;
};

/**
 * Process all image URLs in a data object to ensure they point to the API
 * @param {Object} data - The data object containing image URLs
 * @returns {Object} - The processed data object
 */
export const processImageUrls = (data) => {
  if (!data) return data;

  const processed = { ...data };

  if (processed.images) {
    Object.keys(processed.images).forEach(key => {
      if (processed.images[key]) {
        processed.images[key] = getImageUrl(processed.images[key]);
      }
    });
  }

  return processed;
};
