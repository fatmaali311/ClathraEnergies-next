export const CONFIG = {
  API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:3000',
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  DEFAULT_REVALIDATE: 10,
  TIMEOUT: 10000,
  
  // Default SEO
  SITE_NAME: 'ClathraEnergies',
  DEFAULT_LANG: 'en',
  
  // API Endpoints
  ENDPOINTS: {
    CONFIG: '/config',
    PAGES: '/pages',
    SERVICES: '/services',
    CONTACT: '/contact'
  },
  
  // Supported Languages
  LANGUAGES: [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'zh', name: '中文', flag: '🇨🇳' }
  ]
};
