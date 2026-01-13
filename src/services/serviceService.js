import { fetchAPI } from '../lib/api';
import { CONFIG } from '../config';
import { getImageUrl, processImageUrls } from '../utils/imageUtils';

export const serviceService = {
  getServices: async ({ limit = 10, page = 1, lang = CONFIG.DEFAULT_LANG } = {}) => {
    try {
      const data = await fetchAPI(CONFIG.ENDPOINTS.SERVICES, {
        params: { limit, page },
        cache: 'no-store',
        headers: { 'x-custom-lang': lang }
      });
      
      if (data && data.services) {
        data.services = data.services.map(svc => {
          if (svc.data?.images) {
            svc.data.images = Object.keys(svc.data.images).reduce((acc, key) => {
              acc[key] = getImageUrl(svc.data.images[key]);
              return acc;
            }, {});
          }
          return processImageUrls(svc);
        });
      }
      
      return data;
    } catch (error) {
      console.error('Failed to fetch services:', error);
      return { services: [] };
    }
  },

  getServiceBySlug: async (slug) => {
    try {
      const data = await fetchAPI(`${CONFIG.ENDPOINTS.SERVICES}/${slug}`, {
        next: { revalidate: CONFIG.DEFAULT_REVALIDATE }
      });
      return processImageUrls(data);
    } catch (error) {
        console.error(`Failed to fetch service ${slug}:`, error);
        return null;
    }
  }
};
