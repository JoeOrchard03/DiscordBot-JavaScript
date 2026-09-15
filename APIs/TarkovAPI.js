const tarkovItemsURL = "https://json.tarkov.dev/regular/items"; //Tarkov. dev GraphQL API is down going to use backup json which should have the needed info
const { fetchWithRetry } = require("./WeatherAPI.js");

async function getTarkovItems()
{
    const url = tarkovItemsURL;

    const response = await fetchWithRetry(url);

    //Throws error if the Tarkov.Dev json url is not working or can't be reached
    if(!response.ok)
    {
        throw new Error(`Tarkov.dev json fetch request failed: ${response.status}`);
    }

    const data = await response.json();

    //console.log(Object.keys(data.data));

    //Returns the data we need from the response
    return(data.data.items);
}

async function test()
{
    const items = await getTarkovItems();

    console.log(typeof items);

    console.log(Object.keys(items).length);

    console.log(Object.values(items)[0]);
}

test();

module.exports = { getTarkovItems };