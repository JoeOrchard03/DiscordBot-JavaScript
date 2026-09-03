const { DatabaseSync } = require("node:sqlite");

const database = new DatabaseSync("Database/artificer.db"); //Creates/opens database

//Runs SQL against the database and creates table if one does not already exist
database.exec(`
    CREATE TABLE IF NOT EXISTS users (
        discord_user_id TEXT PRIMARY KEY,
        tarkov_name TEXT)`);

//prepare is used to change table values, INSERT INTO is used to write data
const insertUser = database.prepare(`
    INSERT INTO users (discord_user_id, tarkov_name)
    VALUES (?,?)`); //?s are placeholder values

//SELECT is used to read data
const getUser = database.prepare(`
    SELECT *
    FROM users
    WHERE discord_user_id = ?`);

insertUser.run("12345", "Joe");
    
const user = getUser.get("12345");

console.log(user);

console.log("Database connected");