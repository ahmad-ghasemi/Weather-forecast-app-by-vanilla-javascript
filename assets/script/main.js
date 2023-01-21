// // get html elements
const searchCity = document.getElementById("city")
const date = document.getElementById("date")
const humidity = document.getElementById("humidity")
const wind = document.getElementById("wind")
const wedDiscription = document.getElementById("discription")

const weekDaysIcon = [document.getElementById("weekday-icon1"),
document.getElementById("weekday-icon2"),
document.getElementById("weekday-icon3"),
document.getElementById("weekday-icon4"),
document.getElementById("weekday-icon5"),
document.getElementById("weekday-icon6"),
document.getElementById("weekday-icon7")]

const degree = [document.getElementById("today-degree0"),
document.getElementById("day-degree1"),
document.getElementById("day-degree2"),
document.getElementById("day-degree3"),
document.getElementById("day-degree4"),
document.getElementById("day-degree5"),
document.getElementById("day-degree6")]

const typeDay = [document.getElementById("day0"),
document.getElementById("day1"),
document.getElementById("day2"),
document.getElementById("day3"),
document.getElementById("day4"),
document.getElementById("day5"),
document.getElementById("day6")]
// get location


const setQuery = (e) => {
  if (e.keyCode == "13") {
    getResult(searchBar.value)
  }
}


const apiKey = "3cb5221d90887070dd17ba3b7e34b0a6"
const getResult = (cityName) => {
  let getCity = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`

  fetch(getCity).then(res => {
    return res.json()
  })
    .then(displayResult)
    .then(weather)
    .catch(error => console.log(error))
}

let lat, lon, nameOfCity

const displayResult = (result) => {
  nameOfCity = result.name
  lon = result.coord.lon
  lat = result.coord.lat
}

const searchBar = document.getElementById("input")
searchBar.addEventListener("keypress", setQuery)

// get weather :one call


const weather = () => {
  let getWeatherRes = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=current&appid=${apiKey}&units=metric`

  fetch(getWeatherRes)
    .then((response) => response.json())
    .then(weatherDisBody)
    .catch(error => console.log(error))
}

let humidityDis, windDis, weatherDis, timeZoneDis, forecast
const weatherDisBody = (response) => {

  timeZoneDis = response.timezone
  forecast = response.daily
  humidityDis = response.daily[0].humidity   //humidity
  windDis = response.daily[0].wind_speed   //wind
  weatherDis = response.daily[0].weather[0].description   //weather discription



  const formatDay = (resp) => {
    let date = new Date(resp * 1000)
    let day = date.getDay()
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    return days[day]
  }

  console.log(forecast, "forcast")
  forecast.forEach((forecastDay, index) => {
    console.log(index, "index")
    if (index <= 6) {
      let i = forecastDay.weather[0].id
      typeDay[index].innerHTML = `${formatDay(forecastDay.dt)} `
      degree[index].innerHTML = `${Math.round(forecastDay.temp.day)}°C`


      if (i >= 200 && i <= 232) {
        weekDaysIcon[index].src = "./assets/images/storm.png"
      } else if (i >= 300 && i <= 321) {
        weekDaysIcon[index].src = "./assets/images/drizzle.png"
      } else if (i >= 500 && i <= 531) {
        weekDaysIcon[index].src = "./assets/images/rain.png"
      } else if (i >= 600 && i <= 622) {
        weekDaysIcon[index].src = "./assets/images/snowy.png"
      } else if (i >= 700 && i <= 781) {
        weekDaysIcon[index].src = "./assets/images/fog.png"
      } else if (i == 800) {
        weekDaysIcon[index].src = "./assets/images/sun.png"
      } else if (i >= 801 && i <= 804) {
        weekDaysIcon[index].src = "./assets/images/clouds.png"
      }
      console.log(i, "ic dis")
    }
  })

  searchCity.innerHTML = `${nameOfCity} - ${timeZoneDis}`
  humidity.innerHTML = `Humidity : ${humidityDis} % `
  wind.innerHTML = `Wind Speed : ${windDis} m/s`
  wedDiscription.innerHTML = `Today is ${weatherDis}`

}


// getting cards date


let now, hour, minute, dayString, days, getDate

const getDayName = () => {
  now = new Date(),
    hour = now.getHours(),
    minute = now.getMinutes(),
    getDate = now.getDay()

  days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]

  dayString = days[getDate]
  return `${dayString}, ${hour}:${minute}`
}

date.innerHTML = getDayName()


