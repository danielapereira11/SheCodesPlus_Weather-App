// Date & Time

let currentDateTime = new Date();
// Sat Aug 21 2021 10:11:48 GMT+0100 (Western European Summer Time)

// DATE
function getCurrentDate() {
  let currentDate = document.querySelector("#current-date");
  let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let months = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let weekDay = weekDays[currentDateTime.getDay()];
  let month = months[currentDateTime.getMonth()];
  let dayOfMonth = currentDateTime.getDate();
  currentDate.innerHTML = `${weekDay}, ${month} ${dayOfMonth}`;
}
getCurrentDate();

// TIME

function getCurrentTime() {
  let currentTime = document.querySelector("#current-time");
  let hours = currentDateTime.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentDateTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  currentTime.innerHTML = `${hours}:${minutes}`;
}
getCurrentTime();

// WEATHER

function showWeather(response) {
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = `${response.data.name}`;
  currentTemp = Math.round(response.data.main.temp);
  currentTempValue.innerHTML = currentTemp;
  maxTemp = Math.round(response.data.main.temp_max);
  maxTempValue.innerHTML = `${maxTemp}ºC`;
  minTemp = Math.round(response.data.main.temp_min);
  minTempValue.innerHTML = `${minTemp}ºC`;
  let currentWeather = response.data.weather[0].description;
  let currentWeatherDescript = document.querySelector("#current-weather");
  currentWeatherDescript.innerHTML = currentWeather;
  let weatherIconCode = response.data.weather[0].icon;
  let weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIconCode}.png`;
  let weatherIcon = document.querySelector("#weather-icon");
  weatherIcon.src = weatherIconUrl;
  weatherIcon.alt = currentWeather;
}

// WEATHER API: SEARCHED CITY (TEMP + LOCATION)

function search(city) {
  let apiKey = "7df6c65e200126c6e7cd1b9752957b4c";
  let searchedLocationTempApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(searchedLocationTempApiUrl).then(showWeather);
}

function searchAnotherCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search").value;
  search(city);
}

// WEATHER API: CURRENT LOCATION (TEMP + LOCATION)

function showCurrentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "7df6c65e200126c6e7cd1b9752957b4c";
  let currentLocationTempApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(currentLocationTempApiUrl).then(showWeather);
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}


function convertToCelcius(event) {
  event.preventDefault();
  currentTempValue.innerHTML = currentTemp;
  maxTempValue.innerHTML = `${maxTemp}ºC`;
  minTempValue.innerHTML = `${minTemp}ºC`;
}

function convertToFahrenheit(event) {
  event.preventDefault();
  currentTempValue.innerHTML = Math.round(currentTemp * 1.8 + 32);
  maxTempValue.innerHTML = `${Math.round(maxTemp * 1.8 + 32)}ºF`;
  minTempValue.innerHTML = `${Math.round(minTemp * 1.8 + 32)}ºF`;
}

let currentTemp = null;
let currentTempValue = document.querySelector("#current-temp-value");
let maxTemp = null;
let maxTempValue = document.querySelector("#max-temp");
let minTemp = null;
let minTempValue = document.querySelector("#min-temp");

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchAnotherCity);
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", convertToCelcius);
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

search("Guimarães");
