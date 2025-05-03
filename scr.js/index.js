function refreshWeather(response) {
    let temperatureElement = document.querySelector("#temp")
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city")
    let descriptionElement = document.querySelector("#description")
    let humidityElement = document.querySelector("#humidity")
    let windElement = document.querySelector("#wind")
    let timeElement = document.querySelector("#time")
    let date = new Date(response.data.time * 1000)
    let iconElement = document.querySelector("#icon")
       




    temperatureElement.innerHTML = Math.round(temperature)
    cityElement.innerHTML = response.data.city;
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML =`${response.data.temperature.humidity}%`;
    windElement.innerHTML = `${response.data.wind.speed}km/h`;
    timeElement.innerHTML = formatDate(date)
    iconElement.innerHTML = ` <img src="${response.data.condition.icon_url}" alt=""
    class="weather-icon">`
    getForecast(response.data.city)
}

function formatDate(date) {
    let hours = date.getHours()
    let minutes = date.getMinutes()

    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ]
    let day = days[date.getDay()];

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    if (hours < 10) {
        hours = `0${hours}`;
    } 
    return`${day}, ${hours}:${minutes}`
}

function searchCity(city) {
    let apiKey = "3f65ad3b04d2e02o62f45a90b350td63"
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`
    axios.get(apiUrl).then(refreshWeather)
}

function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-input")
    

    searchCity(searchInput.value);
}
function formatDay(timestamp) {
    let date = new Date(timestamp * 1000)
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ]
    let day = days[date.getDay()];
    return day;
}

function getForecast(city) {
    let apiKey = "3f65ad3b04d2e02o62f45a90b350td63"
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`
    axios.get(apiUrl).then(displayForecast)
}

function displayForecast(response) {
    let forecastHtml = "";

    response.data.daily.forEach(function (day, index) {
        if (index <5) {
        forecastHtml = forecastHtml +
       `
        <div class="forecast-day">
        <div class="forecaste-date">${formatDay(day.time)}</div>
        <div class="forecast-icon">
        <img src="${day.condition.icon_url}" ></div>
        <div class="forecast-temps">
            <div class="forecast-temp"> <strong>${Math.round(day.temperature.maximum)}&deg; </strong></div>
            <div class="forecast-temp">${Math.round(day.temperature.minimum)}&deg;</div>
        </div>
        </div>`
    }       
    })

    forecastElement.innerHTML = forecastHtml
    
}
let forecastElement= document.querySelector("#forecast")

//displayForecast()

let searchFormElement = document.querySelector("#search-form")
searchFormElement.addEventListener("submit", handleSearchSubmit)

searchCity("Kumasi")

