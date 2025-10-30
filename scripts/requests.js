// Function to get the connected user's lat-lon and location name
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

// Function to get the lat-lon and name of a location
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

// Function to get the weather at a specific location
const getWeather = async (location) => {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,rain_sum,wind_speed_10m_max&current=temperature_2m,wind_speed_10m,rain,cloud_cover,weather_code&forecast_days=7&hourly=rain`)
    if (response.status === 200) {
        const data = await response.json()
        const dailyData = data.daily
        const currentData = data.current
        const hourlyData = data.hourly
        return {
            dailyData,
            currentData,
            hourlyData
        }
    } else {
        throw new Error(`Unable to access the weather api.`)
    }
}

let date = 1

// Attach a 'click' event listener to the previous button to cycle through the forecast days
document.querySelector('#prev-button').addEventListener('click', (e) => {
    // Check that the date counter is positive
    if (date > 0) {
        date--
    }
    // Get the location from the location input
    const location = document.querySelector('#location')
    if (location.value === '') {
        // If the location input is empty, we cycle the forecast for their default location
        getDefaultLocation().then((location) => {
            updateForecast(location, date)
        }).catch((error) => {
            console.log(`Error: ${error}`)
        })
    } else {
        // Otherwise we get the forecast information for their new location
        getLocation(location.value).then((location) => {
            updateForecast(location, date)
        }).catch((error) => {
            console.log(`Error: ${error}`)
        })
    }
})

// Attach a 'click' event listener to the next button to cycle through the forecast days
document.querySelector('#next-button').addEventListener('click', (e) => {
    // Check that the date counter is within the forecast days limit
    if (date < 6) {
        date++
    }
    // Get the location from the location input
    const location = document.querySelector('#location')
    if (location.value === '') {
        // If the location input is empty, we cycle the forecast for their default location
        getDefaultLocation().then((location) => {
            updateForecast(location, date)
        }).catch((error) => {
            console.log(`Error: ${error}`)
        })
    } else {
        // Otherwise we get the forecast information for their new location
        getLocation(location.value).then((location) => {
            updateForecast(location, date)
        }).catch((error) => {
            console.log(`Error: ${error}`)
        })
    }
})

// Render the weather for the user's current location (default)
getDefaultLocation().then((location) => {
    renderWeather(location)
}).catch((error) => {
    console.log(`Error: ${error}`)
})

// Grab elements
const searchButton = document.querySelector('#search-button');
const locationInput = document.querySelector('#location');

// Unified search handler
function handleSearch() {
    const location = locationInput.value.trim();
    if (!location) return;

    getLocation(location).then((location) => renderWeather(location)).catch((error) => console.log(`Error: ${error}`));
}

// Button click triggers search
searchButton.addEventListener('click', handleSearch);

// Enter key triggers search
locationInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault()
        handleSearch()
    }
})

// Trigger on leaving the input field
locationInput.addEventListener('blur', () => {
    handleSearch()
})