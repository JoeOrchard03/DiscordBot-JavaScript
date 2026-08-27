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

    return {
        name: result.name,
        latitude: result.latitude,
        longitude: result.longitude,
        country: result.country,
        region: result.admin1
    };
}

module.exports = { getCoordinates };

//Test
//getCoordinates("Aylesbury");