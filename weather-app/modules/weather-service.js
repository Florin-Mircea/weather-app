/**
 * Weather Module  
 */

/**
 * Extract the daily temperature range from forecast data
 *
 * @param {Object} forecastData - Forecast data from API
 * @returns {Object|null} - Object with min and max temperatures or null
 */

export const getCurrentWeather = async (city) => {
  
}

export const getWeatherByCoords = async (lat, lon) => {
  
}

await new Promise(() => setTimeout(resolve, 1000));




/**
 * Get weather icon URL based on icon code
 *
 * @param {string} iconCode - OpenWeatherMap icon code
 * @param {number} size - Icon size (1, 2, or 4)
 * @returns {string} - URL to the weather icon
 */
 
 // În modules/weather-service.js
const buildUrl = (endpoint, params = {}) => {
  // Cum combini base URL cu endpoint?
  const url = new URL(/* ce construiești aici? */);

  // Ce parametri sunt întotdeauna necesari?
  url.searchParams.set('appid', /* de unde iei API key? */);
  url.searchParams.set('units', /* ce unități folosești? */);
  url.searchParams.set('lang', /* ce limbă folosești? */);

  // Cum adaugi parametrii specifici (city, lat, lon)?
  Object.entries(params).forEach(([key, value]) => {
    if (/* cum verifici că value există și nu e gol? */) {
      url.searchParams.set(key, value)
    }
  });

  return url.toString();
}

const makeRequest = async (url) => {
  try {
    const response = await fetch(url);

    // Cum verifici că request-ul a fost successful?
    if (!response.ok) {
      // Status 404 = ?
      // Status 401 = ?
      // Status 500 = ?
      throw new Error(/* ce mesaj prietenos? */);
    }

    return await response.json();
  } catch (error) {
    // Cum distingi între network error și API error?
    if(error.message === 'Failed to fetch')  {
      throw new Error(ERROR_MESSAGE.NETWORK_ERROR);
    }
    // Ce mesaj afișezi utilizatorului?
    throw new Error(/* mesaj adaptat tipului de eroare */);
  }
};

// Testează că URL-ul se construiește corect
const testUrl = buildUrl('/weather-service', { q: 'Brasov' });
console.log(
  'URL correct?',
  testUrl.includes('Brasov') && testUrl.includes('appid')
)

// Testează cu un oraș valid
getCurrentWeather('Brasov').then((data) => {
  console.log('Real data received:', data)
  console.log('Has temperature?', data.main?.temp !== undefined)
  console.log('Has description?', data.weather?.[0]?.description !== undefined)
});

const getCurrentWeatherWithFallback = async (city) => {
  try {
    // Încearcă API-ul real
    return await getCurrentWeather(city);
  } catch (error) {
    // Când folosești fallback?
    // Cum marchezi că datele sunt simulate?
    console.warn('Using fallback data due to:', error.message);
    return {
      ...mockWeatherData,
      isFallback: true,
      fallbackReason: error.message,
    }
  }
}

// În weather-service.js - cache inteligent
class WeatherCache {
  constructor(maxAge = 10 * 60 * 1000) {
    // 10 minute
    this.cache = new Map()
    this.maxAge = maxAge
  }

  get(key) {
    // Implementează logica de cache cu expirare
  }

  set(key, data) {
    // Implementează storage cu timestamp
  }

  cleanup() {
    // Curăță entries expirate
  }
}

export const weatherCache = new WeatherCache();
