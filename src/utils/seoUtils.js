import defaultKeywords from '../data/seoKeywords';

/**
 * Constructs a Next.js Metadata object with dynamic defaults.
 * 
 * @param {Object} params
 * @param {string} params.title - Page title
 * @param {string} params.description - Page description
 * @param {string|Object} params.image - Helper to get main image
 * @param {Array} params.keywords - Page specific keywords
 * @param {Object} params.config - Global config object
 * @param {Object} params.page - Page object from API
 * @param {string} params.url - Canonical URL
 * @returns {Object} Next.js Metadata object
 */
export function constructMetadata({ 
  title, 
  description, 
  image, 
  keywords = [], 
  config = {}, 
  page = {}, 
  url 
}) {
  const cfg = config?.configObj || {};
  const siteName = cfg.name || 'ClathraEnergies';
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  
  // Description fallback: Page Subtitle -> Config Description -> Default
  const metaDescription = description || 
    page?.pageObj?.hero_section?.sub_title || 
    cfg.description || 
    'Transforming Waste into Clean Energy with Advanced Biogas Solutions.';

  // Image fallback logic
  let metaImage = image;
  if (!metaImage) {
      // Try page images
      const pageImages = page?.images || {};
      metaImage = pageImages.hero_image || pageImages.main_image || Object.values(pageImages)[0];
  }
  if (!metaImage) {
      // Try config images
      const configImages = config?.images || {};
      metaImage = configImages.main_logo || configImages.logo;
  }
  if (!metaImage) {
      metaImage = '/logo.png'; // Ultimate fallback
  }

  // Ensure absolute URL for image if possible (OpenGraph prefers absolute)
  if (metaImage && !metaImage.startsWith('http')) {
      // If it's a relative path from the backend uploads, prepend API URL or just leave it if it's a local asset
      // Assuming getImageUrl handles the domain, but here we might receive a raw path.
      // Ideally, the caller should pass a processed URL, but we can try to be safe.
      // For now, we assume the caller passes a valid URL or we let the relative path slide (might not show in some social previews).
  }

  // Merge keywords
  const pageKeywords = Array.isArray(keywords) ? keywords : [];
  const configKeywords = config?.configObj?.metaKeywords || [];
  const pageMetaKeywords = page?.meta?.keywords || [];
  
  // combine all unique keywords
  const allKeywords = [
      ...new Set([
          ...defaultKeywords,
          ...pageKeywords,
          ...configKeywords,
          ...pageMetaKeywords
      ])
  ];

  const canonicalUrl = url || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  return {
      title: title || siteName, // Next.js handles template if defined in layout, but we can set absolute here to be safe or rely on layout
      description: metaDescription,
      keywords: allKeywords,
      authors: [{ name: siteName }],
      creator: siteName,
      metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
      alternates: {
          canonical: canonicalUrl,
      },
      openGraph: {
          title: fullTitle,
          description: metaDescription,
          url: canonicalUrl,
          siteName: siteName,
          images: [
              {
                  url: metaImage,
                  width: 1200,
                  height: 630,
                  alt: fullTitle,
              },
          ],
          locale: 'en_US', // Could be dynamic based on lang
          type: 'website',
      },
      twitter: {
          card: 'summary_large_image',
          title: fullTitle,
          description: metaDescription,
          images: [metaImage],
      },
      icons: {
          icon: config?.images?.main_logo || '/favicon.ico', // Use dynamic logo if available
          apple: config?.images?.main_logo || '/apple-touch-icon.png',
      },
  };
}
