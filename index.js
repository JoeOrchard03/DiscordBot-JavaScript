require(`dotenv`).config();

const { Client, GatewayIntentBits } = require('discord.js'); //Imports dependencies from Discord.js, client is the connection to discord

//Creates discord client
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
});

//When bot is connected and ready
client.once('ready', () => {
  //Log message to console to announce itself
    console.log(`Logged in as ${client.user.tag}`);
});

//Connects using bot's token
client.login(process.env.DISCORD_TOKEN);