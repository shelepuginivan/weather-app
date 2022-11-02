const API_KEY = '<your openweathermap api key>'
const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)

const cityName = document.getElementById('city-name')
const coords = document.getElementById('coords')
const temperature = document.getElementById('temperature')
const feelsLike = document.getElementById('feels-like')
const weather = document.getElementById('weather')

const currentLocation = position => {
    const lat = position.coords.latitude
    const lon = position.coords.longitude

    coords.innerText = `${lat}º, ${lon}º `

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=ru`)
        .then(res => res.json()
            .then(json => {
                temperature.innerText = `${Math.round(parseFloat(json.main.temp), 0)} ºC`
                feelsLike.innerText = `Ощущается как ${Math.round(parseFloat(json.main.feels_like), 0)} ºC`
                weather.innerText = (json.weather.map(item => capitalize(item.description))).join(', ')
            }))

    fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
        .then(res => res.json()
            .then(json => {
                cityName.innerText = json[0].local_names.ru
            }))
}

navigator.geolocation.getCurrentPosition(position => currentLocation(position), err => console.log(err))
