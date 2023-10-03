import { Db, MongoClient, MongoClientOptions } from 'mongodb';

const MONGODB_URI: string = process.env.MONGODB_URI || '';
const MONGODB_DB: string = process.env.DB_NAME || '';

if (!MONGODB_URI) {
  throw new Error('Define the MONGODB_URI environmental variable');
}
if (!MONGODB_DB) {
  throw new Error('Define the MONGODB_DB environmental variable');
}

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase() {
  // check the cached.
  if (cachedClient && cachedDb) {
    // load from cache
    return {
      client: cachedClient,
      db: cachedDb,
    };
  }

  // set the connection options
  const opts: MongoClientOptions = {
    replicaSet: 'atlas-14p42a-shard-0',
  };

  // Connect to cluster
  const client = new MongoClient(MONGODB_URI, opts);
  await client.connect();
  const db = client.db(MONGODB_DB);

  // set cache
  cachedClient = client;
  cachedDb = db;

  return {
    client: cachedClient,
    db: cachedDb,
  };
}
