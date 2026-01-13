import { fetchAPI } from '../lib/api';
import { CONFIG } from '../config';
import { processImageUrls } from '../utils/imageUtils';

export const pageService = {
  getPage: async (slug, lang = CONFIG.DEFAULT_LANG) => {
    try {
      const data = await fetchAPI(`${CONFIG.ENDPOINTS.PAGES}/${slug}`, {
        cache: 'no-store',
        headers: { 'x-custom-lang': lang }
      });
      return processImageUrls(data);
    } catch (error) {
      console.error(`Failed to fetch page ${slug}:`, error);
      return null;
    }
  }
};
