

//  class WeatherApp {
//             constructor() {
//                 // Your OpenWeatherMap API key
//                 this.API_KEY = 'da527acdd9c888f7bbe3733ae8aae130';
//                 this.BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
                
//                 // DOM elements
//                 this.searchForm = document.getElementById('searchForm');
//                 this.cityInput = document.getElementById('cityInput');
//                 this.searchButton = document.getElementById('searchButton');
//                 this.loading = document.getElementById('loading');
//                 this.errorMessage = document.getElementById('errorMessage');
//                 this.weatherDisplay = document.getElementById('weatherDisplay');
                
//                 // Weather display elements
//                 this.cityInfo = document.getElementById('cityInfo');
//                 this.weatherIcon = document.getElementById('weatherIcon');
//                 this.temperature = document.getElementById('temperature');
//                 this.weatherDescription = document.getElementById('weatherDescription');
//                 this.feelsLike = document.getElementById('feelsLike');
//                 this.humidity = document.getElementById('humidity');
//                 this.windSpeed = document.getElementById('windSpeed');
//                 this.pressure = document.getElementById('pressure');
//                 this.visibility = document.getElementById('visibility');

//                 this.initializeApp();
//             }

//             initializeApp() {
//                 this.attachEventListeners();
//                 this.loadDefaultWeather();
//             }

//             attachEventListeners() {
//                 this.searchForm.addEventListener('submit', (e) => {
//                     e.preventDefault();
//                     this.handleSearch();
//                 });

//                 this.cityInput.addEventListener('input', () => {
//                     this.clearError();
//                 });

//                 // Allow Enter key to trigger search
//                 this.cityInput.addEventListener('keypress', (e) => {
//                     if (e.key === 'Enter') {
//                         this.handleSearch();
//                     }
//                 });
//             }

//             async handleSearch() {
//                 const city = this.cityInput.value.trim();
                
//                 if (!city) {
//                     this.showError('Please enter a city name');
//                     return;
//                 }

//                 if (city.length < 2) {
//                     this.showError('City name must be at least 2 characters long');
//                     return;
//                 }

//                 await this.fetchWeatherData(city);
//             }

//             async fetchWeatherData(city) {
//                 try {
//                     this.showLoading();
//                     this.clearError();
//                     this.hideWeatherDisplay();

//                     const url = `${this.BASE_URL}?q=${encodeURIComponent(city)}&appid=${this.API_KEY}&units=metric`;
                    
//                     const response = await fetch(url);
                    
//                     if (!response.ok) {
//                         await this.handleApiError(response, city);
//                         return;
//                     }

//                     const weatherData = await response.json();
//                     this.displayWeatherData(weatherData);
                    
//                 } catch (error) {
//                     console.error('Weather fetch error:', error);
//                     this.handleNetworkError(error);
//                 } finally {
//                     this.hideLoading();
//                 }
//             }

//             async handleApiError(response, city) {
//                 const errorData = await response.json().catch(() => ({}));
                
//                 switch (response.status) {
//                     case 404:
//                         this.showError(`City "${city}" not found. Please check the spelling and try again.`);
//                         break;
//                     case 401:
//                         this.showError('API authentication failed. Please check the API key.');
//                         break;
//                     case 429:
//                         this.showError('Too many requests. Please wait a moment and try again.');
//                         break;
//                     case 500:
//                     case 502:
//                     case 503:
//                         this.showError('Weather service is temporarily unavailable. Please try again later.');
//                         break;
//                     default:
//                         this.showError(errorData.message || `Error ${response.status}: Unable to fetch weather data.`);
//                 }
//             }

//             handleNetworkError(error) {
//                 if (error.name === 'TypeError' && error.message.includes('fetch')) {
//                     this.showError('Network error. Please check your internet connection and try again.');
//                 } else {
//                     this.showError('An unexpected error occurred. Please try again.');
//                 }
//             }

//             displayWeatherData(data) {
//                 // City information
//                 this.cityInfo.textContent = `${data.name}, ${data.sys.country}`;

//                 // Weather icon
//                 const iconCode = data.weather[0].icon;
//                 this.weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
//                 this.weatherIcon.alt = data.weather[0].description;

//                 // Temperature information
//                 this.temperature.textContent = `${Math.round(data.main.temp)}°C`;
//                 this.weatherDescription.textContent = data.weather[0].description;
//                 this.feelsLike.textContent = `Feels like ${Math.round(data.main.feels_like)}°C`;

//                 // Weather details
//                 this.humidity.textContent = `${data.main.humidity}%`;
//                 this.windSpeed.textContent = `${data.wind.speed} m/s`;
//                 this.pressure.textContent = `${data.main.pressure} hPa`;
//                 this.visibility.textContent = data.visibility ? `${(data.visibility / 1000).toFixed(1)} km` : 'N/A';

//                 this.showWeatherDisplay();
//             }

//             showLoading() {
//                 this.loading.style.display = 'block';
//                 this.searchButton.disabled = true;
//                 this.searchButton.textContent = 'Loading...';
//             }

//             hideLoading() {
//                 this.loading.style.display = 'none';
//                 this.searchButton.disabled = false;
//                 this.searchButton.textContent = 'Get Weather';
//             }

