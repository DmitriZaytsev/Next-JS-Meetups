import { ObjectId } from 'mongodb';

import Head from 'next/head';

import MeetupDetail from '../../components/meetups/MeetupDetail';
import connectDB from '../../lib/connect-db';

function MeetupDetails(props) {
  return (
    <>
      <Head>
        <title>{props.title}</title>
        <meta name='description' content={props.description} />
      </Head>
      <MeetupDetail {...props} />
    </>
  );
}

export async function getStaticPaths() {

  const [meetupCollection, closeClient] = await connectDB();

  const meetups = await meetupCollection.find({}, { _id: 1 }).toArray();

  closeClient();

  return {
    fallback: 'blocking',
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const [meetupCollection, closeClient] = await connectDB();
  
  const { _id, title, image, address, description } = await meetupCollection.findOne({
    _id: ObjectId(meetupId),
  });

  closeClient();

  return {
    props: {
        id: _id.toString(),
        title,
        address,
        image,
        description,
    },
  };
}

export default MeetupDetails;
