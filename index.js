require(`dotenv`).config();

//Loads necessary commands from API handler js files
const {getJoke} = require("./APIs/JokeAPI");
const { getCoordinates } = require("./APIs/WeatherAPI");

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

        try
        {
            //Gets the co-ordinates of the location
            const coordinates = await getCoordinates(location);

            console.log(coordinates);

            //Returns info about the location
            await interaction.reply(
                `${coordinates.name}, ${coordinates.region}\n` +
                `Latitude: ${coordinates.latitude}\n` +
                `Longitude: ${coordinates.longitude}`);
        }
        catch(error)
        {
            console.error(error);

            await interaction.reply(
            `I couldn't find a location called "${location} :(".`);
        }
        
    }

});

//Connects using bot's token
client.login(process.env.DISCORD_TOKEN);