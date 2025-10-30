const weatherCodeDescriptions = {
  0:  "Cloud development not observed or not observable",
  1:  "Cloud generally dissolving or becoming less developed",
  2:  "State of sky on the whole unchanged",
  3:  "Clouds generally forming or developing",
  4:  "Visibility reduced by smoke (e.g., fires, industrial smoke, volcanic ash)",
  5:  "Haze",
  6:  "Widespread dust in suspension (not raised by wind at or near station)",
  7:  "Dust or sand raised by wind near the station, no duststorm or sandstorm",
  8:  "Well-developed dust or sand whirls seen near the station, no duststorm",
  9:  "Duststorm or sandstorm within sight or at the station during last hour",
  10: "Mist",
  11: "Patches of shallow fog or ice fog (not deeper than ~2m land / 10m sea)",
  12: "Continuous shallow fog or ice fog (not deeper than ~2m land / 10m sea)",
  13: "Lightning visible, no thunder heard",
  14: "Precipitation within sight, not reaching ground or sea surface",
  15: "Precipitation within sight, reaching ground but distant (>5 km)",
  16: "Precipitation within sight, reaching ground, near but not at station",
  17: "Thunderstorm, no precipitation at time of observation",
  18: "Squalls at or within sight during preceding hour or observation",
  19: "Funnel clouds at or within sight during preceding hour or observation",
  20: "Drizzle or snow grains (not showers) during preceding hour, not now",
  21: "Rain (not freezing, not showers) during preceding hour, not now",
  22: "Snow (not showers) during preceding hour, not now",
  23: "Rain and snow or ice pellets (not showers) during preceding hour, not now",
  24: "Freezing drizzle or rain during preceding hour, not now",
  25: "Showers of rain during preceding hour, not now",
  26: "Showers of snow or rain and snow during preceding hour, not now",
  27: "Showers of hail or rain and hail during preceding hour, not now",
  28: "Fog or ice fog during preceding hour, not now",
  29: "Thunderstorm (with/without precipitation) during preceding hour, not now",
  30: "Slight/moderate duststorm or sandstorm decreased during last hour",
  31: "Slight/moderate duststorm or sandstorm unchanged during last hour",
  32: "Slight/moderate duststorm or sandstorm begun/increased during last hour",
  33: "Severe duststorm or sandstorm decreased during last hour",
  34: "Severe duststorm or sandstorm unchanged during last hour",
  35: "Severe duststorm or sandstorm begun/increased during last hour",
  36: "Slight/moderate drifting snow (below eye level)",
  37: "Heavy drifting snow (below eye level)",
  38: "Slight/moderate blowing snow (above eye level)",
  39: "Heavy blowing snow (above eye level)",
  40: "Fog or ice fog in distance, not at station, extending above observer",
  41: "Fog or ice fog in patches",
  42: "Fog/ice fog, sky visible, becoming thinner during last hour",
  43: "Fog/ice fog, sky invisible, becoming thinner during last hour",
  44: "Fog/ice fog, sky visible, no change during last hour",
  45: "Fog/ice fog, sky invisible, no change during last hour",
  46: "Fog/ice fog, sky visible, becoming thicker during last hour",
  47: "Fog/ice fog, sky invisible, becoming thicker during last hour",
  48: "Fog depositing rime, sky visible",
  49: "Fog depositing rime, sky invisible",
  50: "Drizzle (not freezing), intermittent, slight",
  51: "Drizzle (not freezing), continuous, slight",
  52: "Drizzle (not freezing), intermittent, moderate",
  53: "Drizzle (not freezing), continuous, moderate",
  54: "Drizzle (not freezing), intermittent, heavy",
  55: "Drizzle (not freezing), continuous, heavy",
  56: "Freezing drizzle, slight",
  57: "Freezing drizzle, moderate or heavy",
  58: "Rain and drizzle, slight",
  59: "Rain and drizzle, moderate or heavy",
  60: "Rain (not freezing), intermittent, slight",
  61: "Rain (not freezing), continuous, slight",
  62: "Rain (not freezing), intermittent, moderate",
  63: "Rain (not freezing), continuous, moderate",
  64: "Rain (not freezing), intermittent, heavy",
  65: "Rain (not freezing), continuous, heavy",
  66: "Freezing rain, slight",
  67: "Freezing rain, moderate or heavy",
  68: "Rain/drizzle and snow, slight",
  69: "Rain/drizzle and snow, moderate or heavy",
  70: "Snowflakes, intermittent, slight",
  71: "Snowflakes, continuous, slight",
  72: "Snowflakes, intermittent, moderate",
  73: "Snowflakes, continuous, moderate",
  74: "Snowflakes, intermittent, heavy",
  75: "Snowflakes, continuous, heavy",
  76: "Diamond dust (with or without fog)",
  77: "Snow grains (with or without fog)",
  78: "Isolated star-like snow crystals (with or without fog)",
  79: "Ice pellets",
  80: "Rain showers, slight",
  81: "Rain showers, moderate or heavy",
  82: "Rain showers, violent",
  83: "Rain and snow showers, slight",
  84: "Rain and snow showers, moderate or heavy",
  85: "Snow showers, slight",
  86: "Snow showers, moderate or heavy",
  87: "Snow pellets or small hail showers, slight",
  88: "Snow pellets or small hail showers, moderate or heavy",
  89: "Hail showers (no thunder), slight",
  90: "Hail showers (no thunder), moderate or heavy",
  91: "Slight rain, thunderstorm occurred in last hour, not now",
  92: "Moderate or heavy rain, thunderstorm occurred in last hour, not now",
  93: "Slight snow or rain and snow/hail, thunderstorm occurred recently",
  94: "Moderate/heavy snow or rain and snow/hail, thunderstorm occurred recently",
  95: "Thunderstorm, slight/moderate, with rain/snow (no hail)",
  96: "Thunderstorm, slight/moderate, with hail",
  97: "Thunderstorm, heavy, with rain/snow (no hail)",
  98: "Thunderstorm with dust/sandstorm",
  99: "Thunderstorm, heavy, with hail"
}

