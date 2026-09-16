const { MongoClient } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.MONGO_URI);

let db;

async function connectDB() {
  await client.connect();

  db = client.db("smartVehicleContact");

  console.log("MongoDB connected successfully");
}

function getDB() {
  return db;
}

module.exports = {
  connectDB,
  getDB,
};