const tarkovAPIURL = "https://api.tarkov.dev/graphql";

async function getTarkovItem(itemName)
{
    //Creates a query object that provides the itemName of the wanted item and tells it what I want back 
    const query = `
        query{                                                                 
            items(name: "${itemName}") {
            id
            name
            shortName
        }
    }`;

    const response = await fetch(tarkovAPIURL, {method: "POST", //POST sends data to the API

        //Tells the server I am sending JSON
        headers: {
            "Content-Type": "application/json"
        },

        //Turns the query to json so it can be sent via HTTP
        body: JSON.stringify({query})
    });

    const data = await response.json();

    console.log(`Retrieved data from Tarkov POST request`);
    console.log(data);
}

getTarkovItem("Wires");

module.exports = { getTarkovItem };