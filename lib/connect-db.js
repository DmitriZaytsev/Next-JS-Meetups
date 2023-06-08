import { MongoClient } from 'mongodb';

async function dataBase() {
  const client = await MongoClient.connect(process.env.MONGODB_CONNECTION_STRING, {
    useUnifiedTopology: true,
  });

  return [client.db().collection('meetups'), () => client.close()];
}

export default dataBase;