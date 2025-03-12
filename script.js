function currentData(response) {
  let temperatureElement = document.querySelector("#degreesData");
  let temperature = response.data.temperature.current;
  temperatureElement.innerHTML = Math.round(temperature);

  let cityElement = document.querySelector("#cityData");
  cityElement.innerHTML = response.data.city;

  let descriptionElement = document.querySelector("#descriptionData");
  descriptionElement.innerHTML = response.data.condition.description;

  let humidityElement = document.querySelector("#humidityData");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

  let windElement = document.querySelector("#windData");
  windElement.innerHTML = `${response.data.wind.speed}km/h`;

  let date = new Date(response.data.time * 1000);
  let timeElement = document.querySelector("#timeData");
  timeElement.innerHTML = showDay(date);

  let iconElement = document.querySelector("#iconData");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="emojiData">`;

  let feelsLikeElement = document.querySelector("#feelsLike");
  let feelsLike = Math.round(response.data.temperature.feels_like);
  feelsLikeElement.innerHTML = `${feelsLike}°C`;

  getWeek(response.data.city);
}

function showDay(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}
function apiCall(city) {
  let apiKey = "5btac2eb2ed52b236021789ofe9a3348";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentData);
}

function showCity(event) {
  event.preventDefault();
  let searchBox = document.querySelector("#searchBox");
  apiCall(searchBox.value);
}

function getWeek(city) {
  let apiKey = "5btac2eb2ed52b236021789ofe9a3348";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayWeek);
}

function displayWeek(response) {
  console.log(response.data);

  let days = ["Wed", "Thu", "Fri", "Sat", "Sun"];
  let weekHtml = "";

  days.forEach(function (day) {
    weekHtml =
      weekHtml +
      `<div class="weatherWeekDay">
                    <div class="weatherDate">${day}</div>
                    <div class="weatherIcon">🌤️</div>
                    <div class="weatherTemperatures">
                        <div class="weatherTemperature"> <strong>15°</strong></div>
                        <div class="weatherTemperature">9°</div>
                    </div>
                </div>`;
  });
  let weatherWeek = document.querySelector("#weatherWeek");
  weatherWeek.innerHTML = weekHtml;
}

let searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", showCity);

apiCall("Ubatuba");