const weatherGroups = {
  Clear: [0, 1, 2, 3],
  Fog: [10, 11, 12, 28, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
  Dust: [4, 5, 6, 7, 8, 9, 30, 31, 32, 33, 34, 35],
  Drizzle: [50, 51, 52, 53, 54, 55, 56, 57, 58, 59],
  Rain: [60, 61, 62, 63, 64, 65, 66, 67, 80, 81, 82],
  Snow: [68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 83, 84, 85, 86, 87, 88, 89, 90],
  Storm: [17, 29, 91, 92, 93, 94, 95, 96, 97, 98, 99],
  Windy: [18, 19, 36, 37, 38, 39],
}

const getWeatherDescription  = function (code) {
    code = Number(code)
    for (const [category, codes] of Object.entries(weatherGroups)) {
        if (codes.includes(code)) return category
    }
    return "unknown"
}

const renderWeather = async (location, date = 1) => {
    const {dailyData, currentData} = await getWeather(location)
    const currentCityNameEl = await document.querySelector('#city-name')
    const currentWeatherEl = await document.querySelector('#current-weather')
    const currentTemperatureEl = await document.querySelector('#current-temperature')
    const currentRainEl = await document.querySelector('#current-rain')
    const currentCloudCoverEl = await document.querySelector('#current-cloud-cover')
    const currentWindSpeedEl = await document.querySelector('#current-wind-speed')

    currentCityNameEl.textContent = 'Currently, in ' + location.name
    currentWeatherEl.textContent = 'Current weather: ' + getWeatherDescription(currentData.weather_code).toString()
    renderBackground(getWeatherDescription(currentData.weather_code).toString())
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