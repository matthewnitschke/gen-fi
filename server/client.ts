import { MongoClient } from './deps.ts';

const client = new MongoClient();
client.connectWithUri("mongodb://localhost:27017");
