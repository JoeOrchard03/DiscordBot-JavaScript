require(`dotenv`).config();

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
    if(interaction.commandName==="ping")
    {
        await interaction.reply("Pong! 🏓");
    }
});

//Connects using bot's token
client.login(process.env.DISCORD_TOKEN);