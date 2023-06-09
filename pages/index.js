import { useStytchSession } from '@stytch/nextjs';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import MeetupList from '../components/meetups/MeetupList';
import Snackbar from '../components/utils/Snackbar.js';
import connectDB from '../lib/connect-db';


function HomePage(props) {

  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const { session } = useStytchSession();
  const router = useRouter();

  const { message } = router.query;

  useEffect(() => {

    //authenticated added to prevent display snackbar many times
    const authenticated = localStorage.getItem('authenticated');

    if (authenticated === 'true' && message && session)

      setSnackbarOpen(prevSnackOpen => !prevSnackOpen);

    localStorage.removeItem('authenticated');

  }, [message, session, router]);


  const handleSnackbarClose = () => {
    setSnackbarOpen(prevSnackOpen => !prevSnackOpen);
  };

  return (
    <>
      <Head>
        <title>NextJS Meetups</title>
        <meta
          name='description'
          content='Browse a huge list of highly active NextJS meetups!'
        />
      </Head>
      <MeetupList meetups={props.meetups} />
      <Snackbar open={isSnackbarOpen} message={message} onClose={handleSnackbarClose} />
    </>
  );
}

export async function getStaticProps() {

  const [meetupCollection, closeClient] = await connectDB();

  const meetups = await meetupCollection.find().toArray();

  closeClient();

  return {
    props: {
      meetups: meetups.map(({ title, image, address, _id }) => ({
        id: _id.toString(),
        title,
        image,
        address,
      })),
    },
    revalidate: 60,
  };
}

export default HomePage;






