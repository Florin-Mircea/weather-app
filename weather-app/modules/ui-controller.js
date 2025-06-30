/**
 * UI Module
 *
 * Manages the application's user interface components and interactions.
 * Responsible for rendering the weather information and handling UI events.
 */

//import * as utils from "./utils.js";
//import * as weather from "./weather.js";

// Cache DOM elements for better performance
const elements = {
  // Main containers
  weatherInfo: document.querySelector("#weather-info"),

  // Weather information elements
  // ✅ Find missing elements for weather information and add them
  
  cityInput: document.querySelector('#city-input'),
  cityName: document.querySelector("#city-name"),
  dateTime: document.querySelector("#date-time"),
  temperature: document.querySelector("#temperature"),
  description: document.querySelector("#description"),
  humidity: document.querySelector("#humidity"),
  windSpeed: document.querySelector("#wind-speed"),
  weatherIcon: document.querySelector("#weather-icon"),
  feelsLike: document.querySelector("#feels-like"),
  pressure: document.querySelector("#pressure"),
  sunrise: document.querySelector("#sunrise"),
  sunset: document.querySelector("#sunset"),

  // Temperature visualization elements
  tempRange: document.querySelector("#temp-range"),
  tempIndicator: document.querySelector("#temp-indicator"),
  tempMin: document.querySelector("#temp-min"),
  tempCurrentLabel: document.querySelector("#temp-current-label"),
  
  historySection: document.querySelector('#history-section'),
  historyList: document.querySelector('#history-list'),
  clearHistoryBtn: document.querySelector('#clear-history-btn'),
  devTools: document.querySelector('#dev-tools'),
  logDisplay: document.querySelector('#log-display'),
  clearLogsBtn: document.querySelector('#clear-logs-btn'),
  exportLogsBtn: document.querySelector('#export-logs-btn'),
};


/**
 * Show loading spinner
 */
export function showLoading() {
  elements.loadingSpinner.classList.remove("hidden");
}

/**
 * Hide loading spinner
 */
export function hideLoading() {
  elements.loadingSpinner.classList.add("hidden");
}

/**
 * Show error message
 *
 * @param {string} message - Error message to display
 */
export function showError(message) {
  elements.errorMessage.textContent = message;
  elements.errorMessage.classList.remove("hidden");
  elements.weatherInfo.classList.add("hidden");
}

/**
 * Hide error message
 */
export function hideError() {
  elements.errorMessage.classList.add("hidden");
}

/**
 * Update temperature visualization display
 *
 * @param {Object} visualization - Temperature visualization data
 * @param {string} unit - Temperature unit (C/F)
 */



export function displayWeather() {
  
}

export function getCityInput() {
  
}

export function clearInput() {
  
}
 
 /**
 * Update temperature visualization display
 *
 * @param {Object} visualization - Temperature visualization data
 * @param {string} unit - Temperature unit (C/F)
 */
export function updateTemperatureVisualization(visualization) {
  if (!visualization) return;

  // Update min/max labels
  elements.tempMin.textContent = `${visualization.minTemp}°`;
  elements.tempMax.textContent = `${visualization.maxTemp}°`;

  // Update current temperature label
  elements.tempCurrentLabel.textContent = `${visualization.currentTemp}°`;

  // Update indicator position and color
  elements.tempIndicator.style.left = `${visualization.position}%`;
}

/**
 * Display weather data in the UI
 *
 * @param {Object} weatherData - Current weather data
 * @param {Object} forecastData - Forecast data
 */
