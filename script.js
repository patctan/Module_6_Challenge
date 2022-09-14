// // 5 Day Forecast
var searchHistoryArray = [];
var fiveDayArray = [];
console.log(fiveDayArray);

//put function to push city into array within this function
const fiveDayForecast = function (city) {
  console.log(city);
  searchHistoryArray.push(city);
  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&units=imperial&appid=e57070c21ce9424475afa701ad71a404"
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      for (i = 0; i < data.list.length; i += 8) {
        fiveDayArray.push(data.list[i]);
      }
      console.log(data.list[0]);
      console.log(data.list[0].main.humidity);
      console.log(data.list[0].wind.speed);
      console.log(data.list[0].main.temp);
    });
};

let weather = {
  apiKey: "e57070c21ce9424475afa701ad71a404",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=imperial&appid=e57070c21ce9424475afa701ad71a404"
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon } = data.weather[0];
    const { temp, humidity } = data.main;
    const { lon, lat } = data.coord;
    const { speed } = data.wind;
    console.log(name, icon, temp, humidity, lon, lat, speed);
    document.querySelector(".cityName").innerText = name;
    document.querySelector(".temp").innerText = "Temperature: " + temp + "° F";
    document.querySelector(".wind").innerText = "Wind Speed: " + speed + " mph";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
  },
  search: function () {
    this.fetchWeather(document.querySelector("#searchCity").value);
  },
};

function generateCards() {
  var fiveDayPullInfo = ``;
  fiveDayArray.forEach(function (data) {
    fiveDayPullInfo =
      fiveDayPullInfo +
      `
    <card
    class = "card">
    <article>
    <div>
    <img src = "http://openweathermap.org/img/w/${data.weather[0].icon}.png";>
    </div>
    <div>
    <p>Temp: ${data.main.temp}</p>
    <p>Wind Speed: ${data.wind.speed}</p>
    <p>Humidity: ${data.main.humidity}</p>
    </div>
    </article></card>`;
  });
  const fiveDayCards = document.querySelector("#container");
  console.log("my five day cards are" + fiveDayCards.innerHTML);
  fiveDayCards.innerHTML = fiveDayPullInfo;
}

document
  .querySelector("#searchForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    console.log(document.querySelector("#searchCity").value);
    fiveDayForecast(document.querySelector("#searchCity").value);
    weather.search();
    generateCards();
  });
document
  .querySelector("#searchForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    localStorage.setItem("citiesSearched", JSON.stringify(searchHistoryArray));

    let lastCityInfo = localStorage.getItem("citiesSearched");
    let savedInfo = JSON.parse(lastCityInfo);
    //make a function to make an unordered list of buttons
    for (i = 0; i < savedInfo.length; i++) {
      const button = document.createElement("button");
      button.setAttribute("class", "searchHistoryButton");
      button.innerText = savedInfo[i];
      document.querySelector("#searchHistory").appendChild(button);
    }
  });
