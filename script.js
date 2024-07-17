document.addEventListener('DOMContentLoaded', () => {
  const getWeatherButton = document.getElementById('get-weather-button');
  const cityInput = document.getElementById('city-input');
  const weatherResult = document.getElementById('weather-result');
  const cityNameElement = document.getElementById('city-name');
  const weatherDescriptionElement = document.getElementById('weather-description');
  const temperatureElement = document.getElementById('temperature');

  const apiKey = '9f75607863a890f8bf1bda53232c0e48';

  getWeatherButton.addEventListener('click', fetchWeather);
  cityInput.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
          fetchWeather();
      }
  });

  function fetchWeather() {
      const city = cityInput.value.trim();
      if (city !== '') {
          fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
              .then(response => response.json())
              .then(data => {
                  if (data.cod === 200) {
                      displayWeather(data);
                  } else {
                      alert('City not found');
                  }
              })
              .catch(error => {
                  console.error('Error fetching the weather data:', error);
              });
      }
  }

  function displayWeather(data) {
      const { name, weather, main } = data;
      cityNameElement.textContent = name;
      weatherDescriptionElement.textContent = weather[0].description;
      temperatureElement.textContent = `${main.temp} °C`;

      weatherResult.style.display = 'block';
  }
});
