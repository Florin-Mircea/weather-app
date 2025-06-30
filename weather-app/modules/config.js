/**
 * Configuration Module
 *
 * Contains application configuration constants like API keys and endpoints.
 * In a production environment, API keys should be secured on the server side.
 */

// OpenWeatherMap API configuration
// ✅ Get your own API key at https://openweathermap.org/api
export const API_KEY = "bd1f520cc50722a7d64a3e20cb8cde3c";
// ✅ Find URL for Current Weather Data API
export const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";
// ✅ Find URL for 5 Day / 3 Hour Forecast API
export const FORECAST_API_URL = "https://api.openweathermap.org/data/2.5/weather";
//MOCK_DATA
export const MOCK_DATA = {
  main: {
    
    }

    weather: [
      
    ]
  "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}"; 
}
// IP API configuration
export const IP_API_URL = "https://ipapi.co/json/";

// Application constants
export const DEFAULT_UNIT = "metric";
export const MAX_RECENT_SEARCHES = 5;
export const LANGUAGE = "en";

// Poți schimba ușor limba?
CONFIG.DEFAULT_LANG = 'en';
// Poți schimba ușor unitățile?
CONFIG.DEFAULT_UNITS = 'imperial';

// Local storage keys
export const STORAGE_KEYS = {
  TEMPERATURE_UNIT: "temperatureUnit",
  RECENT_SEARCHES: "recentSearches",
};

// Ce informații sunt comune pentru toate request-urile API?
export const CONFIG = {
  API_KEY: 'bd1f520cc50722a7d64a3e20cb8cde3c', // Unde obții asta?
  API_BASE_URL: /* care este URL-ul de bază? */,
  DEFAULT_UNITS: /* metric sau imperial? */,
  DEFAULT_LANG: /* ro, en, sau altceva? */
}

// Cum organizezi endpoint-urile pentru a fi ușor de găsit?
export const API_ENDPOINTS = {
  CURRENT_WEATHER: /* ce endpoint pentru vremea curentă? */,
  FORECAST: /* ce endpoint pentru prognoză? */,
  // Ce alte endpoint-uri ai putea avea nevoie?
}

// Ce mesaje sunt utile când ceva merge prost?
export const ERROR_MESSAGES = {
  CITY_NOT_FOUND: /* ce mesaj prietenos? */,
  NETWORK_ERROR: /* ce mesaj când nu ai internet? */,
  // Ce alte erori pot apărea?
}

// Configurarea existentă + noile setări
export const CONFIG = {
  MAX_HISTORY_ITEMS: 10,
  STORAGE_KEYS: {
    SEARCH_HISTORY: 'weather_search_history',
    USER_PREFERENCES: 'weather_user_prefs',
  },
  LOGGING: {
    ENABLED: true,
    LEVEL: 'info', // 'debug', 'info', 'warn', 'error'
    MAX_LOGS: 100,
  },
}

if (this.logs.length >= CONFIG.LOGGING.MAX_LOGS) {
  this.logs.shift() // Elimină primul (cel mai vechi)
}

// În config.js - configuration pentru production
const isDevelopment =
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1'

export const CONFIG = {
  API_KEY: isDevelopment ? 'dev_api_key' : 'prod_api_key',
  API_BASE_URL: '<https://api.openweathermap.org/data/2.5>',
  // ... restul configurației

  // Development helpers
  DEBUG_MODE: isDevelopment,
  ENABLE_CONSOLE_LOGS: isDevelopment,
}

// config/environment.js
const environments = {
  development: {
    API_KEY: 'your_dev_api_key',
    DEBUG: true,
    CACHE_TTL: 1000, // 1 second for testing
    ENABLE_LOGGING: true,
  },

  production: {
    API_KEY: 'your_prod_api_key',
    DEBUG: false,
    CACHE_TTL: 600000, // 10 minutes for production
    ENABLE_LOGGING: false,
  },
}

const currentEnv = window.location.hostname.includes('github.io')
  ? 'production'
  : 'development'

export const ENV_CONFIG = environments[currentEnv];