export function displayWeatherData(weatherData, forecastData) {
  elements.weatherInfo.classList.remove("hidden");

  // Update city information
  elements.cityName.textContent = weatherData.name;

  // Update date and time
  elements.dateTime.textContent = utils.formatDateTime(weatherData.timezone);

  // Update sunrise and sunset times
  elements.sunrise.textContent = utils.formatTime(weatherData.sys.sunrise);
  // ✅ Repeat for sunset
  elements.sunset.textContent = utils.formatTime(weatherData.sys.sunset);
  // Update temperature information
  const currentTemp = weatherData.main.temp;
  elements.temperature.textContent = Math.round(currentTemp);
  // ✅ Repeat for feelsLike (from weatherData.main.feels_like)
  elements.feelsLike.textContent = Math.round(currentTemp);
  // Update weather description
  elements.description.textContent = weatherData.weather[0].description;

  // Update additional weather details
  elements.humidity.textContent = weatherData.main.humidity;
  // ✅ Repeat for pressure
  elements.pressure.textContent = weatherData.main.pressure;
  // ✅ Repeat for windSpeed (from weatherData.wind.speed)
  elements.windSpeed.textContent = weatherData.main.windSpeed;
  // Update weather icon
  const iconUrl = weather.getWeatherIconUrl(weatherData.weather[0].icon);
  elements.weatherIcon.src = iconUrl;
  // ✅ Set weather icon "alt" text as weather description
  elements.weatherIcon.alt = weatherData.weather[0].description;
  // Calculate and display temperature range
  const tempRange = weather.getDailyTemperatureRange(forecastData);
  const visualization = weather.calculateTemperatureVisualization(
    currentTemp,
    tempRange.min,
    tempRange.max
  );
  updateTemperatureVisualization(visualization);
}

/**
 * Update the recent searches list in the UI
 *
 * @param {Array} recentSearches - List of recent searches
 * @param {Function} displayWeather - Callback for when a city is clicked
 */
export function updateRecentSearchesList(recentSearches, displayWeather) {
  if (recentSearches.length === 0) {
    elements.recentSearchesContainer.classList.add("hidden");
    return;
  }

  // Clear current list
  elements.recentList.innerHTML = "";

  // Add each recent search
  recentSearches.forEach((city) => {
    const li = document.createElement("li");
    li.className = "tag-item";
    li.textContent = city;

    // Add event listeners
    li.addEventListener("click", () => displayWeather({ city }));

    // Add to the list
    elements.recentList.appendChild(li);
  });

  elements.recentSearchesContainer.classList.remove("hidden");
}

// Extinde getElements() cu noile controale
export const getElements = () => ({
  // ... elementele existente
  unitSelect: document.getElementById('unit-select'),
  langSelect: document.getElementById('lang-select')
});

// Funcție pentru actualizarea simbolului temperaturii
export const updateTemperatureDisplay = (elements, temperature, unit) => {
  // Cum afișezi temperatura cu simbolul corect?
  // °C pentru metric, °F pentru imperial?
  const symbol = /* ce logică folosești? */
  elements.temperature.textContent = `${temperature}${symbol}`
}

// Funcție pentru salvarea preferințelor
export const saveUserPreferences = (unit, lang) => {
  // Cum folosești localStorage?
  // Ce chei folosești pentru stocare?
}

// Funcție pentru încărcarea preferințelor
export const loadUserPreferences = () => {
  // Cum citești din localStorage?
  // Ce valori default folosești dacă nu există preferințe?
  return {
    unit: /* ce default? */,
    lang: /* ce default? */
  }
}

// Testează că poți selecta diferite opțiuni
elements.unitSelect.addEventListener('change', (e) => {
  console.log('Unit changed to:', e.target.value)
});

// Testează că schimbarea unității reîncarcă datele
elements.unitSelect.addEventListener('change', async (e) => {
  CONFIG.DEFAULT_UNITS = e.target.value
  // Cum reîncărci vremea cu noile setări?
  // Cum actualizezi afișarea existentă?
});

// Testează că preferințele se păstrează după refresh
// Reîncarcă pagina și verifică că setările rămân



// Noi funcții pentru istoric
export const showHistory = () => {
  elements.historySection.classList.remove('hidden');
};

export const hideHistory = () => {
  elements.historySection.classList.add('hidden');
};

