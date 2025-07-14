import { CONFIG } from './config.js'
import { logger } from './logger.js'

export class HistoryService {
  constructor() {
    this.storageKey = CONFIG.STORAGE_KEYS.SEARCH_HISTORY
    this.maxItems = CONFIG.MAX_HISTORY_ITEMS

    logger.debug('HistoryService initialized', {
      storageKey: this.storageKey,
      maxItems: this.maxItems,
    })
  }

  addLocation(weatherData) {
    const locationData = {
      city: weatherData.name,
      country: weatherData.sys.country,
      timestamp: Date.now(),
      coordinates: {
        lat: weatherData.coord.lat,
        lon: weatherData.coord.lon,
      },
    }

    let history = this.getHistory()

    // Check if location already exists
    const existingIndex = history.findIndex(
      (item) => item.city.toLowerCase() === locationData.city.toLowerCase()
    )

    if (existingIndex !== -1) {
      // Move to top
      history.splice(existingIndex, 1)
    }

    // Add to beginning
    history.unshift(locationData)

    // Limit to max items
    if (history.length > this.maxItems) {
      history = history.slice(0, this.maxItems)
    }

    // Save to localStorage
    this._saveToStorage(history)
    logger.info('Location added to history', locationData.city)

    return history
  }

  getHistory() {
    try {
      const stored = localStorage.getItem(this.storageKey)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      logger.error('Failed to load history', error)
      return []
    }
  }

  clearHistory() {
    localStorage.removeItem(this.storageKey)
    logger.info('History cleared')
    return []
  }

  _saveToStorage(history) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(history))
    } catch (error) {
      logger.error('Failed to save history', error)
    }
  }
}

// Export singleton instance
export const historyService = new HistoryService();
