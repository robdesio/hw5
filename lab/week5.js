
window.addEventListener('DOMContentLoaded', async function() {
  // Get a reference to the "get weather" button
  let getWeatherButton = document.querySelector(`.get-weather`)

  // When the "get weather" button is clicked:
  getWeatherButton.addEventListener(`click`, async function(event) {
    // - Ignore the default behavior of the button
    event.preventDefault()

    // - Get a reference to the element containing the user-entered location, number of days
    let locationInput = document.querySelector(`#location`)
    let daysInput = document.querySelector(`#days`)

    // - Get the user-entered location from the element's value, number of days
    let location = locationInput.value
    let days = daysInput.value

    // - Check to see if the user entered anything; if so:
    if (location.length > 0) {
      // - Construct a URL to call the WeatherAPI.com API
      let url = `https://api.weatherapi.com/v1/forecast.json?key=839b4afb6dd6472282e11928213004&q=${location}&days=${days}`

      // - Fetch the url, wait for a response, store the response in memory
      let response = await fetch(url)

      // - Ask for the json-formatted data from the response, wait for the data, store it in memory
      let json = await response.json()

      // - Write the json-formatted data to the JavaScript console
      // console.log(json)

      // - Store the returned location, current weather conditions, the forecast as three separate variables
      let interpretedLocation = json.location
      let currentWeather = json.current
      let dailyForecast = json.forecast
      console.log(dailyForecast)

      // Store a reference to the "current" element
      let currentElement = document.querySelector(`.current`)

      // Fill the current element with the location and current weather conditions, 
      currentElement.innerHTML = `
        <div class="text-center space-y-2">
          <div class="font-bold text-3xl">Current Weather for ${interpretedLocation.name}, ${interpretedLocation.region}</div>
          <div class="font-bold">
            <img src="https://${currentWeather.condition.icon}" class="inline-block">
            <span class="temperature">${currentWeather.temp_f}</span>°F 
            and
            <span class="conditions">${currentWeather.condition.text}</span>
          </div>
        </div>
      `

      // Store reference to forecast element
      let forecastElement = document.querySelector(`.forecast`)

      // If number of days entered, insert forecast header and forecast
      if (days > 0 ) {
        forecastDays = dailyForecast.forecastday.length
        forecastElement.innerHTML =   `
        <div class="text-center space-y-8">
          <div class="font-bold text-3xl">${forecastDays} Day Forecast</div>
        </div>
          `
        
      }
      else {
        forecastElement.innerHTML = ``
      }
      
      // Build 0-3 day forecast, depending on user input for days 
      for (let i = 0; i < days ; i++) {
        let dayData = dailyForecast.forecastday[i]

      // insert forecast for each day, flexible based on user input

      forecastElement.insertAdjacentHTML(`beforeend`,`
        <div class="text-center space-y-8">
          <div>
            <img src="https:${dayData.day.condition.icon}" class="mx-auto">
            <h1 class="text-2xl text-bold text-gray-500">${dayData.date}</h1>
            <h2 class="text-xl">High ${dayData.day.maxtemp_f}°F – Low ${dayData.day.mintemp_f}°F</h2>
            <p class="text-gray-500">${dayData.day.condition.text}</h1>
          </div>
        </div>
      `
      )
    }
  }
   

  })
})
