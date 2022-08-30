// fetch(
//   "https://api.openweathermap.org/data/2.5/forecast?id=524901&appid=e57070c21ce9424475afa701ad71a404"
// )
//   .then((response) => {
//     return response.json();
//   })
//   .then((users) => {
//     console.log(users);
//   });

// //Geocoding API
// fetch(
//   "http://api.openweathermap.org/geo/1.0/direct?q={city name}&limit=5&appid=e57070c21ce9424475afa701ad71a404"
// )
//   .then((response) => {
//     return response.json();
//   })
//   .then((users) => {
//     console.log(users);
//   });

// 5 Day Forecast
const fiveDayForecast = function(city){// Make an object here
 fetch(
   "api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=e57070c21ce9424475afa701ad71a404"
)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
    for(i=0; i<data.list.length; i++){
      const { name } = data.city.name;
      const { icon } = data.weather[0];
      const { temp, humidity } = data.list.main;
      const { speed } = data.wind;
      console.log(name, icon, temp, humidity, speed)
    }
  });}

//use OneCall api 3.0 instead?
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
 search: function() {
  this.fetchWeather(document.querySelector("#searchCity").value)
 }
}

document.querySelector("#searchForm").addEventListener("submit", function(event) {event.preventDefault()
  console.log(document.querySelector("#searchCity").value)
   weather.search()
})

//for loop
// const temp = data.list[0].main.temp;


 // fetch5Day: function (city) {
  //   fetch(
  //     "api.openweathermap.org/data/2.5/forecast?lat=" +
  //       lat +
  //       "&lon=" +
  //       lon +
  //       "&appid=e57070c21ce9424475afa701ad71a404"
  //   )
  //     .then((response) => response.json())
  //     .then((data) => this.display5Day(data));
  // },
  // display5Day: function (data) {
  //   const { temp, humidity } = data.list[0].main;
  // },

