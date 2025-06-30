/**
 * Utilities Module
 *
 * General purpose utility functions used throughout the application.
 * These functions handle common tasks like formatting, validation, etc.
 */

/**
 * Format a UNIX timestamp as time
 *
 * @param {number} timestamp - UNIX timestamp in seconds
 * @returns {string} - Formatted time string (24-hour format)
 */
export function formatTime(timestamp) {
  const date = new Date(timestamp * 1000);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

/**
 * Format date and time with timezone offset
 *
 * @param {number} timezone - Timezone offset in seconds
 * @param {string} locale - Locale for formatting (default: 'ro-RO')
 * @returns {string} - Formatted date and time string
 */
export function formatDateTime(timezone, locale = "ro-RO") {
  const now = new Date();
  // Calculate local time in the specified timezone
  const localTime = new Date(
    now.getTime() + timezone * 1000 + now.getTimezoneOffset() * 60 * 1000
  );

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  return localTime.toLocaleDateString(locale, options);
}
