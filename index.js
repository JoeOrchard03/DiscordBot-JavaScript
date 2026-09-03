require(`dotenv`).config();

//Loads necessary commands from API handler js files
const { getJoke } = require("./APIs/JokeAPI");
const { getCoordinates, getWeather } = require("./APIs/WeatherAPI");
const { getInventory } = require ("./Database/Database");

const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js'); //Imports dependencies from Discord.js, client is the connection to discord

//Creates discord client
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds]});

//When bot is connected and ready
client.once('clientReady', () => {
  //Log message to console to announce itself
    console.log(`Logged in as ${client.user.tag}`);
});

//Everytime discord detects a new interaction this function runs
client.on("interactionCreate", async interaction =>{
    //Checks if it is a slash command
    if (!interaction.isChatInputCommand()){
        return;
    }

    //Checks if the command is ping
    if(interaction.commandName === "ping")
    {
        await interaction.reply("Pong! 🏓");
    }

    if(interaction.commandName === "joke")
    {
        await interaction.reply(await getJoke());
    }

    if(interaction.commandName === "weather")
    {
        //Gets the location from user input
        const location = interaction.options.getString("location");

        await interaction.deferReply();

        try
        {
            //Gets the co-ordinates of the location using the location's name and a call to Open-Meteo's geocoding API
            const coordinates = await getCoordinates(location);

            //Gets the weather of the location using it's co-ordinates and a call to Open-Meteo's foreceast API
            const weather = await getWeather(coordinates.latitude, coordinates.longitude);

            //Creates the weather embed and loads the necessary info into it
            const weatherEmbed = createWeatherEmbed(coordinates, weather);

            //Bot replies with the embed
            await interaction.editReply({embeds: [weatherEmbed]});
        }
        catch(error) // Error handling
        {
            console.error(error);

            if (error.message === "Location not found")
            {
                await interaction.editReply(
                    `I couldn't find a location called "${location} :(".`);
            }
            else if(error.cause?.code === "UND_ERR_CONNECT_TIMEOUT")
            {
                await interaction.editReply(
                    "The weather service took too long to respond. Please try again.");
            }
            else
            {
                await interaction.editReply(
                    "Something went wrong while retrieving the weather.");
            }
        }
        
    }

    if (interaction.commandName === "inventory")
    {
        const inventory = getInventory(interaction.user.id);

        console.log(inventory);
    }

});

//Function to create the weather embed
function createWeatherEmbed(coordinates, weather)
{
    return new EmbedBuilder().
        setColor(0x3498DB). //Sets blue color
        setTitle(`Weather for ${coordinates.name}, ${coordinates.region}`).
        setDescription(weather.weatherDescription).
        addFields( //Adds fields with emojis for user ease of use
            {
                name: "🌡️ Temperature",
                value: `${weather.temperature}°C`,
                inline: true
            },
            {
                name: "🤔 Feels like",
                value: `${weather.feelsLike}°C`,
                inline: true
            },
            {
                name: "🌧️ Precipitation",
                value: `${weather.precipitation} mm`,
                inline: true
            },
            {
                name: "💨 Wind speed",
                value: `${weather.windSpeed} km/h`,
                inline: true
            }).
        setFooter({text: "Weather and location data provided by Open-Meteo"}). //Credits Open-Meteo
        setTimestamp();
}

//Connects using bot's token
client.login(process.env.DISCORD_TOKEN);