/**
 * Ensures an image URL points to the correct API domain
 * @param {string} url - The image URL or path
 * @returns {string} - The complete image URL with the correct domain
 */
export const getImageUrl = (url) => {
  if (!url) return '';

  // If it's already an absolute URL pointing to our API, return as is
  if (url.startsWith('https://api.clathraenergies.fr') || url.startsWith('http://')) {
    return url;
  }

  // Use NEXT_PUBLIC_API_BASE_URL which is available on both server and client (prevents hydration mismatch)
  // Fallback to production URL if not set
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.clathraenergies.fr';

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
