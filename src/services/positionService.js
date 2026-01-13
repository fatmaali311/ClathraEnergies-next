import { fetchAPI } from '../lib/api';
import { CONFIG } from '../config';
import { getImageUrl, processImageUrls } from '../utils/imageUtils';

export const positionService = {
  getPositions: async ({ limit = 100, page = 1, lang = CONFIG.DEFAULT_LANG } = {}) => {
    try {
      const data = await fetchAPI('/positions', {
        params: { limit, page },
        cache: 'no-store',
        headers: { 'x-custom-lang': lang }
      });
      
      const rawPositions = data?.data?.data || data?.data || data || [];
      const positionsArray = Array.isArray(rawPositions) ? rawPositions : (rawPositions.items || []);

      return positionsArray.map(p => processImageUrls(p));
    } catch (error) {
      console.error('Failed to fetch positions:', error);
      return [];
    }
  }
};
