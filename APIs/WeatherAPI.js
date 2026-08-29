//Gets the Co-ordinates for a location from Open-Meteo's API
async function getCoordinates(location)
{
    //Encodes the location to handle things like spaces in a location's name like "New York" for example
    const encodedLocation = encodeURIComponent(location);

    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodedLocation}&count=1`;

    const response = await fetch(url);

    //Throws error if the geocoding API is not working or can't be reached
    if(!response.ok)
    {
         throw new Error(`Geocoding API request failed: ${response.status}`);
    }

    const data = await response.json();

    if(!data.results || data.results.length === 0)
    {
        throw new Error("Location not found");
    }

    const result = data.results[0];

    return {
        name: result.name,
        latitude: result.latitude,
        longitude: result.longitude,
        country: result.country,
        region: result.admin1
    };
}

async function getWeather(latitude, longitude)
{
    //Sets the url to fetch using the co-ordinates of the location
    const url = 
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m`;
    
    const response = await fetch(url);
    
    //Throws error if the Open-Meteo API is not working or can't be reached
    if(!response.ok)
    {
        throw new Error(`Weather API request failed: ${response.status}`);
    }
        
    const data = await response.json();

    //Returns the data we need from the response
    return{
        weatherDescription: getWeatherDescription(data.current.weather_code),
        temperature: data.current.temperature_2m,
        feelsLike: data.current.apparent_temperature,
        precipitation: data.current.precipitation,
        weatherCode: data.current.weather_code,
        windSpeed: data.current.wind_speed_10m
    };
}
    
//Translates Open-Meteo's weather codes into plain text with an emoji for user convenience
function getWeatherDescription(weatherCode)
{
    switch(weatherCode)
    {
        case 0:
            return "☀️ Clear Sky";

        case 1:
            return "🌤️ Mainly Clear";

        case 2:
            return "⛅ Partly Cloudy";

        case 3:
            return "☁️ Overcast";

        case 45:
            return "🌫️ Fog";

        case 48:
            return "🌫️ Depositing Rime Fog";

        case 51:
            return "🌦️ Light Drizzle";

        case 53:
            return "🌦️ Moderate Drizzle";

        case 55:
            return "🌧️ Dense Drizzle";

        case 56:
            return "🌧️ Light Freezing Drizzle";

        case 57:
            return "🌧️ Dense Freezing Drizzle";

        case 61:
            return "🌦️ Slight Rain";

        case 63:
            return "🌧️ Moderate Rain";

        case 65:
            return "🌧️ Heavy Rain";

        case 66:
            return "🌧️ Light Freezing Rain";

        case 67:
            return "🌧️ Heavy Freezing Rain";

        case 71:
            return "🌨️ Slight Snowfall";

        case 73:
            return "🌨️ Moderate Snowfall";

        case 75:
            return "❄️ Heavy Snowfall";

        case 77:
            return "❄️ Snow Grains";

        case 80:
            return "🌦️ Slight Rain Showers";

        case 81:
            return "🌧️ Moderate Rain Showers";

        case 82:
            return "🌧️ Violent Rain Showers";

        case 85:
            return "🌨️ Slight Snow Showers";

        case 86:
            return "❄️ Heavy Snow Showers";

        case 95:
            return "⛈️ Thunderstorm";

        case 96:
            return "⛈️ Thunderstorm With Slight Hail";

        case 99:
            return "⛈️ Thunderstorm With Heavy Hail";

        default:
            return "❓ Unknown Weather";
    }
}

module.exports = { getCoordinates, getWeather };