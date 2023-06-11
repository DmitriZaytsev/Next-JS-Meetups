import { useStytch, useStytchSession } from '@stytch/nextjs';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import Loading from '../../components/utils/Loading';


const Authenticate = () => {
  const [calledPush, setCalledPush] = useState(false);
  const { session } = useStytchSession();
  const stytchClient = useStytch();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      if (calledPush) {
        return;
      }

      router.replace('/?message=Welcome to NextJs Meetups!');
    } else {
      if (calledPush) {
        return;
      }

      const authenticateUser = async () => {
        try {
          const token = router.query.token;

          await stytchClient.magicLinks.authenticate(token, {
            session_duration_minutes: 7 * 24 * 60,
          });

          //prevent display snackbar many times after reload page
          sessionStorage.setItem('isSnackbarShown', 'false');

          router.replace('/?message=Welcome to NextJs Meetups!');

          setCalledPush(true);

          localStorage.removeItem('emailAttempts');

        } catch (error) {
          console.error(error);
          router.replace('/');
        }
      };

      authenticateUser();
    }
  }, [stytchClient, session, router, calledPush]);


  return (
    <>
      <Head>
        <title>Authentication</title>
        <meta
          name='description'
          content='Fast authentication to a website with NextJS meetings'
        />
      </Head>
      <Loading />
    </>
  );
};

export default Authenticate;




