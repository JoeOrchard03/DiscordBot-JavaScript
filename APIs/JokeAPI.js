async function getJoke() {
    const response = await fetch(
        'https://official-joke-api.appspot.com/random_joke'
    );

    const data = await response.json();

    const message = `${data.setup}\n${data.punchline}`;
    return message;
}

//Exposes the getJoke function so it can be called from other js files
module.exports = { getJoke };