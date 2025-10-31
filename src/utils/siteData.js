// Simple server-side in-memory cache for site-wide data (config)
// TTL is configurable; this avoids fetching config from API on every page render
const DEFAULT_TTL_SECONDS = 300; // 5 minutes

let cachedConfig = null;
let cachedAt = 0;

const getApiBase = () => process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL || 'http://localhost:3000';

export async function fetchConfigFromApi() {
  try {
    const API_BASE = getApiBase();
    const res = await fetch(`${API_BASE}/config`);
    if (!res.ok) return null;
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Failed to fetch config from API:', err);
    return null;
  }
}

export async function getConfig({ ttlSeconds = DEFAULT_TTL_SECONDS } = {}) {
  const now = Date.now();
  if (cachedConfig && (now - cachedAt) < ttlSeconds * 1000) {
    return cachedConfig;
  }

  const fresh = await fetchConfigFromApi();
  cachedConfig = fresh || cachedConfig; // keep old cache if fetch fails
  cachedAt = now;
  return cachedConfig;
}

export function clearConfigCache() {
  cachedConfig = null;
  cachedAt = 0;
}

export default { getConfig, fetchConfigFromApi, clearConfigCache };
