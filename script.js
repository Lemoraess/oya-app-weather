function showWeather(event) {
  event.preventDefault();
  let searchBox = document.querySelector("#searchBox");
  let city = document.querySelector("#cityData");
  city.innerHTML = searchBox.value;
}

let searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", showWeather);
