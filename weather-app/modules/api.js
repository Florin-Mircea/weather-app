/**
 * API Module
 *
 * Handles all external API interactions for the weather application.
 * Abstracts the fetching logic and error handling.
 */
 
import {
  API_KEY,
  WEATHER_API_URL,
  FORECAST_API_URL,
  LANGUAGE,
  IP_API_URL,
} from "config.js";
 
import('./modules/history-service.js').then(({ historyService }) => {
  // Test salvare
  const mockWeatherData = {
    name: 'Cluj-Napoca',
    sys: { country: 'RO' },
    coord: { lat: 46.77, lon: 23.6 },
  }

  historyService.addLocation(mockWeatherData);
  console.log('History after add:', historyService.getHistory());

  // Verifică în localStorage
  console.log('In storage:', localStorage.getItem('weather_search_history'));
}); 

/**
 * Generic fetch function with error handling
 *
 * @param {string} url - The URL to fetch data from
 * @returns {Promise<Object>} - JSON response data
 * @throws {Error} - If the fetch fails or response is not OK
 */
async function fetchData(url) {
  const response = await fetch(url);

  if (!response.ok) {
    const errorResponse = await response.text();
    throw new Error(
      `Error fetching data for url: ${url}, with response ${errorResponse}`
    );
  }

  return await response.json();
}

/**
 * Create a weather API URL based on parameters
 *
 * @param {string} baseUrl - Base API URL
 * @param {Object} params - Query parameters
 * @returns {string} - Complete API URL
 */
function createApiUrl(baseUrl, params) {
  const url = new URL(baseUrl);

  if (params.city) {
    url.searchParams.append("q", params.city);
  }

  if (params.lat && params.lon) {
    // ✅ append lat and lon params to searchParams
	url.searchParams.append("lat", params.lat);
    url.searchParams.append("lon", params.lon);
  }

  url.searchParams.append("appid", API_KEY);
  url.searchParams.append("units", params.units);
  url.searchParams.append("lang", LANGUAGE);

  return url.toString();
}

/**
 * Fetch current weather and forecast data for a city
 *
 * @param {string} city - City name to get forecast for
 * @param {string} lat - Latitude
 * @param {string} lon - Longitude
 * @param {string} units - Temperature unit
 * @returns {Promise<Object>} - Forecast data object
 */
export async function fetchWeatherAndForecast({ city, lat, lon, units }) {
  const weatherUrl = createApiUrl(WEATHER_API_URL, { city, lat, lon, units });
  const weather = await fetchData(weatherUrl);

  // ✅ repeat for forecast
  
  const forecast = await fetchData(forecastUrl);
  const forecastUrl = null;

  return { weather, forecast };
}
/**
 * Get user's location by IP address
 *
 * @returns {Promise<Object>} - Object containing latitude and longitude
 */
export async function fetchLocationByIP() {

  try {
    // ✅ Fetch data from IP_API_URL, use console.log to check data format
	const { latitude, longitude } = await fetchData(IP_API_URL);
    return { lat: latitude, lon: longitude };
	console.log(`Geolocation successful: ${lat}, ${lon}`);
	
    // ✅ return latitude and longitude received from IP API
    const latitude = "45.6524";
    const longitude = "25.6109";
    return { lat: latitude, lon: longitude };
  } catch (error) {
    throw new Error("Nu am putut determina locația după IP");
  }
}

// Testează în browser console
const YOUR_API_KEY = "bd1f520cc50722a7d64a3e20cb8cde3c";
fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=Oradea&appid=${YOUR_API_KEY}&units=metric`
)
  .then((response) => response.json())
  .then((data) => console.log('API Response:', data));
  
/*
base: "stations"
clouds: 
	all: 0

cod: 200
coord: 
lat: 47.0667
lon: 21.9333

dt: 1750527508
id: 671768
main: 
	feels_like: 23.18
	grnd_level: 1004
	humidity: 27
	pressure: 1021
	sea_level: 1021
	temp: 24.02
	temp_max: 24.02
	temp_min: 24.02
	
name: "Oradea"
sys: country: "RO"
id: 6917
sunrise: 1750473412
sunset: 1750530671
type: 1	

timezone: 10800
visibility: 10000
weather: Array(1)
	0: 
		description: "clear sky"
		icon: "01d"
	id: 800
	main: "Clear"

wind: deg: 40
speed: 4.12

*/  

// Gândește-te la o funcție care construiește URL-uri
const buildApiUrl = (endpoint, params) => {
  // Ce este constant în toate URL-urile?
  // Cum adaugi parametrii dinamici?
  // Cum eviți să adaugi parametri undefined?
};

const existingIndex = history.findIndex(
  (item) => item.city.toLowerCase() === city.toLowerCase();
);

if (existingIndex !== -1) {
  // Mută în top
  const [existing] = history.splice(existingIndex, 1);
  history.unshift(existing);
} else {
  // Adaugă nou
  history.unshift(newLocation);
}



