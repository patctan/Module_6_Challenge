// fetch(
//   "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=e57070c21ce9424475afa701ad71a404"
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

// //5 Day Forecast
// fetch(
//   "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=e57070c21ce9424475afa701ad71a404"
// )
//   .then((response) => {
//     return response.json();
//   })
//   .then((users) => {
//     console.log(users);
//   });

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
  fetchUVIndex: function (city) {
    fetch(
      "https://api.openweathermap.org/data/3.0/onecall?lat=" +
        lat +
        "&" +
        long +
        "={lon}&appid=e57070c21ce9424475afa701ad71a404"
    )
      .then((response) => response.json())
      .then((data) => this.displayUVIndex(data));
  },
  //displayUVIndex: function (data) {},
};
