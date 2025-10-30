const getDefaultLocation = async () => {
    const response = await fetch('https://ipinfo.io/json?token=1a11bd55cc8f9c')
    if (response.status === 200) {
        const data = await response.json()
        const lat = data.loc.split(',')[0]
        const lon = data.loc.split(',')[1]
        const name = data.city + ", " + data.country
        return {
            lat,
            lon,
            name
        }
    } else {
        throw new Error('Unable to access current location.')
    }
}

const getLocation = async (location) => {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`)
    if (response.ok) {
        const data = await response.json()
        if (data.length > 0) {
            const { lat, lon } = data[0]
            const name = data[0].display_name
            return { lat, lon, name}
        } else {
            throw new Error('Location not found.')
        }
    } else {
        throw new Error('Failed to fetch location.')
    }
}

const getWeather = async (coords) => {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,rain_sum,wind_speed_10m_max&current=temperature_2m,wind_speed_10m,rain,cloud_cover,weather_code&forecast_days=7`)
    if (response.status === 200) {
        const data = await response.json()
        const dailyData = data.daily
        const currentData = data.current
        // Daily: Max windspeed, Max & min temp, Sunrise and sunset, UV index, Rain sum
        // Current: Temperature, Rain, Cloud cover total, Windspeed
        return {
            dailyData,
            currentData
        }
    } else {
        throw new Error(`Unable to access the weather api.`)
    }
}

let date = 1

document.querySelector('#prev-button').addEventListener('click', (e) => {
    if (date > 0) {
        date--
    }
    const location = document.querySelector('#location')
    if (location.value === '') {
        getDefaultLocation().then((location) => {
            updateForecast(location, date)
        }).catch((error) => {
            console.log(`Error: ${error}`)
        })
    } else {
        getLocation(location.value).then((location) => {
            updateForecast(location, date)
        }).catch((error) => {
            console.log(`Error: ${error}`)
        })
    }
})

document.querySelector('#next-button').addEventListener('click', (e) => {
    if (date < 6) {
        date++
    }
    const location = document.querySelector('#location')
    if (location.value === '') {
        getDefaultLocation().then((location) => {
            updateForecast(location, date)
        }).catch((error) => {
            console.log(`Error: ${error}`)
        })
    } else {
        getLocation(location.value).then((location) => {
            updateForecast(location, date)
        }).catch((error) => {
            console.log(`Error: ${error}`)
        })
    }
})

getDefaultLocation().then((location) => {
    renderWeather(location)
}).catch((error) => {
    console.log(`Error: ${error}`)
})

document.querySelector('#search-button').addEventListener('click', (e) => {
    date = 1
    const location = document.querySelector('#location')
    getLocation(location.value).then((location) => {
        renderWeather(location)
    }).catch((error) => {
        console.log(`Error: ${error}`)
    })
})