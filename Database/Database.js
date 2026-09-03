const { DatabaseSync } = require("node:sqlite");

const database = new DatabaseSync("Database/artificer.db"); //Creates/opens database

console.log("Database connected");