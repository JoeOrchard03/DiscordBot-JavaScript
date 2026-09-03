const { DatabaseSync } = require("node:sqlite");

const database = new DatabaseSync("Database/artificer.db"); //Creates/opens database

database.exec("PRAGMA foreign_keys = ON"); //Enables foreign key checking to validate variables

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

function addItem(itemID, name, shortName)
{
    const insertItem = database.prepare(`
        INSERT OR IGNORE INTO items (item_id, name, short_name)
        VALUES (?,?,?)`);

    insertItem.run(itemID, name, shortName);
}

function getItem(itemID)
{
    //SELECT is used to read data
    const getItem = database.prepare(`
        SELECT *
        FROM items
        WHERE item_id = ?`);

    return getItem.get(itemID);
}

function addInventoryItem(discordUserID, itemID, quantity)
{
    const insertInventoryItem = database.prepare(`
            INSERT OR IGNORE INTO inventory (discord_user_id, item_id, quantity)
            VALUES (?,?,?)`);

        insertInventoryItem.run(discordUserID, itemID, quantity);
}

function getInventoryItem(discordUserID, itemID)
{
    const readInventoryItem = database.prepare(`
        SELECT *
        FROM inventory
        WHERE discord_user_id = ?
        AND item_id = ?`);

    return readInventoryItem.get(discordUserID, itemID);
}

function addItemQuantity(discordUserID, itemID, amount)
{
    const updateInventoryQuantity = database.prepare(`
        UPDATE inventory
        SET quantity = quantity + ?
        WHERE discord_user_id = ?
        AND item_id = ?`);

    return updateInventoryQuantity.run(amount, discordUserID, itemID);
}

//Runs SQL against the database and creates table to store user name info if one does not already exist
database.exec(`
    CREATE TABLE IF NOT EXISTS users (
        discord_user_id TEXT PRIMARY KEY,
        tarkov_name TEXT)`);

//Creates items table
database.exec(`
    CREATE TABLE IF NOT EXISTS items (
        item_id TEXT PRIMARY KEY,
        name TEXT,
        short_name TEXT)`);

//Creates inventory table
database.exec(`
    CREATE TABLE IF NOT EXISTS inventory (
        discord_user_id TEXT,
        item_id TEXT,
        quantity INTEGER,
        PRIMARY KEY (discord_user_id, item_id),
        FOREIGN KEY (discord_user_id)
            REFERENCES users(discord_user_id),
        FOREIGN KEY (item_id)
            REFERENCES items(item_id))`);
        
addUser("12345", "Joe");

const user = getUser("12345");

console.log(user);

addItem(
    "5c06779c86f77426e00dd782",
    "Wires",
    "Wires");

const item = getItem("5c06779c86f77426e00dd782");

console.log(item);

addInventoryItem(
    "12345",
    "5c06779c86f77426e00dd782",
    7
);

const inventoryItem = getInventoryItem(
    "12345",
    "5c06779c86f77426e00dd782"
);

console.log(inventoryItem);

addItemQuantity(
    "12345",
    "5c06779c86f77426e00dd782",
    2
)

const updatedInventoryItem = getInventoryItem(
    "12345",
    "5c06779c86f77426e00dd782"
);

console.log(updatedInventoryItem);

console.log("Database connected");

module.exports = {addUser, getUser, addItem, getItem, addInventoryItem, getInventoryItem, addItemQuantity};