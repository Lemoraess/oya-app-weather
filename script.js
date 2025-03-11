function currentData(response) {
  let temperatureElement = document.querySelector("#degreesData");
  let temperature = response.data.temperature.current;
  temperatureElement.innerHTML = Math.round(temperature);
  let cityElement = document.querySelector("#cityData");
  cityElement.innerHTML = response.data.city;
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

let searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", showCity);

apiCall("Ubatuba");
