import { CONFIG } from './config.js'

export const LOG_LEVELS = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
}

const styles = {
  DEBUG: 'color: #636e72; font-weight: normal;',
  INFO: 'color: #0984e3; font-weight: normal;',
  WARN: 'color: #fdcb6e; font-weight: bold;',
  ERROR: 'color: #d63031; font-weight: bold;',
}

export class Logger {
  constructor() {
    this.logs = []
    this.currentLevel = LOG_LEVELS[CONFIG.LOGGING.LEVEL] ?? LOG_LEVELS.info
  }

  debug(message, data = null) {
    this._log('debug', message, data)
  }

  info(message, data = null) {
    this._log('info', message, data)
  }

  warn(message, data = null) {
    this._log('warn', message, data)
  }

  error(message, error = null) {
    this._log('error', message, error)
  }

  // Metodă privată pentru formatarea și stocarea log-urilor
  _log(level, message, data) {
    // Ieșire rapidă dacă logging-ul este dezactivat
    if (!CONFIG.LOGGING.ENABLED) {
      return
    }

    const messageLevel = LOG_LEVELS[level]

    // Loghează doar dacă nivelul este suficient de înalt
    if (messageLevel < this.currentLevel) {
      return
    }

    const timestamp = new Date().toLocaleTimeString()
    const logEntry = {
      timestamp,
      level: level.toUpperCase(),
      message,
      data: data
        ? data instanceof Error
          ? {
              name: data.name,
              message: data.message,
              stack: data.stack,
            }
          : data
        : null,
      formattedMessage: `[${timestamp}] [${level.toUpperCase()}] ${message}`,
    }

    // Adaugă în array-ul de log-uri
    this.logs.push(logEntry)

    // Limitează numărul de log-uri în memorie
    if (this.logs.length >= CONFIG.LOGGING.MAX_LOGS) {
      this.logs.shift() // Elimină cel mai vechi log
    }

    // Loghează și în consolă pentru vizibilitate imediată în timpul dezvoltării
    if (CONFIG.LOGGING.ENABLE_CONSOLE) {
      console[level](logEntry.formattedMessage, data)
    }
  }

  clear() {
    this.logs = []
    console.log('Logger cleared')
  }

  show() {
    console.group('🔍 Weather App Logs')
    this.logs.forEach((log) => {
      console.log(`%c${log.formattedMessage}`, styles[log.level])
      if (log.data) {
        console.log('   Data:', log.data)
      }
    })
    console.groupEnd()
  }
}

// Exportă o instanță singleton
export const logger = new Logger()

// Expune logger-ul global pentru debugging
window.logs = {
  show: () => logger.show(),
  clear: () => logger.clear(),
}

// În consolă:
window.logs.show() // Afișează toate log-urile cu culori
window.logs.clear() // Șterge log-urile stocate

// În cod:
logger.info('User searched for city', { city: 'Cluj' })
logger.error('API failed', new Error('Network error'));
