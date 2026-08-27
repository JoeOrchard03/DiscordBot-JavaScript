require(`dotenv`).config();

const {getJoke} = require("./APIs/JokeAPI");

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
        const location = interaction.options.getString("location");

        console.log(location);

        await interaction.reply("You entered: " + location);
    }
});

//Connects using bot's token
client.login(process.env.DISCORD_TOKEN);