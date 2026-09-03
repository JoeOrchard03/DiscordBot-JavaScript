const { DatabaseSync } = require("node:sqlite");

const database = new DatabaseSync("Database/artificer.db"); //Creates/opens database

function addUser(discordUserID, tarkovName)
{
    //INSERT INTO is used to write data, ignores if that user already exists
    const insertUser = database.prepare(`
        INSERT OR IGNORE INTO users (discord_user_id, tarkov_name)
        VALUES (?,?)`); //?s are placeholder values

    insertUser.run(discordUserID, tarkovName);
}

function getUser(discordUserID)
{
    //SELECT is used to read data
    const getUser = database.prepare(`
        SELECT *
        FROM users
        WHERE discord_user_id = ?`);

    return getUser.get(discordUserID);
}

//Runs SQL against the database and creates table if one does not already exist
database.exec(`
    CREATE TABLE IF NOT EXISTS users (
        discord_user_id TEXT PRIMARY KEY,
        tarkov_name TEXT)`);
    
addUser("12345", "Joe");

const user = getUser("12345");

console.log(user);

console.log("Database connected");

module.exports = {addUser, getUser};