/**
 * Weather Application
 *
 * Main application file that coordinates all the modules and manages app state.
 * This file handles initialization, event listeners, and application flow.
 */
 
import * as config from "modules/config.js";
import * as api from "modules/api.js";
import * as ui-controller from "modules/ui-controller.js";
//import * as utils from "modules/utils.js";
 
 // Noi import-uri
import { logger } from 'modules/logger.js';
import { historyService } from 'modules/history-service.js';
import {
  // ... import-urile existente
  renderHistory,
  showHistory,
  addHistoryEventListeners,
} from 'modules/ui-controller.js';

import { DEFAULT_UNIT, STORAGE_KEYS } from "modules/config.js";
import { displayWeatherData } from "modules/ui-controller";

import('modules/config.js').then((config) => {
  console.log(
    'API Key configured?',
    config.CONFIG.API_KEY !== 'bd1f520cc50722a7d64a3e20cb8cde3c'
  );
  console.log('Endpoints available:', Object.keys(config.API_ENDPOINTS));
  console.log('Error messages ready:', Object.keys(config.ERROR_MESSAGES));
});

import('modules/history-service.js').then(({ historyService }) => {
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

// În consolă:
import('modules/logger.js').then(({ logger }) => {
  logger.info('Test log')
  logger.warn('Test warning')
  logger.error('Test error')
  console.log('All logs:', logger.getLogs())
});



// Actualizează funcția de inițializare
const initializeApp = async () => {
  logger.info('Weather App starting...');

  setupEventListeners();
  loadHistoryOnStart();

  logger.info('Weather App initialized successfully');
}

// Nouă funcție pentru încărcarea istoricului
const loadHistoryOnStart = () => {
  const history = historyService.getHistory();
  if (history.length > 0) {
    renderHistory(history);
    showHistory();
    logger.info(`Loaded ${history.length} items from history`);
  }
}

// Actualizează handleSearch pentru a salva în istoric
const handleSearch = async () => {
  const city = ui-controller.getCityInput().trim();

  logger.debug('Search initiated', { city });

  if (!isValidCity(city)) {
    const errorMsg = 'Numele orașului nu este valid';
    ui-controller.showError(errorMsg);
    logger.warn('Invalid city input', { city });
    return;
  }

  try {
    ui-controller.showLoading();
    logger.info('Fetching weather data', { city });

    const weatherData = await weatherService.getCurrentWeather(city);

    // Salvează în istoric
    historyService.addLocation(weatherData);

    // Actualizează UI-ul
    ui-controller.displayWeather(weatherData);
    ui-controller.clearInput();

    // Reîncarcă istoricul
    const updatedHistory = historyService.getHistory();
    renderHistory(updatedHistory);
    showHistory();

    logger.info('Weather data displayed successfully', {
      city: weatherData.name,
      temp: weatherData.main.temp,
    });
  } catch (error) {
    ui-controller.showError('Nu am putut obține vremea. Încearcă din nou.');
    logger.error('Failed to fetch weather data', error);
  } finally {
    ui-controller.hideLoading();
  }
}

// Nouă funcție pentru search din istoric
const handleHistoryClick = async (event) => {
  const historyItem = event.target.closest('.history-item');
  if (!historyItem) return;

  const city = historyItem.dataset.city;
  const lat = parseFloat(historyItem.dataset.lat);
  const lon = parseFloat(historyItem.dataset.lon);

  logger.info('History item clicked', { city, lat, lon });

  try {
    ui-controller.showLoading();

    // Folosește coordonatele pentru acuratețe
    const weatherData = await weatherService.getWeatherByCoords(lat, lon);

    // Actualizează poziția în istoric (move to top)
    historyService.addLocation(weatherData);

    ui-controller.displayWeather(weatherData);

    // Reîncarcă istoricul
    const updatedHistory = historyService.getHistory();
    renderHistory(updatedHistory);

    logger.info('Weather loaded from history', { city });
  } catch (error) {
    ui-controller.showError('Nu am putut obține vremea din istoric.');
    logger.error('Failed to load weather from history', error);
  } finally {
    ui.hideLoading();
  }
}

// Funcție pentru ștergerea istoricului
const handleClearHistory = () => {
  if (confirm('Sigur vrei să ștergi tot istoricul de căutări?')) {
    historyService.clearHistory();
    renderHistory([]);
    logger.info('Search history cleared');
  }
}

// Actualizează setupEventListeners
const setupEventListeners = () => {
  // ... event listeners existente

  // Event listeners pentru istoric
  addHistoryEventListeners(handleHistoryClick, handleClearHistory);

  // Event listeners pentru dev tools (opțional)
  if (elements.clearLogsBtn) {
    elements.clearLogsBtn.addEventListener('click', () => {
      logger.clearLogs();
      ui-controller.updateLogDisplay([]);
    });
  }

  if (elements.exportLogsBtn) {
    elements.exportLogsBtn.addEventListener('click', () => {
      const logs = logger.exportLogs();
      downloadLogs(logs);
    });
  }
}

// Helper pentru download logs (bonus)
const downloadLogs = (logsText) => {
  const blob = new Blob([logsText], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `weather-app-logs-${Date.now()}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

// Pornește aplicația
initializeApp();

// Application state
let units = DEFAULT_UNIT;

// DOM elements cache
const elements = {
  tempToggle: document.querySelector("#temp-toggle"),
};

// Initialize the app
displayPlaceholderData();
initTemperatureUnit();
setupEventListeners();

// Function declarations

function displayPlaceholderData() {
  console.log("refreshed");
  const weather = {
    weather: [{ description: "cer senin", icon: "01d" }],
    main: {
      temp: 20,
      feels_like: 25,
      pressure: 1000,
      humidity: 50,
    },
    wind: { speed: 10 },
    dt: 1741171161,
    sys: { sunrise: 1741150155, sunset: 1741190987 },
    timezone: 7200,
    name: "București",
  };
  const forecast = { list: [{ main: { temp: 30 } }] };
  displayWeatherData(weather, forecast);
}

const handleSearch = async () => {

}

const isValidCity = (city) => {
  return city.length >= 2 && /^[a-zA-Z\\s-]+$/.test(city);
}

/**
 * Initialize the temperature unit from localStorage
 */
function initTemperatureUnit() {
  // ✅ Use STORAGE_KEYS to get the correct item
  
  const STORAGE_KEYS = {
  TEMPERATURE_UNIT: "temperatureUnit",
  RECENT_SEARCHES: "recentSearches",
};

  const storedUnit = localStorage.getItem(config.STORAGE_KEYS.TEMPERATURE_UNIT);
	units = storedUnit || config.DEFAULT_UNIT;
	elements.tempToggle.checked = units === "imperial";

  const storedUnit = localStorage.getItem("wrong key");
  units = storedUnit || DEFAULT_UNIT;
  elements.tempToggle.checked = units === "imperial";
}

function setupEventListeners() {
  elements.tempToggle.addEventListener("change", handleUnitChange);
}

function handleUnitChange() {
  units = elements.tempToggle.checked ? "imperial" : "metric";  
  localStorage.setItem(config.STORAGE_KEYS.TEMPERATURE_UNIT, units);
  displayInitialWeather();
  // ✅ Save new units value to the localStorage
  
  
}

// Ce module noi trebuie importate?
import { getCoords } from 'modules/location-service.js'
import {
  getCurrentWeather,
  getWeatherByCoords,
  getCurrentWeatherWithFallback,
} from 'modules/weather-service.js'
import {
  saveUserPreferences,
  loadUserPreferences,
  updateTemperatureDisplay,
} from 'modules/ui-controller.js';

const handleLocationSearch = async () => {
  try {
    // Cum folosești noul location service?
    showLoading(elements, 'Detectez locația...');

    const coords = await getCoords();

    // Cum afișezi diferit pentru GPS vs IP location?
    if (coords.source === 'ip') {
      showMessage(elements, 'Locație aproximativă bazată pe IP', 'warning');
    }

    showLoading(elements, 'Încarc vremea...');
    const weather = await getWeatherByCoords(coords.latitude, coords.longitude);

    displayWeather(elements, weather);
  } catch (error) {
    // Cum gestionezi când nici un serviciu de locație nu funcționează?
    showError(elements, `Locația nu a putut fi determinată: ${error.message}`);
  }
}

// Cum gestionezi schimbările de preferințe?
elements.unitSelect.addEventListener('change', async (e) => {
  const newUnit = e.target.value;
  CONFIG.DEFAULT_UNITS = newUnit;

  // Salvează preferința
  const currentPrefs = loadUserPreferences();
  saveUserPreferences(newUnit, currentPrefs.lang);

  // Reîncarcă datele dacă există vreme afișată
  if (/* cum verifici că ai date afișate? */) {
    // Cum reîncărci cu noile setări?
  }
})

elements.langSelect.addEventListener('change', async (e) => {
  // Logică similară pentru limbă
});

// Testează că datele reale se încarcă
// Testează că erorile sunt gestionate elegant

// Testează cu permisiune acceptată
// Testează cu permisiune refuzată
// Testează fără conexiune la internet

// Testează schimbarea unităților
// Testează schimbarea limbii
// Testează că preferințele se păstrează

// Testează fără API key
// Testează fără internet
// Testează cu orașe invalide

import('modules/config.js').then((config) => {
  console.log('Config updated:', config.CONFIG);
  console.log('Max history:', config.CONFIG.MAX_HISTORY_ITEMS);
})

import('modules/logger.js').then(({ logger }) => {
  logger.info('Logger test started');
  logger.debug('Debug message', { test: true });
  logger.warn('Warning message');
  logger.error('Error message', new Error('Test error'));

  console.log('All logs:', logger.getLogs());
})

// Verifică ce e stocat:
console.log('History:', localStorage.getItem('weather_search_history'));

// Testează limite:
for (let i = 0; i < 15; i++) {
  // Adaugă orașe și verifică că se limitează la maxim configurat
}
