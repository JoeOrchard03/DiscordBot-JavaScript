# Artificer Discord Bot

Artificer is a Discord bot built with Javascript, Node.js and Discord.

I created this project to practise working with external APIs, asynchronous JavaScript and Discord slash commands while building a small application that combines multiple services together.

## Features

- "/ping"
-   Checks whether the bot is online and responding.
- "/joke"
-   Retrieves a random joke from the official joke API.
- "/weather location:"
-   Accepts a location entered by the user.
-  Uses the Open-Meteo Geocoding API to convert the location into latitude and longitude co-ordinates.
-  Uses these co-ordinates with the Open-Meteo Forecast API to display the current weather in a Discord embed.

- Handles invalid locations and API/network errors.
- Retries failed API requests before returning an error to the user.
- Uses environment variables to keep Discord credentials private.

## How the weather command works

The weather command uses two API requests. The first API request converts a location name into co-ordinates using Open-Meteo's Geocoding API, the second request uses those co-ordinates to retrieve the current temperature, apparent temperature, precipitation, wind speed and weather code. The weather code returned by Open-Meteo is then converted into a readable weather description via a switch statement before all of it is presented to the user in a readable fashion using a Discord embed for styling.

## APIs Used

### Open-Meteo Geocoding API

Used to search for locations and retrieve their latitude and longitude co-ordinates.

### Open-Meteo Forecast API

Used to retrieve current weather information using the co-ordinates returned by the Geocoding API.

### Offical Joke API

Used by the /joke command to retrieve a random joke.

## Technologies Used

- Javascript
- Node.js
- Discord.js
- REST APIs
- JSON
- fetch()
- dotenv
- Git
- GitHub
- GitHub Codespaces

## What I Learned

This project gave me practical experience with:

- Making HTTP requests to external REST APIs
- Parsing JSON responses
- Using query parameters and URL encoding
- Working with async and await
- Handling API and network errors
- Retrying requests when an external service temporarily fails
- Chaining multiple API calls together
- Creating Discord slash commands
- Using Discord embeds to format responses
- Keeping credentials secure using environment variables
- Separating API logic from Discord interaction logic

## Setup

1) Clone the repository

git clone https://github.com/JoeOrchard03/DiscordBot-JavaScript
cd Artificer

2) Install dependencies

npm install

3) Create a .env file

Create a .env file in the root directory with a discord bot token, client ID and guild ID

4) Register the slash commands

node deploy-commands.js

5) Start the bot

node index.js

## Future Development

Possible future improvements include:

- Additional API integrations
- Database based user data
- More advanced Discord commands
- Further automation features
- More complex API workflows involving multiple services
