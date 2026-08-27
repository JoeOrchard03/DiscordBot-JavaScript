require('dotenv').config(); // Loads dotenv

const { REST, Routes, SlashCommandBuilder } = require('discord.js'); // Loads bits I need from discord.js

//Creates an array of commands
const commands = [
    //Creates a new command object in the form discord expects
    new SlashCommandBuilder()
        .setName('ping') //Sets commands name
        .setDescription('Replies with Pong!') //Sets the commands description
        .toJSON() //Converts it into a form discord can accept
];

//Creats an object that can work with discords REST API, makes it use the bot's token
const rest = new REST({ version: '10' })
    .setToken(process.env.DISCORD_TOKEN);

async function deployCommands() {
    try {
        console.log('Registering slash commands...');

        //Makes a HTTP Put request to set the bot to use the commands set in this js
        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands }
        );

        console.log('Slash commands registered!');
    }
    catch (error) {
        console.error(error);
    }
}

//Calls the function
deployCommands();