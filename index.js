require(`dotenv`).config();

//Loads necessary commands from API handler js files
const {getJoke} = require("./APIs/JokeAPI");
const { getCoordinates, getWeather } = require("./APIs/WeatherAPI");

const { Client, GatewayIntentBits } = require('discord.js'); //Imports dependencies from Discord.js, client is the connection to discord

//Creates discord client
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
});

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
            //Gets the co-ordinates of the location
            const coordinates = await getCoordinates(location);

            const weather = await getWeather(coordinates.latitude, coordinates.longitude);

            //Returns info about the location
            await interaction.editReply(
                `Weather for ${coordinates.name}, ${coordinates.region}\n` +
                `${weather.weatherDescription}\n` +
                `Temperature: ${weather.temperature}°C\n` +
                `Feels like: ${weather.feelsLike}°C\n` +
                `Precipitation: ${weather.precipitation} mm\n` +
                `Wind speed: ${weather.windSpeed} km/h`);
        }
        catch(error)
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

});

//Connects using bot's token
client.login(process.env.DISCORD_TOKEN);