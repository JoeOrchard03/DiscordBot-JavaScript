//Gets the Co-ordinates for a location from Open-Meteo's API
async function getCoordinates(location)
{
    //Encodes the location to handle things like spaces in a location's name like "New York" for example
    const encodedLocation = encodeURIComponent(location);

    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodedLocation}&count=1`;

    const response = await fetch(url);

    const data = await response.json();

    if(!data.results || data.results.length === 0)
    {
        throw new Error("Location not found");
    }

    const result = data.results[0];

    //Throws error if the geocoding API is not working or can't be reached
    if(!response.ok)
    {
         throw new Error(`Geocoding API request failed: ${response.status}`);
    }

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
    const url = 
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m`;
    
    const response = await fetch(url);
    
    //Throws error if the geocoding API is not working or can't be reached
    if(!response.ok)
        {
            throw new Error(`Weather API request failed: ${response.status}`);
        }
        
        const data = await response.json();
        
        console.log(data);
    }
    
module.exports = { getCoordinates, getWeather };

//Test
//getCoordinates("Aylesbury");