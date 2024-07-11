function getElements() {
  const input = document.getElementById('location')
  const button = document.getElementById('submitButton')
  const weatherForecast = document.getElementById('weatherForecast')


  return {
    input: input,
    button: button,
    weatherForecast: weatherForecast,
  }
}

const weatherList = []

async function execution() {
  const inputValue = getInputValue()
  if (
    // inputValue === null
    // !inputValue instanceof String
    !inputValue
  ) return
  const coordinates = await fetchCoordinates(inputValue)
  if (
    !coordinates
  ) return
  const weatherForecast = await getWeatherForecast(...coordinates)
  if (
    !weatherForecast
  ) return
  showWeatherForecast(weatherForecast)
}

function getInputValue() {
  const elements = getElements()
  if (elements.input !== null) {
    weatherList.length = 0
    document.getElementById('weatherForecast').innerHTML = ''
    const value = elements.input.value
    console.log('Getting coordinates for ' + value)
    return value
  }
  return null
}

async function fetchCoordinates(item) {
  console.log('fetching...')
  const url = 'https://geocode.maps.co/search?q=' + item + '&api_key=6633b73ddf675448401146nfs481903'
  try {
    const response = await fetch(url)
    const data = await response.json()
    const firstItem = data[0]
    const lat = firstItem.lat
    const lon = firstItem.lon

    console.log('Latitude:' + lat + ', Longitude:' + lon)
    return [lat, lon]
  } catch (error) {
    return null
  }
}

async function getWeatherForecast(lat, lon) {
  console.log('Pulling clouds...')
  // const url = 'https://api.open-meteo.com/v1/forecast?latitude=' + lat + '&longitude=' + lon + '&daily=temperature_2m_max,temperature_2m_min&timezone=Europe%2FBerlin'
  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    daily: 'temperature_2m_max,temperature_2m_min',
    timezone: 'Europe/Berlin',
  })

  const url = 'https://api.open-meteo.com/v1/forecast?' + params.toString()
  try {
    const weather = await fetch(url)
    const data = await weather.json()
    console.log(data)
    return data
  } catch(error) {
    console.error('url didn\'t work', error)
    return null
  }
}

function showWeatherForecast(data) {
  const elements = getElements()

  for (let i = 0; i < data.daily.time.length; i++) {
    const date = data.daily.time[i]
    console.log(date)
    const minTemp = data.daily.temperature_2m_min[i]
    console.log(minTemp)
    const maxTemp = data.daily.temperature_2m_max[i]
    console.log(maxTemp)
    const concatDayandTemp = date +'   '+ minTemp +'   '+ maxTemp
    weatherList.push(concatDayandTemp)

    const li = document.createElement('li')
    li.append(concatDayandTemp)
    elements.weatherForecast.append(li)
  }
}