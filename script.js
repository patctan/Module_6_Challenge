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

// const { name } = data.city.name;
// const { icon } = data.weather[0];
// const { temp, humidity } = data.list.main;
// const { speed } = data.wind;
// console.log(name, icon, temp, humidity, speed)

//1. Push data from for loop from fetch request into an array, which is set to a variable
//2. Make a function to dynamically create cards
//3. Use map method to update array for the next card, etc.?
// 06-Server-side-APIs, Activity 03


// function createCards(){
//  document.createElement("div");

// }

// // 5 Day Forecast

 var fiveDayArray = []; 
 console.log(fiveDayArray)

const fiveDayForecast = function(city){
  console.log("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=e57070c21ce9424475afa701ad71a404"
  )
 fetch(
   "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=e57070c21ce9424475afa701ad71a404"
)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
    for(i=0; i<data.list.length; i+=8){
      fiveDayArray.push(data.list[i])
      
     }
    console.log(data.list[0])
    console.log(data.list[0].main.humidity)
    console.log(data.list[0].wind.speed)
    console.log(data.list[0].main.temp)
    });}
fiveDayForecast('manila');


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
var fiveDayPullInfo = ``

function generateCards(){
  fiveDayArray.forEach(function(data){
  
    fiveDayPullInfo = fiveDayPullInfo + `
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
    </article></card>`;})
    
    const fiveDayCards = document.querySelector("#container");
  
    fiveDayCards.innerHTML = fiveDayPullInfo;
}

document.querySelector("#searchForm").addEventListener("submit", function(event) {event.preventDefault()
  console.log(document.querySelector("#searchCity").value)
   weather.search()
   generateCards();  
})

var loadCityButton = document.querySelector(".lastCity");

function saveCitiesSearched() {
  var citiesSearched = document.querySelector("#searchCity").value;
  localStorage.setItem("citiesSearched", JSON.stringify(citiesSearched));}



  function renderCitiesSearched() {
    var lastCity = JSON.parse(localStorage.getItem("citiesSearched"));
    if (lastCity !== null) {
      `<button class = "lastCity"> ${lastCity}</button>`
    } else return;
  }
  loadCityButton.addEventListener("click", function(event) {
    event.preventDefault();
    weather.search(lastCity);
    generateCards(lastCity);
  })