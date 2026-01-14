import { CONFIG } from '../config';

/**
 * Base fetch wrapper with error handling and default options
 */
export async function fetchAPI(endpoint, options = {}) {
  const { 
    method = 'GET', 
    body, 
    headers = {},
    next = { revalidate: CONFIG.DEFAULT_REVALIDATE },
    cache,
    params = {} 
  } = options;

  // Build URL with query params
  const url = new URL(`${CONFIG.API_BASE_URL}${endpoint}`);
  Object.keys(params).forEach(key => {
    if (params[key] !== undefined && params[key] !== null) {
      url.searchParams.append(key, params[key]);
    }
  });

  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': headers['x-custom-lang'] || 'en',
      ...headers,
    },
    next,
    ...(cache && { cache }),
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url.toString(), config);

    // Provide detailed error info
    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`API Error ${response.status} at ${endpoint}:`, errorBody);
      throw new Error(`API Error: ${response.statusText} (${response.status})`);
    }

    // Handle empty responses
    if (response.status === 204) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error(`Fetch failed for ${endpoint}:`, error);
    // Return null or rethrow depending on strategy. 
    // For critical data, we might want to throw, but for UI resilience, returning null is often safer.
    // Here we'll rethrow customized error or return null if it's a connection error to avoid crashing.
    return null;
  }
}
