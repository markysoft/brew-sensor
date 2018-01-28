require('dotenv').config();
const MongoClient = require('./lib/MongoClient');
const readTemperatures = require('./lib/readTemperatures');

const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@markydocs-shard-00-00-dwq8a.mongodb.net:27017,markydocs-shard-00-01-dwq8a.mongodb.net:27017,markydocs-shard-00-02-dwq8a.mongodb.net:27017?ssl=true&replicaSet=markydocs-shard-0&authSource=admin`;
const dbName = 'homebrew';

const client = new MongoClient(uri, dbName);

async function loadSensorData() {
  await client.openConnection();
  const record = {
    brew: 20180120,
    time: new Date(),
    temps: readTemperatures()
  };
  await client.insertOne('readings', record);
  await client.closeConnection();
}

loadSensorData();
