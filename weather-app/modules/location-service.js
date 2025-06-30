// modules/location-service.js
export const getCoords = () => new Promise((resolve, reject) => {

    // Funcția de fallback - când geolocation eșuează
  const fallbackToIp = async () => {
    try {
      // Ce API public oferă locația bazată pe IP?
      // Hint: încearcă <https://ipapi.co/json/> - este gratuit și nu necesită API key
      const response = await fetch(/* ce URL folosești? */);
      const data = await response.json();

      // Ce proprietăți returnează pentru coordonate?
      // Hint: verifică în browser console ce structură are răspunsul
      resolve({
        latitude: /* unde găsești latitude? */,
        longitude: /* unde găsești longitude? */,
        source: 'ip',
        accuracy: 'city' // IP location e mai puțin precisă
      });
    } catch (error) {
      // Ce faci când nici IP location nu funcționează?
      reject(new Error('Nu am putut determina locația'));
    }
  }

  // Verifică dacă browser-ul suportă geolocation
  if (!navigator.geolocation) {
    return fallbackToIp();
  }

  // Încearcă geolocation mai întâi
  navigator.geolocation.getCurrentPosition(
    (position) => {
      // Cum extragi coordonatele din position?
      resolve({
        latitude: /* unde găsești? */,
        longitude: /* unde găsești? */,
        source: 'gps',
        accuracy: 'precise'
      });
    },
    (error) => {
      // Ce tipuri de erori pot apărea?
      // PERMISSION_DENIED = ?
      // POSITION_UNAVAILABLE = ?
      // TIMEOUT = ?
      console.warn('Geolocation failed:', error.message)
      fallbackToIp()
    },
    {
      // Ce opțiuni sunt utile?
      timeout: /* cât aștepți? */,
      enableHighAccuracy: /* true sau false? */,
      maximumAge: /* cât de vechi poate fi o locație cached? */
    }
  )
});

// Acceptă permisiunea când browser-ul întreabă
getCoords().then((coords) => {
  console.log('Coords received:', coords)
  console.log('Has lat/lon?', coords.latitude && coords.longitude)
  console.log('Source:', coords.source)
});

// Refuză permisiunea și vezi dacă fallback funcționează
// Ar trebui să primești coordonate cu source: 'ip'

getCoords()
  .then((coords) => getWeatherByCoords(coords.latitude, coords.longitude))
  .then((weather) => console.log('Weather for your location:', weather));
  
// Fiecare intrare din istoric va avea:
{
  city: "Cluj-Napoca",
  country: "RO",
  timestamp: 1640995200000,
  coordinates: { lat: 46.77, lon: 23.6 }
}
  