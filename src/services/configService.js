import { fetchAPI } from '../lib/api';
import { CONFIG } from '../config';
import { processImageUrls } from '../utils/imageUtils';

export const configService = {
  getGlobalConfig: async (lang = CONFIG.DEFAULT_LANG) => {
    try {
      const data = await fetchAPI(CONFIG.ENDPOINTS.CONFIG, {
        cache: 'no-store',
        headers: { 'x-custom-lang': lang }
      });
      return processImageUrls(data);
    } catch (error) {
      console.error('Failed to fetch global config:', error);
      return null;
    }
  }
};
