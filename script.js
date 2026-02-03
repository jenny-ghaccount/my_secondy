/**
 * European Weather Forecast App
 * Uses Open-Meteo APIs (no API key required)
 */

// ===== Configuration =====
const CONFIG = {
  geocodingAPI: 'https://geocoding-api.open-meteo.com/v1/search',
  forecastAPI: 'https://api.open-meteo.com/v1/forecast',
  debounceDelay: 300,
  minSearchLength: 2,
  maxSuggestions: 8,
  // European country codes (ISO 3166-1 alpha-2)
  europeanCountries: new Set([
    'AL', 'AD', 'AT', 'BY', 'BE', 'BA', 'BG', 'HR', 'CY', 'CZ',
    'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IS', 'IE', 'IT',
    'XK', 'LV', 'LI', 'LT', 'LU', 'MT', 'MD', 'MC', 'ME', 'NL',
    'MK', 'NO', 'PL', 'PT', 'RO', 'RU', 'SM', 'RS', 'SK', 'SI',
    'ES', 'SE', 'CH', 'UA', 'GB', 'VA'
  ])
};

// Weather condition codes mapping (WMO Weather interpretation codes)
const WEATHER_CONDITIONS = {
  0: { description: 'Clear sky', icon: '☀️' },
  1: { description: 'Mainly clear', icon: '🌤️' },
  2: { description: 'Partly cloudy', icon: '⛅' },
  3: { description: 'Overcast', icon: '☁️' },
  45: { description: 'Fog', icon: '🌫️' },
  48: { description: 'Depositing rime fog', icon: '🌫️' },
  51: { description: 'Light drizzle', icon: '🌧️' },
  53: { description: 'Moderate drizzle', icon: '🌧️' },
  55: { description: 'Dense drizzle', icon: '🌧️' },
  56: { description: 'Light freezing drizzle', icon: '🌧️' },
  57: { description: 'Dense freezing drizzle', icon: '🌧️' },
  61: { description: 'Slight rain', icon: '🌧️' },
  63: { description: 'Moderate rain', icon: '🌧️' },
  65: { description: 'Heavy rain', icon: '🌧️' },
  66: { description: 'Light freezing rain', icon: '🌧️' },
  67: { description: 'Heavy freezing rain', icon: '🌧️' },
  71: { description: 'Slight snow', icon: '🌨️' },
  73: { description: 'Moderate snow', icon: '🌨️' },
  75: { description: 'Heavy snow', icon: '❄️' },
  77: { description: 'Snow grains', icon: '🌨️' },
  80: { description: 'Slight rain showers', icon: '🌦️' },
  81: { description: 'Moderate rain showers', icon: '🌦️' },
  82: { description: 'Violent rain showers', icon: '🌧️' },
  85: { description: 'Slight snow showers', icon: '🌨️' },
  86: { description: 'Heavy snow showers', icon: '❄️' },
  95: { description: 'Thunderstorm', icon: '⛈️' },
  96: { description: 'Thunderstorm with slight hail', icon: '⛈️' },
  99: { description: 'Thunderstorm with heavy hail', icon: '⛈️' }
};

// ===== State =====
let cityResults = [];
let selectedCity = null;
let debounceTimer = null;

// ===== DOM Elements =====
const elements = {
  form: document.getElementById('weather-form'),
  cityInput: document.getElementById('city-input'),
  suggestions: document.getElementById('city-suggestions'),
  submitBtn: document.getElementById('submit-btn'),
  loadingState: document.getElementById('loading-state'),
  errorState: document.getElementById('error-state'),
  errorText: document.getElementById('error-text'),
  retryBtn: document.getElementById('retry-btn'),
  weatherCard: document.getElementById('weather-card'),
  weatherCity: document.getElementById('weather-city'),
  weatherDate: document.getElementById('weather-date'),
  weatherIcon: document.getElementById('weather-icon'),
  weatherTemp: document.getElementById('weather-temp'),
  weatherCondition: document.getElementById('weather-condition'),
  weatherHighLow: document.getElementById('weather-highlow'),
  weatherWind: document.getElementById('weather-wind'),
  weatherHumidity: document.getElementById('weather-humidity'),
  clouds: document.querySelectorAll('.cloud')
};

