import { useStytchSession } from '@stytch/nextjs';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import MeetupList from '../components/meetups/MeetupList';
import Snackbar from '../components/utils/Snackbar.js';
import { connectDB } from '../lib/connect-db';

import { useIsVisible } from '../lib/check-el-visible';

function HomePage(props) {
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const { session } = useStytchSession();
  const router = useRouter();

  const meetupsRef = useRef(null);
  const isIntersecting = useIsVisible(meetupsRef);

  const { message } = router.query;

  useEffect(() => {

    if (message === 'Welcome to NextJs Meetups!') {
      if (sessionStorage.getItem('isSnackbarShown') === 'false' && isIntersecting && session) {

        setSnackbarOpen(prevSnackOpen => !prevSnackOpen);

        //prevent display snackbar many times after reload page
        sessionStorage.setItem('isSnackbarShown', 'true');
      }
    }
  }, [message, session, router, isIntersecting]);


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
      <MeetupList meetups={props.meetups} ref={meetupsRef} />
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






