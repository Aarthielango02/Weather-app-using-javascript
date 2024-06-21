let apiKey = "Your Api key";

function fetchWeather(city) {
  let url = "https://api.openweathermap.org/data/2.5/weather?q=" +
            city + "&units=metric&appid=" + apiKey;
  fetch(url)
    .then(function (response) {
      if (!response.ok) {
        alert("No weather found.");
        throw new Error("No weather found.");
      }
      return response.json();
    })
    .then(function (data) {
      displayWeather(data);
    })
    .catch(function (error) {
      document.querySelector(".weather").classList.remove("loading");
    });
}

function displayWeather(data) {
  const name = data.name;
  const icon = data.weather[0].icon;
  const description = data.weather[0].description;
  const temp = data.main.temp;
  const humidity = data.main.humidity;
  const speed = data.wind.speed;

  document.querySelector(".city").innerText = "Weather in " + name;
  document.querySelector(".icon").src =
    "https://openweathermap.org/img/wn/" + icon + ".png";
  document.querySelector(".description").innerText = description;
  document.querySelector(".temp").innerText = temp + "°C";
  document.querySelector(".humidity").innerText =
    "Humidity: " + humidity + "%";
  document.querySelector(".wind").innerText =
    "Wind speed: " + speed + " km/h";
  document.querySelector(".weather").classList.remove("loading");
  document.querySelector(".weather").style.display = "block";
}

function searchWeather() {
 const city = document.querySelector(".search-bar").value;
  if (city) {
    fetchWeather(city);
  }
}

document.querySelector(".search button").addEventListener("click", function () {
  searchWeather();
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    searchWeather();
  }
});