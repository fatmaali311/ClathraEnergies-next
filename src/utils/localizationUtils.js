/**
 * Safely extracts a localized string from an object or returns the value if it's already a string.
 * Supports objects like { en: '...', fr: '...', zh: '...' }
 * 
 * @param {string|object} value The value to localize
 * @param {string} lang The current language code (e.g. 'en', 'fr', 'zh')
 * @returns {string} The localized string or fallback
 */
export function getLocalizedValue(value, lang = 'en') {
  if (!value) return '';
  
  if (typeof value === 'object') {
    // Try current lang, then fallback to 'en', then first available key, then empty string
    return value[lang] || value['en'] || Object.values(value)[0] || '';
  }
  
  return String(value);
}