//             showError(message) {
//                 this.errorMessage.textContent = message;
//                 this.errorMessage.style.display = 'block';
//                 this.errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
//             }

//             clearError() {
//                 this.errorMessage.style.display = 'none';
//             }

//             showWeatherDisplay() {
//                 this.weatherDisplay.classList.add('show');
//             }

//             hideWeatherDisplay() {
//                 this.weatherDisplay.classList.remove('show');
//             }

//             async loadDefaultWeather() {
//                 // Load weather for a default city to show the app functionality
//                 await this.fetchWeatherData('London');
//             }
//         }

//         // Initialize the weather app when the DOM is fully loaded
//         document.addEventListener('DOMContentLoaded', () => {
//             new WeatherApp();
//         });

//         // Handle online/offline status
//         window.addEventListener('online', () => {
//             console.log('Connection restored');
//         });

//         window.addEventListener('offline', () => {
//             console.log('Connection lost');
//         });




class WeatherApp {
    constructor() {
        this.API_KEY = 'da527acdd9c888f7bbe3733ae8aae130';
        this.WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';
        this.FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';

        // DOM elements
        this.searchForm = document.getElementById('searchForm');
        this.cityInput = document.getElementById('cityInput');
        this.searchButton = document.getElementById('searchButton');
        this.loading = document.getElementById('loading');
        this.errorMessage = document.getElementById('errorMessage');

        // Current weather display
        this.weatherDisplay = document.getElementById('weatherDisplay');
        this.cityInfo = document.getElementById('cityInfo');
        this.weatherIcon = document.getElementById('weatherIcon');
        this.temperature = document.getElementById('temperature');
        this.weatherDescription = document.getElementById('weatherDescription');
        this.feelsLike = document.getElementById('feelsLike');
        this.humidity = document.getElementById('humidity');
        this.windSpeed = document.getElementById('windSpeed');
        this.pressure = document.getElementById('pressure');
        this.visibility = document.getElementById('visibility');

        // Forecast display
        this.forecastDisplay = document.getElementById('forecastDisplay');

        this.attachEvents();
        this.fetchWeatherData('London'); // default city
    }

    attachEvents() {
        this.searchForm.addEventListener('submit', e => {
            e.preventDefault();
            const city = this.cityInput.value.trim();
            if (city.length < 2) return this.showError('Please enter a valid city name');
            this.fetchWeatherData(city);
        });

        this.cityInput.addEventListener('input', () => this.clearError());
    }

    async fetchWeatherData(city) {
        try {
            this.toggleLoading(true);
            this.clearError();

            const [weatherRes, forecastRes] = await Promise.all([
                fetch(`${this.WEATHER_URL}?q=${city}&appid=${this.API_KEY}&units=metric`),
                fetch(`${this.FORECAST_URL}?q=${city}&appid=${this.API_KEY}&units=metric`)
            ]);

            if (!weatherRes.ok) throw new Error(`City "${city}" not found`);
            if (!forecastRes.ok) throw new Error('Unable to fetch forecast');

            const weatherData = await weatherRes.json();
            const forecastData = await forecastRes.json();

            this.displayWeather(weatherData);
            this.displayForecast(forecastData);
        } catch (err) {
            this.showError(err.message);
        } finally {
            this.toggleLoading(false);
        }
    }

    displayWeather(data) {
        this.cityInfo.textContent = `${data.name}, ${data.sys.country}`;
        this.weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        this.weatherIcon.alt = data.weather[0].description;
        this.temperature.textContent = `${Math.round(data.main.temp)}°C`;
        this.weatherDescription.textContent = data.weather[0].description;
        this.feelsLike.textContent = `Feels like ${Math.round(data.main.feels_like)}°C`;
        this.humidity.textContent = `${data.main.humidity}%`;
        this.windSpeed.textContent = `${data.wind.speed} m/s`;
        this.pressure.textContent = `${data.main.pressure} hPa`;
        this.visibility.textContent = data.visibility ? `${(data.visibility / 1000).toFixed(1)} km` : 'N/A';
        this.weatherDisplay.classList.add('show');
    }

    displayForecast(data) {
        const dailyData = {};
        data.list.forEach(item => {
            const date = item.dt_txt.split(' ')[0];
            if (!dailyData[date]) dailyData[date] = item;
        });

        const days = Object.values(dailyData).slice(1, 5); // next 4 days
        this.forecastDisplay.innerHTML = days.map(day => `
            <div class="forecast-card">
                <h4>${new Date(day.dt_txt).toLocaleDateString()}</h4>
                <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="">
                <p>${Math.round(day.main.temp)}°C</p>
                <small>${day.weather[0].description}</small>
            </div>
        `).join('');
    }

    showError(msg) {
        this.errorMessage.textContent = msg;
        this.errorMessage.style.display = 'block';
    }

    clearError() {
        this.errorMessage.style.display = 'none';
    }

    toggleLoading(isLoading) {
        this.loading.style.display = isLoading ? 'block' : 'none';
        this.searchButton.disabled = isLoading;
        this.searchButton.textContent = isLoading ? 'Loading...' : 'Get Weather';
    }
}

document.addEventListener('DOMContentLoaded', () => new WeatherApp());
