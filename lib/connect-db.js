import { MongoClient } from 'mongodb';

export async function connectDB() {
  const client = await MongoClient.connect(process.env.MONGODB_CONNECTION_STRING, {
    useUnifiedTopology: true,
  });

  return [client.db().collection('meetups'), () => client.close()];
}
