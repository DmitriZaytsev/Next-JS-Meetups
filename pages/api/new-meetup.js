import connectDB from '../../lib/connect-db';

async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const data = req.body;

      const [meetupCollection, closeClient] = await connectDB();

      await meetupCollection.insertOne(data);

      closeClient();

      res.status(201).json({ message: 'Meetup inserted!' });
    } catch (err) {
      console.error(err.message);
    }
  }
}
export default handler;
