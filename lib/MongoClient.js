
const client = require('mongodb').MongoClient;

const log = { info: console.info };

class MongoClient {
  constructor(uri, dbName) {
    this.uri = uri;
    this.dbName = dbName;
  }

  async openConnection() {
    this.client = await client.connect(this.uri);
    this.db = this.client.db(this.dbName);
  }

  closeConnection() {
    if (this.client) {
      log.info('mongo connection closed');
      this.client.close();
    } else {
      log.info('mongo connection already closed');
    }
  }

  getCollection(collection) {
    return this.db.collection(collection);
  }

  async insertOne(collection, data) {
    return this.getCollection(collection).insertOne(data);
  }

  async insertMany(collection, data) {
    return this.getCollection(collection).insertMany(data);
  }

  getTotalCount(collection) {
    return this.getCollection(collection).count();
  }

  deleteCollection(collection) {
    return this.getCollection(collection).drop();
  }

  async find(collection, params) {
    const results = await this.getCollection(collection).find(params);
    return results.toArray();
  }
}

module.exports = MongoClient;