// ===== Utility Functions =====

/**
 * Check if user prefers reduced motion
 */
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Debounce function
 */
function debounce(func, delay) {
  return (...args) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(this, args), delay);
  };
}

/**
 * Check if user is online
 */
function isOnline() {
  return navigator.onLine;
}

/**
 * Format date for display in city's timezone
 */
function formatDate(timezone) {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: timezone
    }).format(new Date());
  } catch {
    return new Date().toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }
}

// ===== API Functions =====

/**
 * Search for cities using geocoding API
 */
async function searchCities(query) {
  if (!isOnline()) {
    throw new Error('offline');
  }

  const url = `${CONFIG.geocodingAPI}?name=${encodeURIComponent(query)}&count=20&language=en`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('geocoding_failed');
  }
  
  const data = await response.json();
  
  if (!data.results) {
    return [];
  }
  
  // Filter to European countries only
  return data.results
    .filter(city => CONFIG.europeanCountries.has(city.country_code))
    .slice(0, CONFIG.maxSuggestions);
}

/**
 * Fetch weather forecast for a location
 */
async function fetchForecast(latitude, longitude) {
  if (!isOnline()) {
    throw new Error('offline');
  }

  const url = `${CONFIG.forecastAPI}?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relative_humidity_2m&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('forecast_failed');
  }
  
  return response.json();
}

// ===== UI Functions =====

/**
 * Update city suggestions datalist
 */
function updateSuggestions(cities) {
  cityResults = cities;
  elements.suggestions.innerHTML = '';
  
  cities.forEach((city, index) => {
    const option = document.createElement('option');
    const label = `${city.name}, ${city.admin1 || ''} ${city.country}`.replace(/\s+/g, ' ').trim();
    option.value = label;
    option.dataset.index = index;
    elements.suggestions.appendChild(option);
  });
}

/**
 * Show loading state
 */
function showLoading() {
  elements.submitBtn.classList.add('loading');
  elements.submitBtn.disabled = true;
  elements.weatherCard.hidden = true;
  elements.errorState.hidden = true;
  elements.loadingState.hidden = false;
}

/**
 * Hide loading state
 */
function hideLoading() {
  elements.submitBtn.classList.remove('loading');
  elements.submitBtn.disabled = false;
  elements.loadingState.hidden = true;
}

/**
 * Show error message
 */
function showError(type) {
  hideLoading();
  elements.weatherCard.hidden = true;
  elements.errorState.hidden = false;
  
  const messages = {
    offline: "You appear to be offline. Please check your connection.",
    city_not_found: "City not found. Try another city in Europe.",
    forecast_failed: "Couldn't load forecast. Please try again.",
    geocoding_failed: "Couldn't search for cities. Please try again."
  };
  
  elements.errorText.textContent = messages[type] || messages.forecast_failed;
}

/**
 * Display weather data
 */
function displayWeather(city, forecast) {
  hideLoading();
  elements.errorState.hidden = true;
  
  const { current_weather, daily, hourly, timezone } = forecast;
  const condition = WEATHER_CONDITIONS[current_weather.weathercode] || WEATHER_CONDITIONS[0];
  
  // Get current hour's humidity
  const now = new Date();
  const currentHourIndex = now.getHours();
  const humidity = hourly?.relative_humidity_2m?.[currentHourIndex] ?? '--';
  
  // Update weather card
  elements.weatherCity.textContent = `${city.name}, ${city.country}`;
  elements.weatherDate.textContent = formatDate(timezone);
  elements.weatherIcon.textContent = condition.icon;
  elements.weatherTemp.textContent = `${Math.round(current_weather.temperature)}°C`;
  elements.weatherCondition.textContent = condition.description;
  elements.weatherHighLow.textContent = `${Math.round(daily.temperature_2m_max[0])}° / ${Math.round(daily.temperature_2m_min[0])}°`;
  elements.weatherWind.textContent = `${Math.round(current_weather.windspeed)} km/h`;
  elements.weatherHumidity.textContent = `${humidity}%`;
  
  elements.weatherCard.hidden = false;
}

// ===== Rain Easter Egg =====

/**
 * Create rain effect on cloud hover
 */
function createRainEffect(cloud) {
  if (prefersReducedMotion()) return;
  
  const rect = cloud.getBoundingClientRect();
  const dropCount = 15;
  const drops = [];
  
  for (let i = 0; i < dropCount; i++) {
    const drop = document.createElement('div');
    drop.className = 'rain-drop';
    drop.style.left = `${rect.left + Math.random() * rect.width}px`;
    drop.style.top = `${rect.bottom}px`;
    drop.style.animationDelay = `${Math.random() * 0.5}s`;
    document.body.appendChild(drop);
    drops.push(drop);
  }
  
  // Cleanup after animation
  setTimeout(() => {
    drops.forEach(drop => drop.remove());
  }, 2500);
}

// ===== Event Handlers =====

/**
 * Handle city input changes
 */
const handleCityInput = debounce(async (event) => {
  const query = event.target.value.trim();
  
  if (query.length < CONFIG.minSearchLength) {
    updateSuggestions([]);
    return;
  }
  
  try {
    const cities = await searchCities(query);
    updateSuggestions(cities);
  } catch (error) {
    console.error('City search error:', error);
    updateSuggestions([]);
  }
}, CONFIG.debounceDelay);

/**
 * Handle form submission
 */
async function handleFormSubmit(event) {
  event.preventDefault();
  
  const inputValue = elements.cityInput.value.trim();
  
  if (!inputValue) return;
  
  // Find selected city from results
  selectedCity = cityResults.find(city => {
    const label = `${city.name}, ${city.admin1 || ''} ${city.country}`.replace(/\s+/g, ' ').trim();
    return label === inputValue;
  });
  
  // If no exact match, try to search for the city
  if (!selectedCity) {
    try {
      showLoading();
      const cities = await searchCities(inputValue);
      
      if (cities.length === 0) {
        showError('city_not_found');
        return;
      }
      
      selectedCity = cities[0];
    } catch (error) {
      showError(error.message === 'offline' ? 'offline' : 'geocoding_failed');
      return;
    }
  }
  
  // Fetch forecast
  showLoading();
  
  try {
    const forecast = await fetchForecast(selectedCity.latitude, selectedCity.longitude);
    displayWeather(selectedCity, forecast);
  } catch (error) {
    showError(error.message === 'offline' ? 'offline' : 'forecast_failed');
  }
}

/**
 * Handle retry button click
 */
function handleRetry() {
  elements.errorState.hidden = true;
  elements.cityInput.focus();
}

/**
 * Handle cloud hover for rain effect
 */
function handleCloudHover(event) {
  createRainEffect(event.target);
}

// ===== Initialization =====

function init() {
  // Form events
  elements.form.addEventListener('submit', handleFormSubmit);
  elements.cityInput.addEventListener('input', handleCityInput);
  elements.retryBtn.addEventListener('click', handleRetry);
  
  // Cloud hover events (only the main cloud element, not pseudo-elements)
  elements.clouds.forEach(cloud => {
    cloud.addEventListener('mouseenter', handleCloudHover);
  });
  
  // Online/offline detection
  window.addEventListener('online', () => {
    if (!elements.errorState.hidden) {
      elements.errorState.hidden = true;
    }
  });
  
  window.addEventListener('offline', () => {
    showError('offline');
  });
  
  // Focus input on load
  elements.cityInput.focus();
}

// Start the app
document.addEventListener('DOMContentLoaded', init);
