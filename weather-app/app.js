import {
  getCurrentWeather,
  getWeatherByCoords,
} from './modules/weather-service.js'
import { getCoords } from './modules/location-service.js'
import { CONFIG } from './modules/config.js'
import { logger } from './modules/logger.js'
import { historyService } from './modules/history-service.js'
import {
  showLoading,
  showError,
  showMessage,
  displayWeather,
  getCityInput,
  getUserPreferences,
  saveUserPreferences,
  loadUserPreferences,
  updatePreferencesUI,
  elements,
  renderHistory,
  showHistory,
  hideHistory,
  addHistoryEventListeners,
  setCityInput,
} from './modules/ui-controller.js'

// ... funcțiile existente +

// Gestionează click pe istoric
const handleHistoryClick = async (event) => {
  const historyItem = event.target.closest('.history-item')
  if (!historyItem) return

  const city = historyItem.dataset.city
  const lat = parseFloat(historyItem.dataset.lat)
  const lon = parseFloat(historyItem.dataset.lon)

  try {
    showLoading(`Încarc vremea pentru ${city}...`)
    logger.info('Loading weather from history', city)

    const weatherData = await getWeatherByCoords(lat, lon)

    // Move to top of history
    historyService.addLocation(weatherData)

    displayWeather(weatherData)
    setCityInput(weatherData.name)

    // Update history UI
    const history = historyService.getHistory()
    renderHistory(history)
  } catch (error) {
    showError('Nu am putut încărca vremea din istoric.')
    logger.error('History weather load failed', error)
  }
}

// Gestionează ștergerea istoricului
const handleClearHistory = () => {
  if (confirm('Sigur vrei să ștergi tot istoricul de căutări?')) {
    historyService.clearHistory()
    renderHistory([])
    hideHistory()
    logger.info('History cleared')
  }
}

// Încarcă istoricul la pornirea aplicației
const loadHistoryOnStart = () => {
  const history = historyService.getHistory()
  if (history.length > 0) {
    renderHistory(history)
    showHistory()
    logger.info('History loaded on start', history.length)
  }
}

// Enhanced handleSearch cu istoric
const handleSearch = async () => {
  const cityName = getCityInput()

  if (!isValidCity(cityName)) {
    showError(
      'Te rog introdu un nume valid de oraș (minim 2 caractere, doar litere)'
    )
    logger.warn('Invalid city input', cityName)
    return
  }

  try {
    showLoading('Caut vremea pentru ' + cityName + '...')
    logger.info('Searching weather for city', cityName)

    const weatherData = await getCurrentWeather(cityName)

    // Save to history
    historyService.addLocation(weatherData)

    // Display weather
    displayWeather(weatherData)
    setCityInput(weatherData.name)

    // Update history UI
    const history = historyService.getHistory()
    renderHistory(history)
    if (history.length > 0) {
      showHistory()
    }

    logger.info('Weather search completed', weatherData.name)
  } catch (error) {
    showError(error.message)
    logger.error('Weather search failed', error)
  }
}

// Enhanced handleLocationSearch cu istoric
const handleLocationSearch = async () => {
  try {
    showLoading('Detectez locația...')
    logger.info('Location detection started')

    const coords = await getCoords()

    if (coords.source === 'ip') {
      showMessage(
        'Locație aproximativă bazată pe IP (precizie la nivel de oraș)',
        'info'
      )
    } else if (coords.source === 'gps') {
      showMessage('Locație precisă obținută prin GPS', 'info')
    }

    showLoading('Încarc vremea pentru locația ta...')

    const weather = await getWeatherByCoords(coords.latitude, coords.longitude)

    // Save to history
    historyService.addLocation(weather)

    displayWeather(weather)
    setCityInput(weather.name)

    // Update history UI
    const history = historyService.getHistory()
    renderHistory(history)
    if (history.length > 0) {
      showHistory()
    }

    logger.info('Location search completed', weather.name)
  } catch (error) {
    showError(`Locația nu a putut fi determinată: ${error.message}`)
    logger.error('Location search failed', error)
  }
}

// Enhanced setupEventListeners cu istoric
const setupEventListeners = () => {
  // ... event listeners existente

  // History event listeners
  addHistoryEventListeners(handleHistoryClick, handleClearHistory)
}

// Enhanced initializeApp cu istoric
const initializeApp = async () => {
  try {
    logger.info('Weather App starting')

    // Încarcă preferințele utilizatorului
    const savedPrefs = loadUserPreferences()
    updatePreferencesUI(savedPrefs)

    // Actualizează configurația globală
    CONFIG.DEFAULT_UNITS = savedPrefs.unit
    CONFIG.DEFAULT_LANG = savedPrefs.lang

    // Încarcă istoricul
    loadHistoryOnStart()

    // Afișează mesaj de bun venit
    showMessage(
      'Aplicația de vreme este gata! Caută un oraș sau folosește locația ta.',
      'info'
    )

    elements.cityInput.focus()
    logger.info('Weather App initialized successfully')
  } catch (error) {
    logger.error('Initialization error:', error)
    showError('Eroare la inițializarea aplicației')
  }
}

// Debugging helpers disponibile în consolă
window.weatherApp = {
  handleSearch,
  handleLocationSearch,
  getCurrentWeather,
  getWeatherByCoords,
  getCoords,
  elements,
  config: CONFIG,
  historyService,
}
