/* jshint esversion: 6 */

export const isFiniteNumber = (value) =>
    typeof value === "number" && Number.isFinite(value);
  
  export const isValidLatitude = (lat) => isFiniteNumber(lat) && lat >= -90 && lat <= 90;
  export const isValidLongitude = (lng) => isFiniteNumber(lng) && lng >= -180 && lng <= 180;
  
  export const parseFloatSafe = (value) => {
    const num = parseFloat(value);
    return Number.isNaN(num) ? undefined : num;
  };
  
  export const coerceLatLngFromParams = (params) => {
    const lat = parseFloatSafe(params.lat);
    const lng = parseFloatSafe(params.lng);
    if (isValidLatitude(lat) && isValidLongitude(lng)) {
      return { lat, lng };
    }
    return undefined;
  };
  
  const STORAGE_KEY = "mcc:last_context";
  const CACHE_KEY_PREFIX = "mcc:city_cache:";
  const CACHE_EXPIRY_MS = 60 * 60 * 1000; // 1 hour in milliseconds
  
  export const saveLastContext = ({ lat, lng, city }) => {
    try {
      const payload = { lat, lng, city, ts: Date.now() };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {}
  };
  
  export const loadLastContext = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return undefined;
      const data = JSON.parse(raw);
      if (isValidLatitude(data.lat) && isValidLongitude(data.lng)) {
        return data;
      }
    } catch (e) {}
    return undefined;
  };
  
  // City search results caching functions
  export const saveCityCache = (city, results) => {
    try {
      const cacheKey = `${CACHE_KEY_PREFIX}${city.toLowerCase()}`;
      const payload = { 
        results, 
        timestamp: Date.now(),
        city: city.toLowerCase()
      };
      localStorage.setItem(cacheKey, JSON.stringify(payload));
    } catch (e) {
      console.warn('Failed to save city cache:', e);
    }
  };
  
  export const loadCityCache = (city) => {
    try {
      const cacheKey = `${CACHE_KEY_PREFIX}${city.toLowerCase()}`;
      const raw = localStorage.getItem(cacheKey);
      if (!raw) return null;
      
      const data = JSON.parse(raw);
      const now = Date.now();
      
      // Check if cache is expired
      if (now - data.timestamp > CACHE_EXPIRY_MS) {
        // Remove expired cache
        localStorage.removeItem(cacheKey);
        return null;
      }
      
      return data.results;
    } catch (e) {
      console.warn('Failed to load city cache:', e);
      return null;
    }
  };
  
  export const clearCityCache = (city) => {
    try {
      const cacheKey = `${CACHE_KEY_PREFIX}${city.toLowerCase()}`;
      localStorage.removeItem(cacheKey);
    } catch (e) {
      console.warn('Failed to clear city cache:', e);
    }
  };
  
  export const clearAllCityCache = () => {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(CACHE_KEY_PREFIX)) {
          localStorage.removeItem(key);
        }
      });
    } catch (e) {
      console.warn('Failed to clear all city cache:', e);
    }
  };
  
  // Test mode functionality for hardcoded geolocation
  const TEST_MODE_KEY = "mcc:test_mode";
  const TEST_LOCATION_KEY = "mcc:test_location";
  
  // Default test location (can be changed)
  const DEFAULT_TEST_LOCATION = {
    lat: 28.6139, // New Delhi
    lng: 77.2090,
    city: "new delhi"
  };
  
  export const isTestMode = () => {
    try {
      return localStorage.getItem(TEST_MODE_KEY) === "true";
    } catch (e) {
      return false;
    }
  };
  
  export const setTestMode = (enabled) => {
    try {
      localStorage.setItem(TEST_MODE_KEY, enabled.toString());
    } catch (e) {
      console.warn('Failed to set test mode:', e);
    }
  };
  
  export const getTestLocation = () => {
    try {
      const stored = localStorage.getItem(TEST_LOCATION_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (isValidLatitude(parsed.lat) && isValidLongitude(parsed.lng)) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to get test location:', e);
    }
    return DEFAULT_TEST_LOCATION;
  };
  
  export const setTestLocation = (lat, lng, city = "") => {
    try {
      if (isValidLatitude(lat) && isValidLongitude(lng)) {
        const location = { lat, lng, city };
        localStorage.setItem(TEST_LOCATION_KEY, JSON.stringify(location));
        return location;
      }
    } catch (e) {
      console.warn('Failed to set test location:', e);
    }
    return null;
  };
  
  export const buildGoogleMapsLink = ({ origin, destination, travelMode = "driving" }) => {
    const mode = encodeURIComponent(travelMode);
    if (origin && destination) {
      return `https://www.google.com/maps/dir/?api=1&origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}&travelmode=${mode}`;
    }
    if (destination) {
      return `https://www.google.com/maps/search/?api=1&query=${destination.lat},${destination.lng}`;
    }
    return "https://maps.google.com";
  };
  // ...existing code...
  
  window.clearCityCache = clearCityCache;
  window.saveCityCache = saveCityCache;
  window.loadCityCache = loadCityCache;