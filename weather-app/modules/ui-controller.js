import { CONFIG } from './config.js'
import { logger } from './logger.js'

// ... elementele existente + noile elemente pentru istoric
export const elements = {
  // ... elementele existente

  // History elements
  historySection: document.querySelector('#history-section'),
  historyList: document.querySelector('#history-list'),
  clearHistoryBtn: document.querySelector('#clear-history-btn'),
}

// ... funcțiile existente +

// History management functions
export const showHistory = () => {
  if (elements.historySection) {
    elements.historySection.classList.remove('hidden')
  }
}

export const hideHistory = () => {
  if (elements.historySection) {
    elements.historySection.classList.add('hidden')
  }
}

export const renderHistory = (historyItems) => {
  if (!elements.historyList) return

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

export const addHistoryEventListeners = (onHistoryClick, onClearHistory) => {
  if (elements.historyList) {
    elements.historyList.addEventListener('click', onHistoryClick)
  }
  if (elements.clearHistoryBtn) {
    elements.clearHistoryBtn.addEventListener('click', onClearHistory)
  }
}

const getTimeAgo = (timestamp) => {
  const now = Date.now()
  const diff = now - timestamp
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 60) return `${minutes} minute în urmă`
  if (hours < 24) return `${hours} ore în urmă`
  if (days === 1) return 'Ieri'
  return `${days} zile în urmă`
}

// Helper function pentru setarea input-ului
export const setCityInput = (cityName) => {
  elements.cityInput.value = cityName
}

// Enhanced displayWeather with logging
export const displayWeather = (weatherData) => {
  try {
    // Validează că avem datele necesare
    if (!weatherData || !weatherData.main || !weatherData.weather) {
      throw new Error('Date meteo incomplete')
    }

    // Numele și țara
    elements.cityName.textContent = `${weatherData.name}, ${weatherData.sys.country}`

    // Data curentă
    elements.weatherDate.textContent = formatCurrentDate()

    // Temperatura
    const prefs = getUserPreferences()
    updateTemperatureDisplay(weatherData.main.temp, prefs.unit)

    // Temperatura simțită
    const feelsLikeSymbol = prefs.unit === 'metric' ? '°C' : '°F'
    elements.feelsLike.textContent = `Se simte ca ${Math.round(
      weatherData.main.feels_like
    )}${feelsLikeSymbol}`

    // Iconița și descrierea
    const weatherInfo = weatherData.weather[0]
    elements.weatherIcon.src = getWeatherIconUrl(weatherInfo.icon)
    elements.weatherIcon.alt = weatherInfo.description

    // Descrierea vremii
    elements.weatherDescription.textContent =
      weatherInfo.description.charAt(0).toUpperCase() +
      weatherInfo.description.slice(1)

    // Detalii suplimentare
    elements.humidity.textContent = `${weatherData.main.humidity}%`
    elements.windSpeed.textContent = `${weatherData.wind.speed} m/s`
    elements.pressure.textContent = `${weatherData.main.pressure} hPa`
    elements.visibility.textContent = formatVisibility(weatherData.visibility)
    elements.sunrise.textContent = formatTime(weatherData.sys.sunrise)
    elements.sunset.textContent = formatTime(weatherData.sys.sunset)

    // Afișează rezultatul
    hideLoading()
    elements.weatherDisplay.classList.remove('hidden')
  } catch (error) {
    logger.error('Error displaying weather:', error)
    showError('Eroare la afișarea datelor meteo')
  }
}
