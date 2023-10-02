import { MongoClient } from 'mongodb';

const uri =
  'mongodb+srv://riskyexperimental:30secondCCD@cluster-0.vcjf7mi.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri);

export const clientPromise = async (database: string, collection: string) => {
  await client.connect();
  const db = client.db(database);
  const collectionName = db.collection(collection);

  return collectionName;
};
