// Function to classify the weather based on temp, rain, cloud cover and wind speed
function classifyWeather({ temperature, rain, cloudCover, windSpeed }) {
  // Storm: very high wind or heavy rain with wind
  if (windSpeed > 30 || (rain > 10 && windSpeed > 20)) {
    return "Storm";
  }

  // Snow: precipitation when at or below freezing
  if (temperature <= 0 && rain > 0) {
    return "Snow";
  }

  // Rain: significant precipitation above freezing
  if (rain > 2 && temperature > 0) {
    return "Rain";
  }

  // Drizzle: light precipitation
  if (rain > 0 && rain <= 2) {
    return "Drizzle";
  }

  // Fog: low visibility, high cloud cover, low wind, moderate temperature
  if (cloudCover >= 80 && rain === 0 && windSpeed < 10 && temperature > -5 && temperature < 15) {
    return "Fog";
  }

  // Dust: hot, dry, windy conditions
  if (temperature > 20 && cloudCover < 30 && windSpeed > 15 && rain === 0) {
    return "Dust";
  }

  // Windy: strong wind but not storm conditions
  if (windSpeed > 15) {
    return "Windy";
  }

  // Clear: little to no clouds and no rain
  if (rain === 0 && cloudCover < 20) {
    return "Clear";
  }

  // Default fallback
  return "Clear";
}

// Function to classify the weather based on temp, rain and wind speed
function classifyWeatherNoCloud({ temperature, rain, windSpeed }) {
    // Clear: no rain and mild wind
    if (rain === 0 && windSpeed < 15) {
        return "Clear";
    }

    // Fog: no rain, low temperature (0-15°C), light wind
    if (rain === 0 && temperature > 0 && temperature < 15 && windSpeed < 10) {
        return "Fog";
    }

    // Dust: hot, dry, windy
    if (temperature > 20 && windSpeed > 15 && rain === 0) {
        return "Dust";
    }

    // Drizzle: light rain (e.g., <= 2mm per hour)
    if (rain > 0 && rain <= 2) {
        return "Drizzle";
    }

    // Rain: heavier precipitation (>2mm)
    if (rain > 2 && temperature > 0) {
        return "Rain";
    }

    // Snow: precipitation and freezing temperature
    if (rain > 0 && temperature <= 0) {
        return "Snow";
    }

    // Storm: heavy rain or strong wind
    if ((rain > 5 && windSpeed > 20) || windSpeed > 30) {
        return "Storm";
    }

    // Windy: strong wind but not storm conditions
    if (windSpeed > 15) {
        return "Windy";
    }

    // Default fallback
    return "Clear";
}

//Function to render the weather given a location and date
const renderWeather = async (location, date = 1) => {
    const {dailyData, currentData, hourlyData} = await getWeather(location)
    const currentCityNameEl = await document.querySelector('#city-name')
    const currentWeatherEl = await document.querySelector('#current-weather')
    const currentTemperatureEl = await document.querySelector('#current-temperature')
    const currentRainEl = await document.querySelector('#current-rain')
    const currentCloudCoverEl = await document.querySelector('#current-cloud-cover')
    const currentWindSpeedEl = await document.querySelector('#current-wind-speed')

    const now = new Date();
    const currentRainAvg = (hourlyData.rain[now.getHours()] + hourlyData.rain[now.getHours() + 1] + hourlyData.rain[now.getHours() + 2])/3
    const currentWeather = classifyWeather({
        temperature: Number(currentData.temperature_2m),
        rain: Number(currentRainAvg),
        cloudCover: Number(currentData.cloud_cover),
        windSpeed: Number(currentData.wind_speed_10m)
    })

    currentCityNameEl.textContent = 'Currently, in ' + location.name
    currentWeatherEl.textContent = 'Current weather: ' + currentWeather
    renderBackground(currentWeather)
    currentTemperatureEl.textContent = 'Current temperature: ' + currentData.temperature_2m.toString() + '℃'
    currentRainEl.textContent = 'Current rain: ' + currentData.rain.toString() + 'mm'
    currentCloudCoverEl.textContent = 'Current cloud cover: ' + currentData.cloud_cover.toString() + '%'
    currentWindSpeedEl.textContent = 'Current wind speed: ' + currentData.wind_speed_10m.toString() + 'km/h'
    
    // Call the update forecast to update given a location and date
    updateForecast(location, date)
}

// Function to update the weather forecasts given a location and date
const updateForecast = async (location, date) => {
    const {dailyData, currentData, hourlyData} = await getWeather(location)
    const forecastDate = await document.querySelector('#forecast-date')
    const dailyWeather = await document.querySelector('#daily-weather')
    const dailyMinTemperatureEl = await document.querySelector('#daily-min-temperature')
    const dailyMaxTemperatureEl = await document.querySelector('#daily-max-temperature')
    const dailMaxWindSpeedEl = await document.querySelector('#daily-max-wind-speed')
    const dailySunriseEl = await document.querySelector('#daily-sunrise')
    const dailySunsetEl = await document.querySelector('#daily-sunset')
    const dailyUVIndexEl = await document.querySelector('#daily-uv-index')
    const dailyRainSumEl = await document.querySelector('#daily-rain-sum')

    forecastDate.textContent = dailyData.time[date]

    const currentWeather = classifyWeatherNoCloud({
        temperature: Number((dailyData.temperature_2m_min[date] + dailyData.temperature_2m_max[date]) / 2),
        rain: Number(dailyData.rain_sum[date]),
        windSpeed: Number(dailyData.wind_speed_10m_max)
    })
    dailyWeather.textContent = 'Weather: ' + currentWeather

    dailyMinTemperatureEl.textContent = 'Minimum temperature: ' + dailyData.temperature_2m_min[date] + '℃'
    dailyMaxTemperatureEl.textContent = 'Maximum temperature: ' + dailyData.temperature_2m_max[date] + '℃'
    dailMaxWindSpeedEl.textContent = 'Maximum wind speed: ' + dailyData.wind_speed_10m_max[date] + 'km/h'
    dailySunriseEl.textContent = 'Sunrise: ' + dailyData.sunrise[date].split('T')[1] + 'am'
    dailySunsetEl.textContent = 'Sunset: ' + dailyData.sunset[date].split('T')[1] + 'pm'
    dailyUVIndexEl.textContent = 'UV Index: ' + dailyData.uv_index_max[date]
    dailyRainSumEl.textContent = 'Rain sum: ' + dailyData.rain_sum[date] + 'mm'
}

// Function to render the background given some weather
const renderBackground = async (weather) => {
    document.body.style.backgroundImage = `url('images/${weather}.jpg')`
    document.body.style.backgroundSize = "cover"
    document.body.style.backgroundRepeat = "no-repeat"
    document.body.style.backgroundPosition = "center"
}