export const renderHistory = (historyItems) => {
  // Construiește HTML pentru fiecare item din istoric
  // Fiecare item ar trebui să fie clickabil
  // Afișează orașul, țara și timpul relativ (ex: "2 ore în urmă")
};

export const addHistoryEventListeners = (onHistoryClick, onClearHistory) => {
  // Event listener pentru click pe istoric
  // Event listener pentru ștergerea istoricului
};

// Funcții pentru logging UI (opționale - doar pentru development)
export const updateLogDisplay = (logs) => {
  // Afișează ultimele log-uri în UI
};


export const renderHistory = (historyItems) => {
  if (historyItems.length === 0) {
    elements.historyList.innerHTML =
      '<p class="no-history">Nu ai căutări recente</p>'
    return
  }

  const historyHTML = historyItems
    .map((item) => {
      const timeAgo = getTimeAgo(item.timestamp)
      return `
      <div class="history-item" data-city="${item.city}" data-lat="${item.coordinates.lat}" data-lon="${item.coordinates.lon}">
        <div class="history-location">
          <span class="city">${item.city}</span>
          <span class="country">${item.country}</span>
        </div>
        <div class="history-time">${timeAgo}</div>
      </div>
    `
    })
    .join('')

  elements.historyList.innerHTML = historyHTML
}

// Helper function pentru timpul relativ
const getTimeAgo = (timestamp) => {
  const now = Date.now();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 60) return `${minutes} minute în urmă`;
  if (hours < 24) return `${hours} ore în urmă`;
  return `${days} zile în urmă`;
}

export const renderHistory = (historyItems) => {
  if (historyItems.length === 0) {
    elements.historyList.innerHTML =
      '<p class="no-history">Nu ai căutări recente</p>';
    return;
  }

  const historyHTML = historyItems
    .map((item) => {
      const timeAgo = getTimeAgo(item.timestamp);
      return; `
      <div class="history-item" data-city="${item.city}" data-lat="${item.coordinates.lat}" data-lon="${item.coordinates.lon}">
        <div class="history-location">
          <span class="city">${item.city}</span>
          <span class="country">${item.country}</span>
        </div>
        <div class="history-time">${timeAgo}</div>
      </div>
    `
    })
    .join('');

  elements.historyList.innerHTML = historyHTML;
}

// Helper function pentru timpul relativ
const getTimeAgo = (timestamp) => {
  const now = Date.now();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 60) return `${minutes} minute în urmă`;
  if (hours < 24) return `${hours} ore în urmă`;
  return `${days} zile în urmă`;
}

export const renderHistory = (historyItems) => {
  if (historyItems.length === 0) {
    elements.historyList.innerHTML =
      '<p class="no-history">Nu ai căutări recente</p>'
    return
  }

  const historyHTML = historyItems
    .map((item) => {
      const timeAgo = getTimeAgo(item.timestamp)
      return `
      <div class="history-item" data-city="${item.city}" data-lat="${item.coordinates.lat}" data-lon="${item.coordinates.lon}">
        <div class="history-location">
          <span class="city">${item.city}</span>
          <span class="country">${item.country}</span>
        </div>
        <div class="history-time">${timeAgo}</div>
      </div>
    `
    })
    .join('')

  elements.historyList.innerHTML = historyHTML
}

// Helper function pentru timpul relativ
const getTimeAgo = (timestamp) => {
  const now = Date.now()
  const diff = now - timestamp
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 60) return `${minutes} minute în urmă`
  if (hours < 24) return `${hours} ore în urmă`
  return `${days} zile în urmă`
}

// În ui-controller.js - optimizează search în timp real
const createDebouncedSearch = (delay = 300) => {
  let timeout
  return (searchFn) => {
    clearTimeout(timeout)
    timeout = setTimeout(searchFn, delay)
  }
}

export const debouncedSearch = createDebouncedSearch();
