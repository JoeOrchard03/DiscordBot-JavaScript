const tarkovItemsURL = "https://json.tarkov.dev/regular/items"; //Tarkov. dev GraphQL API is down going to use backup json which should have the needed info
const { fetchWithRetry } = require("./APIs/WeatherAPI");

async function getTarkovItems()
{
    const url = tarkovItemsURL;

    const response = fetch(url);

    //Throws error if the Tarkov.Dev json url is not working or can't be reached
    if(!response.ok)
    {
        throw new Error(`Tarkov.dev json fetch request failed: ${response.status}`);
    }

    const data = await response.json();

    //Returns the data we need from the response
    return(data[0]);
}

console.log(getTarkovItems());

module.exports = { getTarkovItems };