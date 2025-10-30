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

const renderWeather = async (location, date = 1) => {
    const {dailyData, currentData} = await getWeather(location)
    const currentCityNameEl = await document.querySelector('#city-name')
    const currentWeatherEl = await document.querySelector('#current-weather')
    const currentTemperatureEl = await document.querySelector('#current-temperature')
    const currentRainEl = await document.querySelector('#current-rain')
    const currentCloudCoverEl = await document.querySelector('#current-cloud-cover')
    const currentWindSpeedEl = await document.querySelector('#current-wind-speed')

    const currentWeather = classifyWeather({
        temperature: Number(currentData.temperature_2m),
        rain: Number(currentData.rain),
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

    const forecastDate = await document.querySelector('#forecast-date')
    const dailyMinTemperatureEl = await document.querySelector('#daily-min-temperature')
    const dailyMaxTemperatureEl = await document.querySelector('#daily-max-temperature')
    const dailMaxWindSpeedEl = await document.querySelector('#daily-max-wind-speed')
    const dailySunriseEl = await document.querySelector('#daily-sunrise')
    const dailySunsetEl = await document.querySelector('#daily-sunset')
    const dailyUVIndexEl = await document.querySelector('#daily-uv-index')
    const dailyRainSumEl = await document.querySelector('#daily-rain-sum')

    forecastDate.textContent = dailyData.time[date]
    dailyMinTemperatureEl.textContent = 'Minimum temperature: ' + dailyData.temperature_2m_min[date] + '℃'
    dailyMaxTemperatureEl.textContent = 'Maximum temperature: ' + dailyData.temperature_2m_max[date] + '℃'
    dailMaxWindSpeedEl.textContent = 'Maximum wind speed: ' + dailyData.wind_speed_10m_max[date] + 'km/h'
    dailySunriseEl.textContent = 'Sunrise: ' + dailyData.sunrise[date].split('T')[1] + 'am'
    dailySunsetEl.textContent = 'Sunset: ' + dailyData.sunset[date].split('T')[1] + 'pm'
    dailyUVIndexEl.textContent = 'UV Index: ' + dailyData.uv_index_max[date]
    dailyRainSumEl.textContent = 'Rain sum: ' + dailyData.rain_sum[date] + 'mm'
}

const updateForecast = async (location, date) => {
    const {dailyData, currentData} = await getWeather(location)
    const forecastDate = await document.querySelector('#forecast-date')
    const dailyMinTemperatureEl = await document.querySelector('#daily-min-temperature')
    const dailyMaxTemperatureEl = await document.querySelector('#daily-max-temperature')
    const dailMaxWindSpeedEl = await document.querySelector('#daily-max-wind-speed')
    const dailySunriseEl = await document.querySelector('#daily-sunrise')
    const dailySunsetEl = await document.querySelector('#daily-sunset')
    const dailyUVIndexEl = await document.querySelector('#daily-uv-index')
    const dailyRainSumEl = await document.querySelector('#daily-rain-sum')

    forecastDate.textContent = dailyData.time[date]
    dailyMinTemperatureEl.textContent = 'Minimum temperature: ' + dailyData.temperature_2m_min[date] + '℃'
    dailyMaxTemperatureEl.textContent = 'Maximum temperature: ' + dailyData.temperature_2m_max[date] + '℃'
    dailMaxWindSpeedEl.textContent = 'Maximum wind speed: ' + dailyData.wind_speed_10m_max[date] + 'km/h'
    dailySunriseEl.textContent = 'Sunrise: ' + dailyData.sunrise[date].split('T')[1] + 'am'
    dailySunsetEl.textContent = 'Sunset: ' + dailyData.sunset[date].split('T')[1] + 'pm'
    dailyUVIndexEl.textContent = 'UV Index: ' + dailyData.uv_index_max[date]
    dailyRainSumEl.textContent = 'Rain sum: ' + dailyData.rain_sum[date] + 'mm'
}

const renderBackground = async (weather) => {
    document.body.style.backgroundImage = `url('images/${weather}.jpg')`
    document.body.style.backgroundSize = "cover"
    document.body.style.backgroundRepeat = "no-repeat"
    document.body.style.backgroundPosition = "center"
}